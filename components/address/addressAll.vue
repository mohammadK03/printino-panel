<template>
  <div>
    <v-dialog v-model="addressDialog" scrollable width="400">
      <div class="d-flex flex-column">
        <div
          style="width: 100%; padding: 10px; background-color: #e7e7e7"
          class="d-flex flex-row align-center justify-space-between"
        >
          <span style="font-size: 18px; margin-right: 10px">
            <v-icon>location_on</v-icon>
            انتخاب آدرس
          </span>
          <v-btn
            @click="addressDialog = false"
            icon
            style="margin-left: 10px; float: left"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <div
          class="d-flex justify-center align-center flex-column"
          style="background: #fafafa; padding: 0px 20px"
        >
          <v-col cols="12">
            <v-card
              @click="selectMap()"
              style="
                border: 1px dashed rgb(40, 116, 240);
                background: transparent;
                padding: 5px;
              "
              elevation="0"
            >
              <div class="d-flex flex-row justify-center align-center">
                <div>
                  <v-icon color="#2874f0">add_circle</v-icon>
                </div>

                <div style="cursor: pointer; color: #2874f0; font-family: vazir-bold">
                  افزودن آدرس
                </div>
              </div>
            </v-card>
          </v-col>
          <div
            style="
              margin-top: 15px;
              max-height: 330px;
              overflow: auto;
              padding-right: 5px;
              overflow-x: hidden;
            "
          >
            <v-col cols="12" v-for="(item, a) in address" :key="a" style="padding: 10px">
              <v-row>
                <v-card
                  max-height="500"
                  elevation="0"
                  class="main-Address-Card"
                  @click="selectAddress(item)"
                >
                  <p class="address-Item">آدرس: {{ item.address }}</p>

                  <p else class="address-Item">
                    <span class="address-Item" v-if="item.postalCode == null">
                      کد پستی: تعریف نشده است
                    </span>
                    <span class="address-Item" v-else>
                      کد پستی: {{ $toPersianNumber(item.postalCode) }}
                    </span>
                  </p>
                </v-card>
              </v-row>
            </v-col>
          </div>
        </div>

        <div
          @click="postOrder()"
          v-if="checkAddress"
          class="d-flex goto-order justify-center align-center"
        >
          <span style="color: #fff">ثبت خرید</span>
        </div>
      </div>
    </v-dialog>
    <addressMap :visible="selectMapDialog" @close="closeMapAddressDialog()" ></addressMap>
  </div>
</template>
<script>
import { url } from "~/static/URL.js";
export default {
  props: ["visible",],
  data() {
    return {
      address: [],
      checkAddress: false,
      selectMapDialog: false,
      addressSendProduct:{},
    };
  },
  computed: {
    addressDialog: {
      get() {
        if (this.visible) {
          this.getAddress();
        }
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.params = "";
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    closeMapAddressDialog(){
        this.selectMapDialog=false;
        this.getAddress();
    },
    async postOrder() {
      let headers = {
        authorization: localStorage.getItem("userToken"),
      };
     
      if (localStorage.getItem("userToken")) {
        let resp = await this.$axios.$post(url + "api/users/orders", this.addressSendProduct, {
          headers,
        });

        if (resp.success && resp.message === "order_added") {
          this.$notify.success({
            title: "تایید",
            message: "سفارش شما با موفقیت ثبت شد",
          });
          let orderId = resp.body.orderId;

           this.$router.push("/orders/" + orderId);
       
        } else if (resp.message === "order_limit_5") {
          this.$notify.error({
            title: "خطا",
            message:
              "شما چند سفارش درحالت انتظار دارید و اکنون نمیتوانید ثبت سفارش داشته باشید.",
          });
        }
      } else {
        this.$notify.error({
          title: "خطا",
          message:
            "مشکلی در فرایند پیش آمده است لطفا وضعیت لاگین اکانت خود را بررسی نمایید",
        });
      }
    },
    selectAddress(item) {
      this.checkAddress = true;
      this.addressSendProduct=item;
   
    },
    selectMap() {
      this.selectMapDialog = true;
    },
    async getAddress() {
      let headers = {
        authorization: localStorage.getItem("userToken"),
      };
      if (localStorage.getItem("userToken")) {
        let resp = await this.$axios.$get(url + "api/users/addresses", {
          headers,
        });

        if (resp.success) {
          this.address = resp.body;
        }
      }
    },
  },
  created() {
    this.getAddress();
  },
};
</script>

<style scoped>
.goto-order {
  width: 100%;
  line-height: 60px;
  border-radius: 12px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  min-height: 60px;
  background-color: #00bf6f;
  color: #fff;
  cursor: pointer;
}
.main-Address-Card {
  padding: 5px;
  margin: 10px;
  margin-top: 5px;
  width: 100%;
  border-radius: 10px;
  border: 3px solid #fff;
}

.main-Address-Card:hover {
  border: 3px solid #0ac974;
  cursor: pointer;
}

.address-Item {
  color: #0b2c6e;
  font-size: 14px;
  font-family: vazir-bold;
  text-align: right;
}
.header-Text-Delete {
  color: #0b2c6e;
  font-size: 14px;
  font-family: vazir-bold;
}
::-webkit-scrollbar {
  width: 11px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
}
</style>
