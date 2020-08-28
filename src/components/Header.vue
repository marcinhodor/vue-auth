<template>
  <header>
    <div class="logo">
      <router-link to="/">Vue Auth</router-link>
    </div>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li v-if="!auth">
          <router-link :to="{ name: 'signup' }">Sign up</router-link>
        </li>
        <li v-if="!auth">
          <router-link :to="{ name: 'login' }">Log in</router-link>
        </li>
        <li v-if="auth">
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li v-if="auth">
          <ul @click="onLogout">Log out</ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    auth() {
      return this.$store.getters.ifAuthenticated;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
</style>