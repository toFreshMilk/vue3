<template>
  <v-app id="container">
    <main id="contents" class="exhibition_page">
      <div class="mid_inner">
        <div class="page_head">
          <div class="ttl_area">
            <h2 class="ttl">전시매장 찾기</h2>
          </div>
        </div>
        <div class="page_body">
          <div class="sec_wrap">
            <div class="sec_group grid">
              <section class="ui_sec col col_3">
                <div class="sec_head">
                  <div class="tabs type_line grid">
                    <div
                      :class="tabShowNum === 1 ? 'is_active' : ''"
                      class="tab_node col col_6"
                    >
                      <button
                        @click="
                          [
                            (tabShowNum = 1),
                            changeMap(),
                            (showMarkerNum = null),
                          ]
                        "
                        class="tab_item"
                      >
                        빠른 검색
                      </button>
                    </div>
                    <div
                      :class="tabShowNum === 2 ? 'is_active' : ''"
                      class="tab_node col col_6"
                    >
                      <button
                        @click="
                          [
                            (tabShowNum = 2),
                            changeMap(),
                            (showMarkerNum = null),
                          ]
                        "
                        class="tab_item"
                      >
                        지역 검색
                      </button>
                    </div>
                  </div>
                </div>
                <!-- 빠른 검색 영역-->
                <div v-if="tabShowNum === 1" class="tab_cnt_area tab_1">
                  <div class="sec_body">
                    <div class="search_wrap">
                      <ZinSelectItem
                        :text-style="true"
                        :hrz-style="true"
                        setValue="전체"
                        @selVal="(value) => (this.gubun = value)"
                        :has_arw="true"
                        :selectData="storeCategory"
                        :inline="false"
                      />
                      <div
                        class="input_area search text"
                        @click="searchkeyword()"
                      >
                        <div class="input_box">
                          <input
                            type="text"
                            placeholder="매장명 또는 주소를 입력해주세요."
                            v-model="keyword"
                          />
                          <i id="searchIcon1" class="ic ic_search"></i>
                        </div>
                      </div>
                    </div>
                    <div class="result_wrap">
                      <div class="summary_area">
                        <p>
                          총
                          <span class="c_point3">{{
                            storeSearchResult_1.length
                          }}</span
                          >개의 매장이 검색되었습니다.
                        </p>
                      </div>
                      <div v-if="vbarYn" class="store_ls scroll_area" v-bar>
                        <div class="ls_inner">
                          <div
                            v-for="(item, index) in storeSearchResult_1"
                            @click="
                              [mapEvent(index + 1), (showMarkerNum = index)]
                            "
                            :key="'storeItem' + index"
                            :class="showMarkerNum === index ? 'is_active' : ''"
                            class="store_ls_item"
                          >
                            <div class="item_inner">
                              <div class="marker_area">
                                <figure class="full marker"></figure>
                                <span class="c_point3">{{ index + 1 }}</span>
                              </div>
                              <div class="info_area">
                                <span class="distance"
                                  >{{ item.distance.toFixed(2) }}km</span
                                >
                                <small class="store_cate c_point3">{{
                                  item.gubun
                                }}</small>
                                <h6 class="ttl">{{ item.shopName }}</h6>
                                <p class="location">{{ item.adres1 }}</p>
                                <span class="tel">{{
                                  item.phone | phone
                                }}</span>
                              </div>
                              <div class="btn_area full_btn_area">
                                <button
                                  @click="
                                    [
                                      modalShow('detailModal'),
                                      (showMarkerNum = index),
                                    ]
                                  "
                                  class="line btn h_m w_f"
                                >
                                  자세히 보기
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-else class="no_data_area">
                        <figure class="error"></figure>
                        <p>
                          검색된 매장이 없습니다.<br />
                          매장명 또는 주소를 다시 한 번 확인해주세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 지역 검색 영역-->
                <div v-if="tabShowNum === 2" class="tab_cnt_area tab_2">
                  <div class="sec_body">
                    <div class="search_wrap">
                      <ZinSelectItem
                        :text-style="true"
                        :hrz-style="true"
                        setValue="전체"
                        :has_arw="true"
                        :selectData="storeCategory"
                        :inline="false"
                      />
                    </div>
                    <div class="result_wrap">
                      <!-- depth1 지역 출력 -->
                      <div
                        v-if="locaDepth1Check === ''"
                        class="input_group depth_1_area"
                      >
                        <div class="ttl_area">
                          <h6 class="ttl">지역을 선택하세요</h6>
                        </div>
                        <div class="input_area radio type_btn">
                          <div class="input_box_wrap grid grid_5">
                            <div
                              v-for="(item, index) in locationCity"
                              :key="'location' + index"
                              class="input_box col col_4"
                            >
                              <label>
                                <input
                                  v-model="locaDepth1Check"
                                  @click="regiondepth2(item.regionCode)"
                                  :value="item.regionName"
                                  type="radio"
                                  name="location_depth1"
                                />
                                <span>{{ item.regionName }}</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- depth2 지역 출력 -->
                      <div
                        v-for="(item, index) in locationTown"
                        v-if="index == 0 && locaDepth1Check && !locaDepth2Check"
                        :key="'locationDep2_' + index"
                        class="input_group depth_2_area"
                      >
                        <div class="ttl_area">
                          <h6 class="ttl">
                            <button @click="locaDepth1Check = ''">
                              <i class="arw arw_list_left"></i>
                            </button>
                            {{ item.regionName }}
                          </h6>
                        </div>
                        <div class="input_area radio type_btn">
                          <div class="input_box_wrap grid grid_5">
                            <div
                              v-for="(item, index) in locationTown"
                              v-if="index != 0"
                              :key="'locaDepth2_' + index"
                              class="input_box col col_4"
                            >
                              <label>
                                <input
                                  @click="
                                    searchregion(
                                      locationTown[0].regionName,
                                      item.regionName
                                    )
                                  "
                                  v-model="locaDepth2Check"
                                  :value="item"
                                  type="radio"
                                  name="location_depth2"
                                />
                                <span>{{ item.regionName }}</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- depth3 검색 결과 출력 -->

                      <div v-if="locaDepth2Check" class="depth_3_area">
                        <div class="ttl_area">
                          <h6 class="ttl">
                            <button @click="locaDepth2Check = ''">
                              <i class="arw arw_list_left"></i>
                            </button>
                            {{ locaDepth1Check }}
                            {{ locaDepth2Check.regionName }}
                          </h6>
                        </div>
                        <div
                          v-if="storeSearchResult_2.length > 0"
                          class="store_ls scroll_area"
                          v-bar
                        >
                          <div class="ls_inner">
                            <div
                              v-for="(item, index) in storeSearchResult_2"
                              @click="showMarkerNum = index"
                              :key="'storeItem_2' + index"
                              :class="
                                showMarkerNum === index ? 'is_active' : ''
                              "
                              class="store_ls_item"
                            >
                              <div class="item_inner">
                                <div class="marker_area">
                                  <figure class="full marker"></figure>
                                  <span class="c_point3">{{ index + 1 }}</span>
                                </div>
                                <div class="info_area">
                                  <span v-if="item.distance" class="distance">{{
                                    item.distance
                                  }}</span>
                                  <small class="store_cate c_point3">{{
                                    item.gubun
                                  }}</small>
                                  <h6 class="ttl">{{ item.shopName }}</h6>
                                  <p class="location">{{ item.adres1 }}</p>
                                  <span class="tel">{{
                                    item.phone | phone
                                  }}</span>
                                </div>
                                <div class="btn_area full_btn_area">
                                  <button
                                    @click="
                                      [
                                        modalShow('detailModal'),
                                        (showMarkerNum = index),
                                      ]
                                    "
                                    class="line btn h_m w_f"
                                  >
                                    자세히 보기
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="map_sec col col_9">
                <div class="map_wrap">
                  <!-- <div class="map_area">
                    <figure style="background-image:url(/img/zin/@_exhibition_map.png)"></figure>
                  </div> -->
                  <div v-show="changeMapStatus" id="map" class="map_area"></div>
                  <div
                    v-show="!changeMapStatus"
                    id="map2"
                    class="map_area"
                  ></div>
                  <!-- <div v-if="tabShowNum === 1" class="location_wrap">
                    <div
                      v-for="(item, index) in storeSearchResult_1"
                      :key="'storeItem' + index"
                      :style="`left:${item.mapPosX}%; top:${item.mapPosY}%;`"
                      :class="showMarkerNum === index ? 'is_active' : ''"
                      class="location_item"
                    >
                      <div @click="showMarkerNum = index" class="marker_area">
                        <figure class="marker full"></figure>
                        <span class="c_point3">{{ index + 1 }}</span>
                      </div>
                      <div class="store_ls_item arrow_box">
                        <div class="item_inner">
                          <div class="info_area">
                            <span class="distance">{{ item.distance }}</span>
                            <small class="store_cate c_point3">{{
                              item.storeCate
                            }}</small>
                            <h6 class="ttl">{{ item.ttl }}</h6>
                            <p class="location">{{ item.location }}</p>
                            <span class="tel">{{ item.tel }}</span>
                          </div>
                          <div class="btn_area full_btn_area">
                            <button
                              @click="
                                [
                                  modalShow('detailModal'),
                                  (showMarkerNum = index),
                                ]
                              "
                              class="line btn h_m w_f"
                            >
                              자세히 보기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                  <!-- <div
                    v-if="tabShowNum === 2 && locaDepth2Check"
                    class="location_wrap"
                  >
                    <div
                      v-for="(item, index) in storeSearchResult_2"
                      :key="'storeItem' + index"
                      :style="`left:${item.mapPosX}%; top:${item.mapPosY}%;`"
                      :class="showMarkerNum === index ? 'is_active' : ''"
                      class="location_item"
                    >
                      <div @click="showMarkerNum = index" class="marker_area">
                        <figure class="marker full"></figure>
                        <span class="c_point3">{{ index + 1 }}</span>
                      </div>
                      <div class="store_ls_item arrow_box">
                        <div class="item_inner">
                          <div class="info_area">
                            <span class="distance">{{ item.distance }}</span>
                            <small class="store_cate c_point3">{{
                              item.storeCate
                            }}</small>
                            <h6 class="ttl">{{ item.ttl }}</h6>
                            <p class="location">{{ item.location }}</p>
                            <span class="tel">{{ item.tel }}</span>
                          </div>
                          <div class="btn_area full_btn_area">
                            <button
                              @click="
                                [
                                  modalShow('detailModal'),
                                  (showMarkerNum = index),
                                ]
                              "
                              class="line btn h_m w_f"
                            >
                              자세히 보기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <!-- 빠른검색 데이터 모달-->
      <ExhibitionDetailModal
        ref="detailModal"
        v-if="tabShowNum === 1"
        v-on:postModalShow="postModal()"
        v-on:contactModalShow="contactModal()"
        :store-data="storeSearchResult_1[showMarkerNum]"
      ></ExhibitionDetailModal>
      <!-- 지역검색 데이터 모달-->
      <ExhibitionDetailModal
        ref="detailModal"
        v-if="tabShowNum === 2"
        v-on:postModalShow="postModal()"
        v-on:contactModalShow="contactModal()"
        :store-data="storeSearchResult_2[showMarkerNum]"
      ></ExhibitionDetailModal>
      <!-- 전문점 시공사례 디테일 모달-->
      <ExhibitionPostModal
        ref="postModal"
        :post-data="postData"
      ></ExhibitionPostModal>
      <!-- 문의하기 모달 -->
      <ExhibitionContactModal ref="contactModalItem" />
    </main>
  </v-app>
