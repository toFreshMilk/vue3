<template>
  <v-app id="container">
      <main id="contents" class="store_page detail_page">
        <div class="min_inner">
          <!-- 0601 하단 page_head,page_body,page_foot,body_inner div구조 추가 및 section 안의 sec_inner 삭제 -->
          <div class="page_head">
            <!--0607 하단 breadcrumb 섹션 추가 -->
            <section class="cate_head_sec">
              <div class="breadcrumb_list">
                <span><nuxt-link to="/store/home/">스토어 홈</nuxt-link></span>
                <span><nuxt-link to="/store/category/">카테고리</nuxt-link></span>
                <span v-for="(category, i) in categoryPath" :key="'category' + i"><nuxt-link :to="'/store/category/' + category.category">{{ category.name }}</nuxt-link></span>
              </div>
            </section>
            <section class="order_sec">
              <div class="order_inner grid">
                <div class="item_visual_wrap">
                  <DetailImgViewer :evtData="evtData" :imgData="itemImgs"/>
                  <!--0617 태그 수정 -->
                  <div class="slogan_banner_area">
                    <img src='/img/store/@_store_slogan.png'>
                  </div>
                </div>
                <div class="item_summary_wrap col">
                  <div class="price_info_group">
                    <nuxt-link v-if="goods.vendrName" :to="'#'" class="brand c_point3">[{{ goods.vendrName }}]<i class="arw arw_right_c"></i></nuxt-link>
                    <div class="price_wrap">
                      <h2 class="item_ttl">
                        <span class="ttl">{{ goods.prdName }}</span>
                        <div class="flag_group">
                          <span v-for="(badge, i) in badges" :key="'badge' + i" class="flag_item" style="margin-right:7px"><img :src="'/img/common/flag_' + badge.type+ '.png'" :alt="badge.name"></span>
                        </div>
                      </h2>
                      <div class="review_wrap has_elem">
                        <!-- <Grade :grade-num="goods.starPoint"></Grade> -->
                        <Grade :grade-num="4.7"></Grade>
                        <div class="review_area">
                          <nuxt-link @click.native="StoreLnbtabNum = 2" to="#itemReview"><span>상품후기<span class="num"> {{ numSet(reviewTotal) }}</span></span></nuxt-link>
                        </div>
                        <div class="btn_wrap">
                          <div class="btn_inner">
                            <div @click="function(){thisPostScrap = !thisPostScrap}" class="scrap_btn type_w"
                                 role="button">
                              <i :class="goods.scrapYn === 'Y' ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/>
                            </div>
                            <div class="share_btn_area btn_area">
                              <div @click="shareBtnToggle($event)" class="share_btn open_btn type_w" role="button">
                                <i class="ic ic_share"></i>
                              </div>
                              <ShareSns :appendClass="'type_arw_bottom'"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p v-if="goods.saleRate > 0" class="price before"><span class="discount">{{ goods.saleRate }}%</span>
                        <span class="num">{{ numSet(goods.sellPrice) }}</span>원</p>
                      <p class="price after"><span class="num">{{ numSet(goodsPrice()) }}</span>원</p>
                      <p v-if="goods.cupnUseYn === 'Y'" class="price coupon c_point3"><span class="num">{{ numSet(goods.cupnPrice) }}</span>원
                        <small>쿠폰적용가</small></p>
                      <ZinDialog v-if="goods.cupnUseYn === 'Y'" ref="couponDialog" :noP="true" dialog-title="쿠폰 다운받기" :max-w="540">
                        <template v-slot:btn>
                          <button class="download_coupon"><i class="ic ic_download"></i>쿠폰받기</button>
                        </template>
                        <template v-slot:bodyArea>
                          <div class="coupon_group biggest_coupon">
                            <h6 class="ttl">최대 혜택 쿠폰</h6>
                            <div v-for="(item,i) in couponItems.biggestCoupon"
                                 :class="item.download ? 'complete_download' : 'before_download'"
                                 class="coupon_frame before_download"
                                 :key="'biggestCoupon' + i"
                            >
                              <div class="frame_inner has_elem">
                                <div class="txt_wrap">
                                  <p class="price">
                                    <strong class="num">{{ item.price }}</strong><span class="unit">{{
                                      item.unit
                                    }}</span> 할인</p>
                                  <p class="coupon_name">{{ item.name }}</p>
                                  <div class="notice">
                                    <p v-for="(noticeTxt,i) in item.notice" :key="'notice' +i">{{ noticeTxt }}</p>
                                  </div>
                                </div>
                                <div class="btn_area">
                                  <button v-if="item.download" class="download_btn" disabled>
                                    <i class="ic ic_check_w"></i>
                                    <p>다운로드<br>완료</p>
                                  </button>
                                  <button v-else class="download_btn">
                                    <i class="ic ic_download_w"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="coupon_group other_coupon">
                            <h6 class="ttl">이 상품에 적용 가능한 다른 쿠폰</h6>
                            <div v-for="(item,i) in couponItems.otherCoupon" :key="'otherCoupon' + i"
                                 :class="item.download ? 'complete_download' : 'before_download'" class="coupon_frame">
                              <div class="frame_inner has_elem">
                                <div class="txt_wrap">
                                  <p class="price"><strong class="num">{{ item.price }}{{ item.unit }}</strong> 할인</p>
                                  <p class="coupon_name">{{ item.name }}</p>
                                  <div class="notice">
                                    <p v-for="(noticeTxt,i) in item.notice" :key="'noticeTxt'+i">{{ noticeTxt }}</p>
                                  </div>
                                </div>
                                <div class="btn_area">
                                  <button v-if="item.download" class="download_btn" disabled>
                                    <i class="ic ic_check_w"></i>
                                    <p>다운로드<br>완료</p>
                                  </button>
                                  <button v-else class="download_btn">
                                    <i class="ic ic_download_w"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="use_warning">
                            <ul class="warning_inner dot_ls bg_box">
                              <li class="dot_txt">쿠폰 사용 시 최소 구매 금액과 최대 할인 금액을 꼭 확인하세요.</li>
                              <li class="dot_txt">받은 쿠폰은 마이페이지 또는 주문/결제 페이지에서 확인 가능합니다.</li>
                            </ul>
                          </div>
                        </template>
                        <template v-slot:btnGroup>
                          <button class="btn h_m strong col_6" @click="$refs.couponDialog.dialog = false">쿠폰 모두 받기
                          </button>
                        </template>
                      </ZinDialog>
                    </div>
                    <div v-if="goods.soldOutYn === 'Y'" class="sold_out_notice">
                      <p>이 상품은 현재 구매하실 수 없습니다.</p>
                      <small v-id="goods.exptRestkDate != ''">({{ goods.exptRestkDate |  }} 이후 재입고 예정)</small>
                    </div>
                  </div>
                  <!-- 0531. 하단 item_info_wrap 구조 수정 -->
                  <!-- 0607. 하단 item_info_wrap 구조 수정 -->
                  <div class="item_info_wrap">
                    <div class="item_info_frame">
                      <dl class="txt_area layer_popup_open">
                        <dt class="info_ttl">적립 혜택</dt>
                        <dd class="info_area" role="button">
                          <div class="popup_area">
                            <span @click="$refs.pointPopup.isShow = true">
                            최대
                            <span class="c_point3">
                             {{ numSet(goods.svePoint) }}P
                           </span>
                            적립
                            <i class="arw arw_right"/>
                              </span>
                            <LayerPopup ref="pointPopup">
                              <template v-slot:ttl>
                                <h4 class="ttl">
                                  적립 혜택
                                </h4>
                              </template>
                              <template v-slot:cnt>
                                <div class="layer_popup_cnt">
                                  <dl class="cnt_area">
                                    <dt>구매 적립 {{ goods.sveRate || 0 }}%</dt>
                                    <dd>
                                      {{ numSet(goods.svePoint) }}P
                                    </dd>
                                  </dl>
                                </div>
                              </template>
                            </LayerPopup>
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div class="item_info_frame">
                      <dl class="txt_area">
                        <dt class="info_ttl">카드 혜택</dt>
                        <dd class="info_area">
                          <div class="popup_area img_layer_popup">
                            <span @click="$refs.cardPopup.isShow = true">
                                  무이자/할인안내
                            <i class="arw arw_right"/>
                              </span>
                            <LayerPopup ref="cardPopup">
                              <template v-slot:cnt>
                                <div class="layer_popup_cnt">
                                  <!-- <img src="https://cdn.finda.co.kr/blog/20190425161501/2-13.jpg"> -->
                                  <img src="https://pgweb.tosspayments.com/resource/mertadmin/banner/main_banner_PopUp.png">
                                </div>
                              </template>
                            </LayerPopup>
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div class="item_info_frame">
                      <dl class="txt_area">
                        <dd class="info_ttl">배송 정보</dd>
                        <dt class="info_area">
                          <nuxt-link @click.native="StoreLnbtabNum = 4" to="#itemNotice">
                            <span class="has_underL">직접배송(무료배송)</span>
                            <i class="arw arw_right"/></nuxt-link><br>
                          <small>
                            배송일 선택가능, 도서산간 배송비 +5,000원, 제주도/울릉도
                            지역 배송불가
                          </small>
                        </dt>
                      </dl>
                    </div>
                  </div>
                  <div class="item_option_wrap">
                    <StoreItemOption v-for="(item, i) in optionData" :key="'option' + i" :optionData="item" @addOption="addOption"/>
                    <div class="selected_group">
                      <div v-for="(item, k) in selectedOption" :key="'sel_item' + k"
                           v-if="selectedOption.length > 0" class="selected_item">
                        <div class="select_inner">
                          <div class="select_option_area">
                            <dl>
                              <!-- <dt>{{ item.name }}:</dt> -->
                              <dd>{{ item.name }}</dd>
                            </dl>
                          </div>
                          <div class="result_area">
                            <div class="quantity_wrap">
                              <!--Dev : 다이어로그 호출시 하단 dialogAlert()에 내용 넣기 -->
                              <button @click="decreaseQuantity(item)" class="btn_quantity minus"></button>
                              <div class="input_area">
                                <div class="input_box">
                                  <input v-model="item.quantity" type="number">
                                </div>
                              </div>
                              <button @click="increaseQuantity(item)" class="btn_quantity plus"></button>
                            </div>
                            <div class="total_price">
                              <span class="num">{{ numSet(optionPrice(item)) }}</span>원
                            </div>
                          </div>
                          <button v-if="optionData.length > 0" class="delete_btn" @click="deleteOption(item)">
                            <i class="ic ic_close_s"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="total_price_area">
                      <dl class="clearFix">
                        <dt>총 상품금액</dt>
                        <dd><span class="count_area"><span class="count">{{ numSet(totalQuantity) }}</span>개</span>
                          <strong
                              class="total_price"><span class="num">{{ numSet(totalPrice) }}</span>원</strong></dd>
                      </dl>
                    </div>
                  </div>
                  <div class="order_btn_wrap">
                    <div v-if="goods.soldOutYn === 'N'" class="btn_area grid grid_5">
                      <!-- Dev : 취소 버튼이 있는 다이얼로그일 경우 -->
                      <button @click="dialogConfirm('상품을 장바구니에 담았습니다. 장바구니로 이동 하시겠습니까?')" class="col col_6"><span
                          class="btn basic h_m">장바구니</span></button>
                      <button @click="dialogConfirm('최초 1회 본인인증 후 상품구매서비스를 이용할 수 있습니다. 본인인증을 하시겠습니까?')"
                              class="col col_6"><span class="btn strong h_m">바로구매</span></button>
                    </div>
                    <div v-else class="btn_area">
                      <button class="sold_out"><span class="btn h_m">일시품절</span></button>
                    </div>
                  </div>
                </div>
              </div>
              <FullBanner :bannerItems="shortBannerItems" :autoplay-delay="{delay:3000}" arwType=""/>

            </section>
            <div class="detail_lnb_area">
              <div class="tabs type_line store_lnb" id="storeLnb">
                <div class="tab_inner">
                <div :class="StoreLnbtabNum === 1 ? 'is_active' : ''"  class="tab_node">
                  <!-- 0614 하단 tab_item에 click이벤트 추가 -->
                  <nuxt-link @click.native="StoreLnbtabNum = 1" to="#itemCnt" class="tab_item">상품정보</nuxt-link>
                </div>
                <div :class="StoreLnbtabNum === 2 ? 'is_active' : ''" class="tab_node">
                  <nuxt-link @click.native="StoreLnbtabNum = 2" to="#itemReview" class="tab_item">상품후기
                    <span class="num">({{ numSet(reviewTotal) }})</span></nuxt-link>
                </div>
                <div :class="StoreLnbtabNum === 3 ? 'is_active' : ''" class="tab_node">
                  <nuxt-link @click.native="StoreLnbtabNum = 3" to="#itemQna" class="tab_item">상품Q&A
                    <span class="num">({{ numSet(qnaTotal) }})</span></nuxt-link>
                </div>
                <div :class="StoreLnbtabNum === 4 ? 'is_active' : ''" class="tab_node">
                  <nuxt-link @click.native="StoreLnbtabNum = 4" to="#itemNotice" class="tab_item">배송/교환/환불</nuxt-link>
                </div>
                </div>
              </div>
              <div v-if="hasNotice" class="notice">
                <p><i class="ic ic_notice"></i><b>긴급공지</b><span>주문폭주로 배송이 지연되고 있습니다. 이용에 불편을 드려 죄송합니다.</span></p>
              </div>
            </div>
          </div>
          <div class="page_body">
            <div class="body_inner">
              <section id="itemCnt" class="item_cnt_sec">
                <div class="img_area" v-html="goods.dsc"/>
              </section>
              <section id="itemReview" class="item_review_sec clearFix">
                <div class="ttl_wrap has_elem">
                  <div class="ttl_area"><h5>후기</h5>
                  </div>
                  <div class="btn_area">
                    <button class="btn h_s strong">후기 쓰기</button>
                  </div>
                </div>
                <div class="review_summary">
                  <div class="grade_frame">
                    <Grade :grade-num="1.8" size="large"></Grade>
                    <div class="review_count">
                      <!-- 0607 하단 count_wrap 구조 추가 및 layerpopup 등 추가 -->
                      <div class="count_wrap">
                        <strong @click="$refs.reviewPopup.isShow = true" class="c_point3">{{ numSet(reviewTotal) }}</strong>
                        <LayerPopup ref="reviewPopup">
                          <template v-slot:ttl>
                            <h4 class="ttl">
                              후기 상세보기
                            </h4>
                          </template>
                          <template v-slot:cnt>
                            <div class="layer_popup_cnt reviewPopup_cnt">
                              <div class="count_frame">
                                <div>5점</div>
                                <div class="bar_area">
                                  <span :style="`width:${starPointData.starPoint5Cnt/reviewTotal*100}%;`" class="count"></span>
                                </div>
                                <div class="total c_point3">{{ numSet(starPointData.starPoint5Cnt) }}</div>
                              </div>
                              <div class="count_frame ">
                                <div>4점</div>
                                <div class="bar_area">
                                  <span :style="`width:${starPointData.starPoint4Cnt/reviewTotal*100}%;`" class="count"></span>
                                </div>
                                <div class="total">{{ numSet(starPointData.starPoint4Cnt) }}</div>
                              </div>
                              <div class="count_frame ">
                                <div>3점</div>
                                <div class="bar_area">
                                  <span :style="`width:${starPointData.starPoint3Cnt/reviewTotal*100}%;`" class="count"></span>
                                </div>
                                <div class="total">{{ numSet(starPointData.starPoint3Cnt) }}</div>
                              </div>
                              <div class="count_frame ">
                                <div>2점</div>
                                <div class="bar_area">
                                  <span :style="`width:${starPointData.starPoint2Cnt/reviewTotal*100}%;`" class="count"></span>
                                </div>
                                <div class="total">{{ numSet(starPointData.starPoint2Cnt) }}</div>
                              </div>
                              <div class="count_frame ">
                                <div>1점</div>
                                <div class="bar_area">
                                  <span :style="`width:${starPointData.starPoint1Cnt/reviewTotal*100}%;`" class="count"></span>
                                </div>
                                <div class="total">{{ numSet(starPointData.starPoint1Cnt) }}</div>
                              </div>
                            </div>
                          </template>
                        </LayerPopup>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ttl_wrap">
                  <div class="ttl_area"><h5>포토 <span class="c_point3">{{ numSet(photoReviewTotal) }}</span>개</h5></div>
                </div>
                <div class="photo_thumb_list">
                  <div class="photo_inner clearFix">
                    <div v-for="(item,i) in photoReviewData" v-if="photoReviewTotal>0" :key="'reviewData' + i" class="thumb_item">
                      <div class="thumb_inner">
                        <!-- TODO -->
                        <!-- <img :src="item.photoIds[0]"/> -->
                        <button @click="showPhotoDialog(i)">
                          <img :src="photoSample1[0]"/>
                          <span v-if="item.photoIdsCnt>1" class="length_badge">{{ item.photoIdsCnt }}</span>
                        </button>
                      </div>
                    </div>
                    <div v-if="photoReviewTotal > 6" class="more_btn_area">
                      <StorePhotoReview ref="reviewDialog" :topBtn="true" :max-w="850" 
                                        :prdId="prdId" :reviewIndex="reviewIndex" :reviewSort="reviewSort"
                                        @updateReview="updateReview" @deleteReview="deleteReviewConfirm" @declareReview="showDeclareDialog"/>
                    </div>
                  </div>
                </div>
                <div class="cnt_wrap">
                  <div class="cnt_head review_info clearFix">
                    <div class="length_area">
                      전체 <span class="num c_point3">{{ numSet(reviewTotal) }}</span>개
                    </div>
                    <div class="contour_group align_btn_area">
                      <button v-for="(sortItem, i) in reviewSortOpt" :key="'reviewSort'+ i" class="contour_item"
                           :class="sortItem.value === reviewSort ? 'is_active':''"
                           @click="sortReview(sortItem.value)">{{ sortItem.label }}</button>
                    </div>
                  </div>
                  <ZinDialog ref="declareDialog" dialogTitle="신고하기" :maxW="540"
                              :contour="true" :noticeArea="true">
                    <!-- <template v-slot:btn>
                      <button class="contour_item">신고</button>
                    </template> -->
                    <template v-slot:bodyArea>
                      <h6 class="ttl">신고 사유를 선택해 주세요.</h6>
                      <div class="radio_group">
                        <div v-for="(item, i) in declareTypeData" class="input_area radio">
                          <div class="input_box">
                            <label>
                              <input type="radio" v-model="declare.reportCd" :value="item.id"><span>{{ item.name }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-slot:btnGroup>
                      <button @click="closeDeclare" class="col col_6 btn h_m line">취소
                      </button>
                      <button @click="confirmDeclare" class="col col_6 btn m strong h_m ">신고
                      </button>
                    </template>
                    <template v-slot:noticeArea>
                      <div class="bg_box has_color">
                        <p class="c_point3">신고 유의사항</p>
                        <ul class="dot_ls">
                          <li>신고해 주신 내용은 관리자 검토 후 운영정책에 따라 조치가 진행됩니다.</li>
                          <li>타당한 사유가 없는 허위 신고 누적 시 신고 활동에 제한이 가해질 수 있으니 신중하게 작성해주세요.</li>
                        </ul>
                      </div>
                    </template>
                  </ZinDialog>
                  <div class="cnt_body">
                    <div class="review_group">
                      <div v-for="(item,index) in reviewData " v-if="index<5" class="review_item">
                        <div class="user_info has_elem">
                          <div class="img_area">
                            <!-- <figure v-if="item.userProfile !== ''" :style="`background-image: url('${item.userProfile}')`"></figure> -->
                          </div>
                          <div class="info_wrap">
                            <Grade :gradeNum="floorStar(item.starAvg)"></Grade>
                            <div class="contour_group">
                              <span class="contour_item">{{ item.nickName }}</span>
                              <span class="contour_item">{{ item.creDate | textDate }}</span>
                              <div v-if="item.creUserSameYn === 'Y'" class="contour_group contour_item modify_btn_area">
                                <button class="btn_modify contour_item" @click="updateReview(item)">수정</button>
                                <button class="btn_delete contour_item" @click="deleteReviewConfirm(item)">삭제</button>
                              </div>
                              <div v-else class="contour_item contour_group">
                                <button class="contour_item" @click="showDeclareDialog(item)">신고</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="user_option_area">
                          <div class="contour_group">
                            <span v-for="(option,i) in item.itemOption" :key="'userOption' + i" class="contour_item">{{ option }}</span>
                          </div>
                        </div>
                        <div :class="{is_more : moreViewActive(item)}" class="txt_area">
                          <!--0621. 하단에 있던 p태그를 div로 변경 & 클래스 추가-->
                          <div class="cnt" v-html="$options.filters.formatBreakLineText(item.content)"/>
                          <div v-if="item.content.length>153" @click="item.moreActive = !item.moreActive"
                               class="txt_more_view">
                            <button v-if="moreViewActive(item)" class="btn_close">접기
                              <i class="arw arw arw_triangle_g"></i></button>
                            <button v-else class="btn_open">더보기
                              <i class="arw arw arw_triangle_g"></i>
                            </button>
                          </div>
                        </div>
                        <div v-if="item.photoIdsCnt>0" class="user_photo_list">
                          <div class="user_photo_inner grid grid_5">
                            <div v-for="(photoItem,i) in item.photoIds" :key="'userPhoto' + i" class="photo_item col col_x5">
                              <div class="photo_inner">
                                <!-- <img :src="photoItem"/> -->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> <!-- review_item 반복 -->
                      <div v-if="reviewData.reviewTotal<1" class="no_data"><!-- 후기가 없을 경우 -->
                        첫 후기를 작성해주세요.
                      </div>
                    </div>
                    <Pagination v-if="(reviewData !== null && reviewData.length > 0)" :totalCount="reviewTotal" :currentNo="reviewPageNo" :pageSize="reviewPageSize" @changePage="onChangeReviewPage"/>
                  </div>
                </div>
              </section>
              <section id="itemQna" class="item_qna_sec">
                <div class="ttl_wrap">
                  <div class="ttl_area"><h5>Q&A</h5>
                    <div @click="$refs.qnaPopup.isShow = true" class="ic_area"><i class="ic ic_info"></i></div>
                    <LayerPopup ref="qnaPopup">
                      <template v-slot:ttl>
                        <h4 class="ttl">
                          Q&A 안내
                        </h4>
                      </template>
                      <template v-slot:cnt>
                       <div class="qna_info_area">
                         <ul class="dot_ls">
                           <li class="dot_txt">
                             상품 Q&A는 상품에 대해 판매자에게 문의하는 게시판입니다.
                           </li>
                           <li class="dot_txt">
                             상품과 관련 없는 내용이나 허위 사실을 유포하는 경우에는 사전 연락없이 삭제될 수 있습니다.
                           </li>
                           <li class="dot_txt">
                             문의 내용에 대한 답변은 ‘마이 페이지 > 나의 상담 > 상품 Q&A 내역’ 또는 상품 상세 페이지에서 확인할 수 있습니다.
                           </li>
                         </ul>
                       </div>
                      </template>
                    </LayerPopup>
                  </div>
                </div>
                <div class="cnt_wrap">
                  <div class="cnt_head qna_info has_elem">
                    <div class="length_area">
                      <p>전체 <span class="num c_point3">{{ qnaTotal }}</span>개</p>
                      <div class="input_area check type_box type_all">
                        <div class="input_box">
                          <label>
                            <input type="checkbox" v-model="qnaSecretYn">
                            <span>비밀글 제외</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <ZinDialog ref="qnaDialog" dialog-title="Q&A 쓰기" :topBtn="true" :max-w="540" :subTtl="false">
                      <template v-slot:btn>
                        <div class="btn_area">
                          <button class="btn h_s strong" @click.stop="showQnaDialog">Q&A 쓰기</button>
                        </div>
                      </template>
                      <template v-slot:bodyArea>
                        <div class="body_cnt_body detail_modal must_input">
                          <div class="input_group question_type_area must_input">
                            <div class="input_area radio type_btn hrz inline clearFix">
                              <label>문의유형<span> *</span></label>
                              <div class="input_box_wrap">
                                <div v-for="(item, i) in qnaTypeData" :key="'qnaType' + i" class="input_box">
                                  <label>
                                    <input type="radio" v-model="qna.qnaType" :value="item.id">
                                    <span>
                                    {{ item.name }}
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="input_area textarea hrz must_input">
                            <label>문의내용<span> *</span></label>
                            <div class="input_box">
                              <v-textarea auto-grow rows="1" row-height="100" v-model="qna.content"></v-textarea>
                              <div class="txt_length">
                                <span>{{ qna.content.length }}</span>/1,000자
                              </div>
                            </div>
                            <div class="input_area check type_box type_all">
                              <div class="input_box">
                                <label>
                                  <input type="checkbox" v-model="qna.secretYn" value="Y">
                                  <span>비밀글 문의</span>
                                </label>
                              </div>
                            </div>
                          </div>

                          <ul class="bg_box dot_ls gray">
                            <li class="dot_txt">비밀글 문의 시, Q&A 목록에서 답변 내용을 확인할 수 없습니다.</li>
                            <li class="dot_txt">상품과 관련 없는 내용이나 허위 사실을 유포하는 경우에는 사전 연락없이 삭제될 수 있습니다.</li>
                          </ul>
                        </div>
                      </template>
                      <template v-slot:btnGroup>
                        <button class="btn h_m basic col col_6" @click="cancelQna">취소
                        </button>
                        <button class="btn h_m strong col col_6" @click="saveQna">저장
                        </button>
                      </template>
                    </ZinDialog>

                  </div>
                  <div class="cnt_body">
                    <div class="review_group">
                      <div v-for="(item, i) in qnaData" :key="'qna' + i" class="review_item">
                        <div class="user_info has_elem">
                          <div class="img_area">
                            <!-- <figure :style="`background-image: url('${item.creUser}')`"></figure> -->
                          </div>
                          <div class="info_wrap">
                            <div class="contour_group">
                              <span class="contour_item">{{ item.nickName }}</span>
                              <span class="contour_item">{{ item.creDate | textDate }}</span>
                              <div v-if="item.creUserSameYn === 'Y'" class="contour_group contour_item modify_btn_area">
                                <button class="btn_modify contour_item" @click="deleteQnaConfirm(item)">삭제</button>
                              </div>
                            </div>
                          </div>
                          <div class="answer_state badge_ls">
                            <div v-if="item.replyYn === 'Y'" class="badge btn basic c_green">답변완료</div>
                            <div v-else class="badge btn basic c_gray">답변대기</div>
                          </div>
                        </div>

                        <div :class="{is_more : moreViewActive(item)}" class="txt_area">
                          <div v-if="item.secretYn === 'N'" class="cnt" v-html="$options.filters.formatBreakLineText(item.content)"></div>
                          <div v-else-if="item.creUserSameYn === 'Y'" class="cnt" ><i class="ic ic_lock"/><span v-html="$options.filters.formatBreakLineText(item.content)"/></div>
                          <div v-else class="secret_txt"><i class="ic ic_lock"/>
                            비밀글입니다.
                          </div>

                          <div v-if="item.content.length>153"
                               @click="moreViewActive(item, true)" class="txt_more_view">
                            <button v-if="moreViewActive(item)" class="btn_close">접기
                              <i class="arw arw arw_triangle_g"></i></button>
                            <button v-else class="btn_open">더보기
                              <i class="arw arw arw_triangle_g"></i>
                            </button>
                          </div>
                        </div>

                        <div v-if="item.replyYn === 'Y' && (item.secretYn === 'N' || item.creUserSameYn === 'Y')" class="answer_wrap">
                          <div class="txt_area" v-html="$options.filters.formatBreakLineText(item.replyList.reply)"/>
                          <p class="date">{{ item.replyList.creDate | textDate }}</p>
                        </div>
                      </div> <!-- review_item 반복 -->
                      <div v-if="qnaData.length<1" class="no_data"><!-- 상품Q&A가 없을 경우 -->
                        상품Q&A가 없습니다.
                      </div>
                    </div>
                    <Pagination v-if="(qnaData !== null && qnaData.length > 0)" :totalCount="qnaTotal" :currentNo="qnaPageNo" :pageSize="qnaPageSize" @changePage="onChangeQnaPage"/>
                  </div>
                </div>
              </section>
              <section id="itemNotice" class="item_notice_sec">
                <div class="sec_head">
                  <h5 class="ttl">배송/교환/반품</h5>
                </div>
                <div class="notice_frame">
                  <div class="frame_head">
                    <div class="ttl_area">배송안내</div>
                  </div>
                  <div @click="deliveryOpen = !deliveryOpen" class="frame_body">
                    <dl>
                      <dt>배송비</dt>
                      <dd>{{ deliveryInfo.dlvPrice }}</dd>
                    </dl>
                    <dl>
                      <dt>배송방법</dt>
                      <dd>{{ deliveryInfo.dlvKind }}</dd>
                    </dl>
                    <dl>
                      <dt>도서산간 배송비</dt>
                      <dd>{{ deliveryInfo.isolatedRegionsPrice }}</dd>
                    </dl>
                    <dl>
                      <dt>배송 불가 지역</dt>
                      <dd>{{ deliveryInfo.dlvNonArea }}</dd>
                    </dl>
                    <dl>
                      <dt>출고지</dt>
                      <dd>{{ deliveryInfo.dlvFowrdAddress }}</dd>
                    </dl>
                    <dl>
                      <dt>추가정보</dt>
                      <dd>{{ deliveryInfo.dlvDsc }}</dd>
                    </dl>
                  </div>
                </div>
                <div class="notice_frame">
                  <div class="frame_head">
                    <div class="ttl_area">교환/반품 안내</div>
                  </div>
                  <div class="frame_body">
                    <dl>
                      <dt>교환/반품 기간</dt>
                      <dd>{{ exchangeInfo.retrnExchgPeriod }}</dd>
                    </dl>
                    <dl>
                      <dt>교환/반품 비용</dt>
                      <dd>{{ exchangeInfo.retrnExchgPrice }}</dd>
                    </dl>
                    <dl>
                      <dt>교환/반품 주소</dt>
                      <dd>{{ exchangeInfo.retrnExchgAddress }}</dd>
                    </dl>
                    <dl>
                      <dt>교환/반품 담당자</dt>
                      <dd>{{ exchangeInfo.retrnExchgUsr }}</dd>
                    </dl>
                  </div>
                </div>
                <div class="notice_frame">
                  <div class="frame_head ">
                    <div class="ttl_area">상품 정보제공 고시</div>
                  </div>
                  <div class="frame_body">
                    <dl>
                      <dt>품명 및 모델명</dt>
                      <dd>{{ goods.notiPrdName }}</dd>
                    </dl>
                    <dl>
                      <dt>KC 인증 필 유무</dt>
                      <dd>{{ goods.ksCertiYn }}</dd>
                    </dl>
                    <dl>
                      <dt>색상</dt>
                      <dd>{{ goods.color }}</dd>
                    </dl>
                    <dl>
                      <dt>구성품</dt>
                      <dd>{{ goods.frmt }}</dd>
                    </dl>
                    <dl>
                      <dt>주요소재</dt>
                      <dd>{{ goods.matrl }}</dd>
                    </dl>
                    <dl>
                      <dt>제조자/수입자</dt>
                      <dd>{{ goods.notiMaker }}</dd>
                    </dl>
                    <dl>
                      <dt>제조국</dt>
                      <dd>{{ goods.makCntry }}</dd>
                    </dl>
                    <dl>
                      <dt>크기</dt>
                      <dd>{{ goods.notiSiz }}</dd>
                    </dl>
                    <dl>
                      <dt>배송/설치비용</dt>
                      <dd>{{ goods.notiDlvPrice }}</dd>
                    </dl>
                    <dl>
                      <dt>품질보증기준</dt>
                      <dd>{{ goods.granty }}</dd>
                    </dl>
                    <dl>
                      <dt>AS책임자와 전화번호</dt>
                      <dd>{{ goods.asInfo }}</dd>
                    </dl>
                  </div>
                </div>
              </section>
            </div>
            <aside class="item_option_wrap floating_box_wrap">
              <div id="floatingBox" class="floating_box">
                <div class="box_inner">
                  <StoreItemOption v-for="(item, i) in optionData" :key="'option' + i" :optionData="item" @addOption="addOption"/>
                  <!-- 0607 하단 div 추가 -->
                  <div class="scroll_area" v-bar>
                    <div class="selected_group">
                      <div v-for="(item, k) in selectedOption" :key="'sel_item' + k"
                           v-if="selectedOption.length > 0" class="selected_item">
                        <div class="select_inner">
                          <div class="select_option_area">
                            <dl>
                              <!-- <dt>{{ item.name }}:</dt> -->
                              <dd>{{ item.name }}</dd>
                            </dl>
                          </div>
                          <div class="result_area">
                            <div class="quantity_wrap">
                              <button @click="decreaseQuantity(item)" class="btn_quantity minus">
                              </button>
                              <div class="input_area">
                                <div class="input_box">0
                                  <input type="number" v-model="item.quantity">
                                </div>
                              </div>
                              <button @click="increaseQuantity(item)" class="btn_quantity plus"></button>
                            </div>
                            <div class="total_price">
                              <span class="num">{{ numSet(optionPrice(item)) }}</span>원
                            </div>
                          </div>
                          <button v-if="optionData.length > 0" class="delete_btn" @click="deleteOption(item)">
                            <i class="ic ic_close_s"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="floating_box_foot">
                    <div class="total_price_area">
                      <dl class="clearFix">
                        <dt>총 상품금액</dt>
                        <dd><span class="count_area"><span class="count">{{ numSet(totalQuantity) }}</span>개</span>
                          <strong
                              class="total_price"><span class="num">{{ numSet(totalPrice) }}</span>원</strong></dd>
                      </dl>
                    </div>
                    <div class="order_btn_wrap">
                      <div class="btn_area grid grid_5">
                        <button @click="function(){thisPostScrap = !thisPostScrap}" class="col inline scrap_btn type_w">
                          <span class="btn basic h_m">
                          <i :class="thisPostScrap ? 'ic_scrap_c' : 'ic_scrap'" class="ic"/></span>
                        </button>
                        <button v-if="goods.soldOutYn === 'N'" class="col">
                          <span class="btn basic h_m"><i class="ic ic_cart"/></span>
                        </button>
                        <button v-if="goods.soldOutYn === 'Y'" class="buy_btn sold_out"><span class="btn h_m">일시품절</span></button>
                        <button v-else class="buy_btn col"><span class="btn strong h_m">바로구매</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="marker_bottom"></div>
            </aside>
          </div>
          <div class="page_foot">
            <section class="recommend_sec">
              <div class="recommend_slide_wrap has_cate">
                <SlideStoreItemList :slideLoop="false"
                                    slideName="user_item_slide"
                                    :itemCol="4" :max-items="20" :itemInfo="true"
                                    :moveGroup="4" :itemData="listItemData"
                                    :badgeShow="true" :categoryItems="slideCateItem" :isScrap="true">
                  <template v-slot:title>
                    <h3 class="ttl"><span class="color_ttl c_point3">지니지니</span>님 이런 상품은 어떠세요?</h3>
                  </template>
                </SlideStoreItemList>
              </div>
              <div class="recommend_slide_wrap">
                <SlideStoreItemList :slideLoop="false"
                                    slideName="bestItem_slide"
                                    :itemCol="4" :max-items="20" :itemInfo="true"
                                    :moveGroup="4"
                                    :itemData="listItemData"
                                    :badgeShow="true"
                                    hasLink="#" :isScrap="true">
                  <template v-slot:title>
                    <h3 class="ttl"><span class="color_ttl c_point3">일룸iloom</span>의 인기상품</h3>
                  </template>
                </SlideStoreItemList>
              </div>
              <div class="recommend_slide_wrap has_pagination_slide">
                <SlideStoreItemList :slideLoop="true" slideName="exhibition_slide" :itemCol="2"
                                    :autoplay-delay="{delay:3000}"
                                    :max-items="20" :itemInfo="true" :moveGroup="2" :itemData="exhibitionData"
                                    :badgeShow="false" :has-pagination="true" :isScrap="true">
                  <template v-slot:title>
                    <h3 class="ttl">이 상품이 포함된 기획전</h3>
                  </template>
                </SlideStoreItemList>
              </div>
            </section>
          </div>
        </div>
      </main>
    </v-app>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from "vuex";
import StoreItemOption from "~/components/store/StoreItemOption";
import SlideItemList from "~/components/common/SlideItemList";
import Pagination from "~/components/common/Pagination";
import SlideStoreItemList from "~/components/store/SlideStoreItemList";
import ZinDialog from "~/components/common/ZinDialog";
import DetailImgViewer from "~/components/store/DetailImgViewer";
import LayerPopup from "~/components/common/LayerPopup";
import FullBanner from "~/components/common/FullBanner";
import Grade from "~/components/common/Grade";
import StorePhotoReview from "~/components/store/StorePhotoReview";
import setFixElem from "~/common/js/fixElem";
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import floor from 'lodash/floor';
import debounce from "lodash/debounce";
import getGoodsBadges from "~/common/utils/badge";
import ShareSns from "~/components/common/ShareSns";

export default {
  name: "item-detail",
  components: {
    DetailImgViewer,
    Pagination,
    StoreItemOption,
    SlideItemList,
    SlideStoreItemList,
    ZinDialog,
    LayerPopup,
    FullBanner,
    Grade,
    StorePhotoReview,
    ShareSns,
  },
  data() {
    return {
      prdId: '',
      StoreLnbtabNum:1,
      pointPopup: false,
      hasNotice: true,
      memberCheck: false,

      /* 상품상세정보 */
      goods: {},
      optionData: [],
      deliveryInfo: {},
      exchangeInfo: {},
      badges: [],
      categoryPath: [],
      selectedOption: [],
      
      /* 별점 */
      starPointData: {},

      /* 후기 */
      reviewPageNo: 1,
      reviewPageSize: 5,
      reviewSort: '0',
      reviewTotal: 0,
      reviewData: [],
      reviewSortOpt: [
        {
          label: '최신순',
          value: '0',
        },
        {
          label: '평점 높은순',
          value: '1',
        },
        {
          label: '평점 낮은순',
          value: '2',
        },
      ],
      reviewSeq: '',
      reviewIndex: 5,
      declareTypeData: [],
      declare: {
        reportCd: '',
      },

      /* 포토후기 */
      photoReviewPageNo: 1,
      photoReviewPageSize: 5,
      photoReviewTotal: 0,
      photoReviewData: [],
      photoSample1: ["/img/store/@_thumb_01.png", "/img/store/@_thumb_02.png", "/img/store/@_thumb_03.png", "/img/store/@_thumb_04.png", "/img/store/@_thumb_05.png", "/img/store/@_thumb_05.png", "/img/store/@_thumb_05.png"],
      photoSample2: ["/img/store/@_thumb_01.png", "/img/store/@_thumb_02.png", "/img/store/@_thumb_03.png"],

      /* Q&A */
      qnaPageNo: 1,
      qnaPageSize: 5,
      qnaSecretYn: '',
      qnaTotal: 0,
      qnaData: [],
      qnaTypeData: [],
      qna: {
        content: ''
      },
      qnaSeq: '',

      evtData: {
        type: "time",
        eventInfo: {
          start: "2021.05.31 09:00:00",
          end: "2021.06.01 21:00:00",
        },
      },

      couponItems: {
        biggestCoupon: [{
          download: false,
          price: 100000,
          unit: "원",
          name: "일룸 주방가전 특가",
          notice: ["100,000원 이상 결제 시 최대 500,000원 사용 가능", "발급일로부터 7일간 유효"],
        }],
        otherCoupon: [{
          download: false,
          price: 100000,
          unit: "원",
          name: "일룸 주방가전 특가",
          notice: ["100,000원 이상 결제 시 최대 500,000원 사용 가능", "발급일로부터 7일간 유효"],
        }, {
          download: true,
          price: 15,
          unit: "%",
          name: "일룸 주방가전 특가",
          notice: ["100,000원 이상 결제 시 최대 500,000원 사용 가능", "발급일로부터 7일간 유효"],
        }],
      },
      shortBannerItems: [
        {
          bannerLink: "#",
          img: "/img/store/@_banner_01.png",
        }, {
          bannerLink: "#",
          img: "/img/store/@_banner_01.png",
        }, {
          bannerLink: "#",
          img: "/img/store/@_banner_01.png",
        },
      ],
      slideCateItem: [
        {
          show: true,
          txt: "이 상품과 비슷한 상품",
        }, {
          show: false,
          txt: "함께 많이 구매한 상품",
        }, {
          show: false,
          txt: "함께 많이 본 상품",
        },
      ],
      myScrapData: [],
      listItemData: [
        {
          itemID: 12,
          badges: ["new", "free"],
          img: "/img/store/@_thumb_01.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 272800,
            discount: 30,
          },
          grade: 3.8,
          reviewCount: 1820,
        }, {
          itemID: 112,
          badges: ["new", "free"],
          img: "/img/store/@_thumb_02.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 272800,
          },
          grade: 3.8,
          reviewCount: 1820,
        },
        {
          itemID: 13,
          badges: ["new", "free"],
          img: "/img/store/@_thumb_03.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 383900,
            discount: 20,
          },
          grade: 3.8,
          reviewCount: 1820,
        }, {
          itemID: 142,
          badges: ["new", "free"],
          img: "/img/store/@_thumb_04.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 272800,
            discount: 10,
          },
          grade: 4.2,
          reviewCount: 1820,
        },
        {
          itemID: 122,
          badges: ["new"],
          img: "/img/store/@_thumb_05.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 272800,
            discount: 10,
          },
          grade: 3.8,
          reviewCount: 1820,
        }, {
          itemID: 14,
          badges: ["new", "free"],
          img: "/img/store/@_thumb_06.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 272800,
            discount: 10,
          },
          grade: 3.8,
          reviewCount: 1820,
        },
        {
          itemID: 1,
          badges: ["new"],
          img: "/img/store/@_thumb_07.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 272800,
            discount: 10,
          },
          grade: 3.8,
          reviewCount: 1820,
        }, {
          itemID: 4,
          badges: ["new"],
          img: "/img/store/@_thumb_08.png",
          brand: "세타플러스",
          title: "FW 화이트 원형테이블 700size",
          link: "./detail",
          price: {
            default: 272800,
            discount: 10,
          },
          grade: 3.8,
          reviewCount: 1820,
        },
      ],
      exhibitionData: [
        {
          img: "/img/store/@_exhibition_01.png",
          itemColorTtl: "일룸 BRAND DAY",
          title: "일룸 가구 최대 50% 할인",
          date: "2021.05.01 ~ 2021.05.31",
        }, {
          img: "/img/store/@_exhibition_01.png",
          itemColorTtl: null,
          title: "화이트 가구 FESTIVAL",
          date: "2021.05.01 ~ 2021.05.31",
        }, {
          img: "/img/store/@_exhibition_02.png",
          itemColorTtl: "일룸 BRAND DAY",
          title: "일룸 가구 최대 50% 할인",
          date: "2021.05.01 ~ 2021.05.31",
        }, {
          img: "/img/store/@_exhibition_02.png",
          itemColorTtl: null,
          title: "화이트 가구 FESTIVAL",
          date: "2021.05.01 ~ 2021.05.31",
        }, {
          img: "/img/store/@_exhibition_01.png",
          itemColorTtl: "일룸 BRAND DAY",
          title: "일룸 가구 최대 50% 할인",
          date: "2021.05.01 ~ 2021.05.31",
        }, {
          img: "/img/store/@_exhibition_02.png",
          itemColorTtl: null,
          title: "화이트 가구 FESTIVAL",
          date: "2021.05.01 ~ 2021.05.31",
        },
      ],

      thisPostScrap: false,
      itemImgs: [
        {
          type: "img",
          url: "/img/store/@_store_img01.png",
        }, {
          type: "img",
          url: "/img/store/@_store_img02.png",
        }, {
          type: "video",
          url: "/img/store/@_video_thumb_01.mp4",
        }, {
          type: "img",
          url: "/img/store/@_thumb_04.png",
        }, {
          type: "img",
          url: "/img/store/@_thumb_05.png",
        }, {
          type: "img",
          url: "/img/store/@_thumb_06.png",
        }, {
          type: "img",
          url: "/img/store/@_thumb_07.png",
        }, {
          type: "img",
          url: "/img/store/@_thumb_02.png",
        }, {
          type: "img",
          url: "/img/store/@_thumb_03.png",
        },
      ],

    };
  },
  computed: {
    ...mapGetters("storeCategory", ["getCategoryPath"]),

    totalQuantity() {
      let quantity = 0;
      this.selectedOption.forEach((e) => quantity = parseInt(quantity + e.quantity));
      return quantity;
    },
    totalPrice() {
      let price = 0;
      this.selectedOption.forEach((e) => price = price + ((e.price + this.goodsPrice()) * e.quantity));
      return price;
    },
    optionPrice() {
      return (item) => {
        return (item.price  + this.goodsPrice()) * item.quantity;
      };
    },
  },
  watch: {
    // Q&A 비밀글제외 ON/OFF
    qnaSecretYn() {
      this.getQna();  // Q&A 조회
    },
    qna: {
      deep: true,
      handler : debounce(function(newData) {
        if (newData.content.length > 1000) {
          // this.dialogAlert('문의 내용은 1,000자를 초과할 수 없습니다.');
          this.qna.content = newData.content.substr(0, 1000);
        }
      }, 500),
    }
  },
  asyncData({route, router, error}) {
    if (!route.params.id) {
      error({ statusCode: 404, message: "page not found" });
    }
  },
  async fetch() {
    
    this.prdId = this.$route.params.id; // 상품ID 확인

    await this.getData();             // 상품상세 조회
    await this.getReviewStarPoint();  // 후기별점 조회
    await this.getReview();           // 후기 조회
    await this.getPhotoPreview();     // 포토후기 조회
    await this.getDeclareTypeData();  // 신고유형코드
    await this.getQna();              // Q&A 조회
    await this.getQnaTypeData();      // Q&A유형코드

    // 뱃지 처리
    const badges = getGoodsBadges(this.goods);
    this.badges = [...badges];

    // breadcrumb
    this.categoryPath = this.getCategoryPath(this.goods.catgryCd);
  },
  methods: {
    
    // 상품상세 조회
    async getData() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/productBaseDetailSvcApi/productBaseDetailInfo",
            method: 'get',
            query: {
              prdId: this.prdId,
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        const data = this.$get(res, "data.baseItem", {});
        if (isEmpty(data)) {
          this.$nuxt.error({ statusCode: 404, message: "존재하지 않는 상품입니다." });
          //openSnackbar("존재하지 않는 상품입니다.");
          return;
        }
        this.goods = data;
        this.optionData = this.$get(res, "data.optnItems", []); // TODO 옵션추가예정ㅠㅠ
        this.deliveryInfo = this.$get(res, "data.dlvItem", {});
        this.exchangeInfo = this.$get(res, "data.retrnExchgItem", {});

        if (this.optionData.length === 0) {
          this.addOption({
            name: this.goods.prdName,
            price: 0,
          });
        } else {
          this.optionData.forEach((e) => {
            e.optnItem.forEach((item) => {
              // Vue.set(item, 'quantity', 1);
            });
          });
        }
      } catch (e) {
        console.log(e);
        this.$nuxt.error({ statusCode: 404, message: "존재하지 않는 상품입니다." });
        //openSnackbar("존재하지 않는 상품입니다.");
        //this.$router.back();
      }
    },
    goodsPrice() {
      return this.goods.saleRate > 0 ? this.goods.salePrice : this.goods.sellPrice;
    },

    // 옴션추가
    addOption(item) {
      const idx = this.selectedOption.findIndex(function(option) {return option === item});
      if (idx > -1) {
        this.dialogAlert('이미 추가한 옵션입니다.');
        return;
      }

      if (item.hasOwnProperty('quantity')) {
        item.quantity = 1;
      } else {
        Vue.set(item, 'quantity', 1);
      }
      this.selectedOption.push(item);
    },
    // 옵션삭제
    deleteOption(item) {
      const idx = this.selectedOption.findIndex(function(option) {return option === item});
      if (idx > -1) this.selectedOption.splice(idx, 1);
    },
    // 수량변경
    increaseQuantity(item) {
      // TODO 최대가능 수량 확인 필요
      item.quantity++;
    },
    decreaseQuantity(item) {
      // TODO 최소구매 가능 수량 확인 필요
      if (item.quantity > 1)
        item.quantity--;
    },

    // 후기별점 조회
    async getReviewStarPoint() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdPhotoReViewSvcApi/svcStarPointCnt",
            method: 'post',
            query: {
              //prdId: this.prdId,
              prdId: 581,
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        this.starPointData = this.$get(res, "data.item", {});
      } catch (e) {
        console.log(e);
      }
    },

    // 포토후기 조회
    async getPhotoPreview() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdPhotoReViewSvcApi/svcPhotoReView",
            method: 'get',
            query: {
              // prdId: this.prdId,
              prdId: 581,
              page: 1,
              size: 6,
              sort: this.reviewSort,
              photoYn: 'Y',
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        const data = this.$get(res, "data.items", []);
        this.photoReviewData = [...data];
        this.photoReviewTotal = this.$get(res, "data.totalCount", 0);
      } catch (e) {
        console.log(e);
      }
    },
    //포토후기 조회
    showPhotoDialog(reviewIndex) {
      this.reviewIndex = reviewIndex;
      this.$refs.reviewDialog.dialog = true;
    },

    // 후기 조회
    async getReview() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdPhotoReViewSvcApi/svcPhotoReView",
            method: 'get',
            query: {
              // prdId: this.prdId,
              prdId: 581,
              page: this.reviewPageNo,
              size: this.reviewPageSize,
              sort: this.reviewSort,
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        const data = this.$get(res, "data.items", []);
        this.reviewData = [...data];
        this.reviewTotal = this.$get(res, "data.totalCount", 0);
      } catch (e) {
        console.log(e);
      }
    },
    async sortReview(val) {
      this.reviewSort = val;
      this.reviewPageNo = 1;
      await this.getPhotoPreview();
      await this.getReview();
    },
    async onChangeReviewPage(pageNo) {
      this.reviewPageNo = pageNo;
      await this.getReview();
    },
    // 후기 수정
    updateReview(item) {
      console.log("마이페이지로 이동 예정");
      this.dialogAlert('마이페이지로 이동 예정');
    },
    // 후기 삭제
    deleteReviewConfirm(item) {
      this.reviewSeq = item.seq;
      this.dialogConfirm('삭제한 상품후기는 다시 작성할 수 없습니다.\n상품후기를 삭제 하시겠습니까?', this.deleteReview);
    },
    async deleteReview() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdPhotoReViewSvcApi/svcRemoveItem",
            method: 'post',
            query: {
              seq: this.reviewSeq,
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        this.dialogAlert('상품후기를 삭제했습니다.');
        await this.getReview();
        await this.getPhotoPreview();
      } catch (e) {
        console.log(e);
      }
    },

   // 신고유형코드
    async getDeclareTypeData() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/codeSvcApi/svcList",
            method: 'get',
            query: {
              codeGroup: 'report',
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        const data = this.$get(res, "data.items", []);
        this.declareTypeData = [...data];
      } catch (e) {
        console.log(e);
      }
    },

    // 신고하기 모달
    showDeclareDialog(item) {
      this.declare = {
        reportCd: '',
        prdphoReviewSeq: item.seq,
      };
      // TODO 로그인여부 확인
      // this.dialogConfirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?', this.login, function() {
      //   console.log('로그인 취소');
      //   return;
      // });

      // TODO : 이미 신고했는지 여부 확인
      // '이미 신고한 상품후기입니다. 자세한 내용은 1:1문의를 이용해주세요.'
      this.$refs.declareDialog.dialog = true;
    },

    // 신고하기 저장
    confirmDeclare() {
      if (isEmpty(this.declare.reportCd)) {
        this.dialogAlert('신고 사유를 선택해주세요.');
        return;
      }
      this.dialogConfirm('신고하시겠습니까?', this.saveDeclare);
    },
    async saveDeclare() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdPhotoReViewSvcApi/svcReportReview",
            method: 'post',
            query: this.declare,
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        this.closeDeclare();
        this.dialogAlert('신고 접수되었습니다.');

        // 후기 조회
        await this.getReview();
      } catch (e) {
        console.log(e);
        this.closeDeclare();
        this.dialogAlert(e);
      }
    },
    // 신고하기 닫기
    closeDeclare() {
      this.$refs.declareDialog.dialog = false;
    },

    // Q&A 조회
    async getQna() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdQnaSvcApi/prdQnaList",
            method: 'get',
            query: {
              prdId: this.prdId,
              page: this.qnaPageNo,
              size: this.qnaPageSize,
              secretYn: this.qnaSecretYn ? 'N' : '',
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        const data = this.$get(res, "data.items", []);
        this.qnaData = [...data];
        this.qnaTotal = this.$get(res, "data.totalCount", 0);
      } catch (e) {
        console.log(e);
      }
    },
    async onChangeQnaPage(pageNo) {
      this.qnaPageNo = pageNo;
      await this.getQna();
    },
    // Q&A 삭제
    deleteQnaConfirm(item) {
      this.qnaSeq = item.seq;
      this.dialogConfirm('상품Q&A를 삭제 하시겠습니까?', this.deleteQna);
    },
    async deleteQna() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdQnaSvcApi/svcRemoveItem",
            method: 'post',
            query: {
              seq: this.qnaSeq,
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        this.dialogAlert('상품Q&A가 삭제되었습니다.');
        await this.getQna();
      } catch (e) {
        console.log(e);
      }
    },

    // Q&A유형코드
    async getQnaTypeData() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/codeSvcApi/svcList",
            method: 'get',
            query: {
              codeGroup: 'qna',
            },
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        const data = this.$get(res, "data.items", []);
        this.qnaTypeData = [...data];
      } catch (e) {
        console.log(e);
      }
    },

    login() {
      console.log('로그인 진행 페이지로 이동');
      // 임시로그인 처리
      try {
        const res = this.$nuxt.$fetch({
          api: {
            path: "/svc/signIn",
            method: 'post',
            query: {
              id: 'test7',
              password: '1234',
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
      this.$refs.qnaDialog.dialog = true;
    },

    // Q&A등록 모달
    showQnaDialog() {
      this.qna = {
        content: '',
      };
      // TODO 로그인여부 확인
      this.dialogConfirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?', this.login, function() {
        console.log('로그인 취소');
        return;
      });
      //this.$refs.qnaDialog.dialog = true;
    },

    // Q&A 저장
    async saveQna() {
      try {
        // const isValid = await this.$refs.formRef.validate();
        // this.$refs.formRef.errors;
        if (isEmpty(this.qna.qnaType)) {
          this.dialogAlert('문의 유형을 선택해주세요.');
          return;
        }
        if (isEmpty(this.qna.content)) {
          this.dialogAlert('문의 내용을 입력해주세요.');
          return;
        }
        if (this.qna.content.length < 10) {
          this.dialogAlert('최소 10자 이상 입력해주세요');
          return;
        }
        let params = {
          prdId: this.prdId,
          useYn: 'Y',
          secretYn: this.qna.secretYn ? 'Y' : 'N',
        };
        params = merge(this.qna, params);
        const res = await this.$nuxt.$fetch({
          api: {
            path: "/svc/prdQnaSvcApi/svcSaveItem",
            method: 'post',
            query: params,
          },
        });
        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }
        // openSnackbar("저장 되었습니다.");
        // Q&A 조회
        this.qnaPageNo = 1;
        await this.getQna();
      } catch (e) {
        console.log(e);
      }
      this.closeQna();
    },
    // Q&A 취소
    cancelQna() {
      if (!isEmpty(this.qna.content)) {
        this.dialogConfirm('Q&A 작성을 취소 하시겠습니까?', this.closeQna);
      } else {
        this.closeQna();
      }
    },
    // Q&A 닫기
    closeQna() {
      this.$refs.qnaDialog.dialog = false;
    },

    moreViewActive(item, change) {
      item.moreActive = item.moreActive ? true : false;
      if (change)
        item.moreActive = !item.moreActive;
      return item.moreActive;
    },
    floorStar(star) {
      return floor(star, 1);
    },
    
    shareBtnToggle(e) {
      let shareBtn = document.querySelectorAll(".share_btn.open_btn");
      let shareWraps = document.querySelectorAll(".share_item_wrap");
      let shareBtnArea = e.currentTarget.closest(".share_btn_area");
      let shareWrap = shareBtnArea.querySelector(".share_item_wrap");
      shareWraps.forEach((e) => e.classList.remove("is_active"));
      if (this.currentShareItem == e.currentTarget) {
        shareWrap.classList.remove("is_active");
        this.currentShareItem = null;
      } else {
        shareWrap.classList.add("is_active");
        this.currentShareItem = e.currentTarget;
      }
    },
    itemSlide(imgUrl) {
      let mainImg = document.querySelector(".order_sec .main_img");
      mainImg.style.backgroundImage = imgUrl;
    },
    inputFocus(item) {
      item.target.closest(".input_area").classList.add("focus");
    },
    inputBlur(item) {
      item.target.closest(".input_area").classList.remove("focus");
    },
    setStoreFixElem(markerElTop, markerElBottom, fixElem) {
      let win = {};
      win.winW = window.innerWidth;
      win.winH = window.innerHeight;
      let markerTop = document.querySelector(markerElTop);
      let markerBottom = document.querySelector(markerElBottom);
      let fixer = document.querySelector(fixElem);
      let fixerH;
      let headerH = document.querySelector("header").clientHeight;
      let selectedGroup = document.querySelector(".floating_box .selected_group");
      let boxInner = document.querySelector(".floating_box .box_inner");
      let boxFootH = document.querySelector(".floating_box_foot").clientHeight;
      let st = window.pageYOffset;
      let selectNum = boxInner.querySelectorAll(".store_select.select").length;
      window.addEventListener("scroll", function () {
        let mTopInfo = {
          top: markerTop.getBoundingClientRect().top,
          height: markerTop.clientHeight,
        };
        let mTop = mTopInfo.top + st + win.winH - headerH;
        let mBottomInfo = {
          top: markerBottom.getBoundingClientRect().top,
          height: markerBottom.clientHeight,
        };
        let mBottom = mBottomInfo.top + mBottomInfo.height + st;
        calcElemBottom(st, mBottom, fixer);

        function calcElemBottom(st, mBottom, fixer) {
          if (st + win.winH > mBottom) {
            fixer.classList.add("bottom");
            let calcHeight = win.winH - (mBottomInfo.top + mBottomInfo.height);
            let totalHeight = (win.winH - headerH) - calcHeight;
            if (totalHeight < 498) {
              totalHeight = 498;
            }
            fixer.style.height = totalHeight + "px";
          } else {
            fixer.classList.remove("bottom");
            fixer.style.height = "inherit";
          }
        }

        calcElemTop(st, mTop, fixer);

        function calcElemTop(st, mTop, fixer) {
          if (st + win.winH > mTop) {
            fixer.classList.add("top");
            fixerH = document.querySelector(fixElem).clientHeight;
            let groupMaxHeight = fixerH - (60 * selectNum + boxFootH + 80);
            selectedGroup.style.maxHeight = groupMaxHeight + "px";
          } else {
            fixer.classList.remove("top");
            selectedGroup.style.maxHeight = "none";
          }
        }

      });
    },
    removeComment() {
      openSnackbar("삭제되었습니다.");
    },
    declareComment() {
      openSnackbar("신고되었습니다.");
    },

    /* Dev : 확인 버튼만 있는 dialog method*/
    dialogAlert(text) {
      Dialog.alert(text, function () {
      }, { motion: 'fade' }, 'small')
    },
    /* Dev : 확인과 취소이 있는 dialog method */
    dialogConfirm(text, fnc, cancelFnc) {
      Dialog.confirm(text, fnc, cancelFnc, {
        btns: { submit: { label: '확인' }, cancel: { label: '취소' } }, motion: 'fade',
      }, 'small')
    },
    numSet(val) {
      if (val === 0 || val === '0') return 0;
      if (!val) return '';
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  beforeDestroy() {

  },
  async mounted() {
    await this.$nextTick();
    window.addEventListener('scroll', this.setStoreFixElem('.floating_box_wrap', '.marker_bottom', '#floatingBox'))
    window.addEventListener('scroll', function () {
      setFixElem('.store_page .detail_lnb_area',null, '#storeLnb')
    })
  },
}
;
</script>

<style scoped>

</style>