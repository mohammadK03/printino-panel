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
        :items-per-page="15"
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
                برند محصولات
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامی برند محصولات شما دراین صفحه نمایش داده می‌شود
              </span>
            </div>
            <div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="جستجوی برند"
                single-line
                filled
                dense
                rounded
                hide-details
              ></v-text-field>
            </div>
            <div>
              <v-btn rounded dark color="#2b4a83" @click="openDialogparent()">
                <v-icon>add</v-icon>
                <span style="letter-spacing: normal">افزودن برند جدید</span>
              </v-btn>
            </div>
          </div>
          <div
            style="height: 1px; width: 100%; background-color: #e0e4e7"
          ></div>

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
                    @click="editCategory(item)"
                    class="ma-1 remove-space"
                    outlined
                  >
                    <v-icon small>edit</v-icon> ویرایش برند
                  </v-btn>
                </div>

                <div>
                  <v-btn
                    class="ma-1 remove-space"
                    outlined
                    @click="deleteBrand(item)"
                    color="error"
                  >
                    <v-icon small>delete</v-icon>حذف برند
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:no-data>
          <span>هنوز برندی اضافه نشده</span>
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
                  >نام برند</span
                >
              </div>
              <div>
                <v-icon color="#757575" @click="closedialog()">close</v-icon>
              </div>
            </div>
            <v-form
              ref="brandsform"
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
                    v-model="brandItem.name"
                    :rules="nametRules"
                    outlined
                    label="نام برند"
                  ></v-text-field>
                </div>
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="brandItem.details"
                    :rules="nametRules"
                    outlined
                    label="توضیحات برند"
                  ></v-text-field>
                </div>
                <div
                  class="d-flex justify-center align-center flex-column"
                  style="width: 100%; margin: 10px"
                >
                  <div v-if="brandItem.image">
                    <div
                      style="border: 3px dashed #cac9c9; padding: 10px"
                      v-for="(item, a) in brandItem.image"
                      :key="a"
                    >
                      <img width="200" :src="URL + item" alt="" />
                    </div>
                  </div>

                  <v-btn
                    style="margin-top: 10px"
                    rounded
                    dark
                    color="#00bf6f"
                    @click="
                      dialogVisibilite = false;
                      dialogVisibilite = true;
                    "
                    >افزودن تصویر برند
                    <v-icon class="rounded-icon" color="#fff">add</v-icon>
                  </v-btn>
                </div>
                <v-divider></v-divider>
                <div v-if="edit == false" style="margin-top: 10px">
                  <v-btn
                    color="#2b4a83"
                    v-if="!isloading"
                    rounded
                    dark
                    style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                    @click="addBrands()"
                  >
                    افزودن برند</v-btn
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
                    ثبت تغییرات برند</v-btn
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
      <imageGalleryDialog
        :dialog="dialogVisibilite"
        selectable
        @selectedListener="selectedListener"
      ></imageGalleryDialog>
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
      dialogVisibilite: false,
      search: "",
      URL: url,
      edit: false,
      isloading: false,
      brandItem: {
        name: "",
        details: "",
        image: {
          url: "",
        },
      },
      headers: [
        {
          text: "تصویر برند",
          align: "center",
          sortable: false,
          value: "image",
        },
        {
          text: "نام برند",
          align: "center",
          sortable: false,
          value: "name",
        },
        {
          text: "توضیحات برند",
          value: "details",
          sortable: false,
          align: "center",
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

      NameRules: [
        (v) => (v && v.length <= 20) || "نام باید کمتر از 20 نویسه باشد",
        (v) => !!v || "نام کاربر فیلد اجباری است",
      ],
    };
  },
  methods: {
    openDialogparent() {
      (this.brandItem = {
        name: "",
        details: "",
        image: {
          url: "",
        },
      }),
        (this.addDialog = true);
        this.edit=false;
    },
    editCategory(item) {
      this.addDialog = true;
      this.edit = true;
      this.brandItem = item;
    },
    closedialog() {
      (this.brandItem = {
        name: "",
        details: "",
        image: {
          url: "",
        },
      }),
        (this.addDialog = false);
      this.dialogVisibilite = false;
    },
    selectedListener(item) {
      this.brandItem.image = item;
      this.dialogVisibilite = false;
    },

    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,
    editBrands() {
      if (this.$refs.brandsform.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;

        return this.$axios
          .$put(url + `api/brands/${this.brandItem._id}`, this.brandItem, {
            headers,
          })
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "برند با موفقیت ویرایش شد",
              });

              self.addDialog = false;
              self.dialogVisibilite = false;
              self.getBrands();
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
    addBrands() {
      if (this.$refs.brandsform.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
          .$post(url + "api/brands", this.brandItem, {
            headers,
          })
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "برند با موفقیت ارسال شد",
              });

              self.addDialog = false;
              self.dialogVisibilite = false;
              self.getBrands();
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
    deleteBrand(item) {
      const index = this.desserts.indexOf(item);
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      var self = this;
      let id = item._id;
      if (confirm("آیا مطمئن هستید میخواهید این برند را حذف کنید؟")) {
        this.$axios
          .$delete(url + `api/brands/${id}`, {
            headers,
          })

          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: ".برند با موفقیت حذف شد",
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

    async getBrands() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      try {
        let data = await this.$axios.$get(url + "api/brands/", {
          headers,
        });

        this.desserts = data.body;
      } catch (error) {}
    },
  },
  created() {
    if (process.browser) {
      this.getBrands();
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
