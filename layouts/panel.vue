<template>
  <v-app>
    <v-card :elevation="0">
      <v-app-bar
        fixed
        :elevation="0"
        style="background: #fff"
        app
        :clipped-left="clipped"
      >
        <v-icon class="hidden-md-and-down" @click="drawer = !drawer" light large
          >menu</v-icon
        >
        <v-icon class="hidden-lg-and-up" @click="drawer2 = !drawer2" light large
          >menu</v-icon
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="menu = !menu">
          <v-icon light color="#000" large>person</v-icon>
        </v-btn>
        <div>
          <v-menu
            style="margin-right: 40px"
            v-model="menu"
            absolute
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <v-card style="padding: 10px">
              <div class="d-flex justify-center align-center flex-column">
                <span class="des-exit-auto"
                  >زمان باقی مانده تا خروج خودکار:</span
                >

                <span
                  style="font-family: vazir; font-size: 20px; margin-top: 10px"
                >
                  {{ $toPersianNumber(jwtExpireTime) }}</span
                >
              </div>

              <v-divider></v-divider>

              <v-spacer></v-spacer>
              <v-btn
                color="#ffe53b"
                light
                rounded
                style="
                  box-shadow: 0 6px 20px 0 rgba(255, 237, 0, 0.39);
                  color: #000;
                  font-size: 13px;
                  font-weight: 700;
                "
                >تنظیمات حساب</v-btn
              >
              <v-btn
                rounded
                style="padding: 10px; margin: 10px"
                color="primary"
                text
                @click="exit()"
              >
                <v-icon>power_settings_new</v-icon>
                <span>خروج</span>
              </v-btn>
            </v-card>
          </v-menu>
        </div>
      </v-app-bar>
      <v-main>
        <v-container fluid style="margin: 0px; padding: 0px">
          <nuxt :key="$route.fullPath" />
        </v-container>
      </v-main>
      <v-navigation-drawer
        class="hidden-md-and-down"
        :mini-variant.sync="drawer"
        enable-resize-watcher
        right
        app
        style="
          top: 0 !important;
          bottom: 0 !important;
          max-height: none;
          background: #fff;
        "
      >
        <div v-if="!drawer">
          <div class="right-nav-top">
            <img src="~/assets/profile.png" width="60" alt />

            <p
              style="
                font-size: 20px;
                padding-top: 7px;
                font-family: cinema;
                color: #fff;
              "
            >
              مدیر فرات خوش آمدید!
            </p>
          </div>
        </div>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="{ path: item.link }"
          style="text-decoration: none"
        >
          <span class="material-icons">
            {{ item.icon }}
          </span>
          <v-list-item-content>
            <v-list-item-title>
              <span style="color: #424242; font-size: 15px; margin-right: 15px">
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-model="drawer2"
        enable-resize-watcher
        right
        app
        class="hidden-lg-and-up"
        style="
          top: 0 !important;
          bottom: 0 !important;
          max-height: none;
          background: #fff;
        "
      >
        <div v-if="!drawer">
                   <div class="right-nav-top">
            <img src="~/assets/profile.png" width="60" alt />

            <p
              style="
                font-size: 20px;
                padding-top: 7px;
                font-family: cinema;
                color: #fff;
              "
            >
              مدیر فرات خوش آمدید!
            </p>
          </div>
         
        </div>

      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="{ path: item.link }"
          style="text-decoration: none"
        >
          <span class="material-icons">
            {{ item.icon }}
          </span>
          <v-list-item-content>
            <v-list-item-title>
              <span style="color: #424242; font-size: 15px; margin-right: 15px">
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>

