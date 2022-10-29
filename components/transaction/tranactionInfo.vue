<template>
  <v-layout>
    <v-container fulid>
      <!-- <div class="filter-desktop">
        <v-flex row style="text-align:center">
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getOrder(1,'')" active>همه</a>
          </v-col>
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getOrder(1,'none')" active>نامشخص</a>
          </v-col>
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getOrder(1,'pending')">درحال آماده سازی</a>
          </v-col>
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getOrder(1,'done')">ارسال شده</a>
          </v-col>
        </v-flex>
      </div> -->
      <div class="d-flex justify-center align-center" style="margin-top: 10px">
        <div class="orders-order">
          <ul>
            <li @click="getOrder(1, '')" :class="{ active: status === '' }">
              <a>همه سفارشات</a>
            </li>
            <li
              @click="getOrder(1, 'none')"
              :class="{ active: status === 'none' }"
            >
              <a>نامشخص</a>
            </li>
            <li
              @click="getOrder(1, 'pending')"
              :class="{ active: status === 'pending' }"
            >
              <a>درحال آماده سازی</a>
            </li>
            <li
              @click="getOrder(1, 'done')"
              :class="{ active: status === 'done' }"
            >
              <a>سفارشات ارسال شده</a>
            </li>
            <li
              @click="getOrder(1, 'problem')"
              :class="{ active: status === 'problem' }"
            >
              <a>سفارشات لغو شده</a>
            </li>
          </ul>
        </div>
      </div>
      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="desserts"
        :items-per-page="15"
      >
        <template v-slot:top> </template>

        <template v-slot:no-data>
          <span>هنوز سفارشی برای شما ثبت نشده است</span>
        </template>

        <template v-slot:item.totalPrice="{ item }">
          <v-icon color="success">trending_up</v-icon>
          <span
            >{{
              toPersianNumber(formatPrice(item.totalPrice + item.postalCost))
            }}
            $</span
          >
        </template>
        <template v-slot:item.postalCost="{ item }">
          <span>{{ toPersianNumber(formatPrice(item.postalCost)) }} $</span>
        </template>

        <template v-slot:item.totalDiscount="{ item }">
          <v-icon color="error">trending_down</v-icon>
          <span
            >{{ toPersianNumber(formatPrice(item.totalDiscount)) }} $</span
          >
        </template>
        <template v-slot:item.startDate="{ item }">
          <span>{{ toPersianNumber(returnDate(item.startDate)) }}</span>
          <span>{{ toPersianNumber(returnTime(item.startDate)) }}</span>
        </template>
        <template v-slot:item.paymentStatus="{ item }">
          <span
            v-if="item.paymentStatus === 'unpaid'"
            style="
              background: #ffd900;
              box-shadow: rgb(255 247 0 / 39%) 0px 6px 20px 0px;
              padding: 4px;
              color: #000;
              border-radius: 8px;
              font-size: 15px;
              font-family: Cinema;
            "
            >پرداخت نشده</span
          >
          <span
            v-if="item.paymentStatus === 'paid'"
            style="
              background: #0ac974;
              box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
              padding: 4px;
              color: #fff;
              border-radius: 8px;
              font-size: 15px;
              font-family: Cinema;
            "
            >پرداخت شد</span
          >
        </template>
        <template v-slot:item.status="{ item }">
          <span
            v-if="item.status === 'none'"
            style="
              background: #eee;
              box-shadow: rgb(255 247 0 / 39%) 0px 6px 20px 0px;
              padding: 4px;
              color: #000;
              border-radius: 8px;
              font-size: 15px;
              font-family: Cinema;
            "
            >نامشخص</span
          >
          <span
            v-if="item.status === 'pending'"
            style="
              background: #ffd900
              box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
              padding: 4px;
              color: #000;
              border-radius: 8px;
              font-size: 15px;
              font-family: Cinema;
            "
            >درحال آماده سازی</span
          >
          <span
            v-if="item.status === 'done'"
            style="
              background: #0ac974;
              box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
              padding: 4px;
              color: #fff;
              border-radius: 8px;
              font-size: 15px;
              font-family: Cinema;
            "
            >سفارش ارسال شد</span
          >
          <span
            v-if="item.status === 'problem'"
            style="
              background: rgb(201 10 10);
              box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
              padding: 4px;
              color: #fff;
              border-radius: 8px;
              font-size: 15px;
              font-family: Cinema;
            "
            >سفارش لغو شد</span
          >
          <span
            v-if="item.status === 'cancel_with_admin'"
            style="
              background: rgb(201 10 10);
              box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
              padding: 4px;
              color: #fff;
              border-radius: 8px;
              font-size: 15px;
              font-family: Cinema;
            "
            >لغو توسط ادمین</span
          >
        </template>
        <template v-slot:item.userId.phoneNumber="{ item }">
          <span>{{ toPersianNumber(0 + item.userId.phoneNumber) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="productInfo(item)" small class="mr-2">more</v-icon>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination
          v-model="page"
          prev-icon="keyboard_arrow_left"
          next-icon="keyboard_arrow_right"
          :length="conutPage"
          @input="next"
          circle
          color="#2b4a83"
        ></v-pagination>
      </div>
      <!-- order details -->
      <v-dialog
        v-model="orderDetail"
        max-width="660"
        style="border-radius: 25px !important"
      >
        <v-card elevation="0" style="padding: 10px" class="back-img">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row justify-space-between align-center">
              <div class="d-flex flex-row justify-center align-center">
                <v-icon class="rounded-icon" color="#00b894">list</v-icon>
                <span
                  style="
                    font-family: vazir-bold;
                    font-size: 18px;
                    color: #2d3436;
                    margin-right: 10px;
                  "
                >
                  جزئیات سفارش
                </span>
              </div>
              <div>
                <v-icon color="#757575" @click="orderDetail = false"
                  >close</v-icon
                >
              </div>
            </div>
            <div>
              <v-container>
                <div
                  style="margin-top: 20px; padding: 10px"
                  class="d-flex flex-row"
                >
                  <span style="font-size: 15px; font-family: vazir-bold">
                    اطلاعات مشتری
                  </span>
                </div>
                <v-data-table
                  style="border: 1px solid #e7e7e7"
                  hide-default-footer
                  :headers="headerUser"
                  :items="userInfo"
                  :items-per-page="15"
                >
                  <template v-slot:item.phoneNumber="{ item }">
                    <span>{{ $toPersianNumber("0" + item.phoneNumber) }}</span>
                  </template>
                </v-data-table>
              </v-container>
              <v-container>
                <div
                  style="margin-top: 20px; padding: 10px"
                  class="d-flex flex-row"
                >
                  <span style="font-size: 15px; font-family: vazir-bold">
                    لیست محصولات
                  </span>
                </div>
                <v-data-table
                  style="border: 1px solid #e7e7e7"
                  hide-default-footer
                  :headers="headerOrders"
                  :items="order.products"
                  :items-per-page="15"
                >
                  <template v-slot:item.price="{ item }">
                    <v-icon color="primary">trending_up</v-icon>
                    <span
                      >{{
                        $toPersianNumber($formatPriceIR(item.price))
                      }}
                      ریال</span
                    >
                  </template>
                  <template v-slot:item.discountPercent="{ item }">
                    <v-icon color="error">trending_down</v-icon>
                    <span>%{{ $toPersianNumber(item.discountPercent) }}</span>
                  </template>
                  <template v-slot:item.quantity="{ item }">
                    <span>{{ $toPersianNumber(item.quantity) }}</span>
                  </template>
                  <template v-slot:item.variationsKey="{ item }">
                    <span v-for="(item, a) in item.variationsKey" :key="a">
                      {{ item.name }}
                    </span>
                  </template>
                </v-data-table>
                <!-- <div
                  class="text-center"
                  style="width: 100%; border-top: 1px solid #e7e7e7"
                >
                  <span
                    >جمع کل :{{
                      toPersianNumber(formatPrice(totalPrice ))
                    }}
                    ریال</span
                  >
                </div> -->
              </v-container>

              <v-container>
                <div
                  style="margin-top: 20px; padding: 10px"
                  class="d-flex flex-row"
                >
                  <span style="font-size: 15px; font-family: vazir-bold">
                    جزئیات حمل و نقل
                  </span>
                </div>
                <v-data-table
                  style="border: 1px solid #e7e7e7"
                  hide-default-footer
                  :headers="headerAddress"
                  :items="addressOrder"
                  :items-per-page="15"
                >
                  <template v-slot:item.postalCode="{ item }">
                    <span>{{ $toPersianNumber(item.postalCode) }}</span>
                  </template>
                </v-data-table>
              </v-container>
              <v-container>
                <div
                  style="margin-top: 20px; padding: 10px"
                  class="d-flex flex-row"
                >
                  <span style="font-size: 15px; font-family: vazir-bold">
                    وضعیت سفارش
                  </span>
                </div>

                <div>
                  <v-chip-group v-model="order.status" column>
                    <v-chip filter-icon="done" filter value="none">
                      نامشخص
                    </v-chip>
                    <v-chip
                      filter-icon="done"
                      filter
                      color="warning"
                      value="pending"
                    >
                      درحال آماده سازی
                    </v-chip>
                    <v-chip
                      filter-icon="done"
                      filter
                      color="success"
                      value="done"
                    >
                      ارسال شده
                    </v-chip>
                    <v-chip
                      filter-icon="done"
                      filter
                      text-color="white"
                      color="#bd2000"
                      value="problem"
                    >
                      مشکل داره
                    </v-chip>
                    <v-chip
                      filter-icon="done"
                      filter
                      color="error"
                      value="cancel_with_admin"
                    >
                      لغو سفارش
                    </v-chip>
                  </v-chip-group>
                
                </div>
                <v-container v-if="order.status==='done'">
                   <div
                  style="margin-top: 20px; padding: 10px"
                  class="d-flex flex-row"
                >
                  <span style="font-size: 15px; font-family: vazir-bold">
                   کد مرسوله پستی
                  </span>
                </div>
                   <v-form ref="TrackingCodeForm" v-model="valid">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="order.postalTrackingCode"
                        label="کد مرسوله پستی"
                        outlined
                        clearable
                        :counter="24"
                        :rules="postalTrakingRules"
                        clear-icon="close"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                   </v-form>
                </v-container>
               
                <div
                  class="d-flex flex-row justify-end"
                  style="margin-top: 20px"
                >
                  <v-btn
                    color="#0ac974"
                    light
                    v-if="!sending"
                    @click="submitStatus()"
                    style="
                      box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
                      color: #fff;
                      font-size: 14px;
                      font-weight: 700;
                      margin: 10px;
                    "
                    >ثبت وضعیت</v-btn
                  >
                  <v-progress-circular
                    v-if="sending"
                    indeterminate
                    color="#0ac974"
                  ></v-progress-circular>
                </div>
              </v-container>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </v-layout>
</template>





<script>
import { url } from "~/static/URL.js";
import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
export default {
  data() {
    return {
      page: 1,
      conutPage: 0,
      sending: false,
      orderDetail: false,
      valid:true,
      status: "",
      postalTrakingRules: [
        (v) => !!v || "کد مرسوله فیلد اجباری است",
        (v) => (v && !isNaN(v)) || "کد مرسوله باید عدد باشد",
      ],
      headers: [
        {
          text: "ایمیل",
          sortable: false,
          align: "center",
          value: "userId.email",
        },
        {
          text: "مبلغ کل",
          sortable: false,
          align: "center",
          value: "totalPrice",
        },
        {
          text: "هزینه پستی",
          sortable: false,
          align: "center",
          value: "postalCost",
        },

        // {
        //   text: " تخفیف کلی",
        //   sortable: false,
        //   align: "center",
        //   value: "totalDiscount",
        // },

        {
          text: "وضعیت پرداخت",
          sortable: false,
          align: "center",
          value: "paymentStatus",
        },
        {
          text: "وضعیت سفارش",
          sortable: false,
          align: "center",
          value: "status",
        },

        {
          text: "زمان ثبت سفارش",
          sortable: false,
          align: "center",
          value: "startDate",
        },
        {
          text: "جزئیات سفارش",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      headerOrders: [
        {
          text: "محصول",
          sortable: false,
          align: "center",
          value: "name",
        },
        {
          text: "تعداد",
          sortable: false,
          align: "center",
          value: "quantity",
        },
        {
          text: "قیمت هر واحد",
          sortable: false,
          align: "center",
          value: "price",
        },
        {
          text: "جزئیات سفارش",
          sortable: false,
          align: "center",
          value: "variationsKey",
        },
      ],
      headerAddress: [
        {
          text: "استان",
          sortable: false,
          align: "center",
          value: "state",
        },
        {
          text: "شهر",
          sortable: false,
          align: "center",
          value: "city",
        },
        {
          text: "آدرس",
          sortable: false,
          align: "center",
          value: "address",
        },
        {
          text: "کدپستی",
          sortable: false,
          align: "center",
          value: "postalCode",
        },
      ],
      headerUser: [
        {
          text: "نام",
          sortable: false,
          align: "center",
          value: "name",
        },
        {
          text: "نام خانوادگی",
          sortable: false,
          align: "center",
          value: "lastname",
        },
        {
          text: "شماره تماس",
          sortable: false,
          align: "center",
          value: "phoneNumber",
        },
      ],
      desserts: [],
      order: [],
      userInfo: [],
      addressOrder: [],
      totalPrice: "",
      latlong: [],
     postalTrackingCode:""
    };
  },

  mounted() {},
  methods: {
    getType(type) {
      if (type && type.key && type.value) {
        switch (type.key) {
          case "size":
            return "سایز محصول: " + type.value;
            break;
          case "color":
            return "رنگ محصول: " + type.value;
            break;
          case "weight":
            return "وزن محصول: " + type.value;
            break;
          default:
            return "محصول ساده";
            break;
        }
      } else {
        return "محصول ساده";
      }
    },
    productInfo(item) {
      this.getProductInfo(item._id);

      // this.order = item;
      // this.addressOrder = [];
      // this.addressOrder.push(item.address);

      // if (this.addressOrder.latitude && this.addressOrder.longitude) {
      //   this.latlong[0] = this.addressOrder.latitude;
      //   this.latlong[1] = this.addressOrder.longitude;
      // }
      this.totalPrice = item.totalPrice;
      this.orderDetail = true;
    },
    async getProductInfo(id) {
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };

        try {
          let resp = await this.$axios.$get(url + `api/users/orders/${id}`, {
            headers,
          });

          if (resp.success) {
            console.log(resp);
            this.addressOrder = [];
            this.addressOrder.push(resp.body.address);
            (this.userInfo = []), this.userInfo.push(resp.body.user);

            if (this.addressOrder.latitude && this.addressOrder.longitude) {
              this.latlong[0] = this.addressOrder.latitude;
              this.latlong[1] = this.addressOrder.longitude;
            }
            this.order = resp.body;
            console.log(resp.body);
          }
        } catch (error) {}
      }
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,

    returnDate(date) {
      if (date) {
        date = new Date(date).toLocaleDateString("fa-IR");
      } else {
        date = "تاریخ ثبت نشده است";
      }

      return date;
    },
    returnTime(date) {
      if (date) {
        date = new Date(date).toLocaleTimeString("fa-IR");
      } else {
        date = "ساعت ثبت نشده است";
      }

      return date;
    },

    next(page) {
      this.getOrder(page, "");
    },

    getOrder(page, status) {
      this.status = status;
      this.pageloading = true;
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      var self = this;

      return self.$axios
        .$get(url + `api/users/orders?page=${page}&status=${status}`, {
          headers,
        })

        .then(function (data) {
          if (data.success) {
            self.desserts = data.body.docs;
            self.conutPage = data.body.totalPages;
            self.page = data.body.page;
          } else {
            self.$notify.error({
              title: "خطا",
              message: ".خطایی وجود دارید لطفا مجددا سعی کنید",
            });
          }
        });
    },
    async submitStatus() {
      this.sending = true;
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
     console.log(this.order);
      let resp = await this.$axios.$post(
        url + `api/users/orders/${this.order._id}/status`,
        this.order,
        { headers }
      );
    console.log(resp);
      if (resp.success) {
        this.$notify.success({
          title: "تایید",
          message: "وضعیت سفارش ثبت گردید ",
        });
      } else {
        this.$notify.error({
          title: "خطا",
          message: ".خطایی وجود دارید لطفا مجددا سعی کنید",
        });
      }
      this.sending = false;
    },
  },
  created() {
    if (process.browser) {
      this.getOrder(this.page, "");
    }
  },
};
</script>



<style scoped>
::-webkit-scrollbar {
  width: 11px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
}

.btn-shared {
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 10px;
  background: #0ac974;
  display: inline-block;
  font-size: 15px;
  width: 236px;
  max-width: 100%;
  padding: 12px 16px;
  margin: 24px auto 16px;
}
</style>