<template>
  <v-app style="background: #eaecef !important">
    <v-container class="d-flex justify-center align-center">
      <v-col
        cols="12"
        lg="10"
        md="10"
        class="d-flex flex-row flex-wrap align-self-center justify-center align-center"
        style="
          background-color: #fff;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 1px 1px 19px 13px #f1f1f1;
        "
      >
        <v-tabs
          v-model="tab"
          color="basil"
          background-color="#fff"
          fixed-tabs
          :ripple="false"
        >
          <v-tabs-slider
            color="#39f"
            class="d-flex justify-center align-center"
            style="width: 50%; margin: auto"
          ></v-tabs-slider>

          <v-tab :ripple="false" class="line" href="#productInfo">
            ویرایش محصول
          </v-tab>
          <v-tabs-items v-model="tab">
            <div style="border-bottom: 1px solid #e6e9ed; width: 100%"></div>

            <v-tab-item value="productInfo">
              <div
                style="width: 100%"
                class="d-flex justify-center flex-column"
              >
                <div class="d-flex flex-row justify-start info_tab">
                  <div class="d-flex flex-column">
                    <span style="font-family: vazir-bold">وضعیت محصول</span>
                    <span style="font-size: 12px"
                      >با فعال کردن محصول،محصول مورد نظر در سایت به نمایش در می آید.
                    </span>
                  </div>
                </div>
                <div>
                  <v-checkbox
                    indeterminate-icon="indeterminate_check_box"
                    on-icon="check_box"
                    off-icon="check_box_outline_blank"
                    v-model="productitem.isActive"
                    label="محصول فعال شود؟"
                  ></v-checkbox>
                </div>

                <div class="d-flex flex-row justify-start info_tab">
                  <div class="d-flex flex-column">
                    <span style="font-family: vazir-bold">عکس محصول</span>
                    <span style="font-size: 12px"
                      >انتخاب عکس خوب روی بازدید و فروش شما تاثیر بسیار بالایی
                      دارد.
                    </span>
                  </div>
                </div>
                <div>
                  <v-col cols="12">
                    <div
                      style="width: 100%"
                      class="d-flex flex-wrap flex-column flex-md-row"
                    >
                      <div
                        v-for="(item, i) in productitem.images"
                        :key="i"
                        class="col-8 col-lg-4 col-sm-12 col-xs-12 col-md-6 item"
                      >
                        <v-card class="mx-auto CardItem">
                          <v-img
                            class="white--text align-end"
                            height="280px"
                            :src="URL + '' + item.url + '?width=600'"
                          >
                            <v-icon
                              @click="deleteImage(i, item)"
                              color="#0ac974"
                              >cancel</v-icon
                            >
                          </v-img>
                        </v-card>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      style="margin-top: 10px"
                      rounded
                      dark
                      color="#00bf6f"
                      @click="
                        dialogVisibilite = false;
                        dialogVisibilite = true;
                      "
                      >افزودن تصویر محصول
                      <v-icon class="rounded-icon" color="#fff">add</v-icon>
                    </v-btn>

                    <imageGalleryDialog
                      :dialog="dialogVisibilite"
                      selectable
                      multi
                      @selectedListener="selectedListener"
                    ></imageGalleryDialog>
                  </v-col>
                </div>
                <div class="d-flex flex-row justify-start info_tab">
                  <div class="d-flex flex-column">
                    <span style="font-family: vazir-bold">معرفی محصول</span>
                    <span style="font-size: 12px"
                      >برای جذب مشتری اطلاعات زیاد از محصولتان بنویسید.
                    </span>
                  </div>
                </div>
                <div>
                  <v-form ref="shopForm" v-model="valid" lazy-validation>
                    <v-col cols="12" class="d-flex flex-wrap">
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-text-field
                          outlined
                          v-model="productitem.name.fa"
                          label="عنوان فارسی محصول*"
                          :counter="120"
                          placeholder="مثلا عسل سبلان 2 کیلویی"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-text-field
                          outlined
                          v-model="productitem.name.en"
                          label="عنوان انگلیسی محصول*"
                          :counter="120"
                          placeholder="مثلا عسل سبلان 2 کیلویی"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-text-field
                          outlined
                          v-model="productitem.name.ar"
                          label="عنوان عربی محصول*"
                          :counter="120"
                          placeholder="مثلا عسل سبلان 2 کیلویی"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-select
                          :items="brands"
                          item-text="name"
                          item-value="_id"
                          v-model="productitem.brand"
                          label="برند محصول"
                          outlined
                          append-icon="keyboard_arrow_down"
                        >
                          <template v-slot:selection="{ item, index }">
                            <img
                              width="40"
                              item-value="_id"
                              :src="URL + item.image.url"
                            />{{ item.name }}
                          </template>

                          <template v-slot:item="{ item }">
                            <img
                              width="40"
                              style="border-radius: 5px; margin-right: 10px"
                              :src="URL + item.image.url"
                            />{{ item.name }}
                          </template>
                        </v-select>
                      </v-col>
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-text-field
                          outlined
                          v-model="productitem.slug"
                          label="آدرس محصول*"
                          placeholder="/furat  مثلا"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="12" class="padding-4">
                        <v-textarea
                          v-model="productitem.details.fa"
                          outlined
                          label="معرفی کامل محصول فارسی"
                          :counter="1700"
                          placeholder="توضیح محصول"
                          :rules="infoRules"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" md="12" lg="12" class="padding-4">
                        <v-textarea
                          v-model="productitem.details.en"
                          outlined
                          label="معرفی کامل محصول انگلیسی"
                          :counter="1700"
                          placeholder="توضیح محصول"
                          :rules="infoRules"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" md="12" lg="12" class="padding-4">
                        <v-textarea
                          v-model="productitem.details.ar"
                          outlined
                          label="معرفی کامل محصول عربی"
                          :counter="1700"
                          placeholder="توضیح محصول"
                          :rules="infoRules"
                        ></v-textarea>
                      </v-col>
                    </v-col>
                  </v-form>
                </div>
                <div class="d-flex flex-row justify-start info_tab">
                  <div class="d-flex flex-column">
                    <span style="font-family: vazir-bold">دسته محصول</span>
                    <span style="font-size: 12px"
                      >دسته بندی محصولات خود را انتخاب کنید
                    </span>
                  </div>
                </div>

                <v-col cols="12" class="d-flex flex-wrap">
                  <v-treeview
                    style="width: 100%"
                    expand-icon="arrow_drop_down"
                    item-key="_id"
                    shaped
                    hoverable
                    activatable
                    :items="categories"
                    @update:active="addCategory"
                  >
                    <v-spacer></v-spacer>
                    <template v-slot:append="{ item, open }">
                      <!-- <v-btn
                        style="float: left"
                        class="mx-2"
                        fab
                        dark
                        small
                        icon
                        color="primary"
                      >
                        <v-icon dark>add</v-icon>
                      </v-btn> -->
                    </template>
                  </v-treeview>
                  <div
                    class="d-flex justify-center align-center"
                    style="
                      width: 100%;
                      height: 73px;
                      border-radius: 18px;
                      background-color: #fae3e6;
                    "
                  >
                    <v-breadcrumbs :items="productitem.categories">
                      <template v-slot:item="{ item }">
                        <v-breadcrumbs-item>
                          {{ item.name.fa }}
                        </v-breadcrumbs-item>
                      </template>
                    </v-breadcrumbs>
                  </div>
                </v-col>
                <v-form ref="priceForm" v-model="valid" lazy-validation>
                  <div class="d-flex flex-row justify-start info_tab">
                    <div class="d-flex flex-column">
                      <span style="font-family: vazir-bold">قیمت محصول</span>
                      <span style="font-size: 12px"
                        >قیمت محصول و تخفیف محصول را وارد نمایید
                      </span>
                    </div>
                  </div>
                  <div>
                    <v-col cols="12" class="d-flex flex-wrap">
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-text-field
                          v-model="productitem.discountPercent"
                          outlined
                          label="درصد تخفیف*"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-text-field
                          outlined
                          v-model="productitem.price"
                          label="قیمت محصول"
                          :rules="priceRules"
                          type="number"
                          :hint="
                            toPersianNumber(formatPrice(productitem.price)) +
                            'ریال'
                          "
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" lg="6" class="padding-4">
                        <v-text-field
                          outlined
                          v-model="productitem.stock"
                          label="تعداد موجودی از محصول"
                          type="number"
                          hint="مثلا:12 عدد"
                        ></v-text-field>
                      </v-col>
                         <v-col cols="12" md="6" lg="6" class="padding-4">
            <v-text-field
              outlined
              v-model="productitem.postalAmount"
              label="قیمت حمل و نقل"
              :rules="postalRules"
              type="number"
              :hint="toPersianNumber(formatPrice(productitem.postalAmount)) + 'ریال'"
            ></v-text-field>
          </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex flex-wrap">
                      <v-checkbox
                        indeterminate-icon="indeterminate_check_box"
                        on-icon="check_box"
                        off-icon="check_box_outline_blank"
                        v-model="productitem.amazing"
                        label="آیا این محصول ویژه است؟"
                      ></v-checkbox>
                    </v-col>
                  </div>
                </v-form>
                <div class="d-flex flex-row justify-start info_tab">
                  <div class="d-flex flex-column">
                    <span style="font-family: vazir-bold">ویژگی های محصول</span>
                    <span style="font-size: 12px"
                      >ویژگی های خاص محصول را در این قسمت وارد کنید
                    </span>
                  </div>
                </div>
                <div>
                  <attribute :attributes="productitem.attributes"></attribute>
                </div>

                <div class="d-flex justify-end">
                
                  <div
                    class="continue-btn"
                    @click="editProduct()"
                    v-if="!isloading"
                  >
                   ثبت تغییرات
                  </div>
                  <v-progress-circular
                    v-if="isloading"
                    indeterminate
                    color="purple"
                  ></v-progress-circular>
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import { url } from "~/static/URL.js";
import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
import attribute from "~/components/product/attribute";

