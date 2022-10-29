<template>
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
                  گالری تصاویر
                </h1>

                <span
                  style="
                    font-size: 11px;
                    margin-top: 10px;
                    margin-right: 20px;
                    font-weight: unset;
                    color: #2d3436;
                  "
                  >تمامی تصاویر فروشگاه شما در این صفحه لیست شده اند
                </span>
              </div>
              <div></div>
              <div>
                <v-btn
                  rounded
                  dark
                  color="#2b4a83"
                  @click="addDialog = !addDialog"
                >
                  <v-icon>add</v-icon>
                  <span style="letter-spacing: normal">
                    افزودن تصویر به گالری</span
                  >
                </v-btn>
              </div>
            </div>
            <div
              style="height: 1px; width: 100%; background-color: #e0e4e7"
            ></div>
            <div class="text-xs-left pt-2">
              <v-pagination
                v-model="page"
                prev-icon="keyboard_arrow_left"
                next-icon="keyboard_arrow_right"
                :length="conutPage"
                @input="next"
                color="#2b4a83"
              ></v-pagination>
            </div>
            <v-card-text>
              <v-row style="margin-top: 20px">
                <v-col
                  v-for="(image, i) in images"
                  :key="i"
                  class="d-flex child-flex"
                  cols="6"
                  lg="2"
                  md="4"
                >
                  <div class="d-flex flex-column">
                    <v-img
                    style="border-radius: 15px"
                      v-if="selectable"
                      @click="addSelectedItem(image)"
                      :src="URL + image.url + '?width=200'"
                      class="action-gallery"
                      :lazy-src="URL + image.url + '?width=20'"
                      aspect-ratio="1"
                      :class="{
                        selectable: selectable,
                        selectableClicked: image.selected,
                      }"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <v-img
                      v-else
                      :src="URL + image.url + '?width=200'"
                      class="action-gallery"
                      :lazy-src="URL + image.url + '?width=20'"
                      aspect-ratio="1"
                      style="border-radius: 15px"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <div class="d-flex justify-center align-center" >
                      <v-btn
                        icon
                        v-if="!selectable"
                        @click="deleteImage(image, i)"
                      >
                        <v-icon color="error">delete_forever</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions v-if="selectable">
              <v-spacer></v-spacer>
              <v-btn @click="passImage()" rounded dark color="#2b4a83">
                <v-icon>add</v-icon>
                <span style="letter-spacing: normal">افزودن تصویر</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
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
                    >عکس یا فیلم جدید</span
                  >
                </div>
                <div>
                  <v-icon color="#757575" @click="closedialog()">close</v-icon>
                </div>
              </div>
              <v-col cols="12">
                <div
                  class="d-flex justify-center align-center"
                  style="width: 100%"
                >
                  <file-pond
                    style="width: 100%"
                    :server="filePondOption"
                    accepted-file-types="image/jpeg, image/png,image/gif"
                    allow-multiple="true"
                    max-files="10"
                    labelFileTypeNotAllowed="فرمت فایل قابل پذیرش نیست"
                    fileValidateTypeLabelExpectedTypes="فرمت مجاز {allButLastType} یا {lastType}"
                    labelMaxFileSizeExceeded="حجم عکس میبایست  150 کیلوبایت باشد"
                    maxFileSize="150KB"
                    label-idle="آپلود عکس"
                  />
                </div>
              </v-col>
            </div>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { url } from "~/static/URL.js";
export default {
  layout: "panel",
  props: {
    multi: Boolean,
    selectable: Boolean,
  },
  data() {
    return {
      addDialog: false,
      isloading: false,
      valid: true,
      imageUploadPreview: {},
      URL: url,
      page: 1,
      conutPage: 0,
      images: [],
      selectedImages: [],
      selectedImage: {},
      filePondOption: {
        process: (fieldName, file, metadata, load, error, progress) => {
          const formData = new FormData();
          formData.append("image", file, file.name);

          const request = new XMLHttpRequest();

          request.open("POST", url + "api/uploads");
          request.setRequestHeader(
            "authorization",
            localStorage.getItem("adminToken")
          );

          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
          };
          let self = this;
          request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
              self.$notify.success({
                title: "تایید",
                message: "عکس  با موفقیت آپلود شد",
              });

              this.imageUploadPreview = request.responseText;

              load(request.responseText);
            } else {
              self.$notify.error({
                title: "خطا",
                message: "خطایی وجود دارید لطفا مجددا سعی کنید.",
              });
            }
          };

          request.send(formData);
        },
      },
    };
  },
  methods: {
    deleteImage(image, item) {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      var index = item;
      let self = this;

      if (confirm("آیا مطمئن هستید میخواهید این تصویر را حذف کنید؟")) {
        this.$axios
          .$delete(`${url}api/uploads/${image._id}`, {
            headers,
          })
          .then(function (data) {
            if (data != null) {
              if (index > -1) {
                self.$notify.success({
                  title: "تایید",
                  message: "تصویر با موفقیت حذف شد",
                });
                self.images.splice(index, 1);
                self.getGallery(self.page);
              }
            }
          });
      }
    },
    closedialog() {
      this.addDialog = false;
      this.getGallery(this.page);
    },
    next(page) {
      this.getGallery(page);
    },
    async getGallery(page) {
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        try {
          let resp = await this.$axios.$get(url + `api/uploads?page=${page}`, {
            headers,
          });

          let images = resp.body.docs;
          images.forEach((element) => {
            element.selected = false;
          });

          this.images = images;
          this.conutPage = resp.body.totalPages;
          this.page = resp.body.page;
        } catch (error) {}
      }
    },
    addSelectedItem(item) {
      if (!this.multi) {
        this.images.forEach((element) => {
          element.selected = false;
        });
      }
      item.selected = !item.selected;
      this.selectedImage.url = item.url;
    },
    passImage() {
      if (this.multi) {
        this.selectedImages = [];
        this.images.forEach((element) => {
          if (element.selected) {
            this.selectedImages.push({
              url: element.url,
              _id: element._id,
            });
          }
        });

        this.$emit("selectedListener", this.selectedImages);
      } else {
        this.$emit("selectedListener", this.selectedImage);
      }
    },
  },
  created() {
    this.getGallery(this.page);
  },
};
</script>

<style scoped>
.selectable {
  cursor: pointer;
}

.selectableClicked {
  border: 3px solid green;
}
</style>
