<script>
import { userStore } from '@/stores/user';

export default {
  data() {
    return {
      user: userStore().loginResponse,
    };
  },
  computed: {
    userName() {
      if (
        this.user &&
        Object.keys(this.user).length === 0 &&
        Object.getPrototypeOf(this.user) === Object.prototype
      ) {
        return 'you are not logged in.';
      } else {
        return this.user.record.username;
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Hello, {{ userName }}</h1>
  </div>
</template>
