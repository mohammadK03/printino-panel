<template>
<v-app style="background: #eaecef !important">
    <v-container>
        <v-data-table style="
          border-radius: 5px;
          box-shadow: 0 4px 8px 0 rgba(19, 37, 71, 0.1);
        " hide-default-footer :headers="headers" :items="desserts" :items-per-page="15" :search="search">
            <template v-slot:top>
                <div class="d-flex flex-row justify-space-between align-center" style="padding: 10px">
                    <div class="d-flex flex-column">
                        <h1 style="
                  font-size: 18px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                ">
                            سطرهای صفحه

                        </h1>

                        <span style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                ">تمامی سطر های این صفحه در این قسمت نمایش داده شده است
                        </span>
                    </div>
                    <div>
                        <v-text-field v-model="search" append-icon="search" label="جستجوی سطر" single-line filled dense rounded hide-details></v-text-field>
                    </div>
                    <div>
                        <v-btn rounded dark color="#2b4a83" @click="addDialogpage()">
                            <v-icon>add</v-icon>
                            <span style="letter-spacing: normal">افزودن سطر جدید</span>
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
                                <v-btn class="ma-1 remove-space" outlined :to="`/panel/pages/${$route.params.pageId}/rows/${item._id}/cols`">
                                    <v-icon small>add</v-icon> افزودن ستون
                                </v-btn>
                            </div>
                            <div>
                                <v-btn class="ma-1 remove-space" outlined @click="editDialogPage(item)">
                                    <v-icon small>edit</v-icon> ویرایش سطر
                                </v-btn>
                            </div>

                            <div>
                                <v-btn class="ma-1 remove-space" outlined @click="deleteRow(item)">
                                    <v-icon small>delete</v-icon>حذف سطر
                                </v-btn>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
            <template v-slot:no-data>
                <span>هنوز سطر ای اضافه نشده</span>
            </template>
            <template v-slot:item.fluid="{ item }">
                <span v-if="item.fluid==true">بله</span>
                <span v-if="item.fluid==false">خیر</span>
            </template>

        </v-data-table>
        <v-dialog v-model="addDialog" persistent max-width="400" style="border-radius: 25px !important">
            <v-card elevation="0" style="padding: 10px">
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row justify-space-between align-center">
                        <div class="d-flex flex-row justify-center align-center">
                            <v-icon class="rounded-icon" color="#00b894">add</v-icon>
                            <span style="
                    font-family: vazir-bold;
                    font-size: 18px;
                    color: #2d3436;
                    margin-right: 10px;
                  ">افزودن سطر</span>
                        </div>
                        <div>
                            <v-icon color="#757575" @click="closedialog()">close</v-icon>
                        </div>
                    </div>
                    <v-form ref="rowForm" v-model="valid" style="padding: 0px" lazy-validation>
                        <v-col cols="12" class="d-flex flex-wrap">

                            <div class="d-flex justify-center align-center" style="width:100%">

                                <v-select v-model="rowItem.fluid" outlined append-icon="keyboard_arrow_down" item-text="name" item-value="key" :items="items" label="آیا تمام صفحه است؟"></v-select>

                            </div>
                            <div class="d-flex justify-center align-center" style="width:100%">

                                <!-- <v-text-field :rules="AddressRules" outlined label="رنگ پس زمینه"></v-text-field> -->
                                <v-color-picker v-model="rowItem.backgroundColor" class="ma-2" dot-size="30"></v-color-picker>
                            </div>

                            <v-divider></v-divider>
                            <div v-if="edit==false" style="margin-top:10px">
                                <v-btn color="#2b4a83" v-if="!isloading" rounded dark style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)" @click="addRow()">
                                    افزودن سطر</v-btn>
                                <v-progress-circular v-if="isloading" indeterminate color="purple"></v-progress-circular>
                            </div>

                            <div v-else style="margin-top:10px">
                                <v-btn color="#2b4a83" v-if="!isloading" rounded dark style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)" @click="editRow()">
                                    ویرایش سطر</v-btn>
                                <v-progress-circular v-if="isloading" indeterminate color="purple"></v-progress-circular>
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
import {
    url
} from "~/static/URL.js";
import {
    toPersianNumber,
    formatPrice
} from "~/static/formatNumber.js";
export default {
    layout: "panel",
    data() {
        return {
            items: [{
                    name: "بله",
                    key: true
                },
                {
                    name: "خیر",
                    key: false
                }
            ],
            headers: [{
                    text: "رنگ پس زمینه",
                    align: "center",
                    sortable: false,
                    value: "backgroundColor",
                },
                {
                    text: "تمام صفحه",
                    align: "center",
                    sortable: false,
                    value: "fluid",
                },

                {
                    text: "ویرایش",
                    value: "actions",
                    sortable: false,
                    align: "center"
                },
            ],
            search: "",
            URL: url,
            isloading: false,
            desserts: [],
            rowItem: {
                backgroundColor: "",
                fluid: false
            },
            valid: true,
            edit: false,
            addDialog: false,
            modeRules: [

                (v) => !!v || "مد سطر فیلد اجباری است",
            ],

            AddressRules: [(v) => !!v || "آدرس سطر فیلد اجباری است"],
        }
    },
    methods: {
        editRow() {
            if (this.$refs.rowForm.validate()) {
                this.isloading = true;
                let headers = {
                    authorization: localStorage.getItem("adminToken"),
                };
                let self = this;
                let id = this.$route.params.pageId;
                return this.$axios
                    .$put(url + `api/pages/${id}/rows/${this.rowItem._id}`, this.rowItem, {
                        headers
                    })
                    .then((data) => {
                        self.isloading = false;
                        if (data.success) {
                            self.$notify.success({
                                title: "تایید",
                                message: "سطر با موفقیت ویرایش شد",
                            });
                            self.addDialog = false;
                            self.getPage();
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
        addRow() {
            if (this.$refs.rowForm.validate()) {
                //  this.productitem.subSections = [];
                this.isloading = true;
                let headers = {
                    authorization: localStorage.getItem("adminToken"),
                };
                let self = this;
                let id = this.$route.params.pageId;
                return this.$axios
                    .$post(url + `api/pages/${id}/rows`, this.rowItem, {
                        headers
                    })
                    .then((data) => {
                        if (data.success) {

                            self.$notify.success({
                                title: "تایید",
                                message: "سطر با موفقیت اضافه شد",
                            });
                            self.isloading = false;
                            self.addDialog = false;
                            self.getPage();
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
            this.rowItem = {
                    backgroundColor: "",
                    fluid: ""
                },
                this.addDialog = true;
        },
        closedialog() {

            this.addDialog = false;
        },
        editDialogPage(item) {
            this.addDialog = true;
            this.edit = true;
            this.rowItem = item;
           
        },
        toPersianNumber: toPersianNumber,
        formatPrice: formatPrice,

        deleteRow(item) {
            const index = this.desserts.indexOf(item);
            let headers = {
                authorization: localStorage.getItem("adminToken"),
            };
            var self = this;
            let id = this.$route.params.pageId;
            let rowId = item._id;
            if (confirm("آیا مطمئن هستید میخواهید این سطر را حذف کنید؟")) {
                this.$axios
                    .$delete(url + `api/pages/${id}/rows/` + rowId, {
                        headers,
                    })

                    .then(function (data) {
                       
                        if (data.success == true) {
                            self.$notify.success({
                                title: "تایید",
                                message: ".سطر با موفقیت حذف شد",
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
        async getPage() {
            let headers = {
                authorization: localStorage.getItem("adminToken"),
            };
            let id = this.$route.params.pageId;
            try {
                let data = await this.$axios.$get(
                    url + `api/pages/${id}/rows`, {
                        headers,
                    }
                );
               
                this.desserts = data.body;

            } catch (error) {}
        },

    },
    created() {
        this.getPage();
    },
}
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
