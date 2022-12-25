import { defineStore } from 'pinia';
import pb from '@/main';
import router from '../router';

export const userStore = defineStore('main', {
  state: () => ({
    user: {},
    messages: [],
    // loginResponse: {},
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
        return this.user.record.username;
      }
    },
    userIsLoggedIn() {
      if (
        this.user &&
        Object.keys(this.user).length > 0 &&
        Object.getPrototypeOf(this.user) === Object.prototype
      ) {
        return true;
      }
      return false;
    },
  },
  actions: {
    async logIn(username, password) {
      const result = await pb
        ?.collection('users')
        .authWithPassword(username, password);
      if (result) {
        // console.log('log in response', result);
        this.user = result;
        await router.push({ name: 'about' });
      }
    },
    async createUser(data) {
      const user = await pb?.collection('users').create(data);
      if (user) {
        await this.logIn(data.username, data.password);
        await this.fetchMessages();
      }
    },
    signOut() {
      pb.authStore.clear();
    },
    async fetchMessages() {
      // console.log('fetching messages. . .');
      const result = await pb.collection('messages').getList(1, 50, {
        sort: 'created',
        expand: 'user',
      });
      if (result) {
        this.messages = result.items;
      }
    },
  },
});
