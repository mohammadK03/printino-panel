<template>
  <v-app
    style="background: #eaecef !important"
    class="d-flex justify-center align-center"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-container>
            <v-card
              elevation="0"
              style="
                background-color: #fff;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 1px 1px 19px 13px #f1f1f1;
              "
              width="100%"
            >
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
                    دسته بندی محصولات
                  </h1>

                  <span
                    style="
                      font-size: 11px;
                      margin-top: 10px;
                      margin-right: 20px;
                      font-weight: unset;
                      color: #2d3436;
                    "
                    >تمامی دسته بندی ها در این صفحه لیست شده اند
                  </span>
                </div>
                <div></div>
                <div>
                  <v-btn
                    rounded
                    dark
                    color="#2b4a83"
                    @click="addDialogparent()"
                  >
                    <v-icon>add</v-icon>
                    <span style="letter-spacing: normal"
                      >افزودن دسته بندی جدید</span
                    >
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
                      @click="getCategories('')"
                      :class="{ active: status === '' }"
                    >
                      <a>عربی</a>
                    </li>
                    <li
                      @click="getCategories('en')"
                      :class="{ active: status === 'en' }"
                    >
                      <a>انگلیسی</a>
                    </li>
                    <li
                      @click="getCategories('fa')"
                      :class="{ active: status === 'fa' }"
                    >
                      <a>فارسی</a>
                    </li>
                  </ul>
                </div>
              </div>
              <v-treeview
                expand-icon="arrow_drop_down"
                item-key="_id"
                shaped
                hoverable
                activatable
                :items="categories"
              >
                <v-spacer></v-spacer>

                <template v-slot:append="{ item, open }">
                  <v-btn
                    @click="addCategory(item._id)"
                    style="float: left"
                    class="mx-2"
                    fab
                    dark
                    small
                    icon
                    color="primary"
                  >
                    <v-icon dark>add</v-icon>
                  </v-btn>
                  <v-btn
                    @click="editCategory(item)"
                    style="float: left"
                    class="mx-2"
                    fab
                    dark
                    small
                    icon
                    color="warning"
                  >
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                  <v-btn
                    @click="deleteCategory(item._id)"
                    style="float: left"
                    class="mx-2"
                    fab
                    dark
                    small
                    icon
                    color="error"
                  >
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </template>
              </v-treeview>
            </v-card>
            <v-dialog
              v-model="addDialog"
              persistent
              max-width="400"
              style="border-radius: 25px !important"
            >
              <v-card elevation="0" style="padding: 10px">
                <div class="d-flex flex-column">
                  <div
                    class="d-flex flex-row justify-space-between align-center"
                  >
                    <div class="d-flex flex-row justify-center align-center">
                      <v-icon class="rounded-icon" color="#00b894">add</v-icon>
                      <span
                        style="
                          font-family: vazir-bold;
                          font-size: 18px;
                          color: #2d3436;
                          margin-right: 10px;
                        "
                        >نام دسته بندی</span
                      >
                    </div>
                    <div>
                      <v-icon color="#757575" @click="closedialog()"
                        >close</v-icon
                      >
                    </div>
                  </div>
                  <v-form
                    ref="categoryform"
                    v-model="valid"
                    style="padding: 0px"
                    lazy-validation
                  >
                    <v-col cols="12" style="padding: 0px; margin-top: 10px">
                      <v-text-field
                        v-model="categoryItem.name.fa"
                        :rules="nametRules"
                        outlined
                        label="نام فارسی دسته بندی"
                      ></v-text-field>
                      <v-text-field
                        v-model="categoryItem.name.en"
                        :rules="nametRules"
                        outlined
                        label="نام انگلیسی دسته بندی"
                      ></v-text-field>
                      <v-text-field
                        v-model="categoryItem.name.ar"
                        :rules="nametRules"
                        outlined
                        label="نام عربی دسته بندی"
                      ></v-text-field>

                      <div
                        class="d-flex justify-center align-center flex-column"
                        style="width: 100%; margin: 10px"
                      >
                        <div v-if="categoryItem.image">
                          <div
                            style="border: 3px dashed #cac9c9; padding: 10px"
                            v-for="(item, a) in categoryItem.image"
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
                          >افزودن تصویر دسته بندی
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
                          @click="addCategories()"
                        >
                          افزودن دسته بندی</v-btn
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
                          @click="editCategories()"
                        >
                          ویرایش دسته بندی</v-btn
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
          <imageGalleryDialog
            :dialog="dialogVisibilite"
            selectable
            @selectedListener="selectedListener"
          ></imageGalleryDialog>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { url } from "~/static/URL.js";
