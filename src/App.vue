<script>
// import HelloWorld from "./components/HelloWorld.vue";
import PocketBase from 'pocketbase';

export const pb = new PocketBase('');

export default {
  // components: {
  //   HelloWorld,
  // },
  data() {
    return {
      testMessage: 'tere',
    };
  },
};
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div>
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <!-- <RouterLink class="nav-link" to="/">Navbar</RouterLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button> -->
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                <RouterLink class="nav-link" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href="#">Features</a> -->
                <RouterLink class="nav-link" to="/about">About</RouterLink>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href="#">Pricing</a> -->
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
