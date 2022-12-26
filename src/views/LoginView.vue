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
  methods: {
    validateInput() {
      if (this.username.length > 60) {
        return false;
      } else if (
        this.userPassword.length <= 2 ||
        this.userPassword.length >= 20
      ) {
        return false;
      } else {
        return true;
      }
    },
    async createUser() {
      try {
        if (this.validateInput()) {
          console.log(this.username, this.userPassword);
          const data = {
            username: this.username,
            password: this.userPassword,
            passwordConfirm: this.userPassword,
          };
          this.user.createUser(data);
        } else {
          alert('Troubles in paradise!');
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
    <div class="w-25 mx-auto">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
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
    </div>
  </div>
</template>
