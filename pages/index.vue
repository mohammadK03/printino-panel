<template>
  <v-app>

  </v-app>
</template>

<script>
import { url } from "~/static/URL.js";

export default {


  layout: "default",
 
  data() {
    return {
    
    };
  },
  created(){
    if (process.browser) {
      if (localStorage.getItem("adminToken")) {
        this.$router.replace("/panel/dashboard");
      } else {
        this.$router.replace("/auth/login");
      }
    }
  }
};
</script>
