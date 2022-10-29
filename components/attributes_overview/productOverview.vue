<template>
  <div style="width: 100%" class="d-flex justify-center flex-column">
    <div class="d-flex flex-row justify-start info_tab">
      <div class="d-flex flex-column">
        <span style="font-family: vazir-bold">
          <v-icon color="primary">keyboard_arrow_left</v-icon>
          توضیحات محصول</span
        >
      </div>
    </div>
    <v-container
      class="d-flex align-start"
      style="text-align: right; float: right"
    >
      <p
        style="
          border-radius: 12px;
          padding: 42px 50px;
          background-color: #f9fafb;
          color: #4d4d4d;
        "
      >
        {{ overview }}
      </p>
    </v-container>
  </div>
</template>


<script>
export default {
  props: {
    overview: "",
  },
  data() {
    return {};
  },
};
</script>


<style scoped>
.info_tab {
  margin-top: 20px;
  height: 50px;
  align-items: center;

  padding-right: 16px;
  border-radius: 8px;
  width: 100%;
}
.tabs-info{
    background: #f9fafb;
    color: #4d4d4d;
    font-size: 14px;
}
</style>










<style scoped>
.info_tab {
  margin-top: 20px;
  height: 50px;
  align-items: center;

  padding-right: 16px;
  border-radius: 8px;
  width: 100%;
}
.tabs-info {
  background: #fafafa;
  color: #4d4d4d;
  font-size: 14px;
}
</style>