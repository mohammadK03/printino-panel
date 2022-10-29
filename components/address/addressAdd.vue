<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="show" max-width="400">
        <v-card>
          <div
            style="width: 100%; padding: 10px; background-color: #e7e7e7"
            class="d-flex flex-row align-center justify-space-between"
          >
            <span style="font-size: 18px; margin-right: 10px">
              <v-icon>location_on</v-icon>
              اضافه کردن آدرس جدید
            </span>
            <v-btn @click="show = false" icon style="margin-left: 10px; float: left">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
          <v-form ref="form" v-model="valid">
            <div style=" padding: 20px" class="d-flex flex-column">
              <v-select
                :rules="[(v) => !!v || 'استان خود را انتخاب کنید']"
                append-icon="keyboard_arrow_down"
                :items="states"
                item-text="name"
                item-value="name"
                v-model="address.state"
                label="استان"
                dense
                outlined
                required
              ></v-select>
              <v-select
                :rules="[(v) => !!v || 'شهر  خود را انتخاب کنید']"
                append-icon="keyboard_arrow_down"
                :items="cities"
                item-text="name"
                item-value="name"
                v-model="address.city"
                label="شهر"
                dense
                outlined
                required
              ></v-select>
              <v-textarea outlined label="آدرس پستی" :value="address.address" required>
              </v-textarea>
              <v-text-field
                :rules="[
                  (v) => !!v || 'کد پستی را وارد کنید',
                  (v) => v.length == 10 || 'کد پستی ده رقمی می باشد',
                ]"
                label="کد پستی"
                v-model="address.postalCode"
                placeholder="کد پستی ده رقمی"
                outlined
                :counter="10"
                dense
                required
              >
              </v-text-field>
              <v-text-field
                label="پلاک"
                v-model="address.homeNumber"
                placeholder="پلاک منزل"
                outlined
                dense
              ></v-text-field>
            </div>
          </v-form>
          <div class=" d-flex align-center bottom-buy">
            <v-btn
              :disabled="!valid"
              color="#00bf6f"
              @click="addAddress()"
              style="
                width: 90%;
                box-shadow: none !important;
                height: 45px;
                border-radius: 20px;
                font-size: 15px;
                color: #fff;
              "
            >
              <v-icon style="margin-left: 10px">location_on</v-icon>
              اضافه کردن آدرس جدید
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { url } from "~/static/URL.js";
export default {
  props: ["visible", "lngLat"],

  data() {
    return {
      address: { city: "", state: "", address: "", postalCode: "", homeNumber: "" },
      valid: false,
      states: [],
      cities: [],
    };
  },
  components: {},
  computed: {
    show: {
      get() {
        if (this.visible) {
          this.getState();
        }
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.selectedAddress = null;
          this.params = "";
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    async getState() {
      this.states = await this.$axios.$get(url+"/json/state.json");
      this.getAddressInfo();
    },
    async getAddressInfo() {
      try {
        let resp = await this.$axios.$get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lon=${this.lngLat[0]}&lat=${this.lngLat[1]}&accept-language=fa`
        );
        let address = resp.address;
      
        if (address.city) {
          let cityArray = address.city.split(" ");
          if (cityArray.length >= 2) {
            this.address.city = cityArray[1];
          } else {
            this.address.city = cityArray[0];
          }
        }

        if (address.province) {
          this.address.state = address.province.split(" ")[1];
        }
        if (address.state) {
          this.address.state = address.state.split(" ")[1];
        }
        let postalAddress = "";

        postalAddress += ` استان ${this.address.state}, `;
        postalAddress += ` شهرستان ${this.address.city}`;

        if (address.village) {
          postalAddress += ` روستای ${address.village}`;
        }

        if (address.road) {
          postalAddress += ` خیابان ${address.road}`;
        }
        this.address.address = postalAddress;
      } catch (error) {
     
      }
    },
    async addAddress() {
      if (process.browser) {
       

        let headers = {
        authorization: localStorage.getItem("userToken"),
        };
        let resp = await this.$axios.$post(url+"api/users/addresses", this.address, {
          headers,
        });

        if (resp.success) {
            this.$notify.success({
              title: "تایید",
              message: "آدرس جدید اضافه شد",
            });
          this.$emit("end");
        }
      }
    },
  },
  watch: {
    "address.state"(val) {
      this.states.forEach((item) => {
        if (item.name === val) {
          this.cities = item.Cities;
        }
      });
    },
  },
  created() {},
};
</script>

<style scoped>
.m-card {
  padding: 15px;
  margin-top: 70px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 3px 4px #ebebeb;
}

.m-card-selected {
  border: 2px solid #00bf6f;
  border-radius: 10px;
}

.bottom-buy {
width: 100%;
  height: 65px;
  background-color: white;

  border-right: 1px solid #dfdfdf;
  box-shadow: 0px -4px 3px 0px #dadada59;
  display: flex;
  justify-content: center;
}
</style>
