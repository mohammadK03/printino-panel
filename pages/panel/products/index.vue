<template>
  <v-app style="background: #eaecef !important">
    <v-container>
      <v-data-table
        style="
          border-radius: 5px;
          box-shadow: 0 4px 8px 0 rgba(19, 37, 71, 0.1);
        "
        hide-default-footer
        :headers="headers"
        :items="desserts"
        :items-per-page="30"
        :search="search"
        :loading="isloading"
        loading-text="درحال بارگذاری... لطفا منتظر بمانید!"
      >
        <template v-slot:top>
         <div
            class="d-flex flex-column flex-sm-row justify-space-between align-center"
            style="padding: 15px;"
          >
            <div class="d-flex flex-column">
              <h1
                style="
                  font-size: 18px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
              >
                محصولات فروشگاها
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامی ‌محصولات سایت دراین صفحه نمایش داده می‌شود
              </span>
            </div>

            <div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="جستجوی محصول"
                single-line
                filled
                dense
                rounded
                hide-details
              ></v-text-field>
            </div>
            <div>
              <v-btn
                rounded
                dark
                color="#2b4a83"
                :to="'/panel/create-product/'"
              >
                <v-icon>add</v-icon>
                <span style="letter-spacing: normal">افزودن محصول جدید</span>
              </v-btn>
            </div>
          </div>
          <div
            style="height: 1px; width: 100%; background-color: #e0e4e7"
          ></div>
          <div
            class="d-flex justify-center align-center"
            style="margin-top: 10px"
          >
            <div class="orders-order">
              <ul>
                <li
                  @click="getProducts(1, '')"
                  :class="{ active: isActive === '' }"
                >
                  <a>همه محصولات</a>
                </li>
                <li
                  @click="getProducts(1, 'true')"
                  :class="{ active: isActive === 'true' }"
                >
                  <a>تایید شده</a>
                </li>
                <li
                  @click="getProducts(1, 'false')"
                  :class="{ active: isActive === 'false' }"
                >
                  <a>تایید نشده</a>
                </li>
              </ul>
            </div>
          </div>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </template>
        <template v-slot:item.actions="{ item }">
          <!-- <router-link :to="'/panel/copons/' + item._id">
            <v-icon @click="$router.push(item)" small class="mr-2"
              >card_giftcard</v-icon
            >
          </router-link> -->

          <v-menu top offset-x>
            <template v-slot:activator="{ on }">
              <v-icon color="silver" v-on="on">apps</v-icon>
            </template>

            <v-list>
              <v-list-item>
                <div>
                  <v-btn
                    class="ma-1 remove-space"
                    outlined
                    :to="'/panel/products/Inventory/' + item.slug"
                  >
                    <v-icon small>add</v-icon> افزودن متغییر
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    class="ma-1 remove-space"
                    outlined
                    :to="'/panel/products/' + item.slug"
                  >
                    <v-icon small>edit</v-icon> ویرایش محصول
                  </v-btn>
                </div>

                <div>
                  <v-btn
                    color="error"
                    class="ma-1 remove-space"
                    outlined
                    @click="deleteProduct(item)"
                  >
                    <v-icon small>delete</v-icon>حذف محصول
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:no-data>
          <span>هنوز محصولی اضافه نشده</span>
        </template>
        <template v-slot:item.images="{ item }">
          <div v-if="item.images[0]" style="padding: 5px">
            <img
              v-if="item.images[0]"
              width="70"
              style="border-radius: 8px"
              :src="URL + item.images[0].url + '?width=200'"
            />
          </div>
        </template>
        <template v-slot:item.discountPercent="{ item }">
          <span>{{ toPersianNumber(item.discountPercent) }} %</span>
        </template>
        <template v-slot:item.price="{ item }">
          <span>{{ toPersianNumber(formatPrice(item.price)) }} ریال</span>
        </template>
        <template v-slot:item.isActive="{ item }">
          <span v-if="item.isActive == true" class="status-true"
            >تایید شده</span
          >
          <span v-if="item.isActive == false" class="status-false"
            >تایید نشده</span
          >
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
    </v-container>
  </v-app>
</template>

