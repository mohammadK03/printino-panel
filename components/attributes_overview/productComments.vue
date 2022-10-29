<template>
  <div style="width: 100%" class="d-flex justify-center flex-column">
    <div class="d-flex flex-row justify-start info_tab">
      <div class="d-flex flex-column">
        <span style="font-family: vazir-bold">
          <v-icon color="primary">keyboard_arrow_left</v-icon>
          نظرات کاربران</span
        >
      </div>
    </div>
    <v-container
      class="d-flex flex-column"
      style="
        text-align: right;
        float: right;
        border-radius: 12px;
        padding: 42px 50px;
        background-color: #f9fafb;
        color: #4d4d4d;
      "
    >
      <v-container v-if="comments.length >= 1">
        <div class="d-flex" v-for="(comment, i) in comments" :key="i">
          <div class="user-icon">
            <v-icon large>account_circle</v-icon>
          </div>

          <div class="details">
            <div class="title">
              <p>
                <span class="comment-title">{{ comment.title }}</span>
                <span class="comment-user">({{ comment.userId.name }})</span>
              </p>
              <p class="date"></p>
            </div>
            <p class="description">
              {{ comment.text }}
            </p>
            <div class="option d-flex justify-space-between">
              <p class="d-flex" v-if="comment.buyOffer === 'no'">
                <img src="~/assets/dislike.svg" alt="" />
                <span
                  style="
                    font-size: 14px;
                    font-weight: bold;
                    color: 646464;
                    margin-right: 16px;
                  "
                  >خرید این محصول را پیشنهاد نمی کنم.</span
                >
              </p>
              <p class="d-flex" v-if="comment.buyOffer === 'yes'">
                <img src="~/assets/like.svg" alt="" />
                <span
                  style="
                    font-size: 14px;
                    font-weight: bold;
                    color: 646464;
                    margin-right: 16px;
                  "
                  >خرید این محصول را حتماً پیشنهاد می کنم.</span
                >
              </p>
            </div>
          </div>
        </div>
      </v-container>
      <v-container v-else>
        <div style="display: flex; max-width: 917px">
          <div
            style="
              flex: 0.88;
              padding: 32px 0;
              border-bottom: 1px solid #ebebeb;
            "
          >
            <p
              style="
                border-radius: 6px;
                background-color: #f0f1f3;
                padding: 10px 20px 10px 47px;
              "
            >
              اولین نفر باشید که نظر می‌دهید.
            </p>
          </div>
        </div>
      </v-container>
      <div class="add-comment">
        <div class="empty"></div>
        <div class="d-flex flex-column" style="flex: 0.88">
          <p class="add-comment-title">ثبت نظر</p>
          <p class="add-comment-description">
            لطفا قبل از نوشتن نظر خود در مورد این محصول، قوانین و ضوابط را
            مطالعه کنید.
          </p>
          <v-form
            ref="commentForm"
            v-model="valid"
            style="padding: 0px"
            v-on:submit.prevent
          >
            <v-text-field
              label="عنوان نظر"
              :rules="titleRules"
              v-model="commentItem.title"
              filled
              dense
              rounded
            ></v-text-field>
            <v-textarea
              filled
              auto-grow
              label="نظر خود را بنویسید..."
              rows="4"
              row-height="30"
              shaped
              :rules="textRules"
              v-model="commentItem.text"
            ></v-textarea>
          </v-form>
          <div class="d-flex flex-row justify-space-between align-center">
            <v-radio-group hide-details v-model="commentItem.buyOffer" row>
              <v-radio
                on-icon="thumb_up"
                off-icon="thumbs_up_down"
                label="خرید این محصول را پیشنهاد می کنم."
                value="yes"
              >
              </v-radio>
              <v-radio
                on-icon="thumb_down"
                off-icon="thumbs_up_down"
                label="خرید این محصول را پیشنهاد نمی کنم."
                value="no"
                color="red"
              ></v-radio>
            </v-radio-group>
            <div class="btn-add-comment" @click="addComments()">ثبت نظر</div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>


<script>
import { url } from "~/static/URL.js";
export default {
  props: {
    comments: [],
    productId: "",
  },
  data() {
    return {
      valid: true,
      commentItem: {
        text: "",
        title: "",
        buyOffer: "",
      },
      titleRules: [(v) => !!v || "عنوان نظر فیلد اجباری است"],
      textRules: [(v) => !!v || "متن نظر فیلد اجباری است"],
    };
  },
  methods: {
    addComments() {
      if (this.$refs.commentForm.validate()) {
        this.isloading = true;
        let headers = {
          authorization: localStorage.getItem("userToken"),
        };
        let self = this;
        return this.$axios
          .$post(
            url + `api/products/${this.productId}/comments`,
            this.commentItem,
            {
              headers,
            }
          )
          .then((data) => {
            self.isloading = false;

            if (data.success) {
              self.$notify.success({
                title: "تایید",
                message: "نظرشما پس از تایید نمایش داده میشود",
              });
              self.commentItem = [];
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
      }
    },
  },
};
</script>

<style scoped>
.btn-add-comment {
  width: 133px;
  line-height: 50px;
  object-fit: contain;
  border-radius: 10px;
  background-color: #00bf6f;
  color: #fff;
  border: none;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.add-comment-title {
  font-size: 20px;
  font-weight: bold;
  color: #28292c;
  margin: 0;
}
.add-comment-description {
  color: #5d5d5d;
  font-size: 14px;
  margin: 16px 0 32px;
}
.empty {
  flex: 0.12;
}
.add-comment {
  display: flex;
  max-width: 917px;
  margin-top: 35px;
}
.option {
  margin-top: 40px;
}
.comment-user {
  font-size: 14px;
  color: #949597;
  margin-right: 12px;
}
.comment-title {
  font-size: 16px;
  font-weight: bold;
  color: #000003;
  display: inline-block;
}
.date {
  margin-right: 32px;
  font-size: 14px;
}
.description {
  margin: 16px 0;
  line-height: 1.57;
  font-size: 14px;
  color: #646464;
}
.user-icon {
  flex: 0.12;
  padding: 32px 0;
}
.title {
  display: flex;
  justify-content: flex-start;
}
.details {
  flex: 0.88;
  padding: 32px 0;
  border-bottom: 1px solid #ebebeb;
}
.info_tab {
  margin-top: 20px;
  height: 50px;
  align-items: center;

  padding-right: 16px;
  border-radius: 8px;
  width: 100%;
}
.tabs-info {
  background: #f9fafb;
  color: #4d4d4d;
  font-size: 14px;
}
</style>

