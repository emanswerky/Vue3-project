<template>
  <div class="">
    <!-- <nav>
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/pinia">pinia</router-link> |
      <router-link to="/book">book</router-link>
    </nav> -->
    <router-view />
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
import { ref, onMounted } from 'vue';
import request from '/src/plugins/request';

export default {
  setup() {
    const testData = ref(null);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await request.get('/test-endpoint'); // endpoint تجريبي
        testData.value = response.data;
        console.log('Axios response:', response.data);
      } catch (err) {
        error.value = err;
        console.error('Axios error:', err);
      }
    });

    return { testData, error };
  },
};
</script>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#app {
  width: 100% !important;
  padding: 0 !important;
}
</style>
