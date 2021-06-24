<template>
  <div id="productInfo" class="modal_wrap has_overlay" :class="{'is_show': showModal}">
    <div class="modal product">
      <div class="modal_head">
        <div class="ttl_area bar_ttl">
          <h3 class="ttl">제품 소개<small>지아 패브릭</small></h3>
        </div>
      </div>
      <div class="modal_body">
        <div class="product_area">
          <h4 class="product_ttl">제품구조/스펙</h4>
          <p class="product_intro">다양한 직물을 따뜻하고 고급스럽게 표현하는 벽지</p>
          <table class="product_info">
            <tr>
              <th>사이즈</th>
              <td>20</td>
              <th>권취</th>
              <td>15.5M / Roll(5평)</td>
            </tr>
            <tr>
              <th>포장단위</th>
              <td>4Roll / Box(20평)</td>
              <th>용도</th>
              <td>아파트,일반 주택, 빌라, 호텔, 기타 인테리어용</td>
            </tr>
          </table>
          <div class="prduct_img">
            <img src="/img/zin/@_zin_product_01.png" alt="제품 정보">
          </div>
        </div>
        <div class="product_feature_area">
          <h4 class="product_ttl">특장점 소개</h4>
          <div class="tabs">
            <div class="tab_node is_active">
              <button class="tab_item">친환경 품질 인증</button>
            </div>
            <div class="tab_node">
              <button class="tab_item">리얼 패브릭 스타일</button>
            </div>
            <div class="tab_node">
              <button class="tab_item">안정성</button>
            </div>
          </div>
          <div class="tab_cnt">
            <div class="quality_certification_area">
              <div class="quality_certification_txt">
                <h4 class="ttl">벽지업계 최초, 유럽섬유제품 품질인증 1등급(Baby Class) 획득</h4>
                <p>유럽섬유제품품질인증(Oeko-tex® standard 100)은<br>
                  의류/침구/완구/인테리어 자재 등 피부와 접촉이 일어나는 제품의 안전성을 판단할 수 있는 인증으로<br>
                  지인 벽지가 획득한 1등급 (Baby Class)은 3세 미만 영유아의 장난감 및 의류에 사용해도 되는 수준입니다.</p>
                <span>* 2019년 3월 유럽섬유제품 품질인증</span>
              </div>
              <div class="quality_certification_img">
                <img src="/img/zin/@_zin_product_02.png" alt="품질인증 이미지">
              </div>
            </div>
            <div class="quality_certification_area">
              <div class="quality_certification_txt">
                <h4 class="ttl">실크벽지 업계 최초 환경표지 획득</h4>
                <p>당사 주요 벽지는 한층 강화된 ‘환경표지인증’기준을 모두 충족하였습니다.</p>
                <span>* 2016년 11월 환경표지 인증</span>
              </div>
              <div class="quality_certification_img">
                <img src="/img/zin/@_zin_product_03.png" alt="친환경 표지 획득">
              </div>
            </div>
          </div>
        </div>
        <div class="recommendation_comment_area">
          <div class="recommendation_comment">
            <div class="comment_icon_area">
              <i class="ic ic_notice_c"></i>
              <p>추천코멘트</p>
            </div>
            <span>"패브릭의 패턴이나 질감이 좋아서 벽지로 사용하고 싶어도 가격이 엄두가 나지 않는다면 LG Z:IN 패브릭이 그 고민을 덜어줄 거예요.
                    실제의 질감과 패턴이 살아 있어 유니크하면서도 따뜻하고 고급스러운 공간을 연출합니다."</span>
          </div>
          <p class="cautionary_phrase">※ 표백제가 첨가된 풀은 벽지를 오염시킬 수 있습니다. 시공시에는 삼가하여 주시기 바랍니다.</p>
        </div>
        <div class="award_status_area">
          <h4 class="product_ttl">수상/선정 현황</h4>
          <div class="award_img_wrap">
            <div>
              <img src="/img/zin/@_zin_award_01.png" alt="수상인증 이미지">
              <p>유럽 섬유제품 품질 인증</p>
            </div>
            <div>
              <img src="/img/zin/@_zin_award_02.png" alt="수상인증 이미지2">
              <p>환경마크<br>한국환경산업기술원</p>
            </div>
            <div>
              <img src="/img/zin/@_zin_award_03.png" alt="수상인증 이미지3">
              <p>대한아토피협회</p>
            </div>
            <div>
              <img src="/img/zin/@_zin_award_04.png" alt="수상인증 이미지4">
              <p>올해의 녹색상품<br>녹색구매네트워크</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal_foot">
        <div class="btn_area grid grid_5">
          <div class="col col_4">
            <button>인증서/시험성적서 다운로드<i class="ic ic_download_c"></i></button>
          </div>
          <div class="col col_4">
            <button>홍보자료 다운로드<i class="ic ic_download_c"></i></button>
          </div>
          <div class="col col_4">
            <button>시공가이드 다운로드<i class="ic ic_download_c"></i></button>
          </div>
        </div>
      </div>
      <button class="close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Zinproduct",
  components: {

  },
  data() {
    return {
      activeIndex: 0,
      tabMenu: ["제품소개", "시공사례"],
      listItemData: [
        {
          itemID: 12,
          badges: ["new", "trend"],
          img: "/img/styling/@_item_thumb_01.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 100,
            comment: 20,
            view: 1000,
          },

        }, {
          itemID: 111,
          badges: null,
          img: "/img/styling/@_item_thumb_06.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어 작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 3,
          badges: ["new"],
          img: "/img/styling/@_item_thumb_02.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어 작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 4,
          badges: ["new"],
          img: "/img/styling/@_item_thumb_03.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          link: "./detail",
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        }, {
          itemID: 5,
          badges: null,
          img: "/img/styling/@_item_thumb_04.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: "999+",
            comment: "999+",
            view: "999+",
          },
        }, {
          itemID: 7,
          badges: null,
          img: "/img/styling/@_item_thumb_05.png",
          title: "작지만 알차게, 심플함이 돋보이는 18평 인테리어",
          link: "./detail",
          place: "서울특별시",
          tags: ["미니멀", "모던", "플랜테리어"],
          itemInfo: {
            scrap: 130,
            comment: 24,
            view: 1020,
          },
        },
      ],
      myScrapData: [1],
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$nuxt.$emit("htmlOverShow");
    },
  },
};
</script>

<style scoped>

</style>