import imageGalleryDialog from "~/components/gallery/imageGalleryDialog";
export default {
  layout: "panel",
  components: {
    imageGalleryDialog,
  },
  data() {
    return {
      status: "",
      URL: url,
      isloading: false,
      categories: [],
      addDialog: false,
      valid: true,
      edit: false,
      nametRules: [(v) => !!v || "نام دسته بندی  فیلد اجباری است"],
      categoryItem: {
        name: {
          fa: "",
          en: "",
          ar: "",
        },
        parent: "",
        image: {
          url: "",
        },
      },
      dialogVisibilite: false,
    };
  },
  methods: {
    addDialogparent() {
      (this.categoryItem = {
        name: {
          fa: "",
          en: "",
          ar: "",
        },
        parent: "",
        image: {
          url: "",
        },
      }),
        (this.addDialog = true);
    },
    editCategory(item) {
      this.getCategoryById(item._id);
      //   this.addDialog = true;
      //   this.edit = true;
      //   this.categoryItem = item;
    },
    addCategory(_id) {
      this.edit = false;
      (this.categoryItem = {
        name: {
          fa: "",
          en: "",
          ar: "",
        },
        parent: "",
        image: {
          url: "",
        },
      }),
        (this.categoryItem.parent = _id);
      this.addDialog = true;
    },
    closedialog() {
      (this.categoryItem = {
        name: {
          fa: "",
          en: "",
          ar: "",
        },
        parent: "",
        image: {
          url: "",
        },
      }),
        (this.addDialog = false);
      this.dialogVisibilite = false;
    },
    selectedListener(item) {
      this.categoryItem.image = item;
      this.dialogVisibilite = false;
    },
    deleteCategory(id) {
      console.log(id);
      if (confirm("آیا مطمئن به حذف این دسته بندی هستید؟")) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
          .$delete(url + "api/categories/" + id, {
            headers,
          })
          .then((data) => {
            console.log(data);
            if (data.success) {
              this.getCategories("");
            }
          });
      } else {
      }
    },
    editCategories() {
      if (this.$refs.categoryform.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;

        return this.$axios
          .$put(
            url + `api/categories/${this.categoryItem._id}`,
            this.categoryItem,
            {
              headers,
            }
          )
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "دسته بندی با موفقیت ویرایش شد",
              });

              self.addDialog = false;
              self.dialogVisibilite = false;
              self.getCategories("");
              self.$refs.categoryform.resetValidation();
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
    addCategories() {
      if (this.$refs.categoryform.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
          .$post(url + "api/categories", this.categoryItem, {
            headers,
          })
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "دسته بندی با موفقیت ارسال شد",
              });

              self.addDialog = false;
              self.dialogVisibilite = false;
              self.getCategories(this.status);
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
    async getCategories(lang) {
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        try {
          let resp = await this.$axios.$get(
            url + `api/categories?lang=${lang}`,
            {
              headers,
            }
          );
          this.status = lang;
          this.categories = resp.body;
          this.$refs.categoryform.resetValidation();
        } catch (error) {}
      }
    },
    async getCategoryById(id) {
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        try {
          let resp = await this.$axios.$get(url + `api/categories/${id}`, {
            headers,
          });
          console.log(resp);
          this.edit = true;
          this.categoryItem = resp.body;
          this.addDialog = true;
          this.$refs.categoryform.resetValidation();
        } catch (error) {}
      }
    },
  },
  created() {
    this.getCategories("");
  },
};
</script>
