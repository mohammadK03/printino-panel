<template>
  <div class="d-flex flex-column">
    <div style="margin: 10px"></div>
    <div>
      <table style="width: 100%; text-align: center">
        <tr>
          <th>نام ویژگی</th>
          <th>مقدار</th>
          <th>ویرایش</th>
        </tr>
        <tr v-for="(item, i) in attributes" :key="i" style="text-align: center">
          <td style="background-color: #eee; border-radius: 10px">
            {{ item.key }}
          </td>
          <td style="background-color: #efefef; border-radius: 10px">
            {{ item.value }}
          </td>
          <td class="d-flex flex-column justify-center align-center">
            <v-btn icon color="error" @click="removeAttr(i)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td>
            <v-text-field
              v-model="key"
              dense
              outlined
              label="نام"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="value"
              dense
              outlined
              label="مقدار"
            ></v-text-field>
          </td>
          <td>
            <v-btn color="success" rounded @click="addAttr()">
              <v-icon>add_circle_outline</v-icon>
              افزودن ویژگی
            </v-btn>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attributes: Array,
  },
  data() {
    return {
      key: "",
      value: "",
   
    };
  },
  methods: {
    addAttr() {
      if(!this.attributes ||!Array.isArray(this.attributes)){
        this.attributes=[];
      }
      if (this.key && this.value) {
       
        this.attributes.push({ key: this.key + "", value: this.value + "" });
        this.key = "";
        this.value = "";
      } else {
        this.$notify.error({
          title: "خطا",
          message: "ابتدا نام و مقدار را پر نمایید",
        });
      }
    },
    removeAttr(i) {
      this.attributes.splice(i, 1);
    },
  },
};
</script>
<style scoped>
</style>