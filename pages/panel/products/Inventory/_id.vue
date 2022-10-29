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
            محصول متغییر
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
                    <span style="font-family: vazir-bold">ویژگی های محصول</span>
                    <span style="font-size: 12px"
                      >ویژگی های محصول را انتخاب کنید
                    </span>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column" style="padding: 20px">
                <div class="d-flex flex-row">
                  <v-select
                    :items="properties"
                    label="انتخاب ویژگی"
                    outlined
                    v-model="dimensionKey"
                    item-value="_id"
                    item-text="name.fa"
                    dense
                    style="max-width: 200px"
                    append-icon="expand_more"
                  ></v-select>
                  <v-btn
                    style="margin-right: 10px; margin-top: 2px"
                    color="primary"
                    @click="addDimension()"
                    >افزودن</v-btn
                  >
                </div>
                <div
                  v-for="(item, i) in productitem.dimensions"
                  :key="i"
                  class="d-flex flex-column"
                  style="
                    width: 100%;
                    border: 3px dashed #e7e7e7;
                    padding: 5px;
                    margin: 5px;
                  "
                >
                  <span> {{ item.key.name.fa }}</span>
                  <div class="d-flex flex-column">
                    <div>
                      <v-chip-group
                        v-model="item.values"
                        column
                        multiple
                        v-if="completed"
                      >
                        <v-chip
                          filter-icon="done"
                          v-for="(property, p) in nestedProperties[
                            item.key._id
                          ]"
                          :key="p"
                          filter
                          outlined
                          :value="property._id"
                        >
                          <div v-if="property.color">
                            <div
                              :style="{ 'background-color': property.color }"
                              style="
                                width: 15px;
                                height: 15px;
                                border-radius: 50%;
                                margin-left: 5px;
                              "
                            ></div>
                          </div>
                          {{ property.name.fa }}
                        </v-chip>
                      </v-chip-group>
                    </div>
                    <div class="d-flex flex-row justify-end">
                      <v-btn
                        color="#ef394e"
                        light
                        rounded
                        @click="deleteDimension(item.key._id)"
                        style="
                          color: #fff;
                          font-size: 14px;
                          font-weight: 700;
                          margin: 10px;
                        "
                        >حذف این ویژگی</v-btn
                      >

                      <v-btn
                        color="#0ac974"
                        light
                        @click="addDimensionValue(item.key._id, item.values)"
                        style="
                          color: #fff;
                          font-size: 14px;
                          font-weight: 700;
                          margin: 10px;
                        "
                        >ثبت ویژگی</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                style="width: 100%"
                class="d-flex justify-center flex-column"
              >
                <div class="d-flex flex-row justify-start info_tab">
                  <div class="d-flex flex-column">
                    <span style="font-family: vazir-bold">ساخت متغییر</span>
                    <span style="font-size: 12px"
                      >متغییر های محصول را انتخاب کنید
                    </span>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-center">
                <table>
                  <tr>
                    <th v-for="(item, i) in productitem.dimensions" :key="i">
                      {{ item.key.name.fa }}
                    </th>
                    <th>مبلغ</th>
                    <th>تخفیف</th>
                    <th>تعداد موجودی</th>
                    <th>ویرایش</th>
                  </tr>
                  <tr v-for="(item, i) in productitem.variations" :key="i">
                    <td v-for="(key, k) in item.keys" :key="k">
                      {{ getVariationName(key) }}
                    </td>
                    <td>
                      {{ toPersianNumber(formatPrice(item.price)) }}
                      <span style="font-size: 13px">ریال</span>
                    </td>
                    <td>%{{ toPersianNumber(item.discountPercent) }}</td>
                    <td>{{ toPersianNumber(item.quantity) }}</td>
                    <td>
                      <v-btn icon color="error" @click="removeproperty(item)">
                        <v-icon>clear</v-icon>
                      </v-btn>

                      <v-btn icon color="success" @click="openeditDialog(item)">
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr style="margin-top: 20px">
                    <td v-for="(item, i) in productitem.dimensions" :key="i">
                      <v-select
                        :items="getDimensionsValues(item.key._id, item.values)"
                        label="انتخاب ویژگی"
                        item-value="_id"
                        v-model="variation.keys[i]"
                        item-text="name.fa"
                        dense
                        style="max-width: 100px"
                        append-icon="expand_more"
                      ></v-select>
                    </td>
                    <td>
                      <v-text-field
                        style="max-width: 100px"
                        v-model="variation.price"
                        dense
                        label="مبلغ"
                        :hint="
                          toPersianNumber(formatPrice(variation.price)) +
                          'ریال'
                        "
                      ></v-text-field>
                    </td>
                    <td>
                      <v-text-field
                        style="max-width: 100px"
                        v-model="variation.discountPercent"
                        dense
                        label="درصد تخفیف"
                      ></v-text-field>
                    </td>
                    <td>
                      <v-text-field
                        style="max-width: 100px"
                        v-model="variation.quantity"
                        dense
                        label="تعداد موجودی "
                      ></v-text-field>
                    </td>
                    <td>
                      <v-btn color="success" @click="addproperty()">
                        <v-icon>add_circle_outline</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </table>
              </div>
              <v-dialog
                v-model="editDialog"
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
                        <v-icon class="rounded-icon" color="#00b894"
                          >edit</v-icon
                        >
                        <span
                          style="
                            font-family: vazir-bold;
                            font-size: 18px;
                            color: #2d3436;
                            margin-right: 10px;
                          "
                          >ویرایش ویژگی</span
                        >
                      </div>
                      <div>
                        <v-icon color="#757575" @click="editDialog = false"
                          >close</v-icon
                        >
                      </div>
                    </div>
                    <v-form
                      ref="propertysform"
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
                            outlined
                            :rules="priceRules"
                            v-model="editItem.price"
                            :hint="
                              toPersianNumber(formatPrice(variation.price)) +
                              'ریال'
                            "
                            label="مبلغ"
                          ></v-text-field>
                        </div>
                        <div
                          class="d-flex justify-center align-center"
                          style="width: 100%"
                        >
                          <v-text-field
                            v-model="editItem.discountPercent"
                            outlined
                            label="درصد تخفیف"
                          ></v-text-field>
                        </div>
                        <div
                          class="d-flex justify-center align-center"
                          style="width: 100%"
                        >
                          <v-text-field
                            v-model="editItem.quantity"
                            outlined
                            label="تعداد موجودی"
                          ></v-text-field>
                        </div>
                        <v-divider></v-divider>

                        <div style="margin-top: 10px">
                          <v-btn
                            color="#2b4a83"
                            v-if="!isloading"
                            rounded
                            dark
                            style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                            @click="editproperty()"
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
              <!-- 
              <div class="d-flex justify-end">
                <v-btn
                  @click="editProduct()"
                  v-if="!isloading"
                  color="#0ac974"
                  light
                  rounded
                  style="
                    box-shadow: rgb(0 255 137 / 39%) 0px 6px 20px 0px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    margin: 10px;
                  "
                  >ویرایش اطلاعات</v-btn
                >
                <v-progress-circular
                  v-if="isloading"
                  indeterminate
                  color="purple"
                ></v-progress-circular>
              </div> -->
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

