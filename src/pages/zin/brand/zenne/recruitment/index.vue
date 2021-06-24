<template>
  <v-app id="container">
    <main id="contents" class="zin_page zenne_page recruitment_page has_snb">
      <div class="mid_inner clearFix">
        <aside class="snb_sec divider_snb">
          <ProductSnb
            currentCate="브랜드 이야기"
            :currentMenu="currentMenu"
            :menuData="snb"
            :BannerShow="false"
          />
        </aside>
        <article class="divider_cnt">
          <div class="page_head">
            <div class="ttl_group has_elem">
              <div class="ttl_area">
                <h2 class="ttl">지엔느 모집 안내</h2>
              </div>
            </div>
          </div>
          <div class="page_body recruitment_about">
            <section class="zin_sec overview_sec">
              <div class="img_area">
                <img src="/img/zin/@_recruit_head.png" alt="recruitment" />
              </div>
              <div class="label_content overview_content">
                <div class="label_wrap">
                  <div class="ttl_area">
                    <h4 class="ttl">Recruitment</h4>
                  </div>
                </div>
                <div class="content_wrap">
                  <p>
                    공간에 대한 긴:생각을 함께 할 Z:ENNE(지엔느) 리크루팅에
                    관심을 가져주셔서 감사합니다.<br />
                    지엔느는 아래 요건에 해당하는 분들 대상, 소정의 선발 절차를
                    거쳐 모집합니다.
                  </p>
                </div>
              </div>
              <div class="label_content required_content">
                <div class="label_wrap"></div>
                <div class="required_wrap">
                  <ul class="clearFix">
                    <li class="flL">
                      <p>
                        만 25세 이상 ~ 50세 미만<br />인테리어 관심있는 대한민국
                        여성
                      </p>
                    </li>
                    <li class="flL">
                      <p>
                        만 25세 이상 ~ 50세 미만<br />인테리어 관심있는 대한민국
                        여성
                      </p>
                    </li>
                    <li class="flL">
                      <p>
                        만 25세 이상 ~ 50세 미만<br />인테리어 관심있는 대한민국
                        여성
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section class="zin_sec process_sec">
              <div class="label_content">
                <div class="label_wrap">
                  <div class="ttl_area">
                    <h4 class="ttl">Recruitment<br />Process</h4>
                  </div>
                </div>
                <div class="process_how_wrap">
                  <p>지원서 제출</p>
                  <p>1차 서류심사</p>
                  <p>2차 면접</p>
                  <span class="bar"></span>
                  <p>최종 선정</p>
                </div>
                <div class="process_img_wrap">
                  <img
                    src="/img/zin/@_recuit_process.png"
                    alt="recuitment process"
                  />
                </div>
              </div>
            </section>
            <section class="zin_sec contact_sec">
              <div class="label_content">
                <div class="label_wrap">
                  <div class="ttl_area">
                    <h4 class="ttl">Contact Us</h4>
                  </div>
                </div>
                <div class="email_wrap">
                  <div class="ttl_area">
                    <strong>E-MAIL</strong>
                  </div>
                  <div class="info_area">
                    <a href="mailto:zin_zinie@naver.com">zin_zinie@naver.com</a>
                  </div>
                </div>
                <div class="tel_wrap">
                  <div class="ttl_area">
                    <strong>TEL</strong>
                  </div>
                  <div class="info_area">
                    <div class="tel_num">
                      <a href="tel:1544-1893">1544-1893 /</a>
                      <a href="tel:080-005-4000">080-005-4000</a>
                    </div>
                    <div class="tel_time">
                      <span>문의 가능시간</span>
                      <span>평일 09:00~18:00 / 토, 일요일 및 공휴일 휴무</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="zin_sec recruit_list_sec">
              <div class="list_sec_body">
                <div class="recruit_list_wrap">
                  <div class="tbl_list">
                    <table>
                      <caption></caption>
                      <colgroup>
                        <col />
                        <col width="270" />
                        <col width="248" />
                      </colgroup>
                      <thead>
                        <tr class="news_list_ttl">
                          <th>제목</th>
                          <th>접수기간</th>
                          <th>진행상황</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in recruitmentList"
                          :key="index"
                        >
                          <td class="ttl">
                            <span @click="toDetail(item.seq)">{{ item.title }}</span>
                          </td>
                          <td class="date">
                            {{
                              $moment(item.fromDate.substr(0, 8)).format(
                                "YYYY.MM.DD"
                              )
                            }}
                            ~
                            {{
                              $moment(item.toDate.substr(0, 8)).format(
                                "YYYY.MM.DD"
                              )
                            }}
                          </td>
                          <td class="recruiting">
                            <span v-if="item.status.value == 1">진행중</span>
                            <span v-else class="recruit_end">마감</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="list_sec_foot">
                <Pagination
                  v-if="
                    recruitmentList !== null &&
                    recruitmentList.length > 0 &&
                    maxItems === null
                  "
                  :pageSize="10"
                  :currentNo="parseFloat(currentNo)"
                  :totalCount="totalCnt"
                  @changePage="callApi"
                />
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
import ProductSnb from "~/components/zinBrand/brandSnb";
import Pagination from "~/components/common/Pagination";
import snb from "~/assets/data/brandSnb.json";
export default {
  layout: "default",
  name: "recruitment",
  components: {
    ProductSnb,
    Pagination,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  mounted() {
    this.recruitList();
  },
  fetch() {},
  methods: {
    toDetail(seq){
     this.$router.push({
        path: "/zin/brand/zenne/recruitment/detail",
        query: { page: this.currentNo
        ,seq : seq
        },
      });
    },
    async recruitList() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/zinrRecruitSvcApi/svcZinrRecruitList",
            method: "get",
          },
          query: {
            _siteId: "zinoct",
            page: this.currentNo,
            size: 10,
          },
        });
        const listdata = this.$get(res, "data.items", []);
        const totalCnt = this.$get(res, "data.totalCount");
        this.totalCnt = totalCnt;
        this.recruitmentList = listdata;
      } catch (e) {
        alert("error");
        console.log(e);
      }
    },
    callApi(currentPage) {
      this.currentNo = currentPage;
      this.recruitmentList();
    },
  },
  data() {
    return {
      maxItems: null,
      totalCnt: 10,
      recruitmentList: [],
      currentNo: 1,
      currentMenu: {
        name: {
          dep1: "",
          dep2: "",
          dep3: "",
          dep4: "",
        },
        state: {
          dep1: false,
          dep2: false,
          dep3: false,
          dep4: false,
        },
      },
      snb: snb,
      //   recruitList: [
      //     {
      //       ttl: "2020 Z:ENNE 14기 모집",
      //       date: "2021.06.07 ~ 2020.06.10",
      //       recruit: true,
      //       link: "./detail",
      //     },
      //   ],
    };
  },
};
</script>

<style scoped>
</style>