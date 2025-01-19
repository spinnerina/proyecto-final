<script>
export default {
  name: "App",
  mounted(){
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>

</style>