export default {
  layout: "panel",

  data() {
    return {
      URL: url,
      tab: 0,
      dimensionKey: 0,
      properties: [],
      completed: false,
      nestedProperties: [],
      isloading: false,
      editDialog: false,
      valid: true,
      editItem: {
        _id: "",
        price: 0,
        discountPercent: 0,
        quantity: 0,
      },
      URL: url,
      productitem: {
        productType: "none",
        dimensions: [],
      },
      variation: {
        keys: [],
        price: "",
        discountPercent: 0,
        quantity: 0,
      },
      priceRules: [
        (v) => !!v || "قیمت محصول فید اجباری است",
        (v) => (v && !isNaN(v)) || "قیمت محصول باید عدد باشد",
      ],
    };
  },
  methods: {
    openeditDialog(item) {
      this.editItem = {};
      this.editItem = item;
      this.editDialog = true;
    },
    async getProduct() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      let id = this.$route.params.id;

      try {
        let data = await this.$axios.$get(
          url + "api/products/" + id + "?values=false",
          {
            headers,
          }
        );

        let productitem = data.body;
        if (productitem.dimensions) {
          for (var a = 0; a < productitem.dimensions.length; a++) {
            this.nestedProperties[
              productitem.dimensions[a].key._id
            ] = await this.getProperties(productitem.dimensions[a].key._id);
          }
        }

        this.productitem = productitem;
        this.completed = true;
      } catch (error) {}
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,
    async getProperties(id = null) {
      if (id == null) {
        let resp = await this.$axios.$get(url + "api/products/properties");
        if (resp.success) {
          this.properties = resp.body;
        }
      } else {
        let resp = await this.$axios.$get(
          url + "api/products/properties?id=" + id
        );

        if (resp.success) {
          return resp.body;
        }
      }
    },
    getDimensionsValues(key, values) {
      let properties = this.nestedProperties[key];
      let mValues = [];
      if (properties) {
        for (var i = 0; i < properties.length; i++) {
          for (var j = 0; j < values.length; j++) {
            if (properties[i]._id == values[j]) {
              mValues.push(properties[i]);
            }
          }
        }
        return mValues;
      }
    },
    editProduct() {
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
    addDimension() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      let self = this;
      let id = this.productitem._id;
      let dimensionKey = { dimensionKey: this.dimensionKey };

      return this.$axios
        .$post(url + "api/products/" + id + "/dimensions", dimensionKey, {
          headers,
        })
        .then((data) => {
          if (data.success) {
            self.$notify.success({
              title: "تایید",
              message: "ویژگی با موفقیت اضافه شد",
            });
            self.getProduct();
          } else if (data.message === "dimension_is_exist") {
            self.$notify.error({
              title: "خطا",
              message: "ویژگی مورد نظر قبلا ثبت شده است",
            });
          } else {
            self.$notify.error({
              title: "خطا",
              message: "خطایی وجود دارید لطفا مجددا سعی کنید.",
            });
          }
        });
    },
    async deleteDimension(dId) {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      let id = this.productitem._id;
      if (confirm("آیا مطمئن هستید میخواهید این ویژگی را حذف کنید؟")) {
        let resp = await this.$axios.$delete(
          url + "api/products/" + id + "/dimensions/" + dId,
          { headers }
        );

        if (resp.success) {
          this.$notify.success({
            title: "تایید",
            message: "ویژگی با موفقیت حذف شد",
          });
          this.getProduct();
        }
        this.getProduct();
      }
    },
    async editproperty() {
      if (this.$refs.propertysform.validate()) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let id = this.editItem._id;
        let productID = this.productitem._id;
        let address = `${url}api/products/${productID}/variations/${id}`;
        let resp = await this.$axios.$put(address, this.editItem, { headers });

        if (resp.success) {
          this.$notify.success({
            title: "تایید",
            message: "ویژگی با موفقیت ویرایش شد",
          });
          this.getProduct();
          this.editDialog=false;
        }
      } else {
        this.$notify.error({
          title: "خطا",
          message: "لطفا تمام فیلد های اجباری را وارد کنید",
        });
        this.isloading = false;
      }
    },
    async addDimensionValue(dimensionKey, values) {
      let id = this.productitem._id;
      let postdata = { values };
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      let address = `${url}api/products/${id}/dimensions/${dimensionKey}/values`;
      let resp = await this.$axios.$post(address, postdata, { headers });
      this.getProduct();
    },

    getVariationName(id) {
      let variationNames = this.productitem.variationNames;
      for (var a = 0; a < variationNames.length; a++) {
        let item = variationNames[a];
        if (item._id == id) {
          return item.name.fa;
        }
      }
    },
    async addproperty() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      let id = this.productitem._id;

      let address = `${url}api/products/${id}/variations/`;
      let resp = await this.$axios.$post(address, this.variation, { headers });

      if (resp.success) {
        this.$notify.success({
          title: "تایید",
          message: "ویژگی با موفقیت اضافه شد",
        });
        this.variation = {
          keys: [],
          price: "",
          discountPercent: 0,
          quantity: 0,
        };
        this.getProduct();
      } else if (resp.message === "varaition_is_exist") {
        this.$notify.error({
          title: "خطا",
          message: "ویژگی مورد نظر قبلا ثبت شده است",
        });
      }
    },
    removeproperty(item) {
      let headers = {};
      if (process.browser) {
        headers = {
          authorization: localStorage.getItem("adminToken"),
        };
      }
      var self = this;
      let id = item._id;
      let productID = this.productitem._id;
      let address = `${url}api/products/${productID}/variations/${id}`;
      if (confirm("آیا مطمئن هستید میخواهید این ویژگی را حذف کنید؟")) {
        this.$axios
          .$delete(address, {
            headers,
          })
          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: ".ویژگی با موفقیت حذف شد",
              });
              self.getProduct();
            } else {
              self.$notify.error({
                title: "خطا",
                message: ".خطایی وجود دارید لطفا مجددا سعی کنید",
              });
            }
          });
      }
    },
  },
  created() {
    if (process.browser) {
       this.getProduct();
    this.getProperties();
    }
   
  },
};
</script>

<style scoped>
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
table {
  border-collapse: collapse;
  padding: 10px;
  margin: 20px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  padding-left: 20px;
  padding-right: 20px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
