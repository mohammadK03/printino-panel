<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="show" max-width="400px">
        <v-card>
          <div
            style="width: 100%; padding: 10px; background-color: #e7e7e7"
            class="d-flex flex-row align-center justify-space-between"
          >
            <span style="font-size: 18px; margin-right: 10px">
              <v-icon>location_on</v-icon>
              انتخاب آدرس از نقشه
            </span>
            <v-btn @click="show = false" icon style="margin-left: 10px; float: left">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
          <div id="map"></div>
          <div class="d-flex align-center bottom-buy">
            <v-btn
              :disabled="lngLat.length < 1"
              color="#00bf6f"
              @click="showGetAddress = true"
              style="
               
                width: 90%;
                box-shadow: none !important;
                height: 45px;
                border-radius: 20px;
                font-size: 15px;
                color: #fff;
              "
            >
              <v-icon style="margin-left: 10px">location_on</v-icon>
              تایید موقعیت
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
      <addressAdd :visible="showGetAddress" :lngLat="lngLat" @close="showGetAddress = false" @end="end(end)" ></addressAdd>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
export default {
  props: ["visible"],

  data() {
    return {
      access_token: "",
      map: {},
      lngLat: [],
      showGetAddress:false,
    };
  },
  computed: {
    show: {
      get() {
        if (this.visible) {
          this.initMap();
        }
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.selectedAddress = null;
          this.params = "";
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    end(end){
      if(end){
  this.showGetAddress=false;
      this.show=false;
      }
    
    },
    initMap() {
      let self = this;
      setTimeout(() => {
        mapboxgl.accessToken =
          "pk.eyJ1IjoibW9oYW1tYWRhc2FkaSIsImEiOiJjanhnOW45MjkxNHZsM3BsN3ZlenE4Y28wIn0.gWYbY-LSHy1GlLVS741ljA";
        try {
          mapboxgl.setRTLTextPlugin(
            "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
            null,
            true
          );
        } catch (error) {}
        var map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [51.389, 35.6892],
          zoom: 11,
        });

        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });

        map.addControl(geolocate, "top-right");
        var marker = null;

        map.on("click", function (e) {
         
          if (marker != null) {
            marker.remove();
          }
          marker = new mapboxgl.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
          self.lngLat = [e.lngLat.lng, e.lngLat.lat];
        });
      }, 500);
    },
  },
  created() {},
};
</script>

<style scoped>
.bottom-buy {
  width: 100%;
  height: 65px;
  background-color: white;

  border-right: 1px solid #dfdfdf;
  box-shadow: 0px -4px 3px 0px #dadada59;
  display: flex;
  justify-content: center;

}

#map {
  width: 100%;
  height: 400px;
  text-align: left;
}
</style>
