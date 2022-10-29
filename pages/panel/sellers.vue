<template>
  <v-app style="background: #eaecef !important">
    <v-container>
      <v-data-table
        style="
          background-color: #fff;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 1px 1px 19px 13px #f1f1f1;
        "
        hide-default-footer
        :headers="headers"
        :items="desserts"
        :items-per-page="15"
        :search="search"
        :loading="loading"
        loading-text="درحال بارگذاری ... لطفا منتظر بمانید..."
      >
        <template v-slot:top>
          <div
            class="
              d-flex
              flex-column flex-sm-row
              justify-space-between
              align-center
            "
            style="padding: 15px"
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
                اسامی تامین کنندگان فرات
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامی تامین کنندگان فرات در این صفحه لیست شده‌اند
              </span>
            </div>

            <div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="جستجوی تامین کننده"
                single-line
                filled
                dense
                rounded
                hide-details
              ></v-text-field>
            </div>
            <div>
              <v-btn rounded dark color="#2b4a83" @click="openDialogSeller()">
                <v-icon>add</v-icon>
                <span style="letter-spacing: normal"
                  >افزودن تامین کننده جدید</span
                >
              </v-btn>
            </div>
          </div>
          <div
            style="height: 1px; width: 100%; background-color: #e0e4e7"
          ></div>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </template>
        <template v-slot:no-data>
          <span>تامین کننده ثبت نشده است</span>
        </template>
        <template v-slot:item.phoneNumber="{ item }">
          <span>{{ toPersianNumber(item.phoneNumber) }}</span>
        </template>
        <template v-slot:item.isActive="{ item }">
          <div v-if="item.isActive == true">فعال</div>

          <span v-if="item.isActive == false">غیرفعال</span>
        </template>
        <template v-slot:item.actions="{ item }">
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
                    :to="'/panel/products/seller/' + item._id"
                  >
                    <v-icon small>visibility</v-icon> نمایش محصولات
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    class="ma-1 remove-space"
                    outlined
                    @click="editDialogSeller(item)"
                  >
                    <v-icon small>visibility</v-icon> اطلاعات تامین کننده
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    color="error"
                    class="ma-1 remove-space"
                    outlined
                    @click="deleteSeller(item)"
                  >
                    <v-icon small>remove_circle</v-icon> حذف تامین کننده
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
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
      <v-dialog
        v-model="addSellerDialog"
        persistent
        max-width="400"
        style="border-radius: 25px !important"
      >
        <v-card elevation="0" style="padding: 10px">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row justify-space-between align-center">
              <div class="d-flex flex-row justify-center align-center">
                <v-icon class="rounded-icon" color="#00b894">add</v-icon>
                <span
                  style="
                    font-family: vazir-bold;
                    font-size: 18px;
                    color: #2d3436;
                    margin-right: 10px;
                  "
                  >اطلاعات تامین کننده
                </span>
              </div>
              <div>
                <v-icon color="#757575" @click="addSellerDialog = false"
                  >close</v-icon
                >
              </div>
            </div>
            <v-form
              ref="sellerForm"
              v-model="valid"
              style="padding: 0px"
              lazy-validation
            >
              <v-col cols="12">
                <v-checkbox
                  indeterminate-icon="indeterminate_check_box"
                  on-icon="check_box"
                  off-icon="check_box_outline_blank"
                  v-model="sellerItem.isActive"
                  label="وضعیت فعال بودن"
                ></v-checkbox>
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="sellerItem.username"
                    outlined
                    shaped
                    label="نام کاربری"
                  ></v-text-field>
                </div>
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="sellerItem.password"
                    outlined
                    shaped
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    @click:append="show1 = !show1"
                    label="رمزعبور"
                    counter
                    :type="show1 ? 'text' : 'password'"
                    class="input-group--focused"
                  ></v-text-field>
                </div>
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="sellerItem.fullName"
                    outlined
                    shaped
                    label="نام و نام خانوادگی"
                  ></v-text-field>
                </div>
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="sellerItem.phoneNumber"
                    outlined
                    shaped
                    type="number"
                    label="شماره تماس"
                    :counter="11"
                  ></v-text-field>
                </div>

                <v-text-field
                  v-model="sellerItem.shopName"
                  outlined
                  shaped
                  label="نام فروشگاه"
                ></v-text-field>

                <!-- <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="sellerItem.shopDetails"
                    outlined
                    shaped
                    label="توضیحات فروشگاه"
                  ></v-text-field>
                </div> -->

                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="sellerItem.address"
                    outlined
                    shaped
                    label="آدرس فروشگاه"
                  ></v-text-field>
                </div>
                <span v-if="edit==true">برند های فروشگاه</span>
                <div
                  v-if="sellerItem.brands&&edit==true"
                  style="
                    background-color: #fafafa;
                    border-radius: 10px;
                    padding: 10px;
                  "
                >
                  <v-chip-group active-class="primary--text" column>
                    <v-chip
                      v-for="brand in sellerItem.brands"
                      :key="brand"
                      color="#510e9a"
                      outlined
                    >
                      <strong>{{ brand }}</strong>
                    </v-chip>
                  </v-chip-group>
                </div>
             
                <span v-if="edit==true">حوزه فعالیت فروشگاه</span>
                <div
                  v-if="sellerItem.categories&&edit==true"
                  style="
                    background-color: #fafafa;
                    border-radius: 10px;
                    padding: 10px;
                  "
                >
                  <v-chip-group active-class="primary--text" column>
                    <v-chip
                      v-for="categorie in sellerItem.categories"
                      :key="categorie"
                      color="#510e9a"
                      outlined
                    >
                      <strong>{{ categorie }}</strong>
                    </v-chip>
                  </v-chip-group>
                </div>
              
                <v-divider></v-divider>
                <div v-if="edit == false" style="margin-top: 10px">
                  <v-btn
                    color="#2b4a83"
                    v-if="!isloading"
                    rounded
                    dark
                    style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                    @click="addNewSeller()"
                  >
                    افزودن تامین کننده</v-btn
                  >
                  <v-progress-circular
                    v-if="isloading"
                    indeterminate
                    color="purple"
                  ></v-progress-circular>
                </div>
                <div v-else style="margin-top: 10px">
                  <v-btn
                    color="#2b4a83"
                    v-if="!isloading"
                    rounded
                    dark
                    style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                    @click="editSeller()"
                  >
                    ثبت تغییرات</v-btn
                  >
                  <v-progress-circular
                    v-if="isloading"
                    indeterminate
                    color="purple"
                  ></v-progress-circular>
                </div>
              </v-col>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
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
      show1: false,
      search: "",
      page: 1,
      conutPage: 0,
      loading: false,
      addSellerDialog: false,
      edit: false,
      valid: true,
      isloading: false,
      sellerItem: {
        username: "",
        password: "",
        fullName: "",
        shopName: "",
        shopDetails: "",
        address: "",
        phoneNumber: "",
      },
      headers: [
        {
          text: "شماره تماس",
          align: "center",
          sortable: false,
          value: "phoneNumber",
        },
        {
          text: "نام و نام خانوادگی",
          align: "center",
          sortable: false,
          value: "fullName",
        },
        {
          text: "نام فروشگاه",
          align: "center",
          sortable: false,
          value: "shopName",
        },
        {
          text: "وضعیت فروشگاه",
          align: "center",
          sortable: false,
          value: "isActive",
        },
        {
          text: "ویرایش",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      desserts: [],
    };
  },
  methods: {
    openDialogSeller() {
      this.sellerItem = {
        username: "",
        password: "",
        fullName: "",
        shopName: "",
        shopDetails: "",
        address: "",
        phoneNumber: "",
      };
      this.addSellerDialog = true;
       this.edit = false;
    },
    editDialogSeller(item) {
      this.edit = true;
      this.sellerItem = item;
      this.addSellerDialog = true;
    },
    deleteSeller(item) {
      const index = this.desserts.indexOf(item);
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      var self = this;
      let id = item._id;
      if (confirm("آیا مطمئن هستید میخواهید این تامین کننده را حذف کنید؟")) {
        this.$axios
          .$delete(url + `api/sellers/${id}`, {
            headers,
          })

          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: "!تامین کننده با موفقیت حذف شد",
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
    toPersianNumber: toPersianNumber,

    next(page) {
      this.getSellers(page);
    },
    async getSellers(page) {
      this.loading = true;
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };

        try {
          let data = await this.$axios.$get(url + "api/sellers?page=" + page, {
            headers,
          });

          if (data) {
            console.log(data.success);
            this.desserts = data.success.docs;
            this.conutPage = data.success.totalPages;
            this.page = data.success.page;
            this.loading = false;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    addNewSeller() {
      if (this.$refs.sellerForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
          .$post(url + "api/sellers", this.sellerItem, {
            headers,
          })
          .then((data) => {
            self.isloading = false;
            console.log(data);
            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "تامین کننده با موفقیت ثبت شد",
              });

              self.addSellerDialog = false;

              self.getSellers(this.page);
            } else if ((data.success = false)) {
              self.$notify.error({
                title: "خطا",
                message: "خطایی وجود دارید لطفا مجددا سعی کنید.",
              });
            }
          });
      } else {
        this.$notify.error({
          title: "خطا",
          message: "لطفا تمام فیلد های اجباری را وارد کنید",
        });
        this.isloading = false;
      }
    },
    editSeller() {
      if (this.$refs.sellerForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
          .$put(url + `api/sellers/${this.sellerItem._id}`, this.sellerItem, {
            headers,
          })
          .then((data) => {
            self.isloading = false;
            console.log(data);
            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "تامین کننده با موفقیت ویرایش شد",
              });

              self.addSellerDialog = false;
              self.edit = false;
              self.getSellers(this.page);
            } else if ((data.success = false)) {
              self.$notify.error({
                title: "خطا",
                message: "خطایی وجود دارید لطفا مجددا سعی کنید.",
              });
            }
          });
      } else {
        this.$notify.error({
          title: "خطا",
          message: "لطفا تمام فیلد های اجباری را وارد کنید",
        });
        this.isloading = false;
      }
    },
  },
  created() {
    if (process.browser) {
      this.getSellers(this.page);
    }
  },
};
</script>


<style>
.accsess {
  background-color: #00bf6f;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}
</style>