</template>
<script>
import ZinSelectItem from "~/components/common/ZinSelectItem";
import ZinDialog from "~/components/common/ZinDialog";
import ExhibitionDetailModal from "~/components/zin/ExhibitionDetailModal";
import ExhibitionPostModal from "~/components/zin/ExhibitionPostModal";
import ExhibitionContactModal from "~/components/zin/ExhibitionContactModal";
export default {
  components: {
    ZinSelectItem,
    ExhibitionDetailModal,
    ExhibitionPostModal,
    ExhibitionContactModal,
  },
  computed: {},
  methods: {
    //region
    async region() {
      const res = await this.$nuxt.$fetch({
        api: {
          path: "/svc/shopSvcApi/shopRegionUppList",
          method: "get",
        },
        query: {
          _siteId: "zinoct",
        },
      });
      const listdata = this.$get(res, "data.items", []);
      this.locationCity = listdata;

      if (listdata.length > 0) {
        this.vbarYn2 = true;
      } else {
        this.vbarYn2 = false;
      }
    },
    async regiondepth2(regionCode) {
      const res = await this.$nuxt.$fetch({
        api: {
          path: "/svc/shopSvcApi/shopRegionUppList",
          method: "get",
        },
        query: {
          _siteId: "zinoct",
          regionCode: regionCode,
        },
      });
      const listdata = this.$get(res, "data.items", []);
      this.locationTown = listdata;

      if (listdata.length > 0) {
        this.vbarYn2 = true;
      } else {
        this.vbarYn2 = false;
      }
    },

    async searchregion(upper, region) {
      // const latitude = this.latY;
      // const longitude = this.lonX;
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/shopSvcApi/shopRegionSearchList",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            page: this.page,
            size: 30,
            uppRegionName: upper,
            regionName: region,
          },
        });
        const listdata = this.$get(res, "data.items", []);
        this.storeSearchResult_2 = listdata;

        if (listdata.length > 0) {
          this.vbarYn2 = true;
        } else {
          this.vbarYn2 = false;
        }

        //////////////////////////////////////////////////////////////
        function phone(value) {
          value = value.replace(/(\s*)/g, "");
          if (value.startsWith("02")) {
            if (value.length == 9) {
              return (
                value.substr(0, 2) +
                "-" +
                value.substr(2, 3) +
                "-" +
                value.substr(5, 4)
              );
            } else if (value.length == 10) {
              return (
                value.substr(0, 2) +
                "-" +
                value.substr(2, 4) +
                "-" +
                value.substr(6, 4)
              );
            }
          } else {
            if (value.length == 10) {
              return (
                value.substr(0, 3) +
                "-" +
                value.substr(3, 3) +
                "-" +
                value.substr(6, 4)
              );
            } else if (value.length == 11) {
              return (
                value.substr(0, 3) +
                "-" +
                value.substr(3, 4) +
                "-" +
                value.substr(7, 4)
              );
            }
          }
        }
        if (listdata.length > 0) {
          const map = new naver.maps.Map(document.getElementById("map2"), {
            center: new naver.maps.LatLng(listdata[0].latY, listdata[0].lonX),
            zoom: 13,
            zoomControl: true,
            zoomControlOptions: {
              position: naver.maps.Position.RIGHT_TOP,
            },
          });
          const markers = [];
          for (var item in listdata) {
            var remarker = new naver.maps.Marker({
              title: item,
              icon: {
                content:
                  `<div @click="showMarkerNum = index" class="marker_area">
                        <figure class="marker full"></figure>
                        <span class="c_point3">` +
                  (parseFloat(item) + 1) +
                  `</span></div>`,
                size: new naver.maps.Size(22, 35),
              },
              position: new naver.maps.LatLng(
                listdata[item].latY,
                listdata[item].lonX
              ),
              map: map,
            });
            markers.push(remarker);
          }

          // for(resultmarker in )
          const infoWindows = [];

          for (var item in listdata) {
            var reinfoWindow = new naver.maps.InfoWindow({
              borderColor: "#eee",
              borderWidth: 1,
              maxWidth: 500,
              anchorSize: new naver.maps.Size(30, 30),
              content:
                `<div class="store_ls_item arrow_box">
                        <div class="item_inner">
                          <div class="info_area">
                            <small class="store_cate c_point3">
                              ` +
                listdata[item].gubun +
                `
                            </small>
                            <h6 class="ttl"> ` +
                listdata[item].shopName +
                ` </h6>
                            <p class="location"> ` +
                listdata[item].adres1 +
                ` </p>
                            <span class="tel"> ` +
                phone(listdata[item].phone) +
                `  </span>
                          </div>
                          <div class="btn_area full_btn_area">
                            <button
                              onclick=""
                              class="line btn h_m w_f"
                            >
                              자세히 보기
                            </button>
                          </div>
                        </div>
                      </div>`,
            });
            infoWindows.push(reinfoWindow);
          }

          function getClickHandler(seq) {
            return function (e) {
              var marker = markers[seq],
                infoWindow = infoWindows[seq];

              if (infoWindow.getMap()) {
                infoWindow.close();
              } else {
                map.setCenter(markers[seq].getPosition());
                infoWindow.open(map, marker);
              }
            };
          }

          for (var i = 0, ii = markers.length; i < ii; i++) {
            naver.maps.Event.addListener(
              markers[i],
              "click",
              getClickHandler(i)
            );
          }
          this.infoWindows2 = infoWindows;
          this.markers2 = markers;
          this.map2 = map;
          this.changeMapStatus = false;
        }
      } catch (e) {
        alert("error");
        console.log(e);
      }
    },
    //빠른검색 함수
    async searchFast() {
      if (this.keyword == "" || this.keyword == null) {
        this.distance = 10;
      }
      // position
      const latitude = this.latY;
      //  position.coords.latitude;
      const longitude = this.lonX;
      // position.coords.longitude;
      // this.lonX = longitude;
      // this.latY = latitude;
      //////////////////////////////////////////////////////////////////
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/shopSvcApi/shopList",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            page: this.page,
            size: 30,
            keyword: this.keyword,
            gubun: this.gubun,
            distance: this.distance,
            latY: this.latY,
            lonX: this.lonX,
          },
        });
        const listdata = this.$get(res, "data.items", []);
        const totalCnt = this.$get(res, "data.totalCount");
        this.totalCnt = totalCnt;
        this.storeSearchResult_1 = listdata;

        if (listdata.length > 0) {
          this.vbarYn = true;
        } else {
          this.vbarYn = false;
        }

        //////////////////////////////////////////////////////////////
        function phone(value) {
          value = value.replace(/(\s*)/g, "");
          if (value.startsWith("02")) {
            if (value.length == 9) {
              return (
                value.substr(0, 2) +
                "-" +
                value.substr(2, 3) +
                "-" +
                value.substr(5, 4)
              );
            } else if (value.length == 10) {
              return (
                value.substr(0, 2) +
                "-" +
                value.substr(2, 4) +
                "-" +
                value.substr(6, 4)
              );
            }
          } else {
            if (value.length == 10) {
              return (
                value.substr(0, 3) +
                "-" +
                value.substr(3, 3) +
                "-" +
                value.substr(6, 4)
              );
            } else if (value.length == 11) {
              return (
                value.substr(0, 3) +
                "-" +
                value.substr(3, 4) +
                "-" +
                value.substr(7, 4)
              );
            }
          }
        }
        const map = new naver.maps.Map(document.getElementById("map"), {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: 13,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.RIGHT_TOP,
          },
        });
        var circle = new naver.maps.Circle({
          map: map,
          center: new naver.maps.LatLng(latitude, longitude),
          radius: this.distance * 1000,

          strokeColor: "#5347AA",
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: null,
          fillOpacity: 0.1,
        });

        const markers = [];

        var marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
        });
        markers.push(marker);
        for (var item in listdata) {
          var remarker = new naver.maps.Marker({
            title: item,
            icon: {
              content:
                `<div @click="showMarkerNum = index" class="marker_area">
                        <figure class="marker full"></figure>
                        <span class="c_point3">` +
                (parseFloat(item) + 1) +
                `</span></div>`,
              size: new naver.maps.Size(22, 35),
            },
            position: new naver.maps.LatLng(
              listdata[item].latY,
              listdata[item].lonX
            ),
            map: map,
          });
          markers.push(remarker);
        }

        // for(resultmarker in )
        const infoWindows = [];

        for (var item in listdata) {
          var reinfoWindow = new naver.maps.InfoWindow({
            borderColor: "#eee",
            borderWidth: 1,
            maxWidth: 500,
            anchorSize: new naver.maps.Size(30, 30),
            content:
              `<div class="store_ls_item arrow_box">
                        <div class="item_inner">
                          <div class="info_area">
                            <span class="distance"> ` +
              listdata[item].distance.toFixed(2) +
              `km</span>
                            <small class="store_cate c_point3">
                              ` +
              listdata[item].gubun +
              `
                            </small>
                            <h6 class="ttl"> ` +
              listdata[item].shopName +
              ` </h6>
                            <p class="location"> ` +
              listdata[item].adres1 +
              ` </p>
                            <span class="tel"> ` +
              phone(listdata[item].phone) +
              `  </span>
                          </div>
                          <div class="btn_area full_btn_area">
                            <button
                              onclick=""
                              class="line btn h_m w_f"
                            >
                              자세히 보기
                            </button>
                          </div>
                        </div>
                      </div>`,
          });
          infoWindows.push(reinfoWindow);
        }

        function getClickHandler(seq) {
          return function (e) {
            var marker = markers[seq],
              infoWindow = infoWindows[seq - 1];

            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              map.setCenter(markers[seq].getPosition());
              infoWindow.open(map, marker);
            }
          };
        }

        for (var i = 1, ii = markers.length; i < ii; i++) {
          naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
        }

        // naver.maps.Event.addListener(marker, "click", function (e) {
        //   if (infoWindow.getMap()) {
        //     infoWindow.close();
        //   } else {
        //     infoWindow.open(map, marker);
        //   }
        // });

        // for (var i = 0; i < this.markers.length; i++) {
        //   naver.maps.Event.addListener(this.markers[i], "click", function (i) {
        // 			this.infoWindows[i].open(this.map, this.markers[i]);
        //   });
        // }

        this.infoWindows = infoWindows;
        this.markers = markers;
        this.map = map;
      } catch (e) {
        alert("error");
        console.log(e);
      }
    },
    // initMap() {
    //   navigator.geolocation.getCurrentPosition(this.s, (err) =>
    //     console.log(err)
    //   );
    // },\

    mapEvent(index) {
      var marker = this.markers[index];
      var infoWindow = this.infoWindows[index - 1];
      this.map.setCenter(marker.getPosition());
      infoWindow.open(this.map, marker);
    },

    modalShow(name) {
      this.$nuxt.$emit("htmlOverHidden");
      setTimeout(() => {
        this.$refs[name].modalOpen = true;
      }, 10);
    },
    searchkeyword() {
      this.searchFast();
    },
    postModal() {
      this.$refs.postModal.postModalOpen = true;
    },
    contactModal() {
      console.log("ddd");
      this.$refs.contactModalItem.contactModalOpen = true;
    },
    locationInfoAgree() {
      this.$dialog.confirm(
        "현재 위치 정보를 검색하여 주변 전시매장을 검색합니다.",
        function () {},
        function () {},
        {
          btns: {
            submit: { label: "허용" },
            cancel: { label: "허용안함" },
          },
          title: "위치정보 사용 동의",
          motion: "fade",
          overlay: true,
        },
        "small"
      );
    },
    changeMap() {
      if (this.tabShowNum === 1) {
        this.locaDepth1Check = "";
        this.locaDepth2Check = "";
        this.changeMapStatus = true;
      } else if(this.tabShowNum === 2 && this.map2!=null){
        this.changeMapStatus = false;
      }
    },
  },
  data() {
    return {
      changeMapStatus: true,
      vbarYn: true,
      vbarYn2: true,
      totalCnt: 0,
      page: 1,
      size: "",
      keyword: "",
      gubun: "",

      distance: 10,
      latY: 37.55400257651526,
      lonX: 126.97489176244888,
      map: null,
      map2: null,
      markers: [],
      markers2: [],
      infoWindows: [],
      infoWindows2: [],
      myScrapData: [],
      tabShowNum: 1,
      showMarkerNum: null,
      locaDepth1Check: "",
      locaDepth2Check: "",
      storeCategory: [
        { value: "", text: "전체" },
        { value: "11", text: "LX지인 전시장" },
        { value: "09", text: "지인 인테리어 대리점" },
        { value: "01", text: "LX지인 창호 전문점" },
        { value: "02", text: "LX지인 스퀘어" },
        { value: "03", text: "LX하우시스 프리미엄관" },
        { value: "05", text: "전문관" },
      ],

      locationCity: [],
      locationTown: [],
      locationCategory: [
        {
          depth1: "서울",
          depth2: [
            "강남구",
            "강동구",
            "강북구",
            "강서구",
            "관악구",
            "광진구",
            "구로구",
            "노원구",
          ],
        },
        {
          depth1: "경기",
          depth2: ["경기", "경기", "경기", "경기", "경기"],
        },
        {
          depth1: "부산",
          depth2: [
            "부산",
            "부산",
            "부산",
            "부산",
            "부산",
            "부산",
            "부산",
            "부산",
          ],
        },
        {
          depth1: "대전",
          depth2: [
            "대전",
            "대전",
            "강북구",
            "강서구",
            "관악구",
            "광진구",
            "구로구",
            "노원구",
          ],
        },
        {
          depth1: "대구",
          depth2: [
            "대구",
            "대구",
            "대구",
            "대구",
            "대구",
            "대구",
            "대구",
            "대구",
          ],
        },
        {
          depth1: "울산",
          depth2: ["울산", "울산", "울산", "울산", "울산"],
        },
        {
          depth1: "광주",
          depth2: ["광주", "광주", "광주", "광주", "광주"],
        },
        {
          depth1: "강원",
          depth2: ["강원", "강원", "강원", "강원", "강원", "강원", "강원"],
        },
      ],

      storeSearchResult_1: [],
      storeSearchResult_2: [],
      postData: {
        storeCate: "인테리어 대리점",
        ttl: "(주)서보아이디",
        itemID: 101,
        postTitle: "강남서초오피스텔 시공사례",
        comment: "좁은 공간을 넓게! 시각적 효과",
        hash: ["미니멀", "모던", "플렌테리어", "클래식", "공간스타일"],
        date: "2021.03.01",
        scrapCount: "1,253",
        viewCount: "3,053",
        summary: [
          {
            ttl: "주거형태",
            cnt: "아파트",
          },
          {
            ttl: "공간",
            cnt: "주방,욕실,창호,벽지,바닥,도어",
          },
          {
            ttl: "평형",
            cnt: "30평대",
          },
          {
            ttl: "예산",
            cnt: "1천만원 이하",
          },
          {
            ttl: "가족형태",
            cnt: "신혼부부,싱글",
          },
          {
            ttl: "스타일",
            cnt: "모던",
          },
          {
            ttl: "컬러",
            color: ["#A27855", "#C9BCB6", "#212121"],
          },
          {
            ttl: "시공범위",
            cnt: "부분 리모델링,홈스타일링",
          },
          {
            ttl: "주거형태",
            cnt: "22일",
          },
        ],
      },
    };
  },
  mounted() {
    // this.locationInfoAgree();
    this.$nextTick();
    // this.initMap();
    this.searchFast();
    this.region();

    // const mapOptions = {
    //   center: new naver.maps.LatLng(37.3595704, 127.105399),
    //   zoom: 13,
    // };

    // let map = new naver.maps.Map("map", mapOptions);
  },
  filters: {
    phone(value) {
      value = value.replace(/(\s*)/g, "");
      if (value.startsWith("02")) {
        if (value.length == 9) {
          return (
            value.substr(0, 2) +
            "-" +
            value.substr(2, 3) +
            "-" +
            value.substr(5, 4)
          );
        } else if (value.length == 10) {
          return (
            value.substr(0, 2) +
            "-" +
            value.substr(2, 4) +
            "-" +
            value.substr(6, 4)
          );
        }
      } else {
        if (value.length == 10) {
          return (
            value.substr(0, 3) +
            "-" +
            value.substr(3, 3) +
            "-" +
            value.substr(6, 4)
          );
        } else if (value.length == 11) {
          return (
            value.substr(0, 3) +
            "-" +
            value.substr(3, 4) +
            "-" +
            value.substr(7, 4)
          );
        }
      }
    },
  },
};
</script>