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
                اسامی تایید کنندگان (امین) فرات
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامی تایید کنندگان فرات در این صفحه لیست شده‌اند
              </span>
            </div>

            <div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="جستجوی تایید کننده"
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
                <span style="letter-spacing: normal">افزودن تایید کننده جدید</span>
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
          <span>تایید کننده ثبت نشده است</span>
        </template>
        <template v-slot:item.createdAt="{ item }">
          <span>{{ toPersianNumber(returnDate(item.createdAt)) }}</span>
        </template>
      
       
        <template v-slot:item.actions="{ item }">
          <v-menu top offset-x>
            <template v-slot:activator="{ on }">
              <v-icon color="silver" v-on="on">apps</v-icon>
            </template>

            <v-list>
              <v-list-item>
                
                <div>
                  <v-btn class="ma-1 remove-space" outlined @click="editDialogAmins(item)">
                    <v-icon small>visibility</v-icon> اطلاعات تایید کننده
                  </v-btn>
                </div>
                <div>
                  <v-btn color="error" class="ma-1 remove-space" outlined @click="deleteAmins(item)">
                    <v-icon small>remove_circle</v-icon> حذف تایید کننده
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
      <!-- <div class="text-xs-center pt-2">
        <v-pagination
          v-model="page"
          prev-icon="keyboard_arrow_left"
          next-icon="keyboard_arrow_right"
          :length="conutPage"
          @input="next"
          circle
          color="#2b4a83"
        ></v-pagination>
      </div> -->
      <v-dialog
        v-model="addAminDialog"
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
                  >اطلاعات تایید کننده
                </span>
              </div>
              <div>
                <v-icon color="#757575" @click="addAminDialog = false"
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
               
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="aminItems.username"
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
                    v-model="aminItems.password"
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
                    v-model="aminItems.fullName"
                    outlined
                    shaped
                    label="نام و نام خانوادگی"
                  ></v-text-field>
                </div>
              
                
               
                <v-divider></v-divider>
                <div v-if="edit == false" style="margin-top: 10px">
                  <v-btn
                    color="#2b4a83"
                    v-if="!isloading"
                    rounded
                    dark
                    style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                    @click="addNewAmin()"
                  >
                    افزودن تایید کننده</v-btn
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
                   light
                    style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                   disabled
                  >
                  <!--  @click="editAmin()" -->
                    ویرایش تایید کننده</v-btn
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
      addAminDialog: false,
      edit: false,
      valid:true,
      isloading:false,
      aminItems: {
        username: "",
        password: "",
        fullName: "",
     
      },
      headers: [
       
        {
          text: "نام و نام خانوادگی(امین)",
          align: "center",
          sortable: false,
          value: "fullName",
        },
         {
          text: "نام کاربری",
          align: "center",
          sortable: false,
          value: "username",
        },
        {
          text: "تاریخ ثبت نام",
          align: "center",
          sortable: false,
          value: "createdAt",
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
     
       returnDate(date) {
      if (date) {
        date = new Date(date).toLocaleDateString("fa-IR");
      } else {
        date = "تاریخ ثبت نشده است";
      }

      return date;
    },
    openDialogSeller() {
       this.edit = false;
      this.aminItems = {
        username: "",
        password: "",
        fullName: "",
       
      };
      this.addAminDialog = true;
    },
    editDialogAmins(item) {
        this.edit = true;
      this.aminItems = item;
      this.addAminDialog = true;
    
    },
    deleteAmins(item){
           const index = this.desserts.indexOf(item);
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      var self = this;
      let id = item._id;
      if (confirm("آیا مطمئن هستید میخواهید این تایید کننده را حذف کنید؟")) {
        this.$axios
          .$delete(url + `api/confirmers/${id}`, {
            headers,
          })

          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: "!تایید کننده با موفقیت حذف شد",
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
      this.getAmins(page);
    },
    async getAmins(page) {
      this.loading = true;
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };

        try {
          let data = await this.$axios.$get(url + "api/confirmers?page=" + page, {
            headers,
          });

          console.log(data);
          if (data) {
            this.desserts = data.body;
            this.conutPage = data.success.totalPages;
            this.page = data.success.page;
            this.loading = false;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    addNewAmin(){
            if (this.$refs.sellerForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
          .$post(url + "api/confirmers", this.aminItems, {
            headers,
          })
          .then((data) => {
            self.isloading = false;
              console.log(data);
            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "تایید کننده با موفقیت ثبت شد",
              });

              self.addAminDialog = false;
              
              self.getAmins(this.page);
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
    editAmin(){
            if (this.$refs.sellerForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
              .$put(url + `api/confirmers/${this.aminItems._id}`, this.aminItems, {
            headers,
          })
          .then((data) => {
            self.isloading = false;
              console.log(data);
            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "تایید کننده با موفقیت ویرایش شد",
              });

              self.addAminDialog = false;
              self.edit=false;
              self.getAmins(this.page);
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
      this.getAmins(this.page);
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