import Cookies from 'js-cookie';

import { defineStore } from 'pinia';

export const store = defineStore('auth', {
  state: () => ({
    token: Cookies.get('token') || null,
    user: {},
  }),
});
