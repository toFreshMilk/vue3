<template>
  <div id="windowInfo" class="modal_wrap has_overlay" :class="{'is_show': showModal}">
    <div class="modal windows">
      <div class="modal_head">
        <div class="tabs type_line">
          <div class="tab_node" v-for="(item, index) in tabMenu" :key="index"
               :class="{is_active : index === activeIndex}" @click="() => activeIndex = index">
            <button class="tab_item">{{ item }}</button>
          </div>
        </div>
      </div>
      <div v-show="activeIndex === 0" data-tab="0" class="modal_body">
        <div class="cnt_wrap cnt_1">
          <div class="cnt_head">
            <h3 class="cnt_ttl">Z:IN창호는 제대로 만들고 완벽히 시공하여<br>
              우리의 생활을 바꿉니다.</h3>
          </div>
          <div class="cnt_body">
            <h3 class="cnt_ttl">Total Solution Provider</h3>
            <p class="cnt_body_cnt_txt">LX 하우시스 지인은 단순한 제품 공급이 아닌 생산부터 고객의 문제해결까지 고민하는 통합 솔루션을 제공합니다.</p>
            <div class="cnt_provider clearFix">
              <div class="ball_wrap">
                <div>
                  <p>01</p>
                  <span>자재생산</span>
                </div>
              </div>
              <div class="ball_wrap">
                <div>
                  <p>02</p>
                  <span>가공</span>
                </div>
              </div>
              <div class="ball_wrap">
                <div>
                  <p>03</p>
                  <span>상담&판매</span>
                </div>
              </div>
              <div class="ball_wrap">
                <div>
                  <p>04</p>
                  <span>배송</span>
                </div>
              </div>
              <div class="ball_wrap">
                <div>
                  <p>05</p>
                  <span>시공</span>
                </div>
              </div>
              <div class="ball_wrap">
                <div>
                  <p>06</p>
                  <span>A/S</span>
                </div>
              </div>
            </div>
            <div class="cnt_box_wrap clearFix">
              <div class="cnt_box_txt_area">
                <h3 class="cnt_ttl">“믿고 맡길 수 있을까요?”</h3>
                <h4 class="ttl">제대로 만드는 창호</h4>
                <p>
                  Z:IN창호는 LX하우시스의 엄격한 통합품질관리 기준에 맞춰<br>
                  원자재부터 유리까지 제대로 만들고 있습니다. 국내 최대 규모의 자동화<br>
                  제작 라인은 더 정교한 창호를 만들고, LX하우시스가 보유한 국가인증<br>
                  창호 시험소는 더 완벽한 성능의 창호를 제공합니다.
                </p>
              </div>
              <div class="cnt_box_img_area">
                <img src="/img/zin/@_zin_windows_02.png" alt="창호 설명">
              </div>
            </div>
            <div class="cnt_box_wrap clearFix">
              <div class="cnt_box_txt_area">
                <h3 class="cnt_ttl">“창을 하루만에 바꿔준다는데..<br>
                  제대로 시공해 주는거 맞나요?”</h3>
                <h4 class="ttl">완벽히 시공하는 창호</h4>
                <p>
                  Z:IN창호는 LX하우시스 창호 시공 전문가들의 노하우로 하루 만에 편리하고,<br>
                  깨끗하게 완성되는 차별화된 시공을 제공합니다.<br>
                  <span>* 1-day 클린 시공을 확인하세요.</span>
                  <span>* 현장 여건에 따라 일정이 추가 될 수 있음</span>
                </p>
              </div>
              <div class="cnt_box_img_area">
                <img src="/img/zin/@_zin_windows_03.png" alt="창호 설명">
              </div>
            </div>
            <div class="cnt_box_wrap clearFix">
              <div class="cnt_box_txt_area">
                <h3 class="cnt_ttl">“따뜻한지, 조용한지, 튼튼한지,<br>
                  창호라면 당연히 그래야 하는거 아닌가요?”</h3>
                <h4 class="ttl">생활을 바꾸는 창호</h4>
                <p>
                  가족을 위해 가장 많이 열고 닫지만 힘이 약한 엄마를 배려한 열기 쉬운 핸들,<br>
                  소중한 자녀를 생각한 안전장치, 건강을 생각한 유해먼지 저감필터망까지<br>
                  이제껏 없던 새로운 창호를 제안합니다.
                </p>
              </div>
              <div class="cnt_box_img_area">
                <img src="/img/zin/@_zin_windows_04.png" alt="창호 설명">
              </div>
            </div>
          </div>
        </div>
        <div class="cnt_wrap cnt_2">
          <h3 class="cnt_ttl s">Z:IN창호가 시작한 최초의 기록</h3>
          <p class="cnt_body_cnt_txt">항상 새로운 창호 생활을 만들어 온 Z:IN창호는 40년 대한민국 PVC 창호의 발자취가 되었습니다.</p>
          <div class="history_slide_area">
            <client-only>
              <swiper ref="historySwiper" class="history_slide_list" :options="swipeStartOptions">
                <swiper-slide class="history_slide_item" v-for="(item, k) in historyList" :key="'swiperHistory' + k ">
                  <figure class="history_slide_img"
                          :style="`background-image: url('${item.img}')`"></figure>
                  <div class="history_info">
                    <h4 class="cnt_ttl s">{{ item.years }}</h4>
                    <p class="txt">{{ item.info }}</p>
                  </div>
                </swiper-slide>
              </swiper>
            </client-only>
            <div class="arw_group">
              <button class="zin_banner_arw arr_prev">
                <i class="arw arw_mid_left"></i>
              </button>
              <button class="zin_banner_arw arr_next">
                <i class="arw arw_mid_right"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="cnt_wrap cnt_3">
          <h3 class="cnt_ttl s">고객에게 사랑받는 Z:IN창호</h3>
          <p class="cnt_body_cnt_txt">더 편리한 생활, 더 아름다운 생활을 위해 끊임없이 노력하는 LG하우시스 지인의 수상내역입니다.</p>
          <div class="award_details_wrap">
            <div class="award_area">
              <div class="award_txt">
                <p><span>1</span>위</p>
                <span>13년 브랜드파워</span>
              </div>
              <img src="/img/zin/@_zin_award_logo_01.png" alt="수상로고">
            </div>
            <div class="award_area">
              <div class="award_txt">
                <p><span>2</span>년 연속</p>
                <span>소비자가 뽑은 대한민국 올해의 녹색상품</span>
                <span class="first_txt">창호 부문 최초</span>
              </div>
              <img src="/img/zin/@_zin_award_logo_02.png" alt="수상로고">
            </div>
            <div class="award_area">
              <div class="award_txt">
                <p><span>대상</span></p>
                <span>2017 친환경 건설사업 창호부문</span>
              </div>
              <img src="/img/zin/@_zin_award_logo_03.png" alt="수상로고">
            </div>
            <div class="award_area">
              <div class="award_txt">
                <p><span>31</span>건</p>
                <span>IF디자인 어워드 인증</span>
              </div>
              <img src="/img/zin/@_zin_award_logo_04.png" alt="수상로고">
            </div>
            <div class="award_area">
              <div class="award_txt">
                <p><span>11</span>건</p>
                <span>REDDOT 디자인 어워드 인증</span>
              </div>
              <img src="/img/zin/@_zin_award_logo_05.png" alt="수상로고">
            </div>
            <div class="award_area">
              <div class="award_txt">
                <p><span>5</span>건</p>
                <span>IDEA 디자인 어워드 인증</span>
              </div>
              <img src="/img/zin/@_zin_award_logo_06.png" alt="수상로고">
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeIndex === 1" class="modal_body" data-tab="1">
        <div class="cnt_wrap wrap_2 cnt_1">
          <div class="cnt_head">
            <h3 class="cnt_ttl">당신을 생각하면서 만듭니다.</h3>
            <p>가족의 완벽한 휴식 공간이 될 수 있는, 아이의 안전한 놀이터가 될,<br>
              부부의 대화가 피어나는 그런공간을 만드는 창호를 만듭니다.</p>
          </div>
          <div class="cnt_body">
            <div class="story_01_wrap">
              <img src="/img/zin/@_zin_windows_story_bg_01.png" alt="창호 설명">
              <div class="grid grid_35 ib">
                <div class="story_area">
                  <h4 class="cnt_ttl s">에너지를 지키는<br>수퍼로이유리</h4>
                  <img src="/img/zin/@_zin_windows_story_item_01.png" alt="">
                  <div>실내 온기가 밖으로 빠져나가는 것을
                    보호하고, 외부 찬 공기는 막아주는
                    은코팅 반사기술
                    <div role="button" class="info_call" @click.self="toggleLayerPopup()">
                      <i class="ic ic_question"></i>
                      <LayerPopup ref="layerPopup">
                        <template v-slot:ttl>
                          <h4 class="ttl">은코팅 반사기술</h4>
                        </template>
                        <template v-slot:cnt>
                          <p>유리 표면에 은(Ag) 성분을 코팅하여, 유리의 투명도는 유지하면서 전도, 대류, 복사를 차단하여 단열 성능은 올려주는 기술을 적용하였습니다.</p>
                        </template>
                      </LayerPopup>
                    </div>
                    로, 여름은 시원하게,
                    겨울은 따뜻하게 냉난방비를 효과적으로
                    줄여드립니다.
                  </div>
                </div>
                <div class="story_area">
                  <h4 class="cnt_ttl s">쾌적함을 지키는<br>3중 밀폐구조
                    <div role="button" class="info_call" @click.self="toggleLayerPopup1()">
                      <i class="ic ic_question"></i>
                      <LayerPopup ref="layerPopup1">
                        <template v-slot:ttl>
                          <h4 class="ttl">3중 밀폐구조</h4>
                        </template>
                        <template v-slot:cnt>
                          <p>창틀과 창짝이 맞물리는 레일 사이에틈새 바람까지 막아주는 부자재를 3중으로 적용하였습니다.</p>
                        </template>
                      </LayerPopup>
                    </div>
                  </h4>
                  <img src="/img/zin/@_zin_windows_story_item_02.png" alt="">
                  <div>작은 틈새까지도 막는 3중 밀폐 구조로
                    외부소음은 물론 미세먼지, 황사 등
                    실외 유해물질까지 막아
                    쾌적한 실내를 유지시켜 줍니다.
                  </div>
                </div>
                <div class="story_area">
                  <h4 class="cnt_ttl s">태풍·장마 걱정 없는<br>안심 설계</h4>
                  <img src="/img/zin/@_zin_windows_story_item_03.png" alt="">
                  <div>속부터 다른 두꺼운 강철 보강재와
                    정교한 레일구조의 안심설계로 강력한
                    비바람으로부터 실내를
                    안전하게 보호합니다.
                  </div>
                </div>
              </div>
            </div>
            <div class="story_02_wrap">
              <img src="/img/zin/@_zin_windows_story_bg_02.png" alt="창호 설명">
              <div class="grid grid_35 ib">
                <div class="story_area">
                  <h4 class="cnt_ttl s">놀랍도록 쉽게 열리는<br>이지오픈 설계</h4>
                  <img src="/img/zin/@_zin_windows_story_item_04.png" alt="">
                  <div>지렛대 원리를 적용해 창을 여는 힘을
                    약 50% 줄여주는 이지오픈 설계로
                    힘이 약한 여성도 쉽고 가볍게
                    열 수 있습니다.
                    <span>* 핸들 특허 보유</span>
                  </div>
                </div>
                <div class="story_area">
                  <h4 class="cnt_ttl s">사용자 위험을 고려한<br>안전설계</h4>
                  <img src="/img/zin/@_zin_windows_story_item_05.png" alt="">
                  <div>갑작스러운 창 닫힘에 다치지 않도록
                    충격을 줄여주는 완충장치
                    <div role="button" class="info_call" @click.self="toggleLayerPopup2()">
                      <i class="ic ic_question"></i>
                      <LayerPopup ref="layerPopup2">
                        <template v-slot:ttl>
                          <h4 class="ttl">완충장치</h4>
                        </template>
                        <template v-slot:cnt>
                          <p>창틀에 부드러운 안전 부자재를 부착하여, 창이 갑작스럽게 여닫히는 경우 파손되거나 손이 끼어 다칠 위험을 줄여줍니다.</p>
                        </template>
                      </LayerPopup>
                    </div>
                    와
                    손끼임을 막아주는 안전스토퍼로
                    창의 사용이 더 안전해집니다.
                  </div>
                </div>
                <div class="story_area">
                  <h4 class="cnt_ttl s">문단속 걱정없는<br>자동잠금장치</h4>
                  <img src="/img/zin/@_zin_windows_story_item_06.png" alt="">
                  <div>ZIN이 최초 개발한 잠금 표시 핸들은
                    창의 잠김 여부를 직접 확인할 수 있으며,
                    자동잠금 기능이 적용되어 닫기만 하면
                    잠금은 걱정하실 필요가 없습니다.
                    <span>※ 자동잠금핸들은 옵션사항입니다.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="story_03_wrap">
              <img src="/img/zin/@_zin_windows_story_bg_03.png" alt="창호 설명">
              <div class="grid grid_35 ib">
                <div class="story_area">
                  <h4 class="cnt_ttl s">섬세함이 다른<br>창틀 디자인</h4>
                  <img src="/img/zin/@_zin_windows_story_item_07.png" alt="">
                  <div>흰색 레일 노출을 가려주는
                    시트 색상과 맞춘 측면 커버와
                    블랙 컬러 레일로 더 고급스러운
                    인테리어 연출이 가능합니다.
                    <span>※ 본 이미지는 이해를 돕기 위한 것으로<br>디자인은 제품별로 다를 수 있습니다.</span>
                  </div>
                </div>
                <div class="story_area">
                  <h4 class="cnt_ttl s">선택 가능한<br>핸들 디자인</h4>
                  <img src="/img/zin/@_zin_windows_story_item_08.png" alt="">
                  <div>스타일에 맞춰 핸들 디자인 뿐만 아니라
                    핸들 커버 색상까지 선택 가능해
                    인테리어 마감이 더 완벽해집니다.
                    <span>※ 핸들 별 옵션사항은 다를 수 있습니다.</span>
                  </div>
                </div>
                <div class="story_area">
                  <h4 class="cnt_ttl s">1등 자신감<br>창호 시트 컬러</h4>
                  <img src="/img/zin/@_zin_windows_story_item_09.png" alt="">
                  <div>LX하우시스 창호 시트는 원목의 결과
                    색감을 담아 어떤 공간도
                    고급스러운 분위기를 더합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cnt_wrap wrap_2 cnt_2">
          <h4 class="cnt_ttl s">제품 라인업</h4>
          <p class="cnt_body_cnt_txt">No.1 Z:IN이 라이프스타일에 꼭 맞춘 창호솔루션을 제안합니다. Z:IN window Plus가 자신있게 제안하는 창호 라인업을
            만나보세요.</p>
          <img src="/img/zin/@_zin_windows_line.png" alt="">
        </div>
        <div class="cnt_wrap wrap_2 cnt_3">
          <div class="tabs">
            <div class="tab_node" v-for="(item, index) in lineUp" :key="index"
                 :class="{is_active : index === presentIndex}" @click="presentIndex = index">
              <button class="tab_item">{{ item }}</button>
            </div>
          </div>
          <template v-if="presentIndex === 0">
            <div class="system_warp clearFix">
              <div class="img_area">
                <img src="/img/zin/@_zin_windows_07.png" alt="창호 설명">
              </div>
              <div class="txt_area">
                <p class="sub_ttl">유럽형 프리미엄 시스템 창호</p>
                <h3 class="cnt_ttl s">당신의 품격에 맞는 프리미엄, 유로시스템 9</h3>
                <div class="txt_info">원목 감성을 담은 고품격 프레임 디자인에 차단력을 높이는<br>
                  기능성 하드웨어가 적용된 최고급 제품 라인업입니다.<br>
                  원하는 사용 방식에 따라 미서기(Lift&Slide)
                  <div role="button" class="info_call" @click.self="toggleLayerPopup3()">
                    <i class="ic ic_question"></i>
                    <LayerPopup ref="layerPopup3">
                      <template v-slot:ttl>
                        <h4 class="ttl">미서기</h4>
                      </template>
                      <template v-slot:cnt>
                        <p>좌우로 열리는 방식(Sliding), 창짝이 레일과 완전 밀착하여 차단력을 높이는 방식(Lift)도 가능합니다.</p>
                      </template>
                    </LayerPopup>
                  </div>
                  와<br>
                  여닫이(Tilt&Turn)
                  <div role="button" class="info_call" @click.self="toggleLayerPopup4()">
                    <i class="ic ic_question"></i>
                    <LayerPopup ref="layerPopup4">
                      <template v-slot:ttl>
                        <h4 class="ttl">여닫이</h4>
                      </template>
                      <template v-slot:cnt>
                        <p>앞뒤로 당기거나 밀어서 열리는 방식(Turn), 상부만 안쪽으로 열어 문이 잠겨진 상태에서 환기시킬 수 있는 시스템(Tilt)도 가능합니다.</p>
                      </template>
                    </LayerPopup>
                  </div>
                  개폐 시스템을 선택하세요.
                </div>
                <span class="txt_tag">쾌적함을 높이는 밀폐력</span>
                <span class="txt_tag">원목 감성의 디자인</span>
                <span class="txt_tag">다양한 개폐방식</span>
              </div>
            </div>
            <div class="system_product_wrap">
              <h5 class="ttl">{{ systemTabList.title }}</h5>
              <div class="grid grid_15 ib">
                <div class="col col_3" v-for="(item, idx) in systemTabList.productList" :key="'systemTab' + idx">
                  <div class="system_product_area">
                    <div class="system_product_head">
                      <NuxtLink to="" class="thumb_area">
                        <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                      </NuxtLink>
                      <!-- <div class="scrap_area">
                        <button class="btn scrap_btn ic_before"></button>
                      </div> -->
                    </div>
                    <NuxtLink to="" class="system_product_body">
                      <div class="counseling">
                        상담신청
                      </div>
                      <div class="ttl_area">
                        <h6 class="ttl">{{ item.name }}</h6>
                        <p>{{ item.number }}</p>
                      </div>
                      <div class="item_info_group">
                        <div v-if="item.badge" class="badge_ls">
                          <img v-for="(item2, i) in item.badge" :key="'badges' + i"
                               :src="'/img/common/flag_' + item2 + '.png'" class="badge">
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="presentIndex === 1">
            <div class="system_warp clearFix">
              <div class="img_area">
                <img src="/img/zin/@_zin_windows_07.png" alt="창호 설명">
              </div>
              <div class="txt_area">
                <p class="sub_ttl">창으로 공간의 품격을 높이다.</p>
                <h3 class="cnt_ttl s">에너지 세이빙을 위한 최고의 선택, 수퍼세이브</h3>
                <div class="txt_info">최고의 단열성능을 자랑하는 수퍼세이브 시리즈는<br>
                  에너지절감에 최적화된 솔루션을 제공합니다.<br>
                  원하시는 기능과 가격대에 따라 3.5.7로<br>
                  쉽고 편리하게 선택하세요
                </div>
                <span class="txt_tag">효과적 에너지세이빙</span>
                <span class="txt_tag">열기 쉬운 핸들</span>
                <span class="txt_tag">국내 최초 안전부자재</span>
              </div>
            </div>
            <div class="system_product_wrap">
              <h5 class="ttl">{{ systemTabList.title }}</h5>
              <div class="grid grid_15 ib">
                <div class="col col_3" v-for="(item, idx) in systemTabList.productList" :key="'systemTab' + idx">
                  <div class="system_product_area">
                    <div class="system_product_head">
                      <NuxtLink to="" class="thumb_area">
                        <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                      </NuxtLink>
                      <!-- <div class="scrap_area">
                        <button class="btn scrap_btn ic_before"></button>
                      </div> -->
                    </div>
                    <NuxtLink to="" class="system_product_body">
                      <div class="counseling">
                        상담신청
                      </div>
                      <div class="ttl_area">
                        <h6 class="ttl">{{ item.name }}</h6>
                        <p>{{ item.number }}</p>
                      </div>
                      <div class="item_info_group">
                        <div v-if="item.badge" class="badge_ls">
                          <img v-for="(item2, i) in item.badge" :key="'badges' + i"
                               :src="'/img/common/flag_' + item2 + '.png'" class="badge">
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="presentIndex === 2">
            <div class="system_warp clearFix">
              <div class="img_area">
                <img src="/img/zin/@_zin_windows_07.png" alt="창호 설명">
              </div>
              <div class="txt_area">
                <p class="sub_ttl">어우러지는 창으로 공간을 완성하다</p>
                <h3 class="cnt_ttl s">공간의 용도에 맞춤 솔루션, 파워세이브</h3>
                <div class="txt_info">자녀와 부부의 프라이버시가 중요한 방창,<br>
                  공간을 구분하는 어우러짐이 아름다운 분합문,<br>
                  자주 열고 닫는 도어까지 필요한 곳에 꼭 맞는<br>
                  창호를 제안하는 실내 공간을 위한<br>
                  제품 라인업입니다. 공간 맞춤 솔루션을 선택하세요.
                </div>
                <span class="txt_tag">다양한 공간솔루션</span>
                <span class="txt_tag">Family look 핸들디자인</span>
              </div>
            </div>
            <div class="system_product_wrap">
              <h5 class="ttl">{{ systemTabList.title }}</h5>
              <div class="grid grid_15 ib">
                <div class="col col_3" v-for="(item, idx) in systemTabList.productList" :key="'systemTab' + idx">
                  <div class="system_product_area">
                    <div class="system_product_head">
                      <NuxtLink to="" class="thumb_area">
                        <figure class="thumb" :style="`background-image: url('${item.img}')`"></figure>
                      </NuxtLink>
                      <!-- <div class="scrap_area">
                        <button class="btn scrap_btn ic_before"></button>
                      </div> -->
                    </div>
                    <NuxtLink to="" class="system_product_body">
                      <div class="counseling">
                        상담신청
                      </div>
                      <div class="ttl_area">
                        <h6 class="ttl">{{ item.name }}</h6>
                        <p>{{ item.number }}</p>
                      </div>
                      <div class="item_info_group">
                        <div v-if="item.badge" class="badge_ls">
                          <img v-for="(item2, i) in item.badge" :key="'badges' + i"
                               :src="'/img/common/flag_' + item2 + '.png'" class="badge">
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-show="activeIndex === 2" class="modal_body" data-tab="2">
        <div class="cnt_wrap wrap_3 cnt_1">
          <div class="cnt_head">
            <h3 class="cnt_ttl">특별한 구매방법</h3>
            <p>다양한 곳에서 쉽고 편리하게 Z:IN 창을 만나세요.</p>
          </div>
          <div class="cnt_body">
            <img src="/img/zin/@_zin_windows_09.png" alt="창호 설명">
          </div>
        </div>
        <div class="cnt_wrap wrap_3 cnt_2">
          <div class="grid grid_10">
            <div class="col col_4">
              <div class="purchase_way_area">
                <h4 class="purchase_way_head">윈도우플러스 창호 전문점</h4>
                <p class="purchase_way_body">창을 직접 보고 전문가의 상담을 통해
                  맞춤솔루션을 제공받을 수 있는
                  Z:IN 창호 전문 매장입니다.</p>
                <NuxtLink to="#" class="purchase_way_foot">가까운 매장 찾아보기</NuxtLink>
              </div>
            </div>
            <div class="col col_4">
              <div class="purchase_way_area">
                <h4 class="purchase_way_head">그린리모델링 창호교체 행사</h4>
                <p class="purchase_way_body">Z:IN이 아파트를 찾아가
                  정부그린리모델링 이자지원 사업을
                  활용해 합리적 창호교체를 도와드립니다.</p>
                <a class="purchase_way_foot" @click="activeIndex = 3">더 알아보기</a>
              </div>
            </div>
            <div class="col col_4">
              <div class="purchase_way_area">
                <h4 class="purchase_way_head">지인몰</h4>
                <p class="purchase_way_body">온라인으로 간편한 제품비교와
                  가상견적을 받아 볼 수 있는
                  LX하우시스 공식 온라인 쇼핑몰입니다.</p>
                <NuxtLink to="/store/home" class="purchase_way_foot">바로가기</NuxtLink>
              </div>
            </div>
            <div class="col col_4">
              <div class="purchase_way_area">
                <h4 class="purchase_way_head">인테리어점</h4>
                <p class="purchase_way_body">가까운 인테리어점을 통해서도
                  Z:IN창을 시공할 수 있습니다.</p>
                <NuxtLink to="#" class="purchase_way_foot">가까운 매장 찾아보기</NuxtLink>
              </div>
            </div>
            <div class="col col_4">
              <div class="purchase_way_area">
                <h4 class="purchase_way_head">지인전시장</h4>
                <p class="purchase_way_body">Z:IN의 전 제품을 만나보고
                  전문 코디네이터 상담까지 가능한
                  본사가 직접 운영하는 전시장 입니다.</p>
                <NuxtLink to="#" class="purchase_way_foot">가까운 매장 찾아보기</NuxtLink>
              </div>
            </div>
            <div class="col col_4">
              <div class="purchase_way_area">
                <h4 class="purchase_way_head">홈쇼핑</h4>
                <p class="purchase_way_body">TV홈쇼핑에서 LX하우시스의
                  고품질 창호를 보다 합리적인
                  패키지로 구매할수 있습니다.</p>
                <a href="javascript:alert('준비중');" class="purchase_way_foot">더 알아보기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeIndex === 3" class="modal_body" data-tab="3">
        <div class="cnt_wrap wrap_4 cnt_1">
          <div class="cnt_head">
            <span>하우시스와 함께하는 그린리모델링 사업</span>
            <h3 class="cnt_ttl">단열창문 바꾸기 프로젝트</h3>
            <p>국토교통부 지원 ‘그린리모델링 이자지원 사업’을 통해 합리적인 창호 교체를<br>
              하실 수 있도록 창호 교체가 필요한 아파트를 직접 찾아갑니다.</p>
          </div>
          <div class="cnt_body">
            <img src="/img/zin/@_zin_windows_11.png" alt="창호 설명">
          </div>
          <div class="cnt_body">
            <img src="/img/zin/@_zin_windows_12.png" alt="창호 설명">
          </div>
        </div>
        <div class="cnt_wrap wrap_4 cnt_2">
          <h4 class="cnt_ttl s">LX 하우시스 그린리모델링 창호 공동구매 행사 진행</h4>
          <p class="cnt_body_cnt_txt">Z:IN은 전국 공동주택(아파트)을 대상으로 그린리모델링 창호 공동구매 행사를 진행하며 보다 경제적인 가격으로
            지인창호를 체험하며 창호 상담을 받을 수 있도록 단지행사를 진행하고 있습니다.</p>
          <div class="cnt_2_slide_area">
            <client-only>
              <swiper ref="swipeList" class="cnt_2_slide_list" :options="swipeThumbOptions"
                      @slideChangeTransitionEnd="onSlideChange">
                <swiper-slide class="cnt_2_slide_item" v-for="(item, j) in imgList" :key="'swipeList' + j">
                  <figure class="cnt_2_slide_img"
                          :style="`background-image: url('${item.img}')`"></figure>
                </swiper-slide>
              </swiper>
            </client-only>
            <div class="arw_group">
              <div class="arw_area">
                <button class="arr_prev">
                  <i class="arw arw_list_left"></i>
                </button>
                <button class="arr_next">
                  <i class="arw arw_list_right"></i>
                </button>
              </div>
            </div>
            <div class="zin_pagination_group">
              <span class="current">{{ zoreNumSet(currentSlide) }}</span>
              <div class="zin_pagination long" slot="pagination"/>
              <span class="total">{{ zoreNumSet(totalSlide) }}</span>
            </div>
          </div>
        </div>
        <div class="cnt_wrap wrap_4 cnt_3">
          <div class="table_ttl">
            <h4 class="cnt_ttl s">이자 지원 기준</h4>
            <button @click="tableHide">
              <template v-if="!isHideTable">
                <i class="arw arw_top"></i>
              </template>
              <template v-else>
                <i class="arw arw_bottom"></i>
              </template>
            </button>
          </div>
          <div class="cnt_3_table_wrap" :class="{'is_active' : isHideTable}">
            <table>
              <thead>
              <tr>
                <th colspan="3">공동주택 (아파트 / 빌라)</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th rowspan="2">금액</th>
                <td>건물종류</td>
                <td>금액</td>
              </tr>
              <tr>
                <td>아파트 / 빌라</td>
                <td>3백~2천만원 / 세대 당</td>
              </tr>
              <tr>
                <th rowspan="4">이자율</th>
                <td>차상위 계층 사업 신청 시</td>
                <td>4%</td>
              </tr>
              <tr>
                <td>창호 에너지소비 효율등급 2등급 이상</td>
                <td>3%</td>
              </tr>
              <tr>
                <td>창호 에너지소비 효율등급 3등급</td>
                <td>2%</td>
              </tr>
              <tr>
                <td colspan="2">
                  ※ 에너지 효율등급 적용은, 최외측 발코니창 전체 교체 시 가능<br>
                  ※ 차상위 계층은 기초생활수급자를 포함하며, 개선전후 최소 20% 이상의 에너지성능개선 만족해야함(필수)
                </td>
              </tr>
              </tbody>
            </table>
            <p class="table_note">* 지원 및 상환기간<span>이자는 5년간 지원하며, 그린리모델링 사업비(창호교체비용)는 이자지원 기간과 동일하게 5년 이내 분할상환</span>
            </p>
            <table>
              <thead>
              <tr>
                <th colspan="3">단독주택 / 비주거 건물</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th rowspan="3">금액</th>
                <td>건물종류</td>
                <td>금액</td>
              </tr>
              <tr>
                <td>단독주택</td>
                <td>3백~5천만원 / 한 채당</td>
              </tr>
              <tr>
                <td>비주거 건물</td>
                <td>2천만~50억원 / 한 동당</td>
              </tr>
              <tr>
                <th rowspan="4">이자율</th>
                <td>에너지 성능개선 30%</td>
                <td>3%</td>
              </tr>
              <tr>
                <td>에너지 성능개선 25%이상~30%미만</td>
                <td>2%</td>
              </tr>
              <tr>
                <td>에너지 성능개선 20%이상~25%미만</td>
                <td>1%</td>
              </tr>
              <tr>
                <td colspan="2">
                  ※ 전체 평균 에너지 개선 비중
                </td>
              </tr>
              </tbody>
            </table>
            <p class="table_note">* 지원 및 상환기간<span>이자는 5년간 지원하며, 그린리모델링 사업비(창호교체비용)는 이자지원 기간과 동일하게 5년 이내 분할상환</span>
            </p>
          </div>
        </div>
      </div>
      <div v-show="activeIndex === 4" class="modal_body" data-tab="4">
        <div class="cnt_wrap wrap_5 cnt_1">
          <div class="cnt_head">
            <h3 class="cnt_ttl">1 DAY 클린시공 &<br>
              창호몸체 10년 품질보증</h3>
          </div>
          <div class="cnt_body">
            <h3 class="cnt_ttl s">1DAY 클린시공</h3>
            <p class="cnt_body_cnt_txt">1-Day 클린시공은 시공 당일 내 보양, 철거, 시공 및 청소까지 하루 만에 완료하는 LX하우시스의 차별화된 시공서비스입니다.</p>
            <div class="video_area">
              <img src="/img/zin/@_zin_clean_01.png" alt="" :class="{'is_hide' : isHideImg}" @click="videoPlay()" >
              <div class="youtube">
                <iframe :class="{'is_show' : isPlayVideo}"
                        video-id="windowVideo"
                        ref="youtube"
                        id="topPlayer"
                        frameborder="0"
                        allowfullscreen="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title="YouTube video player"
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/7kStSzUeIyM?rel=0&amp;enablejsapi=1&amp;origin=http%3A%2F%2Fwww.lghausys.co.kr&amp;widgetid=1"
                        data-gtm-yt-inspected-1_25="true"></iframe>
              </div>
            </div>
