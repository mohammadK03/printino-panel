<template>
  <v-app style="background: #eaecef !important">
    <v-container class="d-flex justify-center align-center">
      <v-col
        cols="12"
        lg="10"
        md="10"
        class="d-flex flex-row flex-wrap align-self-center"
        style="
          background-color: #fff;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 1px 1px 19px 13px #f1f1f1;
        "
      >
       
          <p class="order-title">سفارشات فرات
            <span>furat</span>
          </p>
          <div class="line-bottom">
            <span></span>
          </div>
           <tranactionInfo></tranactionInfo>
       
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import { url } from "~/static/URL.js";
import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
import tranactionInfo from "~/components/transaction/tranactionInfo.vue";

export default {
  layout: "panel",
  components: {
    tranactionInfo,
  },
  data() {
    return {
      URL: url,
      valid: true,
      isloading: false,
      URL: url,
      transactionitem: {
        images: [],
        name: "",
        price: "",
        details: "",
        discountPercent: 0,
        subSectionId: "",
        attributes: [],
        sizes: [],
        productType: "none",
      },
    };
  },
  methods: {
    async getTransaction() {
      let headers = {
        authorization: localStorage.getItem("adminToken"),
      };

      let id = this.$route.params.id;

      try {
        let data = await this.$axios.$get(url + "api/shop/product/" + id, {
          headers,
        });

        this.productitem = data.body;
      } catch (error) {}
    },
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,
  },
  created() {
    this.getTransaction();
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
</style>