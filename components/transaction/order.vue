<template>
  <div>
    <v-container justify-center style="margin-left:3%">
      <v-progress-linear v-if="pageloading==true" indeterminate color="deep-purple accent-4"></v-progress-linear>
       
      <h2 class="_title_sections">
        <span class="_txt" color="headerText">لیست درخواست سفارشات از شما</span>
        <div class="_line"></div>
      </h2>
     
      <div class="filter-desktop">
        <v-flex row style="text-align:center">
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getbyfilter('')" active>همه</a>
          </v-col>
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getbyfilter('none')" active>درانتظارتایید</a>
          </v-col>
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getbyfilter('pending')">در حال ارسال</a>
          </v-col>
          <v-col cols="12" md="3">
            <a class="option-btn" @click="getbyfilter('done')">تایید شده</a>
          </v-col>
        </v-flex>
      </div>
      <v-flex row v-if="orders.length>0" class="card-order-mobile">
        <div style="widht:100%"></div>
        <v-dialog v-model="ditalisdialog" max-width="900px">
          <v-card>
            <v-card-title
              style="background-color:#333;color:#fff;display:flex;justify-content:space-between"
            >
              <span>آدرس درخواست سفارش</span>
              <span>
                <v-icon @click="closeDialog()" color="#fff">close</v-icon>
              </span>
            </v-card-title>
            <div id="map-wrap" style="height: 250px;width:100%;z-index:0">
              <no-ssr>
                <l-map :zoom="14" :center="ordersItem.latlng">
                  <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                  <l-marker style="background-color:red" :lat-lng="ordersItem.latlng"></l-marker>
                </l-map>
              </no-ssr>
            </div>

            <div style="background:gray;color:#fff;text-align:center">
              <v-progress-circular v-if="isloading==true" indeterminate color="purple"></v-progress-circular>
              <v-col cols="12">
                ارسال سفارش به:
                <span>{{address.city}}</span>
                محله:
                <span>{{address.neighbourhood}}</span>
                خیابان:
                <span>{{address.road}}</span>،
                <span>{{address.county}}</span>
              </v-col>
            </div>
            <v-container grid-list-md>
              <v-layout wrap class="section">
                <v-flex xs12>
                  <table style="width:100%;text-align:center">
                    <tr>
                      <th>نام محصول</th>
                      <th>تعداد</th>
                      <th>درصد تخفیف</th>
                      <th>قیمت محصول</th>
                    </tr>
                    <tr
                      style="text-align:center"
                      v-for="product in ordersItem.products"
                      :key="product"
                    >
                      <td>
                        <span>{{ product.name}}</span>
                      </td>
                      <td>
                        <span>{{product.count}}</span>
                      </td>
                      <td>
                        <span>%{{product.discountPercent}}</span>
                      </td>
                      <td>
                        {{formatPrice(product.price)}} ریال
                        <!-- <v-text-field disabled v-model="" type="text" required></v-text-field> -->
                      </td>
                    </tr>
                  </table>
                </v-flex>
              </v-layout>
            </v-container>
            <div style="text-align:right;margin-top:10px;padding:10px;align-items:center;">
              <p>لیست سفارش:</p>
              <v-divider></v-divider>
              <v-chip-group column active-class="primary--text">
                <v-chip v-for="product in ordersItem.products" :key="product">
                  <span>{{ product.name }}</span>
                  <span style="color:red;margin-right:3px;">{{formatPrice(product.price)}}ریال</span>
                  <span>{{product.count}}</span>
                </v-chip>
              </v-chip-group>
            </div>
            <div style="background:#dcd0d0">
              <div
                style="    display: flex;
    justify-content: space-around;
    padding: 4px;
    align-items: center;"
              >
                <div>
                  <span>جمع فاکتور:</span>
                </div>
                <div>
                  <span
                    style="padding:1px;color:#6bb927"
                  >{{formatPrice(ordersItem.totallPayment)}}ریال</span>
                </div>
              </div>
              <div
                style="    display: flex;
    justify-content: space-around;
    padding: 4px;
    align-items: center;"
              >
                <div>
                  <span>مبلغ تخفیف شما:</span>
                </div>
                <div>
                  <span>{{formatPrice(ordersItem.totalDiscount)}}ریال</span>
                </div>
              </div>
            </div>
            <!-- <v-btn>
              اشتراک گذاری
              <v-icon>share</v-icon>
            </v-btn> -->
            <div
              style="    display: flex;
    justify-content: center;
    padding: 4px;
    align-items: center;"
            >
              <div
                class="accessorder"
                v-if="ordersItem.status==='none'"
                @click="changestatus(ordersItem._id,'pending')"
              >
                <span>قبول درخواست</span>
                <v-icon color="success">done</v-icon>
              </div>
              <div
                v-if="ordersItem.status==='pending'"
                class="accessorder"
                @click="changestatustodone(ordersItem._id,'done')"
              >
                <span>ارسال شد</span>
                <v-icon color="success">done</v-icon>
              </div>
              <div
                v-if="ordersItem.status==='none'"
                class="rejectorder"
                @click="cancelorder(ordersItem)"
              >
                <span>رددرخواست</span>
                <v-icon color="error">close</v-icon>
              </div>
            </div>
            <v-flex row align-center style="padding: 5px !important;"></v-flex>
          </v-card>
        </v-dialog>

        <v-flex row>
          <v-col cols="12" md="4" v-for="(item,i) in orders" :key="i">
            <v-card
              max-width="300"
              style="text-align: center;border-top: 5px solid #112d4e;;background: #fff;"
              elevation="2"
            >
              <v-list-item>
                <v-icon color="primery" icon flat @click="openDitalisDialog(item)">visibility</v-icon>

                <v-spacer></v-spacer>
                <div style="margin-top:4px;">
                  <span style="font-size:15px;">{{ returnDate(item.startDate)}}</span>
                  <br />
                  <span>{{returnTime(item.startDate)}}</span>
                </div>
              </v-list-item>

              <v-list-item-content>
                <div>
                  <span>«{{item.user.name}}»</span>
                  <!-- <span v-if="item.user.lastName">«{{item.user.lastName}}»</span> -->
                </div>

                <br />
                <br />
                <div v-if="item.user.phoneNumber">
                  <v-icon>phone_iphone</v-icon>
                  <span>0{{item.user.phoneNumber}}</span>
                </div>
                <div v-else>
                  <v-icon>phonelink_erase</v-icon>
                  <span>شماره خریدار ثبت نشده</span>
                </div>
              </v-list-item-content>
              <div style="text-align:right">
                <div
                  v-if="item&&item.status==='none'"
                  style="display:flex;justify-content:space-between;align-items:center;padding:4px;"
                >
                  <span>وضعیت سفارش:</span>
                  <span
                    style="    background-color: red;
    color: rgb(255, 255, 255);
    border-radius: 10px;
    margin: 10px;
    padding: 2px;