<!--            <div class="time_info_group">-->

<!--            </div>-->
          </div>
        </div>
        <div class="cnt_wrap wrap_5 cnt_2">
          <div class="cnt_body">
            <img src="/img/zin/@_zin_windows_14.png" alt="태그">
            <h4 class="cnt_ttl s">창호몸체 10년 품질보증</h4>
            <p class="cnt_body_cnt_txt">가장 쉽고 가장 신뢰할 수 있는 10년 품질보증, 따져볼수록 LX하우시스 입니다.</p>
            <div class="cnt_img_area">
              <img src="/img/zin/@_zin_windows_15.png" alt="태그">
              <img src="/img/zin/@_zin_windows_16.png" alt="태그">
              <img src="/img/zin/@_zin_windows_17.png" alt="태그">
              <button class="btn w_l h_m btn_basic">창호 사용설명서 다운로드<i class="ic ic_download_c"></i></button>
            </div>
          </div>
        </div>
        <div class="cnt_wrap wrap_5 cnt_3">
          <div class="cnt_body">
            <h4 class="cnt_ttl s">창문 부위별 보증기간</h4>
            <table>
              <thead>
              <tr>
                <th rowspan="2">창문부위</th>
                <th rowspan="2">하자현상과 원인</th>
                <th colspan="2" scope="colgroup">보증기간</th>
              </tr>
              <tr>
                <th colspan="1">일반보증</th>
                <th colspan="1">10년보증</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>주요 몸체</td>
                <td>
                  <ul>
                    <li>창문의 변형,뒤틀림,파손에 의한 상당한 누기 및 상당한 개폐 불량</li>
                    <li>창문 접합부의 파손에 의한 상당한 누수</li>
                    <li>복층 유리 내부의 습기 발생</li>
                  </ul>
                </td>
                <td>2년</td>
                <td>10년</td>
              </tr>
              <tr>
                <td>하드웨어 등</td>
                <td>
                  <ul>
                    <li>시스템창 하드웨어 파손에 의한 상당한 누기</li>
                    <li>시스템창 하드웨어 파손에 의한 상당한 개폐 불량</li>
                    <li>벽체와 창틀 사이 실링재, 유리와 창짝 사이 실링재의 틈 발생에 의한 누수 (건물 벽체 균열에 의한 누수는 제외)</li>
                    <li>잠금장치(핸들, 크리센트)의 파손, 변형에 의한 잠금 불량</li>
                    <li>롤러의 파손 또는 변형에 의한 개폐 불량</li>
                  </ul>
                </td>
                <td>2년</td>
                <td>5년</td>
              </tr>
              <tr>
                <td>부자재</td>
                <td>
                  <ul>
                    <li>기밀재(모헤어, 필링피스, 가스켓)의 방충망, 필터망의 변형 및 손실</li>
                  </ul>
                </td>
                <td>2년</td>
                <td>2년</td>
              </tr>
              </tbody>
            </table>
            <p class="table_note">* 유리 및 전자기기부품의 보증기간은 1년으로 창호 보증기간과 상이합니다.</p>
            <div class="as_info">
              <h6 class="ttl">부품별 보증기간이 상이하며, 아래와 같은 경우 무상보증 범위에서 제외되어 추가 A/S 비용이 발생할 수 있습니다.</h6>
              <ul>
                <li>건축물의 훼손, 변형 등 설계 영향으로 인한 창호의 품질문제</li>
                <li>생활 환경 조건에 의한 자연적인 결로 현상 또는 창문을 닫지 않아 발생한 빗물 침투로 인한 피해</li>
                <li>시간 변화에 따른 유리/한지 및 실란트의 오염 등</li>
                <li>사용자 조작 실수, 조작 미숙, 타용도 사용으로 발생되는 고장 및 상해</li>
                <li>천연 목재의 자연 발생적 색상 차이 및 변색, 비규칙적인 나무결, 목재 표면의 질감 차이</li>
                <li>사용설명서에 준하지 않는 제품 유지 관리</li>
                <li>주거용 이외의 상업용으로 설치된 제품</li>
                <li>설계 품질을 초과하는 천재지변 등 자연 불가항력에 의한 의적, 물적 피해</li>
                <li>유리 표면 또는 내부에 소비자가 필름 또는 기타 부착물을 부착하여 발생한 문제</li>
                <li>설계된 용도 외에 소비자의 요청에 의해 제작된 제품의 품질 문제</li>
              </ul>
            </div>
          </div>
          <div class="cnt_wrap wrap_5 cnt_4">
            <div class="cnt_body">
              <h4 class="cnt_ttl s">고객 입장에서 ‘10년 품질보증제도’를 발전시켰습니다.</h4>
              <p class="cnt_body_cnt_txt">2012년부터 시행한 창호업계 최초의 10년 품질보증제도로서 고객의 눈높이에 맞추어 개선하고 있습니다.
                기존에는 스티커에 적힌 시리얼번호를 홈페이지에 등록해야만 품질보증이 가능했지만 2018년 1월부터
                불편했던 등록과정을 폐지, 자동으로 품질보증 등록이 가능해 훨씬 편리해졌습니다.
                2018년 이후 구매 고객께서는 별도 제품등록 과정이 필요 없습니다.</p>
              <img src="/img/zin/@_zin_windows_18.png" alt="태그">
            </div>
            <div class="cnt_foot">
              <h4 class="ttl">2018년 이전 구매 고객께서는 아래에 있는<br>
                안내에 따라 제품등록을 완료하셔야 품질보증이 가능합니다.</h4>
              <div class="btn_area">
                <div role="button" class="btn w_ll h_m btn_basic" @click.self="toggleLayerPopup5()">
                  품질보증 10년 연장 프로그램 안내 바로가기
                  <LayerPopup ref="layerPopup5">
                    <template v-slot:ttl>
                      <h4 class="ttl">창호 품질 보증 10년 연장 프로그램 </h4>
                      <p>2018년 이전 구매 고객을 위한</p>
                      <p>지인 창호 전문점만이 할 수 있는 고객 무한 감동 서비스!
                        최장 10년간 품질을 보증합니다.</p>
                    </template>
                    <template v-slot:cnt>
                      <p>앞뒤로 당기거나 밀어서 열리는 방식(Turn), 상부만 안쪽으로 열어 문이 잠겨진 상태에서 환기시킬 수 있는 시스템(Tilt)도 가능합니다.</p>
                    </template>
                  </LayerPopup>
                </div>
                <NuxtLink to="" class="btn w_ll h_m btn_basic">제품 등록 바로가기</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeIndex === 5" class="modal_body" data-tab="5">
        <div class="cnt_wrap wrap_6 cnt_1">
          <div class="cnt_head">
            <span>Unique Progress</span>
            <h3 class="cnt_ttl">생활을 윤택하게 만드는 LX하우시스의 창호 기술</h3>
            <p>창과 함께하는 더 혁신적인 생활을 위해 창에 안전함, 편안함, 편리함을<br>
              더하는 방법을 연구하고 있습니다.</p>
          </div>
          <div class="cnt_body">
            <img src="/img/zin/@_zin_windows_20.png" alt="창호 설명">
            <img src="/img/zin/@_zin_windows_21.png" alt="창호 설명">
          </div>
        </div>
        <div class="cnt_wrap wrap_6 cnt_2">
          <table>
            <thead>
            <tr>
              <th colspan="2">에너지 UP</th>
              <th>안전 UP</th>
              <th>편의 UP</th>
              <th colspan="2">건강 UP</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td v-for="(item, index) in additionalList" :key="'indexAdditionalList' + index">
                <span>{{ item.en }}</span>
                <p>{{ item.ko }}</p>
                <button :class="{is_active : index === additionalIndex}" @click="() => additionalIndex = index">
                  {{ item.button }}
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="cnt_wrap wrap_6 cnt_3" v-show="additionalIndex === 0">
          <div class="additional_area">
            <img src="/img/zin/@_zin_windows_service_01.png" alt="수퍼로이유리">
            <p class="additional_txt">실내 온기가 밖으로 빠져나가는 것을 막아주는 은코팅 고단열 로이유리로<br>우리집의 에너지 비용을 절감하세요.</p>
            <img src="/img/zin/@_zin_windows_service_02.png" alt="수퍼로이유리">
            <div class="additional_info_warp">
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_windows_additional_01.png" alt="설명">
                <div class="additional_info_txt">
                  <p>국내 최고 수준의 따뜻함</p>
                  <span>집안 온기는 지키고 외부 열은 막아 냉난방비 절담에 효과적입니다.</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_windows_additional_02.png" alt="설명">
                <div class="additional_info_txt">
                  <p>밝은 실내공간 연출</p>
                  <span>두꺼운 은(銀) 코팅에도 우수한 채광성능으로 밝은 실내를 연출합니다.</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_windows_additional_03.png" alt="설명">
                <div class="additional_info_txt">
                  <p>겨울철 한파에도 결로 안심</p>
                  <span>유리에 생기는 결로(습기, 물방울 등)를 효과적으로 막아 쾌적합니다.</span>
                </div>
              </div>
            </div>
          </div>
          <h4 class="cnt_ttl s">유리기준</h4>
          <table>
            <thead>
            <tr>
              <th>제품사양</th>
              <th>투과율(%)</th>
              <th>열관류율(W/m2K)</th>
              <th>태양열 취득율</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>22T 5투명 + 12AR + 5수퍼로이</td>
              <td>68</td>
              <td>1.22</td>
              <td>0.50</td>
            </tr>
            <tr>
              <td>24T 5투명 + 14AR + 5수퍼로이</td>
              <td>68</td>
              <td>1.10</td>
              <td>0.50</td>
            </tr>
            </tbody>
          </table>
          <p class="table_note">* 열관류율 KS L 2525기준</p>
        </div>
        <div class="cnt_wrap wrap_6 cnt_3" v-show="additionalIndex === 1">
          <div class="additional_area">
            <img src="/img/zin/@_zin_windows_service_03.png" alt="수퍼솔라로이유리">
            <p class="additional_txt">우리집 에너지는 지켜주면서 우리집으로 들어오는 자외선을 94% 이상 차단해<br>
              실내 인테리어와 가족의 피부건강까지 생각해주는 자외선 차단 고단열 로이유리 입니다.</p>
            <img src="/img/zin/@_zin_windows_service_04.png" alt="수퍼솔라로이유리">
            <div class="additional_info_warp">
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_windows_additional_04.png" alt="설명">
                <div class="additional_info_txt">
                  <p>자외선 차단효과</p>
                  <span>실내가구 및 인테리어의 변색을 유발하는 자외선 94%이상 차단</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_windows_additional_05.png" alt="설명">
                <div class="additional_info_txt">
                  <p>태양열 차단효과</p>
                  <span>여름철 뜨거운 태양열의 실내유입을 줄여 냉방비 감소</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_windows_additional_06.png" alt="설명">
                <div class="additional_info_txt">
                  <p>고성능 칼라유리</p>
                  <span>고급자동차에 사용되는 고성능유리</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_windows_additional_01.png" alt="설명">
                <div class="additional_info_txt">
                  <p>수퍼로이 사용으로 우수한 단열 성능 구현</p>
                  <span>초고단열 제품으로 1등급 창호를 구현한 국내 최고 수준의 단열성을 자랑합니다.</span>
                </div>
              </div>
            </div>
          </div>
          <h4 class="cnt_ttl s">유리기준</h4>
          <table>
            <thead>
            <tr>
              <th>제품사양</th>
              <th>투과율(%)</th>
              <th>열관류율(W/m2K)</th>
              <th>태양열 취득율</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>22T 5에메랄드그린 + 12AR + 5수퍼로이</td>
              <td>94</td>
              <td>1.22</td>
              <td>0.25</td>
            </tr>
            <tr>
              <td>24T 5에메랄드그린 + 14AR + 5수퍼로이</td>
              <td>94</td>
              <td>1.10</td>
              <td>0.25</td>
            </tr>
            </tbody>
          </table>
          <p class="table_note">* 열관류율 KS L 2525기준</p>
        </div>
        <div class="cnt_wrap wrap_6 cnt_3" v-show="additionalIndex === 2">
          <div class="additional_area">
            <img src="/img/zin/@_zin_windows_service_05.png" alt="안전">
            <p class="additional_txt">우리집 안전까지 지켜주는 튼튼 보호막,<br>
              소중한 아이의 안전을 생각한다면 3중 잠금으로 지켜주세요.</p>
            <div class="safe_mesh_slide_area">
              <div class="safe_mesh_slide_list_0 item_banner_wrap">
                <div class="banner_inner">
                  <client-only>
                    <swiper ref="mvTxt" class="item_banner_group" :options="bannerOptions">
                      <swiper-slide v-for="(item, index) in AdditionalImg" :key="index" class="item_banner_item">
                        <a v-if="item.bannerLink" :href="item.link" class="link">
                          <img :src="item.img" alt="" class="">
                        </a>
                        <div v-else class="img_area">
                          <img :src="item.img" alt="" class="">
                        </div>
                      </swiper-slide>
                    </swiper>
                    <div class="zin_slide_pagination_group type_dots">
                      <div class="zin_slide_pagination " />
                    </div>
                    <div class="zin_arw_group">
                      <button class="zin_banner_arw arr_prev">
                        <i class="arw arw_left_slide_w"></i>
                      </button>
                      <button class="zin_banner_arw arr_next">
                        <i class="arw arw_right_slide_w"></i>
                      </button>
                    </div>
                  </client-only>
                </div>
              </div>
            </div>
            <div class="additional_info_warp ib">
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_safe_info_01.png" alt="설명">
                <div class="additional_info_txt">
                  <p>3중 잠금</p>
                  <span>자동잠금 손잡이에서 한번
                    잠금 장치에서 두번,
                    총 3중 잠금으로
                    더 편리하고 안전합니다.</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_safe_info_02.png" alt="설명">
                <div class="additional_info_txt">
                  <p>초강력 조립구조</p>
                  <span>맞물림 구조로 1톤의
                    무게에도 망이 분리되지 않을
                    만큼 튼튼합니다.</span>
                  <span class="plus_txt">* 안전강화방충망(0.6mm 망 기준)
                    제품에 대한 국부압축하중 KS F 4760:2016기준
                    한국건설환경시험연구원 테스트 결과</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_safe_info_03.png" alt="설명">
                <div class="additional_info_txt">
                  <p>부식방지 코팅</p>
                  <span>스테인리스 코팅망으로
                    녹슬지 않아 반영구적으로
                    사용할 수 있습니다.</span>
                </div>
              </div>
            </div>
          </div>
          <table class="additional_table">
            <tr>
              <th>최대 지지 하중</th>
              <td>약 1.2톤 (11,590N)</td>
            </tr>
            <tr>
              <th>안전장치</th>
              <td>손잡이 자동잠금 장치, 2중 수동 잠금 장치</td>
            </tr>
            <tr>
              <th>세척 방법</th>
              <td>분리 후 가정용 분무기 혹은 호스로 세척</td>
            </tr>
            <tr>
              <th>적용 가능 제품</th>
              <td>수퍼세이브7, 수퍼세이브5, 수퍼세이브3, 파워세이브 미서기창</td>
            </tr>
          </table>
          <p class="table_note">* 최대지지하중은 0.6mm망의 국부압축하중에 대한 한국건설생활환경시험연구원 시험결과로 (KS F 4760:2016).
            실생활 사용시 성능이 달라질 수 있습니다.</p>
        </div>
        <div class="cnt_wrap wrap_6 cnt_3" v-show="additionalIndex === 3">
          <div class="additional_area">
            <img src="/img/zin/@_zin_windows_service_06.png" alt="안전">
            <p class="additional_txt">LX하우시스만의 지렛대 시스템을 적용하여 힘이 약한 여성이나<br>
              어르신까지 누구나 쉽게 열 수 있는 이지 오픈 핸들</p>
            <div class="safe_mesh_slide_area">
              <div class="safe_mesh_slide_list_1 item_banner_wrap">
                <div class="banner_inner">
                  <client-only>
                    <swiper ref="mvTxt" class="item_banner_group" :options="bannerOptions2">
                      <swiper-slide v-for="(item, index) in AdditionalImg2" :key="index" class="item_banner_item">
                        <a v-if="item.bannerLink" :href="item.link" class="link">
                          <img :src="item.img" alt="" class="">
                        </a>
                        <div v-else class="img_area">
                          <img :src="item.img" alt="" class="">
                        </div>
                      </swiper-slide>
                    </swiper>
                    <div class="zin_slide_pagination_group type_dots">
                      <div class="zin_slide_pagination " />
                    </div>
                    <div class="zin_arw_group">
                      <button class="zin_banner_arw arr_prev">
                        <i class="arw arw_left_slide_w"></i>
                      </button>
                      <button class="zin_banner_arw arr_next">
                        <i class="arw arw_right_slide_w"></i>
                      </button>
                    </div>
                  </client-only>
                </div>
              </div>
            </div>
            <div class="additional_info_warp ib">
              <div class="additional_info_area handle">
                <img src="/img/zin/@_zin_handle_info_01.png" alt="설명">
                <div class="additional_info_txt">
                  <p>쉽게 열림</p>
                  <span>LX하우시스만의 고유기술인
                    지렛대 시스템을 이용하여
                    창을 여는 힘을 최대 45% 줄여줍니다.</span>
                </div>
              </div>
              <div class="additional_info_area handle">
                <img src="/img/zin/@_zin_handle_info_02.png" alt="설명">
                <div class="additional_info_txt">
                  <p>이중 자동 잠금</p>
                  <span>이중 자동 잠금 기능이 적용되어
                    창문을 닫기만 하면,
                    잠금은 걱정하지 않으셔도 됩니다.</span>
                </div>
              </div>
            </div>
          </div>
          <table class="additional_table">
            <tr>
              <th>작동영상</th>
              <td><a href="https://youtu.be/YzOfuT_Nudw" target="_blank">https://youtu.be/YzOfuT_Nudw</a></td>
            </tr>
            <tr>
              <th>적용 가능 제품</th>
              <td>수퍼세이브7, 수퍼세이브5, 수퍼세이브3</td>
            </tr>
          </table>
        </div>
        <div class="cnt_wrap wrap_6 cnt_3" v-show="additionalIndex === 4">
          <div class="additional_area">
            <img src="/img/zin/@_zin_windows_service_07.png" alt="안전">
            <p class="additional_txt">우리 가족 건강을 지키는 안심 보호망, 미세먼지까지 걸러내는<br>
              고효율 필터망으로 실내 공기를 지켜주세요.</p>
            <div class="safe_mesh_slide_area">
              <div class="safe_mesh_slide_list_2 item_banner_wrap">
                <div class="banner_inner">
                  <client-only>
                    <swiper ref="mvTxt" class="item_banner_group" :options="bannerOptions3">
                      <swiper-slide v-for="(item, index) in AdditionalImg3" :key="index" class="item_banner_item">
                        <a v-if="item.bannerLink" :href="item.link" class="link">
                          <img :src="item.img" alt="" class="">
                        </a>
                        <div v-else class="img_area">
                          <img :src="item.img" alt="" class="">
                        </div>
                      </swiper-slide>
                    </swiper>
                    <div class="zin_slide_pagination_group type_dots">
                      <div class="zin_slide_pagination " />
                    </div>
                    <div class="zin_arw_group">
                      <button class="zin_banner_arw arr_prev">
                        <i class="arw arw_left_slide_w"></i>
                      </button>
                      <button class="zin_banner_arw arr_next">
                        <i class="arw arw_right_slide_w"></i>
                      </button>
                    </div>
                  </client-only>
                </div>
              </div>
            </div>
            <div class="additional_info_warp ib">
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_fresh_info_01.png" alt="설명">
                <div class="additional_info_txt">
                  <p>고효율 필터림</p>
                  <span>촘촘한 망이
                    미세먼지를 포함한
                    대기 중 먼지를
                    걸러냅니다.</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_fresh_info_02.png" alt="설명">
                <div class="additional_info_txt">
                  <p>편리한 청소/교체</p>
                  <span>가정용 분무기로 간편하게
                    청소가 가능하며, 탈부착
                    교체방식으로 손쉬운
                    교체가 가능합니다.</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_fresh_info_03.png" alt="설명">
                <div class="additional_info_txt">
                  <p>롤방충망 방식</p>
                  <span>필요 시에만 내려 사용하는롤방충방
                    형태로 평상 시
                    올려놓으면 시야를
                    가리지 않습니다.</span>
                </div>
              </div>
            </div>
          </div>
          <table class="additional_table">
            <tr>
              <th>분진포집 효율</th>
              <td>대기 중 분진 90% 포집</td>
            </tr>
            <tr>
              <th>섬유 사이즈(지름)</th>
              <td>약 평균 300nm(머리카락 굵기 약 50~70nm)</td>
            </tr>
            <tr>
              <th>필터 청소 방법</th>
              <td>가정용 분무기로 간편 세척 가능</td>
            </tr>
            <tr>
              <th>권장 사용기간</th>
              <td>2년 (고객상담실 080-005-4000을 통해 유상교체 신청 가능)</td>
            </tr>
            <tr>
              <th>적용 가능 제품</th>
              <td>수퍼세이브7, 수퍼세이브5, 수퍼세이브3, 파워세이브 미서기창</td>
            </tr>
          </table>
          <p class="table_precautions">유해먼지저감필터망 사용시 주의사항</p>
          <ul class="table_precautions_info">
            <li>강풍/폭우 등 가혹한 날씨에서는 사용을 자제해 주세요.</li>
            <li>창을 닫을 때는 필터망을 올려주세요.</li>
            <li>필터망을 올릴 때는 손잡이를 잡고 천천히 올려주세요.</li>
            <li>필터망은 3개월에 한번씩 분무기나 호스 등으로 물청소 하세요.<span>청소를 하지 않으면 통풍이 되지 않을 수 있습니다.</span></li>
            <li>필터망은 오염 정도에 따라 2년 이내에 고객 상담실로 유상 교환 요청해주세요.<span>고객상담실 080-005-4000</span></li>
            <li>필터망을 장기간 사용하지 않을 경우 작동이 원활하지 않을 수 있습니다.<span>필터망 손잡이를 잡고 위아래로 몇차례 움직이면 정상적으로 작동됩니다.</span></li>
            <li>필터망의 섬유 접착 공정상 얼룩처럼 보이는 현상이 나타날 수 있습니다.<span>이는 제품 하자로 인한 것이 아니므로 안심하고 사용하시기 바랍니다.</span></li>
            <li>이 방충망 및 필터망이 제품 품질보증기간은 2년입니다.</li>
          </ul>
        </div>
        <div class="cnt_wrap wrap_6 cnt_3" v-show="additionalIndex === 5">
          <div class="additional_area">
            <img src="/img/zin/@_zin_windows_service_08.png" alt="안전">
            <p class="additional_txt">오염된 실내공기에 대한 해답은 환기입니다.<br>
              환기시스템과 함께 365일 깨끗한 실내공기를 경험해보세요.</p>
            <div class="safe_mesh_slide_area">
              <div class="safe_mesh_slide_list_3 item_banner_wrap">
                <div class="banner_inner">
                  <client-only>
                    <swiper ref="mvTxt" class="item_banner_group" :options="bannerOptions4">
                      <swiper-slide v-for="(item, index) in AdditionalImg4" :key="index" class="item_banner_item">
                        <a v-if="item.bannerLink" :href="item.link" class="link">
                          <img :src="item.img" alt="" class="">
                        </a>
                        <div v-else class="img_area">
                          <img :src="item.img" alt="" class="">
                        </div>
                      </swiper-slide>
                    </swiper>
                    <div class="zin_slide_pagination_group type_dots">
                      <div class="zin_slide_pagination " />
                    </div>
                    <div class="zin_arw_group">
                      <button class="zin_banner_arw arr_prev">
                        <i class="arw arw_left_slide_w"></i>
                      </button>
                      <button class="zin_banner_arw arr_next">
                        <i class="arw arw_right_slide_w"></i>
                      </button>
                    </div>
                  </client-only>
                </div>
              </div>
            </div>
            <div class="additional_info_warp ib">
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_ventilation_info_01.png" alt="설명">
                <div class="additional_info_txt">
                  <p>자동 환기</p>
                  <span>공기질 센서가
                    이산화탄소의 농도만을
                    감지하여 자동으로
                    스마트하게 환기시켜줍니다.</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_ventilation_info_02.png" alt="설명">
                <div class="additional_info_txt">
                  <p>사계절 환기</p>
                  <span>실내의 열을 유지하여
                    사계절 내내 실내 온도를 지키며
                    환기 시켜 줍니다.</span>
                </div>
              </div>
              <div class="additional_info_area">
                <img src="/img/zin/@_zin_ventilation_info_03.png" alt="설명">
                <div class="additional_info_txt">
                  <p>심플한 가전 디자인</p>
                  <span>인기가전 색상인 화이트,
                    다크-실버 창호와 인테리어
                    어디에나 어울리는
                    심플한 디자인입니다.</span>
                </div>
              </div>
            </div>
          </div>
          <h4 class="cnt_ttl s">제품사양</h4>
          <table class="additional_table">
            <tr>
              <th>제품색상</th>
              <td>화이트 / 다크-실버</td>
            </tr>
            <tr>
              <th>환기시스템 사이즈</th>
              <td>185x325x창호높이(mm) <span>※창호높이 : 최소 1,200 ~ 최대 2,600</span></td>
            </tr>
            <tr>
              <th>제품구조</th>
              <td>무덕트형환기장치</td>
            </tr>
            <tr>
              <th>열교환방식</th>
              <td>판형전열교환방식</td>
            </tr>
            <tr>
              <th>운전모드</th>
              <td>자동 / 터보 / 취침 / 강제배기</td>
            </tr>
          </table>
          <h4 class="cnt_ttl s">제품성능</h4>
          <table class="additional_table">
            <tr>
              <th>사용전원</th>
              <td>단상, 220V, 60Hz</td>
            </tr>
            <tr>
              <th>정격풍량</th>
              <td>58CMH</td>
            </tr>
            <tr>
              <th>동작별풍량</th>
              <td>취침 30CMH, 터보 100CMH, 수동단계 40~80CMH</td>
            </tr>
            <tr>
              <th>정격소비전력</th>
              <td>24W</td>
            </tr>
            <tr>
              <th>유효전열효율</th>
              <td>난방 70% / 냉방 63%</td>
            </tr>
            <tr>
              <th>필터성능</th>
              <td>H13등급 헤파필터</td>
            </tr>
            <tr>
              <th>센서</th>
              <td>이산화탄소, 초미세먼지, VOC, 온습도 센서</td>
            </tr>
            <tr>
              <th>동작방법</th>
              <td>터치패널 / 리몬컨 / 스마트폰 어플리케이션</td>
            </tr>
          </table>
          <p class="table_note">* 제품성능은 ㈜에너지인증연구소(KOLAS인증)에서 ‘KS B 6879:열회수형 환기장치’ 시험방법에 따라 측정된 값이며 실제 생활환경에서는
            실험결과와 차이가 있을 수 있습니다.</p>
          <div class="air_condition_table_wrap">
            <div class="air_condition_table_area">
            <table class="air_condition_table">
              <tr>
                <th rowspan="2" colspan="2">구분</th>
                <td colspan="2">실내측 공기상태(℃)</td>
                <td colspan="2">실외측 공기상태(℃)</td>
              </tr>
              <tr>
                <td>건구 온도</td>
                <td>습구 온도</td>
                <td>건구 온도</td>
                <td>습구 온도</td>
              </tr>
              <tr>
                <th rowspan="2">효율<br>시험</th>
                <th rowspan="1">냉방</th>
                <td>24.0 ± 0.3</td>
                <td>17.0 ± 0.2</td>
                <td>35.0 ± 0.3</td>
                <td>24.0 ± 0.2</td>
              </tr>
              <tr>
                <th rowspan="1">난방</th>
                <td>24.0 ± 0.3</td>
                <td>17.0 ± 0.2</td>
                <td>35.0 ± 0.3</td>
                <td>24.0 ± 0.2</td>
              </tr>
            </table>
            </div>
            <p class="table_note">* 제품 성능과 사양은 예고 없이 변경될 수 있습니다.</p>
            <p class="table_note">* LX지인 환기시스템은 가혹환경조건(외부 영하 10도 이하 등)에서 기기보호를 위하여 실내, 실외 공기를 차단합니다.</p>
            <p class="table_note">* 앱 연결을 위한 Wi-Fi가 필요하며, 일부 단말기에서는 작동하지 않을 수 있습니다.</p>
            <p class="table_precautions">Z:IN 자동환기 설치 확인사항</p>
            <ul class="table_precautions_info">
              <li>① 창호결합형 기계환기장치이며, 주로 공동주택의 실외기실 등의 천장에 설치되는 환기설비와는 다릅니다.</li>
              <li>② 설치 시, 환기 시스템 두께(325mm)때문에 창호보다 내부로 돌출될 수 있습니다.</li>
              <li>③ 설치하고자 하는 위치에 장애물(에어컨, 장식장, 안마의자 등)이 있는 경우 설치되지 않을 수 있습니다.</li>
              <li>④ 설치 시 기존 커튼, 블라인드 간섭이 발생해 재설치가 필요할 수 있습니다.</li>
              <li>⑤ 전선 마감을 위해 전선몰딩이 필요할 수 있습니다. (그레이, 베이지, 화이트 색상 선택 가능)</li>
              <li>⑥ 필터/전열교환소자 권장 교체 주기 : 필터는 약 5개월, 전열교환소자는 약 23개월 사용 후 교체를 권장합니다. (24시간 동작 기준)</li>
            </ul>
          </div>
        </div>
      </div>
      <button class="close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>

