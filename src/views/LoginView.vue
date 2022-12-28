<script>
import { userStore } from '@/stores/user';

export default {
  inject: ['pocketbase'],
  data() {
    return {
      user: userStore(),
      username: '',
      userPassword: '',
    };
  },
  computed: {
    errorMessage() {
      return userStore().errorMessage;
    },
  },
  methods: {
    validateInput() {
      if (this.username.length > 60) {
        return false;
      } else if (this.userPassword.length >= 72) {
        return false;
      } else {
        return true;
      }
    },
    async createUser() {
      try {
        if (this.validateInput()) {
          const data = {
            username: this.username,
            password: this.userPassword,
            passwordConfirm: this.userPassword,
          };
          this.user.createUser(data);
        } else {
          alert('Username or password insanely long!');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logIn() {
      this.user.logIn(this.username, this.userPassword);
    },
  },
};
</script>

<template>
  <div class="container h-100 mt-5">
    <div class="mx-auto custom-width">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          :style="errorMessage ? 'border: 1px solid red' : null"
          id="floatingInput"
          placeholder="Username"
          v-model="username"
        />
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          :style="errorMessage ? 'border: 1px solid red' : null"
          id="floatingPassword"
          placeholder="Password"
          v-model="userPassword"
          @keyup.enter="logIn"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-primary" @click="logIn">Log In</button>
        <button class="btn btn-primary" @click="createUser">Sign Up</button>
      </div>
      <div v-if="errorMessage" class="mt-2" style="color: red">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 768px) {
  .custom-width {
    width: 25%;
  }
}
</style>
