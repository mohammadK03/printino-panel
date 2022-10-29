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
                نظرات
              </h1>

              <span
                style="
                  font-size: 11px;
                  margin-top: 10px;
                  margin-right: 20px;
                  font-weight: unset;
                  color: #2d3436;
                "
                >تمامِ نظراتی که برای  فرات ارسال<br />
                کرده‌اند، در این صفحه لیست شده‌اند:
              </span>
            </div>

            <div>
              <!-- <v-btn rounded dark color="#2b4a83" @click="addticket()">
                <v-icon>add</v-icon>
                <span style="letter-spacing: normal">ارسال تیکت جدید</span>
              </v-btn> -->
            </div>
          </div>
          <div
            style="height: 1px; width: 100%; background-color: #e0e4e7"
          ></div>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </template>

        <template v-slot:no-data>
          <span>برای شما نظری ثبت نشده است</span>
        </template>

        <template v-slot:item.tid="{ item }">
          <span>{{ toPersianNumber(item.tid) }}</span>
        </template>
        <template v-slot:item.updatedAt="{ item }">
          <span>{{ toPersianNumber(returnDate(item.updatedAt)) }}</span>
          <span>{{ toPersianNumber(returnTime(item.updatedAt)) }}</span>
        </template>
        <template v-slot:item.status="{ item }">
          <span v-if="item.status === 'open'">باز</span>
          <span v-if="item.status === 'pending'">باز</span>
          <span v-if="item.status === 'close'">بسته</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="openMessage(item)" small class="mr-2">textsms</v-icon>
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
                  >تیکت جدید</span
                >
              </div>
              <div>
                <v-icon color="#757575" @click="addDialog = false"
                  >close</v-icon
                >
              </div>
            </div>
            <v-form
              ref="ticketform"
              v-model="valid"
              style="padding: 0px"
              lazy-validation
            >
              <div
                class="d-flex flex-row justify-center align-center flex-wrap"
                style="margin-top: 20px"
              >
                <v-col cols="12" class="padding-4">
                  <v-text-field
                    label="عنوان تیکت"
                    placeholder="عنوان تیکت"
                    :rules="subjectRules"
                    v-model="ticketItem.subject"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="padding-4">
                  <v-textarea
                    required
                    label="متن تیکت"
                    v-model="ticketItem.text"
                    :rules="textRules"
                    placeholder="متن تیکت"
                    outlined
                  ></v-textarea>
                </v-col>
              </div>
            </v-form>
            <div>
              <v-btn
                color="#2b4a83"
                rounded
                dark
                style="box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)"
                @click="addTicket()"
              >
                ارسال تیکت</v-btn
              >
              <v-progress-circular
                v-if="isloading"
                indeterminate
                color="purple"
              ></v-progress-circular>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <!-- message dialog -->
      <v-dialog
        v-model="messageDialog"
        persistent
        max-width="400"
        style="border-radius: 25px !important"
      >
        <v-card elevation="0" style="padding: 10px" class="back-img">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row justify-space-between align-center">
              <div class="d-flex flex-row justify-center align-center">
                <v-icon class="rounded-icon" color="#00b894"
                  >insert_comment</v-icon
                >
                <span
                  style="
                    font-family: vazir-bold;
                    font-size: 18px;
                    color: #2d3436;
                    margin-right: 10px;
                  "
                  >{{ ticket.subject }}</span
                >
              </div>
              <div>
                <v-icon color="#757575" @click="messageDialog = false"
                  >close</v-icon
                >
              </div>
            </div>
            <v-form
              ref="messageform"
              v-model="valid"
              style="padding: 0px"
              lazy-validation
            >
              <div
                class="d-flex flex-row justify-center align-center flex-wrap"
                style="margin-top: 20px"
              >
                <v-col cols="12" class="padding-4">
                  <div class="d-flex flex-column background-chat">
                    <div
                      v-for="(item, i) in ticket.messages"
                      :key="i"
                      class="d-flex flex-column"
                    >
                      <div
                        class="d-flex justify-end"
                        v-if="item.with === 'admin'"
                      >
                        <span
                          style="
                            background: #fff;
                            border-radius: 20px;
                            border-bottom-left-radius: 0;
                            padding: 10px;
                          "
                        >
                          {{ item.text }}
                        </span>
                      </div>
                      <div v-else class="d-flex justify-start">
                        <span
                          style="
                            background: #f0fddf;
                            border-radius: 20px;
                            border-bottom-right-radius: 0;
                            padding: 10px;
                          "
                        >
                          {{ item.text }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-row justify-center align-center direction:rtl"
                  >
                  <v-btn
                      @click="addMessage(ticket._id)"
                      icon
                      style="margin-bottom: 30px"
                    >
                      <v-icon>send</v-icon>
                    </v-btn>
                    <v-text-field
                      v-model="messages.text"
                      :rules="messagesRules"
                      solo
                      placeholder="متن پیام را وارد کنید"
                    >
                    </v-text-field>
                    

                    <v-progress-circular
                      v-if="isloading"
                      indeterminate
                      color="purple"
                    ></v-progress-circular>
                  </div>
                </v-col>
              </div>
            </v-form>
            <div></div>
          </div>
        </v-card>
      </v-dialog>
      <div class="text-xs-center pt-2">
        <v-pagination
          v-model="page"
          prev-icon="keyboard_arrow_left"
          next-icon="keyboard_arrow_right"
          :length="conutPage"
          @input="next"
          circle
          color="#2b4a83"
        ></v-pagination>
      </div>
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
      addDialog: false,
      messageDialog: false,
      page: 1,
      conutPage: 0,
      isloading: false,
      ticketItem: {
        subject: "",
        text: "",
      },
      messages: {
          text:""
      },
      headers: [
        {
          text: "شناسه",
          align: "center",
          sortable: false,
          value: "tid",
        },
        {
          text: "عنوان",
          align: "center",
          sortable: false,
          value: "subject",
        },
        {
          text: "آخرین بروزرسانی",
          value: "updatedAt",
          sortable: false,
          align: "center",
        },
        {
          text: "وضعیت",
          value: "status",
          sortable: false,
          align: "center",
        },
        {
          text: "بازخورد",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      desserts: [],
      valid: true,
      ticket: [],
      subjectRules: [(v) => !!v || "عنوان تیکت  فیلد اجباری است"],
      messagesRules: [(v) => !!v || "متن پیام  فیلد اجباری است"],
      textRules: [(v) => !!v || "متن تیکت  فیلد اجباری است"],
    };
  },
  methods: {
    openMessage(item) {
      this.ticket = item;
      this.messageDialog = true;
    },
    addticket() {
      this.ticketItem = {
        subject: "",
        text: "",
      };
      this.addDialog = true;
    },
    returnDate(date) {
      if (date) {
        date = new Date(date).toLocaleDateString("fa-IR");
      } else {
        date = "تاریخ ثبت نشده است";
      }

      return date;
    },
    returnTime(date) {
      if (date) {
        date = new Date(date).toLocaleTimeString("fa-IR");
      } else {
        date = "ساعت ثبت نشده است";
      }

      return date;
    },
    next(page) {
      this.getTicket(page);
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,
    addMessage(id) {
      if (this.$refs.messageform.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
  
        return this.$axios
          .$post(url + "api/tickets/" + id + "/messages", this.messages ,{headers})
          .then((data) => {
            self.isloading = false;
           
            if (data.success && data.message === "message_added") {
              self.$notify.success({
                title: "تایید",
                message: "پیام با موفقیت ارسال شد",
              });

              self.messageDialog = false;
              self.getTicket(self.page);
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
    addTicket() {
      if (this.$refs.ticketform.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        let self = this;
        return this.$axios
          .$post(url + "api/tickets/", this.ticketItem, { headers })
          .then((data) => {
            self.isloading = false;

            if (data.success && data.message === "ticket_added") {
              self.$notify.success({
                title: "تایید",
                message: "تیکت با موفقیت ارسال شد",
              });

              self.addDialog = false;
              self.getTicket(self.page);
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
    async getTicket(page) {
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };

        try {
          let data = await this.$axios.$get(url + "api/tickets?page=" + page, {
            headers,
          });

          if (data) {
            this.desserts = data.body.docs;
            this.conutPage = data.body.totalPages;
            this.page = data.body.page;
          }
        } catch (error) {}
      }
    },
  },
  created() {
    this.getTicket(this.page);
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
.background-chat {
  height: 400px;
  width: 100%;
}
.back-img {
  background-image: url("../../assets/background-chat.jpg");
}
</style>