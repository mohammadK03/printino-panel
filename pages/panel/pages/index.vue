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
                صفحات سایت
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامی صفحات سایت شما دراین صفحه نمایش داده می‌شود
              </span>
            </div>
            <div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="جستجوی صفحه"
                single-line
                filled
                dense
                rounded
                hide-details
              ></v-text-field>
            </div>
            <div>
              <v-btn rounded dark color="#2b4a83" @click="addDialogpage()">
                <v-icon>add</v-icon>
                <span style="letter-spacing: normal">افزودن صفحه جدید</span>
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
                    :to="`/panel/pages/${item._id}/rows`"
                  >
                    <v-icon small>add</v-icon> افزودن سطر
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    class="ma-1 remove-space"
                    outlined
                    @click="editDialogPage(item)"
                  >
                    <v-icon small>edit</v-icon> ویرایش صفحه
                  </v-btn>
                </div>

                <div>
                  <v-btn
                    class="ma-1 remove-space"
                    outlined
                    @click="deletePage(item)"
                  >
                    <v-icon small>delete</v-icon>حذف صفحه
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:no-data>
          <span>هنوز صفحه ای اضافه نشده</span>
        </template>

        <template v-slot:item.mode="{ item }">
          <span v-if="item.mode === 'mobile'">موبایل</span>
          <span v-if="item.mode === 'desktop'">دسکتاپ</span>
        </template>
        <template v-slot:item.url="{ item }">
          <span>{{ item.url }}/</span>
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
                  >افزودن صفحه</span
                >
              </div>
              <div>
                <v-icon color="#757575" @click="closedialog()">close</v-icon>
              </div>
            </div>
            <v-form
              ref="pagesForm"
              v-model="valid"
              style="padding: 0px"
              lazy-validation
            >
              <v-col cols="12" class="d-flex flex-wrap">
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-select
                    v-model="pageItem.mode"
                    outlined
                    append-icon="keyboard_arrow_down"
                    item-text="name"
                    item-value="key"
                    :rules="modeRules"
                    :items="items"
                    label="مدصفحه"
                  ></v-select>
                </div>
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <v-text-field
                    v-model="pageItem.url"
                    :rules="AddressRules"
                    outlined
                    label="آدرس صفحه"
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
                    @click="addPage()"
                  >
                    افزودن صفحه</v-btn
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
                    @click="editPage()"
                  >
                    ویرایش صفحه</v-btn
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
      addDialog: false,
      search: "",
      URL: url,
      isloading: false,
      items: [
        {
          name: "موبایل",
          key: "mobile",
        },
        {
          name: "دسکتاپ",
          key: "desktop",
        },
      ],
      headers: [
        {
          text: "مد صفحه",
          align: "center",
          sortable: false,
          value: "mode",
        },
        {
          text: "آدرس صفحه",
          align: "center",
          sortable: false,
          value: "url",
        },

        {
          text: "ویرایش",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      desserts: [],
      pageItem: {
        mode: "",
        url: "",
      },
      valid: true,
      edit: false,
      modeRules: [(v) => !!v || "مد صفحه فیلد اجباری است"],

      AddressRules: [(v) => !!v || "آدرس صفحه فیلد اجباری است"],
    };
  },
  methods: {
    addPage() {
      if (this.$refs.pagesForm.validate()) {
        //  this.productitem.subSections = [];
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;

        return this.$axios
          .$post(url + "api/pages", this.pageItem, {
            headers,
          })
          .then((data) => {
            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "صفحه با موفقیت اضافه شد",
              });
              self.isloading = false;
              self.addDialog = false;
              self.getAllPages();
            } else {
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
    addDialogpage() {
      (this.pageItem = {
        mode: "",
        url: "",
      }),
        (this.addDialog = true);
    },
    closedialog() {
      this.addDialog = false;
    },
    editDialogPage(item) {
      this.addDialog = true;
      this.edit = true;
      this.pageItem = item;
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,

    deletePage(item) {
      const index = this.desserts.indexOf(item);
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      var self = this;
      let id = item._id;
      if (confirm("آیا مطمئن هستید میخواهید این صفحه را حذف کنید؟")) {
        this.$axios
          .$delete(url + "api/pages/" + id, {
            headers,
          })

          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: ".صفحه با موفقیت حذف شد",
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
    editPage() {
      if (this.$refs.pagesForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;

        return this.$axios
          .$put(url + `api/pages/${this.pageItem._id}`, this.pageItem, {
            headers,
          })
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "صفحه با موفقیت ویرایش شد",
              });
              self.addDialog = false;
              self.getAllPages();
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

    async getAllPages() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      try {
        let data = await this.$axios.$get(url + "api/pages", {
          headers,
        });

        this.desserts = data.body;
      } catch (error) {}
    },
  },
  created() {
    this.getAllPages();
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
