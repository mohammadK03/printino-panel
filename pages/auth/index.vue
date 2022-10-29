<template>
  <div></div>
</template>

<script>
export default {
  layout: "auth",
  created() {
    if (process.browser) {
      if (localStorage.getItem("adminToken")) {
        this.$router.replace("/panel/dashboard");
      } else {
        this.$router.replace("/auth/login");
      }
    }
  },
};
</script>