<script>
import { url } from "~/static/URL.js";
import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
import { parseJwt } from "~/static/parseJwt.js";
import { check } from "~/static/account.js";
export default {
  data() {
    return {
      jwtExpireTime: 0,
      URL: url,
      menu: false,
      clipped: false,
      drawer: false,
      drawer2: false,
      valid: true,
      isloading: false,
      show1: false,
      rules: {
        required: (value) => !!value || "وارد کردن این مقدار الزامی است!",

        phone: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "لطفا شماره تماس درست را وارد کنید";
        },
      },
      mask: "####-####-####-####",

      items: [
        {
          title: "پیشخوان",
          //   src: require("~/assets/dashboard.svg"),
          icon: "space_dashboard",
          link: "/panel/dashboard",
        },
        {
          title: "دسته بندی",
          //   src: require("~/assets/category.svg"),
          icon: "category",
          link: "/panel/category",
        },
        {
          title: "برندها",
          //   src: require("~/assets/brand-identity.svg"),
          icon: "tag",
          link: "/panel/brands",
        },
        {
          title: "محصولات",
          //   src: require("~/assets/box.svg"),
          icon: "add_box",
          link: "/panel/products",
        },
        {
          title: " نظرات",
          //   src: require("~/assets/speech-bubble.svg"),
          icon: "question_answer",
          link: "/panel/comments",
        },
        {
          title: " تامین کنندگان",
          //   src: require("~/assets/user-mobile.svg"),
          icon: "people",
          link: "/panel/sellers",
        },
          {
          title: " تایید کنندگان",
          //   src: require("~/assets/user-mobile.svg"),
          icon: "safety_divider",
          link: "/panel/amin",
        },
        {
          title: "سفارشات",
          //   src: require("~/assets/shopping-bag.svg"),
          icon: "pie_chart",
          link: "/panel/transaction",
        },
        {
          title: "گالری تصاویر",
          //   src: require("~/assets/dashboard.svg"),
          icon: "collections",
          link: "/panel/gallery",
        },
        {
          title: "ویژگی ها",
          //   src: require("~/assets/box.svg"),
          icon: "edit_attributes",
          link: "/panel/properties",
        },
        {
          title: "صفحات",
          //   src: require("~/assets/dashboard.svg"),
          icon: "layers",
          link: "/panel/pages",
        },
      ],
    };
  },
  methods: {
    parseJwt: parseJwt,
    check: check,
    jwtGetExpireDate: function () {
      this.intervalid1 = setInterval(
        function () {
          let userInfo = this.$store.state.userInfo;
          if (userInfo && userInfo.exp) {
            let secTime = userInfo.exp - parseInt(Date.now() / 1000);
            if (secTime < 1) {
              this.exit();
            }
            var date = new Date(0);
            date.setSeconds(secTime);
            var timeString = date.toISOString().substr(11, 8);
            this.jwtExpireTime = timeString;
          }
        }.bind(this),
        1000
      );
    },
    checkMenuPermission() {
      let items = [];
      for (var a = 0; a < this.items.length; a++) {
        if (this.check(this.$store.state.userInfo, this.items[a].permission)) {
          items.push(this.items[a]);
        }
      }
      this.items = items;
      this.jwtGetExpireDate();
    },
    formatPrice: formatPrice,
    toPersianNumber: toPersianNumber,
    exit() {
      if (process.browser) {
        localStorage.removeItem("adminToken");

        this.$router.replace("/auth/login");
      }
    },
    hasItem: function (items, item) {
      let itemExist = false;
      for (var a = 0; a < items.length; a++) {
        if (items[a].title === item.title) {
          itemExist = true;

          break;
        }
      }
      return itemExist;
    },
    cleanSource(source) {
      return JSON.parse(JSON.stringify(source));
    },

    // gotoprofile() {
    //     this.$router.replace("/panel/profile");
    // },
  },

  created() {
    if (process.browser) {
      let token = localStorage.getItem("adminToken");
      this.$store.commit("setUserInfo", this.parseJwt(token));
    } else {
      this.$router.replace("/login");
    }
    this.checkMenuPermission();
  },
};
</script>

<style scoped>
.des-exit-auto {
  background-color: #f4f4f4;

  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.right-nav-top {
  background-image: linear-gradient(
    -135deg,
    #21254e,
    #232c58 19%,
    #232c58 0,
    #232c58 0,
    #232d5a 23%,
    #232d5a 0,
    #24305d 40%,
    #24305d 0,
    #24305d 0,
    #2b4a83 87%
  );
  text-align: center;
  position: relative;
  top: -33px;
  width: 140%;
  height: 205px;
  margin-right: -20%;
  margin-bottom: -50px;
  padding-top: 65px;
  border-radius: 700px/251px;
  margin-bottom: 3px;
}

.active_list .v-list-group .v-list-item--active {
  color: #1a242d !important;
}
.v-list-item--link:before {
  /* background-color: #f4f4f4!important; */
  /* color: #333 !important;
  padding: 20px;
  background-color: #1a242d;

  width: 100%;
  transition: 0.4s;
  color: #424242;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px 0; */
}
.v-list-item--active {
  background-color: #f4f4f4 !important;
  color: #333 !important;
  margin: 5px 0;
}
.v-list-group {
  padding: 0;
  transition: 0s !important;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
}
.v-list-item {
  width: 100%;
  transition: 0.4s;
  color: #424242;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px 0;
}
.v-list-item--link::after {
}
</style>
