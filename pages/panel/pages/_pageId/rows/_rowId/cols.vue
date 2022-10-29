<template>
  <v-app style="background: #eaecef !important">
    <v-container>
      <v-data-table
        style="border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(19, 37, 71, 0.1)"
        hide-default-footer
        :headers="headers"
        :items="desserts"
        :items-per-page="15"
        :search="search"
      >
        <template v-slot:top>
          <div
            class="d-flex flex-row justify-space-between align-center"
            style="padding: 10px"
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
                ستون های صفحه
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامی ستون های این صفحه در این قسمت نمایش داده شده است
              </span>
            </div>
            <div>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="جستجوی ستون"
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
                <span style="letter-spacing: normal">افزودن ستون جدید</span>
              </v-btn>
            </div>
          </div>
          <div style="height: 1px; width: 100%; background-color: #e0e4e7"></div>

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
                  <v-btn class="ma-1 remove-space" outlined @click="editDialogPage(item)">
                    <v-icon small>edit</v-icon> ویرایش ستون
                  </v-btn>
                </div>

                <div>
                  <v-btn class="ma-1 remove-space" outlined @click="deleteCols(item)">
                    <v-icon small>delete</v-icon>حذف ستون
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:no-data>
          <span>هنوز ستون ای اضافه نشده</span>
        </template>
        <template v-slot:item.dataType="{ item }">
          <span v-if="item.dataType === 'product'">محصول</span>
          <span v-if="item.dataType === 'internal'">داخلی</span>
          <span v-if="item.dataType === 'brand'">برند</span>
          <span v-if="item.dataType === 'category'">دسته بندی محصول</span>
        </template>
        <template v-slot:item.layoutType="{ item }">
          <span v-if="item.layoutType === 'horizontalList'">لیست افقی</span>
          <span v-if="item.layoutType === 'banner'">بنر</span>
          <span v-if="item.layoutType === 'gridlist'">کاشی لیست</span>
          <span v-if="item.layoutType === 'slider'">اسلایدر</span>
        </template>
        <template v-slot:item.size="{ item }">
          <span>{{ sizeToString(item.size) }}</span>
        </template>
      </v-data-table>
      <v-dialog
        v-model="addDialog"
        persistent
        max-width="700"
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
                  >افزودن ستون</span
                >
              </div>
              <div>
                <v-icon color="#757575" @click="closedialog()">close</v-icon>
              </div>
            </div>
            <v-form ref="colForm" v-model="valid" style="padding: 0px" lazy-validation>
              <v-col cols="12" class="d-flex flex-wrap">
                <v-container class="question-container">
                  <div class="d-flex flex-row flex-wrap flex-xs-column">
                    <v-col cols="12" xs="12" sm="12" lg="12" md="12">
                      <v-expansion-panels v-model="panel">
                        <v-expansion-panel active-class="true" class="questions-card">
                          <v-expansion-panel-header>
                            <div class="d-flex flex-row justify-center align-center">
                              <div class="number-box d-flex justify-center align-center">
                                {{ toPersianNumber(1) }}
                              </div>
                              <p
                                class="questions-card-title flex-sm-column flex-xs-column"
                              >
                                مدل داده
                              </p>
                            </div>

                            <template v-slot:actions>
                              <v-icon color="#0ac974">keyboard_arrow_down</v-icon>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="questions-card-text">
                            <v-row style="margin-top: 10px">
                              <v-col cols="12" md="6">
                                <v-select
                                  v-model="colsItem.dataType"
                                  outlined
                                  append-icon="keyboard_arrow_down"
                                  item-text="name"
                                  item-value="key"
                                  :items="dataType"
                                  label="نوع داده"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-select
                                  v-model="colsItem.layoutType"
                                  outlined
                                  append-icon="keyboard_arrow_down"
                                  item-text="name"
                                  item-value="key"
                                  :items="layoutType"
                                  label="نوع طرح"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel class="questions-card">
                          <v-expansion-panel-header>
                            <div class="d-flex flex-row justify-center align-center">
                              <div class="number-box d-flex justify-center align-center">
                                {{ toPersianNumber(2) }}
                              </div>
                              <p class="questions-card-title">استایل</p>
                            </div>
                            <template v-slot:actions>
                              <v-icon color="#0ac974">keyboard_arrow_down</v-icon>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="questions-card-text">
                            <v-row style="margin-top: 10px">
                              <v-col cols="12" md="12">
                                <h2 class="_title_sections">
                                  <span class="_txt" color="headerText"
                                    >رنگ پس زمینه</span
                                  >
                                  <div class="_line"></div>
                                </h2>
                                <v-row
                                  class="d-flex flex-row justify-center align-center"
                                >
                                  <v-color-picker
                                    v-model="colsItem.backgroundColor"
                                    class="d-flex justify-center align-center"
                                    dot-size="30"
                                  ></v-color-picker>
                                </v-row>
                              </v-col>

                              <v-col cols="12" md="12" style="width: 100%">
                                <h2 class="_title_sections">
                                  <span class="_txt" color="headerText">سایز</span>
                                  <div class="_line"></div>
                                </h2>
                                <v-row
                                  class="d-flex flex-row justify-center align-center"
                                >
                                  <v-col cols="2">
                                    <v-text-field
                                      v-model="colsItem.size.lg"
                                      dense
                                      outlined
                                      label="LG"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-text-field
                                      v-model="colsItem.size.md"
                                      dense
                                      outlined
                                      label="MD"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-text-field
                                      v-model="colsItem.size.sm"
                                      dense
                                      outlined
                                      label="SM"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-text-field
                                      v-model="colsItem.size.xs"
                                      dense
                                      outlined
                                      label="Xs"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" style="width: 100%">
                                <h2 class="_title_sections">
                                  <span class="_txt" color="headerText">حاشیه داخلی</span>
                                  <div class="_line"></div>
                                </h2>
                                <v-row
                                  class="d-flex flex-row justify-center align-center"
                                  style="margin-left: 10px"
                                >
                                  <v-text-field
                                    v-model="colsItem.padding"
                                    hint="از چپ به راست به صورت: بالا، راست، پایین، چپ"
                                    dense
                                    outlined
                                    label="حاشیه داخلی"
                                  ></v-text-field>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" style="width: 100%">
                                <h2 class="_title_sections">
                                  <span class="_txt" color="headerText">حاشیه خارجی</span>
                                  <div class="_line"></div>
                                </h2>
                                <v-row
                                  class="d-flex flex-row justify-center align-center"
                                  style="margin-right: 10px"
                                >
                                  <v-text-field
                                    v-model="colsItem.margin"
                                    hint="از چپ به راست به صورت: بالا، راست، پایین، چپ"
                                    dense
                                    outlined
                                    label="حاشیه داخلی"
                                  ></v-text-field>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" style="width: 100%">
                                <h2 class="_title_sections">
                                  <span class="_txt" color="headerText">میزان نرمی</span>
                                  <div class="_line"></div>
                                </h2>
                                <v-row
                                  class="d-flex flex-row justify-center align-center"
                                  style="margin-right: 10px"
                                >
                                  <v-text-field
                                    v-model="colsItem.radius"
                                    hint="از چپ به راست به صورت: بالا، راست، پایین، چپ"
                                    dense
                                    outlined
                                    label="میزان نرمی"
                                  ></v-text-field>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel class="questions-card">
                          <v-expansion-panel-header>
                            <div class="d-flex flex-row justify-center align-center">
                              <div class="number-box d-flex justify-center align-center">
                                {{ toPersianNumber(3) }}
                              </div>
                              <p class="questions-card-title">آدرس ها و جزئیات</p>
                            </div>
                            <template v-slot:actions>
                              <v-icon color="#0ac974">keyboard_arrow_down</v-icon>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="questions-card-text">
                            <v-row
                              v-if="colsItem.dataType != 'internal'"
                              style="margin-top: 10px"
                            >
                              <v-col cols="12" md="6">
                                <v-text-field
                                  v-model="colsItem.dataUrl"
                                  outlined
                                  label="آدرس دریافت از سرور"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-select
                                  v-model="colsItem.isMore"
                                  outlined
                                  append-icon="keyboard_arrow_down"
                                  item-text="name"
                                  item-value="key"
                                  :items="isMoreList"
                                  label="آیا این ردیف دکمه بیشتر دارد؟"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  v-if="colsItem.isMore == true"
                                  v-model="colsItem.moreUrl"
                                  outlined
                                  label="آدرس دریافت اطلاعات بیشتر"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  v-if="colsItem.isMore == true"
                                  v-model="colsItem.name"
                                  outlined
                                  label="نام ردیف"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row
                              v-if="colsItem.layoutType != 'banner'"
                              style="margin-top: 10px"
                            >
                              <v-col cols="12">
                                <v-data-table
                                  style="
                                    border-radius: 5px;
                                    box-shadow: 0 4px 8px 0 rgba(19, 37, 71, 0.1);
                                  "
                                  hide-default-footer
                                  :headers="contentHeaders"
                                  :items="colsItem.content"
                                  :items-per-page="15"
                                  :search="search"
                                >
                                  <template v-slot:top>
                                    <div
                                      class="d-flex flex-row justify-space-between align-center"
                                      style="padding: 10px"
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
                                          تصاویر صفحه
                                        </h1>

                                        <span
                                          style="
                                            font-size: 11px;
                                            margin-top: 10px;
                                            margin-right: 20px;
                                            font-weight: unset;
                                            color: #2d3436;
                                          "
                                          >تمامی تصاویر این ردیف در این قسمت نمایش داده
                                          شده است
                                        </span>
                                      </div>
                                      <div></div>
                                      <div>
                                        <v-btn
                                          style="margin-top: 10px"
                                          rounded
                                          dark
                                          color="#00bf6f"
                                          @click="
                                            dialogVisibilite = false;
                                            dialogVisibilite = true;
                                          "
                                          >افزودن تصویر جدید
                                          <v-icon class="rounded-icon" color="#fff"
                                            >add</v-icon
                                          >
                                        </v-btn>

                                        <imageGalleryDialog
                                          :dialog="dialogVisibilite"
                                          selectable
                                          multi
                                          @selectedListener="selectedListener"
                                        ></imageGalleryDialog>
                                      </div>
                                    </div>
                                    <div
                                      style="
                                        height: 1px;
                                        width: 100%;
                                        background-color: #e0e4e7;
                                      "
                                    ></div>

                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                  </template>

                                  <template v-slot:no-data>
                                    <span>هنوز عکسی اضافه نشده</span>
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
                                  <template v-slot:item.alt="props">
                                    <v-edit-dialog
                                      :return-value.sync="props.item.alt"
                                      large
                                      persistent
                                      save-text="ذخیره"
                                      cancel-text="انصراف"
                                    >
                                      <div>{{ props.item.alt }}</div>
                                      <template v-slot:input>
                                        <div>افزودن متن جایگزین</div>
                                        <v-text-field
                                          v-model="props.item.alt"
                                          label="Edit"
                                          single-line
                                          counter
                                          autofocus
                                        ></v-text-field>
                                      </template>
                                    </v-edit-dialog>
                                  </template>
                                  <template v-slot:item.link="props">
                                    <v-edit-dialog
                                      :return-value.sync="props.item.link"
                                      save-text="ذخیره"
                                      cancel-text="انصراف"
                                      large
                                      persistent
                                    >
                                      <div>{{ props.item.link }}</div>
                                      <template v-slot:input>
                                        <div>افزودن متن جایگزین</div>
                                        <v-text-field
                                          v-model="props.item.link"
                                          label="Edit"
                                          single-line
                                          counter
                                          autofocus
                                        ></v-text-field>
                                      </template>
                                    </v-edit-dialog>
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
                                              @click="deleteSlider(item)"
                                            >
                                              <v-icon small>delete</v-icon>حذف اسلایدر
                                            </v-btn>
                                          
                                          </div>
                                        </v-list-item>
                                      </v-list>
                                    </v-menu>
                                  </template>
                                </v-data-table>
                              </v-col>
                            </v-row>
                            <v-row v-if="colsItem.layoutType === 'banner'">
                              <v-col cols="12" v-if="colsItem.content">
                                <div
                                  style="
                                    width: 100%;
                                    background-color: transparent;
                                    height: 250px;
                                    margin-top: 20px;
                                    border: 2px dashed #15d2ff;
                                  "
                                  class="d-flex justify-center align-center"
                                >
                                  <v-img
                                    width="250px"
                                    v-if="colsItem.content.image"
                                    :src="
                                      URL + '' + colsItem.content.image.url + '?width=600'
                                    "
                                  >
                                    <v-icon @click="deleteImage(i, item)" color="#0ac974"
                                      >cancel</v-icon
                                    >
                                  </v-img>
                                </div>
                              </v-col>
                              <v-row style="margin-top: 30px">
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    outlined
                                    label="متن تصویر"
                                    v-model="colsItem.content.alt"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    outlined
                                    label="آدرس تصویر"
                                    v-model="colsItem.content.link"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-col cols="12">
                                <v-btn
                                  style="margin-top: 10px"
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
                                  @selectedListener="selectedListener"
                                ></imageGalleryDialog>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                  </div>
                </v-container>

                <v-divider></v-divider>
                <div v-if="edit == false" style="margin-top: 10px">
                  <v-btn
                    color="#2b4a83"
                    v-if="!isloading"
                    rounded
                    dark
                    style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                    @click="addCols()"
                  >
                    افزودن ستون</v-btn
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
                    @click="editCols()"
                  >
                    ویرایش ستون</v-btn
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
import imageGalleryDialog from "~/components/gallery/imageGalleryDialog";
export default {
  layout: "panel",
  components: {
    imageGalleryDialog,
  },
  data() {
    return {
      dialogVisibilite: false,
      panel: [0, 1],
      isMoreList: [
        {
          name: "بله",
          key: true,
        },
        {
          name: "خیر",
          key: false,
        },
      ],
      dataType: [
        {
          name: "محصول",
          key: "product",
        },
        {
          name: "داخلی",
          key: "internal",
        },
        {
          name: "برند",
          key: "brand",
        },
        {
          name: "دسته بندی محصول",
          key: "category",
        },
      ],

      layoutType: [
        {
          name: "لیست افقی",
          key: "horizontalList",
        },
        {
          name: "بنر",
          key: "banner",
        },
        {
          name: "کاشی لیست",
          key: "gridlist",
        },
        {
          name: "اسلایدر",
          key: "slider",
        },
      ],
      headers: [
        {
          text: "نوع داده",
          align: "center",
          sortable: false,
          value: "dataType",
        },
        {
          text: "نوع طرح",
          align: "center",
          sortable: false,
          value: "layoutType",
        },

        {
          text: "رنگ پس زمینه",
          align: "center",
          sortable: false,
          value: "backgroundColor",
        },
        {
          text: "سایز ستون",
          align: "center",
          sortable: false,
          value: "size",
        },

        {
          text: "ویرایش",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      contentHeaders: [
        {
          text: "تصویر",
          align: "center",
          sortable: false,
          value: "image",
        },
        {
          text: "اسم تصویر",
          align: "center",
          sortable: false,
          value: "alt",
        },
        {
          text: "آدرس",
          align: "center",
          sortable: false,
          value: "link",
        },
         {
          text: "ویرایش",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],

      search: "",
      URL: url,
      isloading: false,
      desserts: [],
      colsItem: {
        dataType: "",
        layoutType: "",
        backgroundColor: "",
        size: {
          lg: "",
          md: "",
          sm: "",
          xs: "",
        },
        padding: "0 0 0 0",
        margin: "0 0 0 0",
        dataUrl: "",
        isMore: false,
        moreUrl: "",
        content: {},
        radius: "0 0 0 0",
        name: "",
      },
      valid: true,
      edit: false,
      addDialog: false,
      modeRules: [(v) => !!v || "مد ستون فیلد اجباری است"],

      AddressRules: [(v) => !!v || "آدرس ستون فیلد اجباری است"],
      pageId: this.$route.params.pageId,
      rowId: this.$route.params.rowId,
    };
  },
  methods: {
    deleteSlider(item) {
   
      var index = this.colsItem.content.indexOf(item);
      if (index > -1) {
        this.colsItem.content.splice(index, 1);
      }
    },
    deleteImage(item, image) {
     this.colsItem.content={}
    },
    selectedListener(item) {
      if (this.colsItem.layoutType === "banner") {
        this.colsItem.content = {
          alt: "#",
          link: "#",
          image: item,
        };
      }
      for (var a = 0; a < item.length; a++) {
        this.colsItem.content.push({
          alt: "#",
          link: "#",
          image: item[a],
        });
      }

      this.dialogVisibilite = false;
    },
    sizeToString(size) {
      let data = "";
      if (size.lg) {
        data += `lg=${size.lg},`;
      }
      if (size.md) {
        data += `md=${size.md},`;
      }
      if (size.sm) {
        data += `sm=${size.sm},`;
      }
      if (size.xs) {
        data += `xs=${size.xs}`;
      }
      return data;
    },
    editCols() {
      if (this.$refs.colForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;

        return this.$axios
          .$put(
            url + `api/pages/${this.pageId}/rows/${this.rowId}/cols/${this.colsItem._id}`,
            this.colsItem,
            {
              headers,
            }
          )
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "ستون با موفقیت ویرایش شد",
              });
              self.addDialog = false;
              self.getCols();
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
    addCols() {
      if (this.$refs.colForm.validate()) {
        //  this.productitem.subSections = [];
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;

        return this.$axios
          .$post(
            url + `api/pages/${this.pageId}/rows/${this.rowId}/cols`,
            this.colsItem,
            {
              headers,
            }
          )
          .then((data) => {
            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "ستون با موفقیت اضافه شد",
              });
              self.isloading = false;
              self.addDialog = false;
              self.getCols();
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
      (this.colsItem = {
        dataType: "",
        layoutType: "",
        backgroundColor: "",
        size: {
          lg: "",
          md: "",
          sm: "",
          xs: "",
        },
        padding: "0 0 0 0",
        margin: "0 0 0 0",
        dataUrl: "",
        isMore: false,
        moreUrl: "",
        content: [],
        name: "",
        radius: "0 0 0 0",
      }),
        (this.edit = false);
      this.addDialog = true;
    },
    closedialog() {
      this.addDialog = false;
    },
    editDialogPage(item) {
      this.addDialog = true;
      this.edit = true;
      this.colsItem = item;
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,

    deleteCols(item) {
      const index = this.desserts.indexOf(item);
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };
      var self = this;
      let id = item._id;
      if (confirm("آیا مطمئن هستید میخواهید این ستون را حذف کنید؟")) {
        this.$axios
          .$delete(url + `api/pages/${this.pageId}/rows/${this.rowId}/cols/${id}`, {
            headers,
          })

          .then(function (data) {
            if (data.success == true) {
              self.$notify.success({
                title: "تایید",
                message: ".ستون با موفقیت حذف شد",
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
    async getCols() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      try {
        let data = await this.$axios.$get(
          url + `api/pages/${this.pageId}/rows/${this.rowId}/cols`,
          {
            headers,
          }
        );

        this.desserts = data.body;
      } catch (error) {}
    },
  },
  created() {
    this.getCols();
  },
};
</script>

<style scoped>
._title_sections {
  font-size: 28px;
  color: #000511;
  position: relative;
  text-align: center;
  margin: 30px auto;
  z-index: 2;
}

._title_sections ._txt {
  background: #f4f7f6;
  padding: 0 40px;
  font-size: 20px;
  font-weight: bold;
  font-family: vazir-medium;
  color: #0b2c6e;
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

.number-box {
  width: 35px;
  height: 35px;
  background-color: #0ac97310;
  border-radius: 10px;
  text-align: right;
  font-weight: bold;
  color: #0ac973;
  font-family: vazir-bold;
  font-size: 25px;
  margin-top: -15px;
  margin-left: 20px;
  padding: 5px;
}

.questions-title {
  text-align: center;
  padding: 40px 0;
  width: 100%;
}

.questions-card {
  box-shadow: 0 6px 27px 7px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
  border-radius: 10px;
  text-align: right;
}

.questions-card-title {
  color: #0b2c6e;
  font-size: 20px;
  cursor: pointer;
  line-height: 44px;
  padding-bottom: 10px;
  padding-top: 10px;
  text-align: right;
  font-family: vazir-medium;
}

.questions-card-text {
  font-size: 15px;
  color: #0b2c6e;
  line-height: 44px;
  background-color: #f4f7f6;
}

.box-title h2,
.questions-title h2 {
  margin-bottom: 0;
  font-family: "vazir-medium";
  font-size: 25px;
  color: #0b2c6e;
}

.box-title h2 span,
.questions-title h2 span {
  font-size: 25px;
  color: #0ac973;
  font-family: "vazir-medium";
}

.questions-title {
  text-align: center;
  padding: 40px 0;
  width: 100%;
}

.questions-card-title {
  font-size: 15px !important;
}

.questions-card {
  display: block !important;
  background-color: #fff !important;
  text-align: right !important;
  margin-bottom: 24px !important;
  border-radius: 10px !important;
}

.questions-title h2,
.line {
  display: none;
}

.d-flex {
  flex-direction: column;
}

.property {
  margin-right: 0px !important;
}

.titr-2 {
  font-size: 12px !important;
  text-align: center !important;
}

.box-titr {
  height: 64px !important;
  width: 64px !important;
  margin: 0 auto 8px !important;
}

.m-container {
  border-radius: 20px !important;
  padding: 24px 0 !important;
}

.titr {
  font-size: 25px;
  text-align: center !important;
}

.titr-p {
  display: none;
}
</style>
