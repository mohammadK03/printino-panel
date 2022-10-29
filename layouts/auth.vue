<template >
  <v-app class="bg-login">
    <div class="d-flex justify-center align-center" style="height: 100%">
      <div class="d-flex flex-row" >
          <v-col cols="12" md="5" class="m-card" style="float:right">
            <div class="d-flex flex-column">
              <div class="d-flex flex-row justify-space-between">
                <div>
                  <img src="~/assets/logo.png" style="margin-top:10px;" width="90" />
                </div>
                <!-- <div>
                  <v-btn
                    @click="routePage()"
                    class="ma-2"
                    outlined
                    color="#0ac974"
                    rounded
                    style="letter-spacing: normal; font-weight: bold"
                  >
                    <span v-if="pageIsLogin"> فراموشی رمز عبور</span>
                    <span v-else>ورود</span>
                  </v-btn>
                </div> -->
              </div>
              <div>
                <nuxt />
              </div>
            </div>
          </v-col>
        
      </div>
    </div>
  </v-app>
</template>



<script>
import { url } from "~/static/URL.js";
export default {
  layout: "login",
  data() {
    return {
      username: "",
      pageIsLogin: true,

    
    };
  },
  methods: {
    routePage() {
      if (this.pageIsLogin) {
        this.$router.push("/auth/forgetpassword");
      } else {
        this.$router.push("/auth/login");
      }
      this.pageIsLogin = !this.pageIsLogin;
    },
  },
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

<style scoped>
.m-card {
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  
}
.bg-login{
  background-image:url("../assets/images/background-login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;

}
@media only screen and (min-width: 1000px) {
  .m-card {
    width: 930px;
    box-shadow: 0px 0px 5px 0px #00000014;
  }
}
</style>