<script>
import { url } from "~/static/URL.js";
import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
export default {
  layout: "panel",
  data() {
    return {
      page: 1,
      conutPage: 0,
      search: "",
      isActive: "",
      URL: url,
      editDialog: false,
      isloading: false,

      userItem: {
        name: "",
        lastname: "",
        nationalCard: "",
        address: "",
        phoneNumber: "",
      },
      headers: [
        {
          text: "تصویر محصول",
          align: "center",
          sortable: false,
          value: "images",
        },
        {
          text: "نام محصول",
          align: "center",
          sortable: false,
          value: "name.fa",
        },

        {
          text: "قیمت محصول",
          value: "price",
          sortable: false,
          align: "center",
        },
        {
          text: "درصد تخفیف",
          value: "discountPercent",
          sortable: false,
          align: "center",
        },
        {
          text: "وضعیت محصول",
          value: "isActive",
          sortable: false,
          align: "center",
        },
        { text: "ویرایش", value: "actions", sortable: false, align: "center" },
      ],
      desserts: [],
      valid: true,
      phoneNumberRules: [
        (v) => (v && v.length == 11) || "شماره تماس باید 11 رقم باشد",
        (v) => (v && !isNaN(v)) || "شماره تماس باید عدد باشد",
        (v) => !!v || "شماره تماس فیلد اجباری است",
      ],
      NameRules: [
        (v) => (v && v.length <= 20) || "نام باید کمتر از 20 نویسه باشد",
        (v) => !!v || "نام کاربر فیلد اجباری است",
      ],
      LastNameRules: [
        (v) =>
          (v && v.length <= 20) || "نام خانوادگی  باید کمتر از 20 نویسه باشد",
        (v) => !!v || "نام خانوادگی فیلد اجباری است",
      ],
      NationalRules: [(v) => !!v || "کد ملی  فیلد اجباری است"],
      AddressRules: [(v) => !!v || "آدرس  فیلد اجباری است"],
    };
  },
  methods: {
    next(page) {
      this.getProducts(page, "");
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,

    deleteProduct(item) {
      const index = this.desserts.indexOf(item);
      let headers = {};
      if (process.browser) {
        headers = {
          authorization: localStorage.getItem("adminToken"),
        };
      }
      var self = this;
      let id = item._id;
      if (confirm("آیا مطمئن هستید میخواهید این محصول را حذف کنید؟")) {
        this.$axios
          .$delete(url + "api/products/" + id, {
            headers,
          })
          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: ".محصول با موفقیت حذف شد",
              });
              self.desserts.splice(index, 1);
            } else {
              self.$notify.error({
                title: "خطا",
                message: ".خطایی وجود دارید لطفا مجددا سعی کنید",
              });
            }
          });
      }
    },

    async getProducts(page, isActive) {
      this.isActive = isActive;
      console.log(this.isActive);
      console.log(url + `api/products?page=${page}&isactive=${isActive}`);
      this.isloading = true;
      let headers = {};
      if (process.browser) {
        headers = {
          authorization: localStorage.getItem("adminToken"),
        };
      }
      try {
        let data = await this.$axios.$get(
          url + `api/products?page=${page}&isActive=${isActive}`,
          {
            headers,
          }
        );
        console.log(data);
        this.isloading = false;
        this.desserts = data.docs;
        this.conutPage = data.totalPages;
        this.page = data.page;
      } catch (error) {}
    },
  },
  created() {
    this.getProducts(this.page, "");
  },
};
</script>

<style scoped>
.rounded-icon {
  background: rgba(0, 184, 148, 0.15);
  padding: 5px;
  border-radius: 50%;
}
.padding-4 {
  padding: 4px;
}
.remove-space {
  letter-spacing: normal;
}
.status-false {
  background: #eee;
  box-shadow: rgb(210 210 203 / 39%) 0px 6px 20px 0px;
  padding: 4px;
  color: #000;
  border-radius: 8px;
  font-size: 15px;
  font-family: Cinema;
}
.status-true {
  background: #0ac974;
  box-shadow: rgb(0 255 125 / 39%) 0px 6px 20px 0px;
  padding: 4px;
  color: #fff;
  border-radius: 8px;
  font-size: 15px;
  font-family: Cinema;
}
</style>