import LayerPopup from "~/components/common/LayerPopup";

export default {
  name: "ZinWindowsInfo",
  components: {
    LayerPopup,
  },
  data() {
    return {
      showModal: false,
      activeIndex: 0,
      presentIndex: 0,
      additionalIndex: 0,
      tabMenu: ["Z:IN 창호의 철학", "Z:IN 창호 이야기", "구매방법", "그린리모델링", "서비스", "부가제품"],
      lineUp: ["유로시스템 9", "수퍼세이브", "파워세이브"],
      swipeThumbOptions: {
        loop: false,
        slidesPerView: "1",
        spaceBetween: 12,
        navigation: {
          nextEl: ".arr_next",
          prevEl: ".arr_prev",
        },
        pagination: {
          el: ".cnt_2_slide_area .zin_pagination",
          type: "progressbar",
          clickable: false,
        },
      },
      swipeStartOptions: {
        loop: false,
        slidesPerView: "3",
        spaceBetween: 19,
        navigation: {
          nextEl: ".arr_next",
          prevEl: ".arr_prev",
        },
      },
      bannerOptions: {
        loop: true,
        pagination: {
          el: `.safe_mesh_slide_list_0 .zin_slide_pagination_group`,
          clickable: false,
        },
        navigation: {
          nextEl: `.safe_mesh_slide_list_0 .arr_next`,
          prevEl: `.safe_mesh_slide_list_0 .arr_prev`,
        },
        autoplay: false,
      },
      bannerOptions2: {
        loop: true,
        pagination: {
          el: `.safe_mesh_slide_list_1 .zin_slide_pagination_group`,
          clickable: false,
        },
        navigation: {
          nextEl: `.safe_mesh_slide_list_1 .arr_next`,
          prevEl: `.safe_mesh_slide_list_1 .arr_prev`,
        },
        autoplay: false,
      },
      bannerOptions3: {
        loop: true,
        pagination: {
          el: `.safe_mesh_slide_list_2 .zin_slide_pagination_group`,
          clickable: false,
        },
        navigation: {
          nextEl: `.safe_mesh_slide_list_2 .arr_next`,
          prevEl: `.safe_mesh_slide_list_2 .arr_prev`,
        },
        autoplay: false,
      },
      bannerOptions4: {
        loop: true,
        pagination: {
          el: `.safe_mesh_slide_list_3 .zin_slide_pagination_group`,
          clickable: false,
        },
        navigation: {
          nextEl: `.safe_mesh_slide_list_3 .arr_next`,
          prevEl: `.safe_mesh_slide_list_3 .arr_prev`,
        },
        autoplay: false,
      },
      currentSlide: 1,
      totalSlide: "",
      imgList: [
        {
          img: "/img/zin/@_zin_slide_event_01.png",
        },
        {
          img: "/img/zin/@_zin_slide_event_02.png",
        },
        {
          img: "/img/zin/@_zin_slide_event_03.png",
        },
        {
          img: "/img/zin/@_zin_slide_event_04.png",
        },
        {
          img: "/img/zin/@_zin_slide_event_05.png",
        },
      ],
      historyList: [
        {
          img: "/img/zin/@_zin_slide_history_01.png",
          years: '1976',
          info: '플라스틱 창호생산',
        },
        {
          img: "/img/zin/@_zin_slide_history_02.png",
          years: '1996',
          info: '발코니창, 시스템창 출시',
        },
        {
          img: "/img/zin/@_zin_slide_history_03.png",
          years: '2009',
          info: '시공자회사 설립',
        },
        {
          img: "/img/zin/@_zin_slide_history_04.png",
          years: '2010',
          info: '자동환기창 출시',
        },
        {
          img: "/img/zin/@_zin_slide_history_05.png",
          years: '2011',
          info: '창호전문판매점 윈도우 플러스 런칭',
        },
        {
          img: "/img/zin/@_zin_slide_history_06.png",
          years: '2012',
          info: '창호 자동화 제작 10년 보증 실시',
        },
        {
          img: "/img/zin/@_zin_slide_history_07.png",
          years: '2013',
          info: '창호 홈쇼핑 개시',
        },
        {
          img: "/img/zin/@_zin_slide_history_08.png",
          years: '2016',
          info: '수퍼세이브 시리즈 런칭',
        },
        {
          img: "/img/zin/@_zin_slide_history_09.png",
          years: '2017',
          info: '선택 기능성 제품UP런칭',
        },
      ],
      isHideTable: false,
      systemInfo: [
        {},
      ],
      systemTab: [
        {
          title: "유로시스템 9 제품",
          productList: [
            {
              img: "/img/zin/@_zin_windows_product_01.png",
              name: "터닝도어",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_02.png",
              name: "Side Hung/Top Hung",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_03.png",
              name: "Parallel Silde",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_04.png",
              name: "Lift&Slide",
              number: "7072-08",
              badge: ["new", "best"],
            },
          ],
        },
        {
          title: "수퍼세이브",
          productList: [
            {
              img: "/img/zin/@_zin_windows_product_01.png",
              name: "터닝도어",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_02.png",
              name: "Side Hung/Top Hung",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_03.png",
              name: "Parallel Silde",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_04.png",
              name: "Lift&Slide",
              number: "7072-08",
              badge: ["new", "best"],
            },
          ],
        },
        {
          title: "파워세이브",
          productList: [
            {
              img: "/img/zin/@_zin_windows_product_01.png",
              name: "터닝도어",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_02.png",
              name: "Side Hung/Top Hung",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_03.png",
              name: "Parallel Silde",
              number: "7072-08",
              badge: ["new", "best"],
            },
            {
              img: "/img/zin/@_zin_windows_product_04.png",
              name: "Lift&Slide",
              number: "7072-08",
              badge: ["new", "best"],
            },
          ],
        },
      ],
      additionalList: [
        {
          en: 'Super LowE',
          ko: '수퍼로이유리',
          button: '자세히보기',
        },
        {
          en: 'Super Solar LowE',
          ko: '수퍼솔라로이유리',
          button: '자세히보기',
        },
        {
          en: 'Safe Mesh',
          ko: '안전강화 방충망',
          button: '자세히보기',
        },
        {
          en: 'Easy Open',
          ko: '열기 쉽게 도와주는 핸들 기술',
          button: '자세히보기',
        },
        {
          en: 'Fresh',
          ko: '유해먼지 저감 필터망',
          button: '자세히보기',
        },
        {
          en: 'Ventilation System',
          ko: 'Z:IN 자동환기',
          button: '자세히보기',
        },
      ],
      AdditionalImg: [
        {
          img: "/img/zin/@_zin_slide_additional_01.png",
        },
        {
          img: "/img/zin/@_zin_slide_additional_02.png",
        },
      ],
      AdditionalImg2: [
        {
          img: "/img/zin/@_zin_slide_additional_03.png",
        },
        {
          img: "/img/zin/@_zin_slide_additional_04.png",
        },
      ],
      AdditionalImg3: [
        {
          img: "/img/zin/@_zin_slide_additional_05.png",
        },
        {
          img: "/img/zin/@_zin_slide_additional_06.png",
        },
      ],
      AdditionalImg4: [
        {
          img: "/img/zin/@_zin_slide_additional_07.png",
        },
        {
          img: "/img/zin/@_zin_slide_additional_08.png",
        },
      ],
      isHideImg:false,
      isPlayVideo:false,
    };
  },
  computed: {
    systemTabList() {
      return this.systemTab[this.presentIndex];
    },
    swiperIndex() {
      const result = this.activeIndex === 3 ? this.swipeThumbOptions : this.swipeStartOptions;
      // console.log(result);
      return result;
    },
  },
  watch: {
    activeIndex() {
      console.log('asdfas', this.activeIndex);
    },
  },
  methods: {
    tabIndex(idx) {
      this.activeIndex = idx
    },
    setListIndex(idx) {
      this.additionalIndex = idx;
    },
    videoPlay() {
      this.isHideImg = !this.isHideImg;
      this.isPlayVideo = !this.isPlayVideo;
    },
    zoreNumSet(num) {
      // console.log(num);
      if (num < 10) return "0" + num;
      return num;
    },
    onSlideChange() {
      this.currentSlide = this.$refs.swipeList.$swiper.realIndex + 1;
      // console.log(this.$refs.swipeList.$swiper)
    },
    tableHide() {
      this.isHideTable = !this.isHideTable;
    },
    toggleLayerPopup() {
      this.$refs.layerPopup.toggle();
    },
    toggleLayerPopup1() {
      this.$refs.layerPopup1.toggle();
    },
    toggleLayerPopup2() {
      this.$refs.layerPopup2.toggle();
    },
    toggleLayerPopup3() {
      this.$refs.layerPopup3.toggle();
    },
    toggleLayerPopup4() {
      this.$refs.layerPopup4.toggle();
    },
    toggleLayerPopup5() {
      this.$refs.layerPopup5.toggle();
    },
    closeModal() {
      this.showModal = false;
      this.$nuxt.$emit("htmlOverShow");
    },
  },
  async mounted() {
    await this.$nextTick();
    this.totalSlide = this.imgList.length;
  },
};
</script>

<style scoped>

</style>