"
                  >درانتظارتایید شما</span>
                </div>
                <div
                  v-if="item&&item.status==='pending'"
                  style="display:flex;justify-content:space-between;align-items:center;padding:4px;"
                >
                  <span>وضعیت سفارش:</span>
                  <span
                    style="background-color:yellow;color:#000;border-radius:10px;margin: 10px;
    padding: 2px;"
                  >در حال ارسال محصول</span>
                </div>
                <div
                  v-if="item&&item.status==='done'"
                  style="display:flex;justify-content:space-between;align-items:center;padding:4px;"
                >
                  <span>وضعیت سفارش:</span>
                  <span
                    style="background-color:green;color:#fff;border-radius:10px;margin: 10px;
    padding: 2px;"
                  >ارسال شد</span>
                </div>
              </div>
            </v-card>

            <v-snackbar v-model="snackbar" :multi-line="multiLine" :color="color">
              {{ text }}
              <v-btn color="deep-purple accent-4" text @click="snackbar = false">بستن</v-btn>
            </v-snackbar>
          </v-col>
        </v-flex>
      </v-flex>
      <div v-else style="width:100%;text-align:center">
        <p>سفارشی برای شما ثبت نشده است!</p>
      </div>
      <div class="text-center">
        <v-pagination
          v-model="page"
          prev-icon="keyboard_arrow_left"
          next-icon="keyboard_arrow_right"
          :length="conutPage"
          @input="next"
        ></v-pagination>
      </div>
    </v-container>

    <v-snackbar v-model="snackbar" :multi-line="multiLine" :color="color">
      {{ text }}
      <v-btn color="#000" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </div>
</template>


<script>

