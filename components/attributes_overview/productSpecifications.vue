<template>
  <div style="width: 100%" class="d-flex justify-center flex-column">
    <div class="d-flex flex-row justify-start info_tab">
      <div class="d-flex flex-column">
        <span style="font-family: vazir-bold">
            <v-icon color="primary">keyboard_arrow_left</v-icon>
            مشخصات محصول</span>
        
      </div>
    </div>
    <v-container fluid  class="d-flex  align-start" style="text-align:right;float:right" v-for="(item,i) in attributes" :key="i">
        <v-col cols="4" class="tabs-info">{{item.key}}</v-col>
         <v-col cols="1" ></v-col>
        <v-col cols="7" class="tabs-info">{{item.value}}</v-col>
    </v-container>
  </div>
</template>


<script>
export default {
    props:{
        attributes:Array,
      
    },
    data(){
        return{

        }
    }
}
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