import imageGalleryDialog from "~/components/gallery/imageGalleryDialog";
export default {
  layout: "panel",
  components: {
    attribute,
    imageGalleryDialog,
  },
  data() {
    return {
      URL: url,
      tab: 0,

      dialogVisibilite: false,
      valid: true,
      isloading: false,
      subSections: [],
      URL: url,
      productitem: {
        images: [],
        name: {
          fa: "",
          ar: "",
          en: "",
        },
        price: "",
        details: {
          fa: "",
          ar: "",
          en: "",
        },
        discountPercent: 0,
        subSectionId: "",
        brand: "",
        productType: "none",
        amazing: false,
        stock: "",
        categoryId: "",
        attributes: [],
        slug: "",
        isActive: false,
        postalAmount:0,
      },
      categories: [],

      brands: [],
      nameRules: [
        (v) => !!v || "نام محصول فیلد اجباری است",
        (v) => (v && v.length <= 120) || "نام باید کمتر از 120 نویسه باشد",
        (v) => (v && v.length >= 3) || "نام باید بیشتر از 3 نویسه باشد",
      ],
      priceRules: [
        (v) => !!v || "قیمت محصول فید اجباری است",
        (v) => (v && !isNaN(v)) || "قیمت محصول باید عدد باشد",
      ],
      postalRules: [
        (v) => !!v || "قیمت حمل و نقل فید اجباری است",
        (v) => (v && !isNaN(v)) || "قیمت حمل و نقل باید عدد باشد",
      ],
      infoRules: [(v) => !!v || "توضیحات محصول فید اجباری است"],
      imageRules: [(v) => !!v || "تصویر محصول فید اجباری است"],
    };
  },
  methods: {
    addCategory(id) {
      this.productitem.categoryId = id[0];
        this.$notify.success({
        title: "تایید",
        message: "دسته بندی محصول انتخاب شد",
      });
    },
    async getBrands() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      try {
        let data = await this.$axios.$get(url + "api/brands/", {
          headers,
        });

        this.brands = data.body;
      } catch (error) {}
    },
    async getCategories() {
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        try {
          let resp = await this.$axios.$get(url + `api/categories?lang=fa`, {
            headers,
          });

          this.categories = resp.body;
        } catch (error) {}
      }
    },
    selectedListener(item) {
      this.productitem.images = item;
      this.dialogVisibilite = false;
    },
    async getProduct() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      let id = this.$route.params.id;

      try {
        let data = await this.$axios.$get(url + "api/products/" + id, {
          headers,
        });
        console.log(data);
        this.productitem = data.body;

        // this.productitem.attributes = [];
        // this.productitem.attributes.push(data.body.attributes)
      } catch (error) {
        console.log(error);
      }
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,
    async getsubsection(id) {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      let resp = await this.$axios.$get(
        url + "api/section/subsection?id=" + id,
        {
          headers,
        }
      );
      resp = resp.body;

      this.subSections = resp;
    },
    deleteImage(item, image) {
      var index = item;
      if (index > -1) {
        this.productitem.images.splice(index, 1);
      }
    },

    editProduct() {
      if (!this.productitem.categoryId) {
        this.$notify.error({
          title: "خطا",
          message: "دسته بندی محصول انتخاب نشده است",
        });
        return;
      }
      if (this.$refs.shopForm.validate() && this.$refs.priceForm.validate()) {
        //  this.productitem.subSections = [];
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        let id = this.productitem._id;
        return this.$axios
          .$put(url + "api/products/" + id, this.productitem, {
            headers,
          })
          .then((data) => {
            if (data.success) {
              self.$router.replace("/panel/products");
              self.$notify.success({
                title: "تایید",
                message: "محصول با موفقیت ویرایش شد",
              });
              self.isloading = false;
              self.getProduct();
            } else if (data.message === "categoryId_is_required") {
              self.$notify.error({
                title: "خطا",
                message: "دسته بندی انتخاب نشده است",
              });
              self.isloading = false;
            } else if (data.message === "duplicate_key") {
              self.$notify.error({
                title: "خطا",
                message: "این آدرس قبلا ثبت شده است",
              });
              self.isloading = false;
            } else {
              self.$notify.error({
                title: "خطا",
                message: "خطایی وجود دارید لطفا مجددا سعی کنید.",
              });
              self.isloading = false;
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
      this.getProduct();
      this.getCategories();
      this.getBrands();
    }
  },
};
</script>

<style scoped>
.continue-btn {
  margin-top: 40px;
  box-shadow: rgb(0 255 90 / 39%) 1px -1px 20px 0px;
  width: 170px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  /* background-color: #fff;
    border: 1px solid #c5c7cb */
  color: #fff;
  border: 1px solid #00bf6f;
  background-color: #00bf6f;
  cursor: pointer;
}
.info_tab {
  margin-top: 20px;
  height: 50px;
  align-items: center;
  background-color: #fafafa;
  padding-right: 16px;
  border-radius: 8px;
  width: 100%;
}

.padding-4 {
  padding: 4px;
}

.CardItem {
  background-size: cover !important;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  border: 1px dotted #e1e1e1;
  width: 300px;
  cursor: pointer;
  position: relative;
  margin: 0 8px;
}

.line {
  letter-spacing: normal;
  /* pointer-events: none; */
}

.v-tab:before {
  background-color: #fff !important;
  opacity: 0 !important;
}

.v-tab {
  background-color: #fff !important;
}
</style>
