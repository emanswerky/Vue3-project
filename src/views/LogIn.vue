<template>
  <section>
    <div class="md:flex-row flex-col-reverse flex md:h-screen bg-white rounded-t-3xl">
      <div class="md:w-2/5 xs:w-10/12 w-full mx-auto md:my-auto mt-6 bg-white px-6">
        <div class="flex items-end mb-3">
          <div class="flex items-end">
            <span class="text-2xl text-main font-medium cursor-pointer">Sign In </span>
            <span class="text-black px-3 text-sm font-medium"> Or </span>
          </div>
          <div class="font-extrabold cursor-pointer text-subMain">
            <router-link to="/sign-up">Sign Up</router-link>
          </div>
        </div>
        <div class="flex justify-between w-full mb-11">
          <div
            class="cursor-pointer xs:w-1/4 w-1/3 px-3 rounded-md"
            v-for="item in UserData"
            :key="item.id"
            @click="choose(item)"
            :class="{
              'bg-gray-200  transition-all duration-300': selectedUser === item.id,
            }"
          >
            <div class="w-1/2 mx-auto">
              <img :src="item.img" class="mt-6" />
            </div>
            <div
              class="text-center mt-3"
              :class="{
                'text-main  transition-all duration-300': selectedUser === item.id,
                'text-subMain': selectedUser !== item.id,
              }"
            >
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="w-3/4 mx-auto flex">
          <v-form class="w-full" @submit.prevent ref="form">
            <v-text-field
              id="email"
              v-model="email"
              class="w-full text-subMain"
              name="email"
              label="Email"
              :rules="rulesEmail"
            >
            </v-text-field>

            <v-text-field
              id="password"
              type="password"
              v-model="password"
              class="w-full text-subMain"
              name="password"
              label="password"
              :rules="rulePassword"
            >
            </v-text-field>
            <button
              @click="submit()"
              :class="{ 'cursor-not-allowed bg-gray-400': invalid }"
              class="w-full inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-main transition ease-in-out duration-150"
            >
              <div class="mx-auto flex items-center">
                <svg
                  v-if="loader"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sign in
              </div>
            </button>
          </v-form>
        </div>
      </div>
      <div class="md:w-3/5 w-full mx-auto h-full 2xs:flex hidden">
        <img src="/src/assets/img/signin2.png" alt="" class="w-full h-full rounded-t-3xl" />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '/src/stores/index.js';
import request from '/src/plugins/request';
import Cookies from 'js-cookie';
import { useToast } from 'vue-toast-notification';
export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    const userStore = store();
    const rulesEmail = ref([
      (value) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

        return 'Must be a valid e-mail.';
      },
    ]);
    const rulePassword = ref([
      (value) => {
        if (value) return true;

        return 'You must enter a password.';
      },
    ]);
    const UserData = ref([
      {
        name: 'Admin',
        password: 'password',
        email: 'admin@gmail.com',
        img: 'admin.png',
        id: '1',
      },
      {
        name: 'Content Writer',
        password: 'password',
        email: 'content-writer@gmail.com',
        img: 'writer.png',
        id: '2',
      },
      {
        name: 'User',
        password: 'password',
        email: 'user@gmail.com',
        img: 'user.png',
        id: '3',
      },
    ]);

    const email = ref('');
    const password = ref('');
    const selectedUser = ref('1');
    const loader = ref(false);
    const formRef = ref(null);

    onMounted(() => {
      email.value = UserData.value[0].email;
      password.value = UserData.value[0].password;
    });

    const signup = () => {
      Cookies.remove('token');
      userStore.setToken(null);
      router.push({ path: 'sign-up' });
    };

    const choose = (item) => {
      email.value = item.email;
      password.value = item.password;
      selectedUser.value = item.id;
      console.log(selectedUser.value);
    };

    const submit = async () => {
      if (email.value && password.value) {
        loader.value = true;
        try {
          const response = await request.post('/signin', {
            email: email.value,
            password: password.value,
          });
          toast.success('تم التسجيل بنجاح!');

          userStore.setToken(response.data.token);
          Cookies.set('token', response.data.token);
          userStore.setUser(response.data.user);

          router.push({ path: '/' });
        } catch (errors) {
          toast.error('failed login!');
          if (
            errors.response &&
            errors.response.data &&
            errors.response.data.errors &&
            formRef.value
          ) {
            formRef.value.setErrors(errors.response.data.errors);
          }
        } finally {
          loader.value = false;
        }
      } else {
        !email.value ? toast.error('please enter email') : toast.error('please enter password');
      }
    };

    return {
      UserData,
      email,
      password,
      selectedUser,
      loader,
      formRef,
      signup,
      choose,
      submit,
      rulesEmail,
      rulePassword,
    };
  },
};
</script>
