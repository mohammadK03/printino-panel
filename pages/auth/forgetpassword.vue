<template>
  <div class="d-flex flex-column justify-center align-center">
    <div style="padding: 15px">
      <h3 style="font-family: vazir">فراموشی رمز عبور</h3>
      <p
        style="
          font-family: vazir;
          font-size: 13px;
          font-weight: 500;
          padding-top: 5px;
        "
      >
        شماره تماس خود جهت بازیابی رمز عبور وارد نمایید
      </p>
      <v-form
        ref="registerform"
        v-model="valid"
        style="padding: 0px"
        lazy-validation
      >
        <v-text-field
        :counter="11"
          :rules="numberRules"
          style="width: 330px"
          label="شماره تماس"
          v-model="phoneNumber"
          outlined
        ></v-text-field>
      
      </v-form>
    </div>
    <div style="float: left; padding: 15px">
      <v-btn
        @click="registerAcceptors()"
        v-if="!isloading"
        color="#0ac974"
        light
        rounded
        style="
           box-shadow: rgb(133 0 255 / 39%) 0px 6px 20px 0px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
        "
        >دریافت کد یکبار مصرف</v-btn
      >
      <v-progress-circular
        indeterminate
        color="#0ac974"
        v-show="isloading"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { url } from "~/static/URL.js";

export default {
  layout: "auth",
  data() {
    return {
      isloading: false,
      phoneNumber: "",
      userName: "",
      visitorCode:"",
      numberRules: [
        (v) => (v && v.length == 11) || "شماره تماس باید 11 رقم باشد",
        (v) => (v && !isNaN(v)) || "شماره تماس باید عدد باشد",
        (v) => !!v || "شماره تماس فیلد اجباری است",
      ],
      valid: true,
    };
  },

  methods: {
    registerAcceptors() {
      if (this.$refs.registerform.validate()) {
        var self = this;
        self.isloading = true;
        self.$store.commit("setacceptorphoneNumber", this.phoneNumber);
        this.$axios
          .$get(
            `${url}api/user/smsverification?phone=${this.phoneNumber}&visitorCode=${this.visitorCode}&role=1`
          )
          .then(function (data) {
            if (data.success) {
              let username = data.body.username + "";

              self.$store.commit("setAcceptorUsername", username);

              self.$notify.success({
                title: "تایید",
                message: ".کد یکبار مصرف ارسال شد",
              });
              self.$router.push("smsverification");
            } else {
              self.isloading = false;
              if (data["message"] === "try_another_minute") {
                self.$notify.error({
                  title: "خطا",
                  message: "لطفا چند دقیقه بعد تلاش کنید!",
                });
              } else if (data["message"] === "blocked_12_hours") {
                self.$notify.error({
                  title: "خطا",
                  message: "این شماره به مدت 12 ساعت بلاک شده است!",
                });
              } else {
                self.$notify.error({
                  title: "خطا",
                  message: "مشکلی پیش امده لطفا دوباره تلاش کنید",
                });
              }
            }
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