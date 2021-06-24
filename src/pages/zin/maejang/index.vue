<template>
  <v-app id="container">
    <div id="wrap" class="section">
      <div id="map" style="width: 100%; height: 800px"></div>
    </div>
  </v-app>
</template>

<script>
// var mapOptions = {
//   center: new naver.maps.LatLng(37.3595704, 127.105399),
//   zoom: 10,
// };

// var map = new naver.maps.Map("map", mapOptions);

export default {
  name: "hello",

  data() {
    return {
      map: null,
      markers: [],
      infoWindows: [],
    };
  },

  mounted: function () {
    this.initMap();
    console.log(this.map);
  },
  methods: {
    s(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(position);
      console.log(latitude + " // " + longitude);

      const map = new naver.maps.Map(document.getElementById("map"), {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 20,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_TOP,
        },
      });
      var circle = new naver.maps.Circle({
        map: map,
        center: new naver.maps.LatLng(latitude, longitude),
        radius: 50,

        strokeColor: "#5347AA",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: null,
        fillOpacity: 0.1,
      });
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map: map,
      });

      this.markers.push(marker);
      var infoWindow = new naver.maps.InfoWindow({
        content: `<div class='pin_nation'><a href='http://www.naver.com/' target="_blank" class='pin_a'>
           <img src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MTVfMTgz%2FMDAxNjIzNzQ0OTg3NTY0.ose55qy4tc2y4dso4lD40LeyPOzp939UEcIus9jhojkg.ZFxLDSVKu1Kn0wkEqs-U7zXjUtLuL0BOrSCHnSUEF7wg.JPEG.bisoudevivre%2F1623744988419.jpg&type=a340' width="auto" height='auto' alt='' class='pin_flag_m'>
           <span class='pin_txt'><em>캐나다</em> <span class='spr spr_arrow'></span></span>
           <span class='spr spr_arr'></span>
       </a>
       <div class='pin'><span class='pin_blur'></span></div>
  


    </div>`,
        maxWidth: 140,
        backgroundColor: "#eee",
        borderColor: "#2db400",
        borderWidth: 5,
        anchorSize: new naver.maps.Size(30, 30),
        anchorSkew: true,
        anchorColor: "#eee",
      });
      this.infoWindows.push(infoWindow);

      naver.maps.Event.addListener(marker, "click", function (e) {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });

      // for (var i = 0; i < this.markers.length; i++) {
      //   naver.maps.Event.addListener(this.markers[i], "click", function (i) {
      // 			this.infoWindows[i].open(this.map, this.markers[i]);
      //   });
      // }
      this.map = map;
    },
    initMap() {
      navigator.geolocation.getCurrentPosition(this.s, (err) =>
        console.log(err + "에러에러")
      );
    },
  },
};
</script>

<style scoped>
</style>


