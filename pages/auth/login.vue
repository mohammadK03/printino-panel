<template >
  <div class="d-flex flex-column justify-center align-center">
    <div style="padding: 15px">
      <h3 style="font-family: vazir">سامانه مدیریت  پرینتینو</h3>
      <p
        style="
          font-family: vazir;
          font-size: 13px;
          font-weight: 500;
          padding-top: 5px;
        "
      >
        برای استفاده از خدمات ابتدا وارد حساب خود شوید.
      </p>
      <v-form
        ref="loginform"
        v-model="valid"
        style="padding: 0px"
        lazy-validation
      >
        <v-text-field
          :rules="numberRules"
          style="width: 330px"
          label="نام کاربری"
          v-model="username"
          outlined
        ></v-text-field>
        <v-text-field
          style="width: 330px"
          outlined
          v-model="password"
          :append-icon="show1 ? 'visibility_off' : 'visibility'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          label="رمز عبور"
          color="#000"
          hint="حداقل 4 کارکتر میبایست وارد کنید!"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-form>
      <!-- <div>
          <recaptcha @error="onError" @success="onSuccess" @expired="onExpired" />
      </div>-->
    </div>
    <div style="float: left; padding: 15px">
      <v-btn
        @click="loginAcceptors()"
        v-if="!isloading"
        color="#0ac974"
        light
        rounded
        style="
          box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
        "
        >ورود به سامانه</v-btn
      >
      <!-- <v-btn
        @click="returnHome()"
        v-if="!isloading"
        color="#ffd900"
        light
        rounded
        style="
          box-shadow: rgb(255 247 0 / 39%) 0px 6px 20px 0px;
          color: #000;
          font-size: 14px;
          font-weight: 700;
          font-size: 15px;
          font-family: Cinema;
        "
        >بازگشت به صفحه اصلی</v-btn
      > -->
      <v-progress-circular
        indeterminate
        color="#0ac974"
        v-show="isloading"
      ></v-progress-circular>
    </div>
  </div>
</template>




<style scoped>
</style>


<script>
import { url } from "~/static/URL.js";
export default {
  layout: "auth",
  data() {
    return {
      username: "",
      password: "",
      isloading: false,
      show1: false,
      rules: {
        required: (value) => !!value || "وارد کردن این مقدار الزامی است!",
        min: (v) => v.length >= 4 || "رمز عبور می بایست بیش از 4 کارکتر باشد",
        phone: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "لطفا شماره تماس درست را وارد کنید";
        },
      },
      numberRules: [
        (v) => (v && v.length >= 4) || " نام کاربری حداقل باید 4 کارکتر باشد",
        (v) => !!v || "شماره تماس فیلد اجباری است",
      ],
      valid: true,
    };
  },

  methods: {
    // async loginadmin() {
    //   let token = null;
    //   try {
    //     token = await this.$recaptcha.getResponse();
    //   } catch (e) {}
    //   if (!token) {
    //     await this.$recaptcha.reset();
    //     alert("لطفا تیک من ربات نیستم را بزنید");
    //     return 0;
    //   }
    //   let headers = {
    //     "g-recaptcha-response": token,
    //   };
    //   var self = this;
    //   let data = await this.$axios.$post(
    //     `${url}api/acceptors/auth/login`,
    //     {
    //       username: this.username,
    //       password: this.password,
    //     },
    //     { headers }
    //   );

    //   if (typeof data["token"] === "undefined") {
    //     await this.$recaptcha.reset();
    //     alert("نام کاربری یا رمز عبور اشتباه است");
    //   } else {
    //     if (process.browser) {
    //       localStorage.setItem("adminToken", data["token"]);
    //       localStorage.setItem("adminRefreshToken", data["refreshToken"]);
    //       self.$router.replace("/panel/dashboard");
    //     }
    //   }
    // },
    returnHome() {
      this.$router.replace("/");
    },
    loginAcceptors() {
      if (this.$refs.loginform.validate()) {
        var self = this;
        self.isloading = true;
        this.$axios
          .$post(`${url}api/admins/login`, {
            username: this.username,
            password: this.password,
          })
          .then(function (data) {
            if (data.success) {
              data = data.body;
              self.$notify.success({
                title: "تایید",
                message: "به سامانه فرات خوش آمدید",
              });
              if (typeof data["token"] === "undefined") {
                self.$notify.error({
                  title: "خطا",
                  message: "نام کاربری یا رمز عبور اشتباه است",
                });
              } else {
                if (process.browser) {
                  localStorage.setItem("adminToken", data["token"]);
                  localStorage.setItem(
                    "adminRefreshToken",
                    data["refreshToken"]
                  );
                  self.$router.replace("/panel/dashboard");
                }
              }
            } else {
              self.$notify.error({
                title: "خطا",
                message: "شماره موبایل یا رمز عبور اشتباه است",
              });
            }
            self.isloading = false;
          });
      } else {
        this.$notify.error({
          title: "خطا",
          message: "لطفا تمام فیلد های اجباری را وارد کنید",
        });
      }
    },
  },
};
</script>

<style>
.v-btn__content {
  letter-spacing: normal !important;
}
</style>