<script>
import { userStore } from '@/stores/user';

export default {
  data() {
    return {
      test: 'message',
    };
  },
  computed: {
    userIsLoggedIn() {
      return userStore().userIsLoggedIn;
    },
  },
  methods: {
    async signOut() {
      await userStore().signOut();
    },
  },
};
</script>

<template>
  <header>
    <div>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/messenger">Messenger</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
              </li>
              <li v-if="userIsLoggedIn" class="nav-item">
                <RouterLink class="nav-link" to="/login" @click="signOut">Sign out</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

