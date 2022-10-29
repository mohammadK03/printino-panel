<template>
  <div dir="ltr" class="d-flex justify-center align-center flex-column">
    <v-container style="height: 100%">
      <div class="d-flex justify-end flex-row" style="margin-top: 20px">
        <h3 style="font-family: vazir-bold">تایید کد</h3>
      </div>
      <div style="width: 100%; margin-top: 10px" class="d-flex flex-row">
        <p
          v-if="this.$store.state.acceptorphoneNumber"
          style="text-align: right; font-size: 14px; font-weight: 500"
        >
          کد یک بار مصرف به شماره
          <span>{{
            toPersianNumber(this.$store.state.acceptorphoneNumber)
          }}</span>
          به صورت پیامک ارسال گردید.
          <span class="pointer" @click="changeNumber()">ویرایش شماره</span>
        </p>
      </div>
      <div class="d-flex justify-center align-center" style="margin-top: 10px">
        <v-otp-input
          ref="otpInput"
          input-classes="otp-input"
          separator="-"
          :num-inputs="5"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-complete="handleOnComplete"
        />
      </div>
      <div
        class="d-flex justify-end flex-row"
        style="margin-top: 5px"
        v-if="!resendCode"
      >
        <span
          style="
            font-size: 13px;
            text-align: right;
            font-weight: 500;
            margin-top: 5px;
          "
        >
          تا {{ timeLeft }}
          دیگر امکان ارسال مجدد رمز یک بار مصرف به شماره شما امکان پذیرخواهد بود
        </span>
      </div>
      <div
        class="d-flex justify-space-between align-center"
        style="padding: 15px; margin-top: 10px"
      >
        <div>
          <v-btn
            @click="handleOnComplete()"
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
            >تایید و ادامه</v-btn
          >
          <v-progress-circular
            indeterminate
            color="#0ac974"
            v-show="isloading"
          ></v-progress-circular>
        </div>
        <div v-if="!resendCode" style="width: 100%; padding-left: 20px">
          <v-progress-linear
            style="direction: rtl !important"
            :value="progressLeft"
            color="#0ac974"
          ></v-progress-linear>
        </div>
        <div v-else style="width: 100%; padding-left: 20px">
          <v-btn rounded color="primary" text @click="registerAcceptors()">
            ارسال کد به صورت پیامک</v-btn
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { url } from "~/static/URL.js";
import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
export default {
  layout: "auth",
  data() {
    return {
      isloading: false,
      verifycode: "",
      timeCounterDown: 60,
      countDown: 60,
      resendCode: false,
      timeLeft: "01:00",
      progressLeft: 0,
    };
  },

  methods: {
    changeNumber() {
      this.$router.replace("/auth/forgetpassword");
    },
    toPersianNumber: toPersianNumber,
    handleOnComplete(value) {
      this.verifySms(value);
    },
    countDownTimer() {
      if (this.countDown > 0) {
        let time = this.countDown % this.timeCounterDown;
        this.timeLeft = "00:" + time;
        let progress = (100 * this.countDown) / this.timeCounterDown;

        this.progressLeft = progress;
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.resendCode = true;
      }
    },
    verifySms(value) {
      var self = this;
      let username = this.$store.state.acceptorUsername;
      let verifycode = value;
      self.isloading = true;

      this.$axios
        .$post(
          `${url}api/user/login?role=1`,
          {
            username: username,
            password: verifycode,
          },
          {}
        )
        .then(function (data) {
        
          if (data.success) {
            data = data.body;
            if (typeof data["token"] === "undefined") {
              self.$notify.error({
                title: "خطا",
                message: "کد وارد شده صحیح نمی باشد",
              });
              self.isloading = false;
            } else {
              if (process.browser) {
                localStorage.setItem("adminToken", data["token"]);
                localStorage.setItem("sellerRefreshToken", data["refreshToken"]);
                self.$router.replace("/panel/dashboard");
                self.$notify.success({
                  title: "تایید",
                  message: "به سامانه  فرات خوش آمدید",
                });
              }
            }
          } else {
            self.$notify.error({
              title: "خطا",
              message: "خطایی وجود دارد لطفا مجددا سعی کنید.",
            });
          }
        });
    },
    registerAcceptors() {
      var self = this;

      this.$axios
        .$get(
          `${url}api/user/smsverification?phone=${this.$store.state.acceptorphoneNumber}&role=1`
        )
        .then(function (data) {
       
          if (data.success) {
            let username = data.body.username + "";

            self.$store.commit("setAcceptorUsername", username);

            self.$notify.success({
              title: "تایید",
              message: ".کد یک بار مصرف ارسال شد",
            });
            self.resendCode = false;
            self.countDown = self.timeCounterDown;
            self.countDownTimer();
          } else {
            if (data["message"] === "try_another_minute") {
              self.$notify.error({
                title: "خطا",
                message: "لطفا یک دقیقه بعد تلاش کنید!",
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
    },
  },
  created() {
    this.countDownTimer();
  },
};
</script>


<style>
.pointer {
  cursor: pointer;
  color: #187ff7;
}
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  /* &.error {
    border: 1px solid red !important;
  } */
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>