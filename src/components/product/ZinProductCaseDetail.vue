<template>
  <div id="productInfoDetail" class="modal_wrap has_overlay" :class="{'is_show': showModal}">
    <div class="modal product">
      <div class="modal_head">
        <div class="ttl_area bar_ttl">
          <h3 class="ttl">시공사례<small>지아 패브릭</small></h3>
        </div>
      </div>
      <div class="modal_body">
        <div class="detail_head">
          <div class="visual_wrap">
            <figure style="background-image:url(/img/styling/@_myhome_visual.png)" class="bg"></figure>
          </div>
          <div class="ttl_wrap clearFix">
            <div class="ttl_area">
              <div class="ttl_inner">
                <h2 class="ttl">{{ pageTitle}}</h2>
              </div>
            </div>
            <div class="utility_wrap">
              <div class="info_area">
                <div class="place_area">
                  <p>{{ place }}</p>
                </div>
                <div class="txt_area">
                  <div class="info_group">
                    <div class="view">조회 {{ numSet(view) }}</div>
                  </div>
                </div>
              </div>
              <div class="btn_wrap">
                <div @click="function(){thisPostScrap = !thisPostScrap}" class="scrap_btn type_w" role="button">
                  <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>
                </div>
                <div class="share_btn_area btn_area">
                  <div @click="shareBtnToggle($event)" class="share_btn open_btn type_w" role="button">
                    <i class="ic ic_share"></i>
                  </div>
                  <div class="share_item_wrap type_arw_bottom arrow_box">
                    <div class="share_inner">
                      <button class="copy_link">
                        <div class="ic_area">
                          <i class="ic ic_copyLink"></i>
                        </div>
                        <p>링크복사</p>
                      </button>

                      <button class="kakao_link">
                        <div class="ic_area">
                          <i class="ic ic_kakao_l"></i>
                        </div>
                        <p>카카오톡</p>
                      </button>

                      <button class="facebook_link">
                        <div class="ic_area">
                          <i class="ic ic_facebook_l"></i>
                        </div>
                        <p>페이스북</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg_box">
                <dl class="label_txt">
                  <dt>평형</dt>
                  <dd>{{ info.size }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>주거형태</dt>
                  <dd>{{ info.type }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>스타일</dt>
                  <dd>{{ info.style }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>리모델링 범위</dt>
                  <dd>{{ info.range }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>리모델링 비용</dt>
                  <dd>{{ info.price }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>지역</dt>
                  <dd>{{ info.area }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>가족 구성원</dt>
                  <dd>{{ info.family }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>LG지인 시공 제품</dt>
                  <dd>{{ info.product }}</dd>
                </dl>
                <dl class="label_txt">
                  <dt>인테리어점</dt>
                  <dd class="chain_ls">
                    <span>{{ info.store.name }}</span>
                    <span>{{ info.store.tel }}</span>
                    <span>{{ info.store.homepage }}</span>
                  </dd>
                </dl>
                <dl class="label_txt">
                  <dt>기간</dt>
                  <dd>{{ info.term }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="detail_body">
          <section class="zin_sec content_sec">
            <div class="detail_inner">
              <div class="detail_frame">
                <div class="ttl_area">
                  <h3 class="ttl">현관</h3>
                </div>
                <div class="img_area">
                  <img src="/img/styling/@_myhome_drawing.png" alt="">
                </div>
                <div class="txt_area">
                  <p>
                    주방 바닥재 면적을 넓게 시공하면 기존보다 쾌적한 느낌의 조리 공간을 연출할 수 있습니다. 하우스 베실리우스 바닥재와 그레이 톤의 인테리어 필름을 입힌 주방가구로
                    바탕을 깔고 조명과 골드 액세서리로 포인트를 가미하면 꿈꾸던 주방이 현실이 됩니다.
                    주방가구 손잡이를 골드로 선택했다면 주방 창 손잡이는 망설임 없이 스쿼마 라인 골드 컬러로 맞춰주세요.
                  </p>
                </div>
                <div class="construction_list_group">
                  <div class="ttl_area">
                    <h5 class="ttl">Z:IN 시공 제품</h5>
                  </div>
                  <div class="construction_list clearFix">
                    <div v-for="(item, i) in constructionData" :key="'construction' + i" class="item_node">
                      <a href="#" class="construction_item">
                        <div class="thumb_area">
                          <figure class="thumb" :style="`background-image: url(${item.img})`"></figure>
                          <span class="type c_point3">{{ item.type }}</span>
                        </div>
                        <div class="txt_area">
                          <p class="brand">{{ item.brand }}</p>
                          <h6 class="ttl">{{ item.title }}</h6>
                          <p class="code">{{ item. code }}</p>
                        </div>
                      </a>
                    </div>
                    <div class="banner_node">
                      <a href="#" class="banner_item" :style="`background-image: url(${ banner.img })`">
                        <div class="txt_area">
                          <p class="sub">{{ banner.sub }}</p>
                          <h5 class="ttl">{{ banner.title }}</h5>
                        </div>
                        <span class="link">
                          <i class="arw arw_link_right"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="detail_frame">
                <div class="ttl_area">
                  <h3 class="ttl">주방 창호시공</h3>
                </div>
                <div class="video_area">
                  <div class="iframe_inner">
                    <client-only>
                      <video class="video-js vjs-default-skin vjs-big-play-centered" data-setup='{"fluid": true}' playsinline=""
                             webkit-playsinline preload="true" controls>
                        <source src="https://player.vimeo.com/external/417499289.hd.mp4?s=84efe0c22ebaf8b65891c156d3a45246d28d76a9&profile_id=175" type="video/mp4">
                      </video>
                    </client-only>
                  </div>
                </div>
                <div class="txt_area">
                  <p>베란다를 확장하여 샤시 시공을 베란다를 확장하여 샤시 시공을 다시 하고, 확장 부위에 등박스를 확대 시공하여 LED 스퀘어형 조명으로 교체하였습니다.</p>
                </div>

                <div class="construction_list_group">
                  <div class="ttl_area">
                    <h5 class="ttl">Z:IN 시공 제품</h5>
                  </div>
                  <div class="construction_list clearFix">
                    <div v-for="(item, i) in constructionData" :key="'construction' + i" class="item_node">
                      <div class="construction_item">
                        <div class="thumb_area">
                          <figure class="thumb" :style="`background-image: url(${item.img})`"></figure>
                          <span class="type c_point3">{{ item.type }}</span>
                        </div>
                        <div class="txt_area">
                          <p class="brand">{{ item.brand }}</p>
                          <h6 class="ttl">{{ item.title }}</h6>
                          <p class="code">{{ item. code }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="banner_node">
                      <a href="#" class="banner_item" :style="`background-image: url(${banner.img})`">
                        <div class="txt_area">
                          <p class="sub">처음처럼 깨끗하게</p>
                          <h5 class="ttl">벽지 청소&유지 관리법</h5>
                        </div>
                        <span class="link">
                          <i class="arw arw_link_right"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="zin_sec store_sec">
            <div class="ttl_area">
              <h3 class="ttl">시공 인테리어점</h3>
            </div>
            <div class="store_info_wrap">
              <div class="thumb_area">
                <figure class="thumb" style="background-image: url(/img/zin/@_thumb_main_08_01.png)"></figure>
              </div>
              <div class="txt_area">
                <ul class="dot_list">
                  <li>지인 우수인테리어점</li>
                  <li>홈앤디자인 </li>
                  <li>대표자 : 백나원 </li>
                  <li>주 소 : 경기도 용인시 수지구 풍덕천동 703-5</li>
                  <li>(031) 890-2250 / 010-2104-7716 </li>
                  <li>http://Blog.naver.com/bnw724259</li>
                </ul>
              </div>
            </div>
          </section>
          <section class="zin_sec qa_sec">
            <div class="ttl_area">
              <h3 class="ttl">3문 3답</h3>
            </div>
            <div class="qa_list">
              <div class="qa_item">
                <div class="q_area">
                  <div class="box">이번 인테리어 시공의 포인트는?</div>
                </div>
                <div class="a_area">
                  <div class="box">기존 확장 벽체, 창호, 바닥, 모두 철거 후 재시공 한 현장, 기존의 확장 거실 벽체와 창호, 바닥재 등 모두를 철거하고 전면 개보수하는 공정으로 리모델링 하였습니다.</div>
                </div>
              </div>
              <div class="qa_item">
                <div class="q_area">
                  <div class="box">이집 인테리어에서 가장 강조 하고픈 점은?</div>
                </div>
                <div class="a_area">
                  <div class="box">쿡탑을 창호 쪽으로 변경한 구조로 고객 니즈를 충족, 쿡탑을 주방 창쪽으로 변경한 씽크대 구조로 고객의 니즈를 반영하여 새집처럼 리뉴얼하였습니다.</div>
                </div>
              </div>
              <div class="qa_item">
                <div class="q_area">
                  <div class="box">홈앤디자인만의 장점 또는 강점은?</div>
                </div>
                <div class="a_area">
                  <div class="box">고객 니즈를 담은 뛰어난 실용성의 인테리어 구현.
                    고객 니즈를 바탕으로 가족구성원의 연령대, 직업, 취향 등이 잘 반영된 인테리어를 설계하고 이를 바탕으로 실용성을 녹여내어 만족도를 높이고 있습니다.</div>
                </div>
              </div>
            </div>
          </section>
          <section class="zin_sec design_sec">
            <div class="tll_area">
              <h5 class="ttl">인테리어를 계획하고 있으시다면 Z:IN의 전문 디자이너에게 맞춤상담 받아보세요.</h5>
            </div>
            <div class="bg_box store_about_group">
              <div class="info_wrap">
                <div class="tll_area">
                  <h5 class="ttl">Z:IN 인테리어 전시장 용인점</h5>
                </div>
                <ul class="dot_list">
                  <li>경기 용인시 수지구 포은대로 456 LG하우시스</li>
                  <li>031-896-8188</li>
                  <li>10:00 ~ 19:00 매주 월요일 휴무 <br>(전시장 앞 주차가능)</li>
                </ul>
                <div class="btn_area">
                  <button class="btn basic h_m">블로그</button>
                  <button class="btn strong h_m">상담신청</button>
                </div>
              </div>
              <div class="img_wrap">
                <ZinTabs :tabData="tabData" tabType="text" @setCurrentTab="designTab" setTab="전시장" />
                <div class="tab_cnts">
                  <div v-show="currentTab === '전시장'" class="tab_cnt showroom_cnt">
                    <FullBanner :bannerItems="bannerItemData" arwType="mid" :hasPagination="false" :bannerHeight="216" />
                  </div>
                  <div v-show="currentTab === '오시는길'" class="tab_cnt showroom_cnt">
                    <div class="map_area">
                      <div id="map"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="zin_sec keyword_sec">
            <div class="label_content">
              <div class="label_wrap">
                <div class="ttl_area noM">
                  <h3 class="ttl c_green1">Keyword</h3>
                </div>
              </div>
              <div class="content_wrap">
                <div class="keyword_ls">
                  <span v-for="(key, k) in keywordData" class="c_green1">{{ key }}</span>
                </div>
              </div>
            </div>
          </section>
          <section class="zin_sec recommend_sec">
            <div class="ttl_area">
              <h3 class="ttl">관련제품</h3>
              <div class="recommend_ls">
                <div v-for="(item, i) in recommendedData" :key="i" class="recommend_node">
                  <a :href="item.link" class="recommend_item">
                    <div class="thumb_area">
                      <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                    </div>
                    <div class="txt_area">
                      <p class="brand">{{ item.brand }}</p>
                      <h6 class="ttl">{{item.title}}</h6>
                      <p class="code">{{ item.code }}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="detail_foot">
          <div class="btn_area ">
            <button class="btn basic h_l w_m c_blk">목록</button>
          </div>
        </div>
      </div>
      <button class="close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import ZinTabs from "~/components/common/ZinTabs";
import FullBanner from "~/components/common/FullBanner";
export default {
  name: "ZinProductCaseDetail",
  components: {
    ZinTabs,
    FullBanner,
  },
  data() {
    return {
      thisPostScrap: false,
      keywordData: ['어반모던', '안정감', '비안코 마블', '핵사곤', '확장'],
      recommendedData: [
        {
          id: 11,
          type: '디자인 벽지',
          img: "/img/zin/@_construction_01.png",
          brand: '지아프레쉬',
          title: '미들그레이',
          code: 'ZEA533-4',
        },
        {
          id: 12,
          type: '지아마루 Style',
          img: "/img/zin/@_construction_02.png",
          brand: '지아프레쉬',
          title: '오크 스노우',
          code: 'ZEA533-4',
        },
        {
          id: 13,
          type: '외창(발코니창)',
          img: "/img/zin/@_construction_03.png",
          brand: '파워세이브',
          title: '파워세이브 미서기창',
          code: 'ZEA533-4',
        },
      ],
      bannerItemData: [
        {
          img: '/img/zin/@_store_01.png',
        },
      ],
      currentTab: '전시장',
      tabData: [
        {
          name: "전시장",
          val: "showroom",
        },
        {
          name: "오시는 길 ",
          val: "location",
        },
      ],
      showModal: false,
      pageTitle:'전면 뷰를 시원하게 살리고 \n' +
        '모던 클래식을 가미한 주방 인테리어',
      place: '용인 죽전동 동성1차 아파트',
      view: 1579,
      info: {
        size: '132~165m²(40~50평)',
        type: '아파트',
        style: '어반 모던',
        range: '거실, 주방, 침실, 욕실, 자녀 방, 게스트 룸',
        price: '4,900만원 미만',
        area: '경기도 용인시 기흥구 죽전동 동성1차 아파트',
        family: '4인 가족(부부+자녀)',
        product: '벽지, 타일 바닥재, 창호',
        store: {
          name: '홈앤디자인 ',
          tel: '031-890-2250',
          homepage:  'http://blog.naver.com/bnw724259',
        },
        term: '2개월',
      },
      constructionData: [
        {
          id: 11,
          type: '디자인 벽지',
          img: "/img/zin/@_construction_01.png",
          brand: '지아프레쉬',
          title: '미들그레이',
          code: 'ZEA533-4',
        },
        {
          id: 12,
          type: '지아마루 Style',
          img: "/img/zin/@_construction_02.png",
          brand: '지아프레쉬',
          title: '오크 스노우',
          code: 'ZEA533-4',
        },
        {
          id: 13,
          type: '외창(발코니창)',
          img: "/img/zin/@_construction_03.png",
          brand: '파워세이브',
          title: '파워세이브 미서기창',
          code: 'ZEA533-4',
        },
      ],
      banner: {
        sub: '처음처럼 깨끗하게',
        title: '벽지 청소&유지 관리법',
        link: '#',
        img: '/img/zin/@_construction_banner_01.png',
      },
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$nuxt.$emit("htmlOverShow");
    },
    numSet(val) {
      if (!val) return val = '';
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    designTab(v) {
      this.currentTab = v;
    },
  },
};
</script>

<style scoped>

</style>