export default {
  data() {
    return {
      switch1: true,
      pageloading: false,
      
      ditalisdialog: false,
      isloading: false,
      URL: url,
      show: false,
      page: 1,
      conutPage: 0,
      snackbar: false,
      multiLine: true,
      status: "",
      address: [],
      addressDetailsItem: {},
      color: "",
      text: "",
      orders: [],
      ordersItem: {}
    };
  },
 
  created() {
    this.getorder();
   
  },
  mounted() {
    if (!this.$cookie.get("adminToken")) {
      this.$router.replace("/login");
    }
  },
  methods: {
   
    returnTime(date) {
      if (date) {
        date = new Date(date).toLocaleTimeString("fa-IR");
      } else {
        date = "ساعت ثبت نشده است";
      }

      return date;
    },
    closeDialog() {
      this.ditalisdialog = false;
    },
    openDitalisDialog(item) {
      this.getLocation(item.latlng);
      this.ordersItem = item;
      this.ditalisdialog = true;
    },
    getLocation: function(item) {
      this.isloading = true;
      let self = this;
      this.$http
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${item[0]}&lon=${item[1]}&accept-language=fa`
        )
        .then(function(data) {
          self.isloading = false;
          self.address = data.data.address;
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    returnDate(date) {
      if (date) {
        date = new Date(date).toLocaleDateString("fa-IR");
      } else {
        date = "تاریخ ثبت نشده است";
      }

      return date;
    },

    next(page) {
      this.getorder(page);
    },
    getallorder() {
      this.getorder(1);
    },
    getorder(page) {
      if (process.browser) {
        let headers = {
          authorization: this.$cookie.get("adminToken")
        };
        this.pageloading = true;
        let self = this;
        let routeUrl = "";

        if (this.status === "") {
          routeUrl = `/api/shop/order?page=${page}`;
        } else {
          routeUrl = `/api/shop/order?page=${page}&status=${this.status}`;
        }
        this.$http.get(url + routeUrl, { headers }).then(resp => {
         
          if (resp) {
            self.pageloading = false;
            self.orders = resp.data.body.docs;
            self.page = resp.data.body.page;
            self.conutPage = resp.data.body.totalPages;
          } else {
            self.snackbar = true;
            self.color = "error";
            self.text = "مشکلی پیش آمده لطفا مجددا تلاش کنید.!";
          }
        });
      }
    },
    getbyfilter(val) {
      this.status = val;
      this.getorder(1);
    },
    cancelorder(item) {
      const index = this.orders.indexOf(item);
      if (process.browser) {
        let headers = {
          authorization: this.$cookie.get("adminToken")
        };
       
        let self = this;
        if (confirm("آیا مطمئن هستید که میخواهید این سفارش را لغو کنید؟")) {
          this.$http
            .delete(url + `/api/shop/order?orderid=${item._id}`, { headers })
            .then(resp => {
              if (
                resp.data.success &&
                resp.data.message === "order_is_cancel_from_seller"
              ) {
                self.orders.splice(index, 1);
                self.ditalisdialog = false;
                self.snackbar = true;
                self.color = "success";
                self.text = "درخواست سفارش لغو شد.";
                self.getorder(1);
              } else {
                self.snackbar = true;
                self.color = "error";
                self.text = "مشکلی پیش آمده لطفا مجددا تلاش کنید.!";
              }
            });
        }
      }
    },
    changestatus(id, val) {
      let headers = {
        authorization: this.$cookie.get("adminToken")
      };
      let self = this;

      if (confirm("آیا مطمئن هستید که میخواهید این سفارش را قبول کنید؟")) {
        this.$http
          .put(
            url + `api/users/orders?status=${val}&orderid=${id}`,
            {},
            {
              headers
            }
          )
          .then(resp => {
        
            if (resp.data.success && resp.data.message === "status_updated") {
              self.ditalisdialog = false;
              self.getorder(1);
              self.snackbar = true;
              self.color = "success";
              self.text = "درخواست سفارش، توسط شما پذیرفته شد.";
            } else {
              self.snackbar = true;
              self.color = "error";
              self.text = "مشکلی پیش آمده لطفا مجددا تلاش کنید.!";
            }
          });
      }
    },
 
   
    changestatustodone(id, val) {
      let headers = {
        authorization: this.$cookie.get("adminToken")
      };
      let self = this;

      if (confirm("آیا مطمئن هستید که این سفارش را ارسال کردید؟")) {
        this.$http
          .put(
            url + `api/users/orders?status=${val}&orderid=${id}`,
            {},
            {
              headers
            }
          )
          .then(resp => {
         
            if (resp.data.success && resp.data.message === "status_updated") {
              self.ditalisdialog = false;
              self.getorder(1);
              self.snackbar = true;
              self.color = "success";
              self.text = " سفارش، توسط شما ارسال شد.";
            } else {
              self.snackbar = true;
              self.color = "error";
              self.text = "مشکلی پیش آمده لطفا مجددا تلاش کنید.!";
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.filter-desktop {
  width: 100%;
  border-radius: 50px;
  border: 1px solid black;
}
._title_sections {
  font-size: 28px;
  color: #000511;
  position: relative;
  text-align: center;
  margin: 30px auto;
  z-index: 2;
}
._title_sections ._txt {
  background: #fafafa;
  padding: 0 40px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 20px;
}
._title_sections ._line {
  position: absolute;
  right: 0;
  left: 0;
  height: 1px;
  background: #b2bac3;
  top: 50%;
  z-index: -1;
  margin-right: 40px;
  margin-left: 40px;
}

.option-btn:hover {
  background-color: #3f59c0;
  color: #fff !important;
  padding: 4px;
  border-radius: 50px;
}
.accessorder {
  background: #112d4e;
  color: #fff;
  border-radius: 50px;
  padding: 4px;
  cursor: pointer;
}
.rejectorder {
  margin-right: 20px;
  cursor: pointer;
}
table,
td,
th {
  border: 1px solid #ddd;
  padding-left: 15px;
  padding-right: 15px;
}

table {
  border-collapse: collapse;
}
.section {
  border-radius: 20px;
  margin: 30px;
  padding: 30px;
}
@media screen and (max-width: 490px) {
  ._title_sections ._txt {
    padding: 0;
    font-size: 20px;
  }
  ._title_sections {
    margin: 0;
  }
  .card-order-mobile {
    text-align: center;
    justify-content: flex-end;
  }
  .filter-desktop {
    display: flex;
    justify-content: flex-end;
    border-radius: 0px;
    border: 0;
  }
}
</style>

