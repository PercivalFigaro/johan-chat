import { defineStore } from 'pinia';
import pb from '@/main';

export const userStore = defineStore('main', {
  state: () => ({
    user: {},
    loginResponse: {},
  }),
  getters: {
    getUsername() {
      if (
        this.user &&
        Object.keys(this.user).length === 0 &&
        Object.getPrototypeOf(this.user) === Object.prototype
      ) {
        return 'No user';
      } else {
        return this.user.username;
      }
    },
  },
  actions: {
    async logIn(username, password) {
      const result = await pb
        ?.collection('users')
        .authWithPassword(username, password);
      console.log('log in response', result);
      this.loginResponse = result;
    },
    async createUser(data) {
      const user = await pb?.collection('users').create(data);
      this.user = user;
    },
    signOut() {
      pb.authStore.clear();
    },
  },
});
