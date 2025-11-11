<template>
  <section>
    <div class="flex md:flex-row items-center flex-col-reverse md:h-screen bg-white rounded-t-3xl">
      <div class="md:w-2/5 w-full mb-6">
        <div class="text-center text-subMain mb-6 text-2xl font-medium">Sign up</div>
        <div class="w-3/4 mx-auto flex">
          <v-form class="w-full" @submit.prevent>
            <v-text-field :rules="ruleName" id="name" v-model="name" name="name" label="Name" />

            <v-text-field
              :rules="rulesEmail"
              name="email"
              label="Email"
              id="email"
              v-model="email"
            />

            <v-text-field
              :rules="rulePassword"
              label="Password"
              id="password"
              type="password"
              v-model="password"
              name="password"
            />

            <button
              @click="submit()"
              :class="{
                'cursor-not-allowed bg-gray-400': invalid,
              }"
              class="w-full inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-main transition ease-in-out duration-150 mt-3"
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
                Sign up
              </div>
            </button>
            <div class="text-main mt-6">
              already have an account?

              <router-link to="/login" class="text-subMain font-medium"> Sign in </router-link>
            </div>
          </v-form>
        </div>
      </div>
      <div class="md:w-3/5 w-full h-full flex items-center 2xs:flex">
        <img src="/src/assets/img/signup2.png" alt="" class="w-full h-full rounded-t-3xl" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import request from '/src/plugins/request';
import { store } from '/src/stores/index.js';
import { useToast } from 'vue-toast-notification';

// تعريف المتغيرات التفاعلية
const email = ref('');
const toast = useToast();

const password = ref('');
const name = ref('');
const loader = ref(false);

// استدعاء الـ router و Pinia store
const router = useRouter();
const authStore = store();
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

const ruleName = ref([
  (value) => {
    if (value) return true;

    return 'You must enter a name.';
  },
]);

// دالة تسجيل الاشتراك
const submit = async () => {
  loader.value = true;
  if (name.value && email.value && password.value) {
    try {
      const response = await request.post('/signup', {
        email: email.value,
        password: password.value,
        name: name.value,
      });
      toast.success('تم التسجيل بنجاح!');
      // حفظ الـ token والـ user في Pinia و Cookies
      authStore.setToken(response.data.token);
      Cookies.set('token', response.data.token);
      authStore.setUser(response.data.user);

      router.push({ path: '/' });
      console.log(response);
    } catch (errors) {
      loader.value = false;
      toast.error('error!');

      if (errors.response && errors.response.data) {
        console.log(errors.response.data.errors);
      }
    } finally {
      loader.value = false;
    }
  } else {
    toast.error('tray again!');
  }
};
</script>
