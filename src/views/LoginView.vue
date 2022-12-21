<script>
// import TheWelcome from "../components/TheWelcome.vue";
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
    filifjonka() {
      return this.user.getUsername;
    },
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
          // console.log("success");
          // console.log(this.pocketbase);
          console.log(this.username, this.userPassword);
          const data = {
            username: this.username,
            password: this.userPassword,
            passwordConfirm: this.userPassword,
          };
          this.user.createUser(data);
          // const user = await this.pocketbase?.collection('users').create({
          //   username: this.username,
          //   email: 'tere@getnada.com',
          //   password: this.userPassword,
          //   passwordConfirm: this.userPassword,
          // });
          // console.log(user);
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
  <div class="container h-100">
    <div class="w-25 mx-auto">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="Username" v-model="username" />
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
          v-model="userPassword" />
        <label for="floatingPassword">Password</label>
      </div>
      <!-- <p>{{ username }}</p>
      <p>{{ userPassword }}</p> -->
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary" @click="logIn">Log In</button>
        <button class="btn btn-primary" @click="createUser">Sign Up</button>
      </div>
      <p>{{ user.userName }}</p>
      <p>{{ filifjonka }}</p>
    </div>
  </div>
</template>
