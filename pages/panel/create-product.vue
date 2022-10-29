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
            اطلاعات محصول جدید
          </v-tab>
          <v-tabs-items v-model="tab">
            <div style="border-bottom: 1px solid #e6e9ed; width: 100%"></div>

            <v-tab-item value="productInfo">
              <productInfo></productInfo>
            </v-tab-item>
             
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import { url } from "~/static/URL.js";
import productInfo from "~/components/product/productInfo.vue";

export default {
  layout: "panel",
  components: {
    productInfo: productInfo,
   
  },
  data() {
    return {
      URL: url,
      tab: 0,
    };
  },
};
</script>

<style scoped>
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
