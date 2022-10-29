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
        :items-per-page="500"
        :search="search"
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
                ویژگی محصولات
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامی ویژگی محصولات شما دراین صفحه نمایش داده می‌شود
              </span>
            </div>
            <div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="جستجوی ویژگی"
                single-line
                filled
                dense
                rounded
                hide-details
              ></v-text-field>
            </div>
            <div>
              <v-btn rounded dark color="#2b4a83" @click="addDialogparent()">
                <v-icon>add</v-icon>
                <span style="letter-spacing: normal">افزودن ویژگی جدید</span>
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
                  @click="properties('ar')"
                  :class="{ active: status === 'ar' }"
                >
                  <a>عربی</a>
                </li>
                <li
                  @click="properties('en')"
                  :class="{ active: status === 'en' }"
                >
                  <a>انگلیسی</a>
                </li>
                <li
                  @click="properties('fa')"
                  :class="{ active: status === 'fa' }"
                >
                  <a>فارسی</a>
                </li>
              </ul>
            </div>
          </div>
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
                  color="error"
                    class="ma-1 remove-space"
                    outlined
                    @click="deleteProperty(item)"
                  >
                    <v-icon small>delete</v-icon>حذف ویژگی
                  </v-btn>
                </div>
                <!-- <div>
                  <v-btn
                    @click="editProperty(item)"
                    class="ma-1 remove-space"
                    outlined
                  >
                    <v-icon small>edit</v-icon> ویرایش ویژگی
                  </v-btn>
                </div> -->

                
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:no-data>
          <span>هنوز ویژگی اضافه نشده</span>
        </template>
        <template v-slot:item.image="{ item }">
          <div v-if="item.image" style="padding: 5px">
            <img
              width="90"
              style="border-radius: 8px"
              :src="URL + item.image.url"
            />
          </div>
        </template>
        <template v-slot:item.discountPercent="{ item }">
          <span>{{ toPersianNumber(item.discountPercent) }} %</span>
        </template>
        <template v-slot:item.price="{ item }">
          <span>{{ toPersianNumber(formatPrice(item.price)) }} ریال</span>
        </template>
      </v-data-table>
      <v-dialog
        v-model="addDialog"
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
                  >نام ویژگی</span
                >
              </div>
              <div>
                <v-icon color="#757575" @click="closedialog()">close</v-icon>
              </div>
            </div>
            <v-form
              ref="propertyForm"
              v-model="valid"
              style="padding: 0px"
              lazy-validation
            >
               <v-col cols="12" style="padding: 0px; margin-top: 10px">
               
                
                  <v-text-field
                  v-model="propertiesItem.name.fa"
                  :rules="NameRules"
                  outlined
                  label="نام فارسی ویژگی"
                ></v-text-field>
                <v-text-field
                  v-model="propertiesItem.name.en"
                  :rules="NameRules"
                  outlined
                  label="نام انگلیسی ویژگی"
                ></v-text-field>
                <v-text-field
                  v-model="propertiesItem.name.ar"
                  :rules="NameRules"
                  outlined
                  label="نام عربی ویژگی"
                ></v-text-field>
             

                <v-divider></v-divider>
                <div v-if="edit == false" style="margin-top: 10px">
                  <v-btn
                    color="#2b4a83"
                    v-if="!isloading"
                    rounded
                    dark
                    style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                    @click="addProperty()"
                  >
                    افزودن ویژگی</v-btn
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
                    @click="editBrands()"
                  >
                    ویرایش ویژگی</v-btn
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
import imageGalleryDialog from "~/components/gallery/imageGalleryDialog";
import { url } from "~/static/URL.js";
import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
export default {
  layout: "panel",
  components: {
    imageGalleryDialog,
  },
  data() {
    return {
      search: "",
      status: "",
      URL: url,
      edit: false,
      isloading: false,
      propertiesItem: {
        name: {
          fa:"",
          en:"",
          ar:""
        },
        parent:this.$route.params.id,
      },
      headers: [
        {
          text: "نام ویژگی",
          align: "center",
          sortable: false,
          value: "name",
        },

        {
          text: "ویرایش",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      desserts: [],
      valid: true,
addDialog:false,
      NameRules: [
           (v) => !!v || "نام ویژگی  فیلد اجباری است",
        (v) => (v && v.length <= 20) || "نام باید کمتر از 20 نویسه باشد",
      ],
    };
  },
  methods: {
    addDialogparent() {
      (this.propertiesItem = {
        name: {
          fa:"",
          en:"",
          ar:""
        },
         parent:this.$route.params.id,
      }),
        (this.addDialog = true);
    },
    editProperty(item) {
      this.addDialog = true;
      this.edit = true;
      this.propertiesItem = item;
    },
    closedialog() {
      (this.propertiesItem = {
         name: {
          fa:"",
          en:"",
          ar:""
        },
         parent:this.$route.params.id,
      }),
        (this.addDialog = false);
      this.dialogVisibilite = false;
    },

    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,
    editBrands() {
      if (this.$refs.propertyForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;

        return this.$axios
          .$put(
            url + `api/products/properties/${this.propertiesItem._id}`,
            this.propertiesItem,
            {
              headers,
            }
          )
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "ویژگی با موفقیت ویرایش شد",
              });

              self.addDialog = false;
              self.dialogVisibilite = false;
              self.properties("ar");
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
    addProperty() {
      if (this.$refs.propertyForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        console.log(this.propertiesItem);
        return this.$axios
          .$post(url + "api/products/properties", this.propertiesItem, {
            headers,
          })
          .then((data) => {
            self.isloading = false;
                console.log(data);
            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "ویژگی با موفقیت ارسال شد",
              });

              self.addDialog = false;
              self.dialogVisibilite = false;
              self.properties("ar");
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
    deleteProperty(item) {
      const index = this.desserts.indexOf(item);
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      var self = this;
      let id = item._id;
      if (confirm("آیا مطمئن هستید میخواهید این ویژگی را حذف کنید؟")) {
        this.$axios
          .$delete(url + `api/products/properties/${id}`, {
            headers,
          })

          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: ".ویژگی با موفقیت حذف شد",
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

    async properties(lang) {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      let id = this.$route.params.id;
      try {
        let data = await this.$axios.$get(
          url + `api/products/properties?id=${id}&lang=${lang}`,
          {
            headers,
          }
        );
        this.status = lang;
       
        this.desserts = data.body;
      } catch (error) {}
    },
  },
  created() {
    if (process.browser) {
      this.properties("ar");
    }
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
</style>
