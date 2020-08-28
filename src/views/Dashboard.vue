<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome {{this.$store.state.userEmail}}</p>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  created() {
    this.$store.dispatch("getUserData");
  },
};
</script>
