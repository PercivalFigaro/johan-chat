import { defineStore } from 'pinia';
import pb from '@/main';
import router from '../router';

export const userStore = defineStore('main', {
  state: () => ({
    user: {},
    messages: [],
    errorMessage: '',
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
      try {
        const result = await pb
          ?.collection('users')
          .authWithPassword(username, password);
        if (result) {
          this.user = result;
          await router.push({ name: 'messenger' });
        }
      } catch (error) {
        console.log(error.data.message);
        if (error.data.message === 'Failed to authenticate.') {
          this.errorMessage =
            'Failed to authenticate. Please check your username and password.';
        }
      }
    },
    async createUser(data) {
      try {
        const user = await pb?.collection('users').create(data);
        if (user) {
          await this.logIn(data.username, data.password);
          await this.fetchMessages();
        }
      } catch (error) {
        console.log(error.data);
        if (
          error.data.data.username?.message ===
          'The username is invalid or already in use.'
        ) {
          this.errorMessage = 'The username is invalid or already in use.';
        }
        if (
          error.data.data.password?.message ===
          'The length must be between 5 and 72.'
        ) {
          this.errorMessage = 'Your password must be at least 5 characters!';
        }
        if (
          error.data.data.username?.message ===
          'The length must be between 3 and 100.'
        ) {
          this.errorMessage = 'Your username must be at least 3 characters!';
        }
      }
    },
    async signOut() {
      pb.authStore.clear();
      this.user = {};
      this.messages = [];
      this.errorMessage = '';
    },
    async fetchMessages() {
      const result = await pb.collection('messages').getFullList(70, {
        sort: 'created',
        expand: 'user',
      });
      if (result) {
        this.messages = result;
      }
    },
  },
});
