<template>
  <v-app id="container">
    <main id="contents" class="store_page cart_page">
      <section class="zin_sec store_payment_member_sec">
        <div class="min_inner">
          <div class="cart_sec_order">
            <div class="order_wrap">
              <p>장바구니</p>
            </div>
            <i class="arw arw_m_right"></i>
            <div class="order_wrap">
              <p class="is_active">주문/결제</p>
            </div>
            <i class="arw arw_m_right is_active"></i>
            <div class="order_wrap">
              <p>주문완료</p>
            </div>
          </div>
          <div class="payment_sec_main address_info">
            <div class="payment_sec_head">
              <h4 class="ttl">배송지 정보</h4>
              <template v-if="activeIndex <= 0">
                <ZinDialog ref="shippingDialog" dialog-title="배송지 변경" :topBtn="true" :max-w="540">
                  <template v-slot:btn>
                    <button class="btn strong w_ms h_s">배송지 변경</button>
                  </template>
                  <template v-slot:bodyArea>
                    <template v-if="shipping.length > 0">
                      <div class="shipping_modify" v-for="(item, idx) in shipping" :key="idx">
                        <div class="address_modal_warp">
                          <div class="address_default_area">
                            <span class="default_address">{{ item.name }}</span>
                            <!-- Dev : 기본 배송지로 적용한 주소만 뱃지 적용-->
                            <span class="address_badges">{{ item.badges }}</span>
                          </div>
                          <div class="recipient_area">
                            <span class="recipient">{{ item.recipient }}</span>
                            <span class="recipient_phone">{{ item.phone }}</span>
                            <span class="recipient_tel">{{ item.tel }}</span>
                          </div>
                          <div class="address_area">
                            <span class="address_post_code">{{ item.post }}</span>
                            <span class="address">{{ item.address }}</span>
                          </div>
                          <div class="btn_area">
                            <button class="btn strong h_s">선택</button>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <p class="shipping_default_txt">배송지 정보가 없습니다. 배송지를 추가해 주세요.</p>
                    </template>
                  </template>
                </ZinDialog>
              </template>
              <template v-else>
                <div class="shipping_direct_area">
                  <div class="input_area check type_box type_all">
                    <div class="input_box">
                      <label>
                        <input type="checkbox">
                        <span>주문자 정보와 동일</span>
                      </label>
                    </div>
                  </div>
                  <div class="initialization_area">
                    <button><i class="ic ic_initialization"></i>초기화</button>
                  </div>
                </div>
              </template>
            </div>
            <div class="shipping_tab tabs type_line">
              <div class="tab_node" v-for="(item, index) in tabMenu" :key="index"
                   :class="{is_active : index === activeIndex}" @click="activeIndex = index">
                <button class="tab_item">{{ item }}</button>
              </div>
            </div>
            <template v-if="activeIndex === 0">
              <div class="payment_sec_body">
                <div class="address_default_area">
                  <span class="default_address">{{ $get(item, 'orderDeliInfo.value') }}</span>
                  <span class="address_badges">기본배송지</span>
                </div>
                <div class="recipient_area">
                  <span class="recipient">{{ $get(item, 'orderDeliInfo.item.name') }} {{ $get(item, 'orderDeliInfo.item.telNum') }}</span>
                </div>
                <div class="address_area">
                  <span class="address">({{ $get(item, 'orderDeliInfo.item.zipCode') }}) {{ $get(item, 'orderDeliInfo.item.addr') }} {{ $get(item, 'orderDeliInfo.item.addrDetail') }} </span>
                </div>
                <form action="" class="comment_input_group">
                  <div class="shipping_messages_area">
                    <ZinSelectItem select-title="배송 메시지" addTtlClass="shipping_messages"
                                   place-holder="배송 메시지를 선택해주세요."
                                   @selVal="currentShippingSelect"
                                   :text-style="true" :has_arw="true" :hrz-style="true" :selectData="shippingSelect" />
                    <!-- Dev: 직접입력 옵션 선택시에 노출 -->
                    <div v-if="shippingSelectVal === '직접 입력'" class="input_area" :class="commentData.commentInput.length > 100 ? 'is_error':''">
                      <div class="input_box">
                        <input type="text" v-model="commentData.commentInput"/>
                      </div>
                      <span v-if="commentData.commentInput.length > 100" class="error_txt">최대 100글자까지 입력 가능합니다.</span>
                    </div>
                  </div>
                </form>
              </div>
            </template>
            <template v-else>
              <!-- Dev : 탭메뉴 직접입력 선택시 나오는 영역 -->
              <div class="payment_sec_body direct_input">
                <div class="input_area text hrz">
                  <label>이름 <span class="essential">*</span></label>
                  <div class="input_box">
                    <input type="text" placeholder="이름을 입력해 주세요.">
                  </div>
                </div>
                <div class="input_area text hrz number">
                  <label>휴대폰번호 <span class="essential">*</span></label>
                  <div class="input_box_wrap">
                    <ZinSelectItem @selVal="currentShippingSelect"
                                   :setValue="'010'"
                                   :text-style="true" :has_arw="true" :hrz-style="true" :selectData="phoneSelect"/>
                    <div class="input_box text">
                      <input type="text" placeholder="휴대번호를 입력해 주세요.">
                    </div>
                  </div>
                </div>
                <div class="input_area text hrz number">
                  <label>전화번호</label>
                  <div class="input_box_wrap">
                    <ZinSelectItem @selVal="currentShippingSelect"
                                   :setValue="'02'"
                                   :text-style="true" :has_arw="true" :hrz-style="true" :selectData="telSelect"/>
                    <div class="input_box text">
                      <input type="text" placeholder="연락처를 입력해 주세요.">
                    </div>
                  </div>
                </div>
                <div class="input_area text hrz">
                  <label>배송지 주소 <span class="essential">*</span></label>
                  <div class="input_box_wrap">
                    <div class="btn_area">
                      <button class="btn basic c_blk h_m" v-get-post-code="getPostCode">우편번호 검색</button>
                    </div>
                    <div class="input_box text disabled">
                      <input type="text" disabled v-model="postCode">
                    </div>
                    <div class="input_box text disabled">
                      <input type="text" disabled v-model="address">
                    </div>
                    <div class="input_box text">
                      <input type="text" placeholder="상세주소">
                    </div>
                  </div>
                </div>
                <form action="" class="comment_input_group">
                  <div class="shipping_messages_area">
                    <ZinSelectItem select-title="배송 메시지" addTtlClass="shipping_messages"
                                   place-holder="배송 메시지를 선택해주세요."
                                   @selVal="currentShippingSelect"
                                   :text-style="true" :has_arw="true" :hrz-style="true" :selectData="shippingSelect" />
                    <!-- Dev: 직접입력 옵션 선택시에 노출 -->
                    <div v-if="shippingSelectVal === '직접 입력'" class="input_area direct" :class="commentData.commentInput.length > 100 ? 'is_error':''">
                      <div class="input_box">
                        <input type="text" v-model="commentData.commentInput"/>
                      </div>
                      <span v-if="commentData.commentInput.length > 100" class="error_txt">최대 100글자까지 입력 가능합니다.</span>
                    </div>
                  </div>
                </form>
              </div>
            </template>
          </div>
          <div class="payment_sec_main cart_info">
            <div class="payment_sec_head">
              <h4 class="ttl">주문상품</h4>
            </div>
            <div class="payment_sec_body" v-for="(itemGroup, i) in $get(item, 'itemGroups')" :key="i + 'itemGroup'">
              <div class="cart_sec_company">
                <p>{{ $get(itemGroup, 'item.vendorName') }}</p>
                <!-- <p class="shipping_cost">{{ 직접배송 (배송비 착불 5,000원) }}</p> -->
                <p class="shipping_cost">{{ itemGroup | toDeliveryState }}</p>
              </div>
              <div class="cart_sec_item" v-for="(cartItem, cartItemIndex) in $get(itemGroup, 'item.cartItems')" :key="`cartItems_${cartItemIndex}`">
                <div class="cart_sec_item_img">
                  <figure class="thumb" :style="`background-image: url('${$get(cartItem, 'item.prodInfo.item.imagePath')}')`"></figure>
                </div>
                <div class="cart_sec_item_info">
                  <p class="item_company">{{ $get(cartItem, 'item.prodInfo.item.vendrName') }}</p>
                  <p class="item_description"><span
                    class="item_name">{{ $get(cartItem, 'item.prodInfo.item.prdName') }}</span>&nbsp;(( item2.itemIntro ))</p>
                  <div class="product_option">
                    <dl class="option_txt">
                      {{ $get(cartItem, 'item.prodOptInfo') }}
                    </dl>
                    <!-- <dl class="option_txt">
                      <dt>{{ item2.option }}</dt>
                      <dd>{{ item2.color }}</dd>
                    </dl>
                    <dl class="option_txt">
                      <dt>{{ item2.option2 }}</dt>
                      <dd>{{ item2.size }}</dd>
                    </dl> -->
                  </div>
                  <div class="product_item_price">
                    <!-- Dev: 할인가가 있는 경우, cost_price를 출력, 할인가가 없으면 미 출력 한다. -->
                    <template v-if="$get(cartItem, 'item.prodInfo.item.salePrice')">
                      <p class="cost_price">{{ $get(cartItem, 'item.prodInfo.item.sellPrice') | toPrice }}<span>원</span></p>
                      <p class="item_price">{{ $get(cartItem, 'item.prodInfo.item.sellPrice') - $get(cartItem, 'item.prodInfo.item.salePrice') | toPrice }}<span>원</span></p>
                    </template>
                    <template v-else>
                      <p class="item_price">{{ $get(cartItem, 'item.prodInfo.item.sellPrice') | toPrice }}<span>원</span></p>
                    </template>
                  </div>
                </div>
                <div class="cart_sec_item_quantity">
                  <p class="item_quantity">{{ $get(cartItem, 'item.qty') }}</p>
                </div>
                <div class="cart_sec_item_discount">
                  <template v-if="true">
                    <p class="item_discount"><span>{{ $get(cartItem, 'item.prodInfo.item.salePrice') }}</span>원</p>
                    <ZinDialog ref="couponDialog" dialog-title="쿠폰적용(상품)" :topBtn="true" :isSelect="true"
                               :max-w="540">
                      <template v-slot:btn>
                        <button class="btn strong w_sl h_xs">쿠폰적용</button>
                      </template>
                      <template v-slot:bodyArea>
                        <div class="coupon_ttl_area">
                          <h6 class="ttl">상품 쿠폰</h6>
                        </div>
                        <div class="coupon_box_wrap" v-for="(item, index) in couponItems" :key="index">
                          <div class="coupon_head">
                            <span>(( cartItem.forwording ))</span>
                          </div>
                          <div class="coupon_body">
                            <div class="coupon_box_area" v-for="(item2, index2) in cartItem.couponList" :key="index2">
                              <p class="company_info"><span>(( item2.company ))</span>&nbsp;(( item2.product ))</p>
                              <div class="product_option">
                                <dl class="option_txt">
                                  <dt>[[ item2.option ]]</dt>
                                  <dd>[[ item2.color ]]</dd>
                                </dl>
                                <dl class="option_txt">
                                  <dt>[[ item2.option2 ]]</dt>
                                  <dd>[[ item2.size ]]</dd>
                                </dl>
                              </div>
                              <div class="product_price">
                                <span class="price">[[ 300 원 ]]</span>
                                <span class="quantity">[[ item2.quantity ]]</span>
                              </div>
                              Dev : 쿠폰이 없을 경우에 select disabled 처리
                              <ZinSelectItem :setValue="'일룸가구 BRAND DAY 최대100,000원 할인'"
                                             :text-style="true"
                                             :has_arw="true"
                                             :hrz-style="true"
                                             :selectData="couponSelect" />
                              <div class="discount_amount">
                                <dl>
                                  <dt>쿠폰 할인금액</dt>
                                  <dd><span>[[ 3000 ]]</span>원
                                  </dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-slot:btnGroup>
                        <button class="btn h_m basic col col_6 shipping" @click="cancelModal">취소</button>
                        <button class="btn h_m strong col col_6 shipping" @click="cancelModal">100,000원 할인 적용
                        </button>
                      </template>
                    </ZinDialog>
                  </template>
                  <template v-else>
                    <p class="item_discount">-</p>
                  </template>
                </div>
                <div class="cart_sec_item_buynow">
                  <div class="item_order_price">
                    {{ $get(cartItem, 'item.prodInfo.item.sellPrice') - $get(cartItem, 'item.prodInfo.item.salePrice') | toPrice }}<span>원</span>
                  </div>
                </div>
              </div>
              <div class="cart_sec_item_payment">
                <p>상품금액 <span>{{ $get(itemGroup, 'item.price') | toPrice }}</span>원</p>
                <p>할인금액 <span class="payment_color">{{ $get(itemGroup, 'item.salePrice') | toPrice }}</span>원</p>
                <p class="shipping_info_btn">
                  배송비 <span>{{ $get(itemGroup, 'item.deliveryPrice') | toPrice }}</span>원
                </p>
                <p>주문금액 <span>{{ $get(itemGroup, 'item.amount') | toPrice }}</span>원</p>
              </div>
              <!-- Dev: 입력/선택한 배송지가 도서산간인 경우 자동 출력. -->
              <div class="shipping_islands">
                <i class="ic ic_info"></i>도서산간 배송비가 추가되었습니다.
              </div>
              <div class="payment_sec_foot" v-if="orderItems.length-1 === i">
                <div class="input_area date">
                  <label>배송 예정일<span class="essential">*</span></label>
                  <template>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="computedDateFormattedMomentjs"
                          label="배송희망일 선택"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                        locale="ko-kr"
                        @input="selDate"
                      >
                      </v-date-picker>
                    </v-menu>
                  </template>
                </div>
                <div class="input_wrap">
                  <div class="input_area radio hrz type_btn">
                    <label>엘리베이터 <span class="essential">*</span></label>
                    <div class="input_box">
                      <label>
                        <input type="radio" name="whether" checked>
                        <span>
                        <span>있음</span>
                      </span>
                      </label>
                    </div>
                    <div class="input_box">
                      <label>
                        <input type="radio" name="whether">
                        <span>
                        <span>없음</span>
                      </span>
                      </label>
                    </div>
                  </div>
                  <div class="input_area radio hrz type_btn">
                    <label>사다리차 이용 <span class="essential">*</span></label>
                    <div class="input_box">
                      <label>
                        <input type="radio" name="ladder" checked>
                        <span>
                        <span>동의함</span>
                      </span>
                      </label>
                    </div>
                    <div class="input_box">
                      <label>
                        <input type="radio" name="ladder">
                        <span>
                        <span>동의 안함</span>
                      </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="order_precautions_area">
                  <p class="order_precautions_head">※ 주문 전 확인하세요.</p>
                  <p class="order_precautions_body">일룸 공식몰에서 직접 배송/설치하는 상품입니다. 배송에 필요한 추가 정보를 선택해주세요. 고객님의 선택 정보에 따라
                    설치기사님이 방문 전에 연락드릴 예정입니다.</p>
                  <p class="order_precautions_body">사다리차 비용은 5층 이하 10만원, 6층 이상은 20만원입니다. 사다리차 이용 시 추가비용은 고객님 부담이며 동의가
                    필요합니다.</p>
                </div>
              </div>
            </div>
            <!--            <div class="payment_sec_foot">-->
            <!--              <div class="input_area date">-->
            <!--                <label>배송 예정일 <span class="essential">*</span></label>-->
            <!--                <template>-->
            <!--                  <v-menu-->
            <!--                      ref="menu"-->
            <!--                      v-model="menu"-->
            <!--                      :close-on-content-click="false"-->
            <!--                      :return-value.sync="date"-->
            <!--                      transition="scale-transition"-->
            <!--                      offset-y-->
            <!--                      min-width="auto"-->
            <!--                  >-->
            <!--                    <template v-slot:activator="{ on, attrs }">-->
            <!--                      <v-text-field-->
            <!--                          :value="computedDateFormattedMomentjs"-->
            <!--                          label="배송희망일 선택"-->
            <!--                          prepend-icon=""-->
            <!--                          readonly-->
            <!--                          v-bind="attrs"-->
            <!--                          v-on="on"-->
            <!--                      ></v-text-field>-->
            <!--                    </template>-->
            <!--                    <v-date-picker-->
            <!--                        v-model="date"-->
            <!--                        no-title-->
            <!--                        scrollable-->
            <!--                        locale="ko-kr"-->
            <!--                    >-->
            <!--                      <v-spacer></v-spacer>-->
            <!--                      <v-btn-->
            <!--                          text-->
            <!--                          color="primary"-->
            <!--                          @click="menu = false"-->
            <!--                      >-->
            <!--                        Cancel-->
            <!--                      </v-btn>-->
            <!--                      <v-btn-->
            <!--                          text-->
            <!--                          color="primary"-->
            <!--                          @click="$refs.menu.save(date)"-->
            <!--                      >-->
            <!--                        OK-->
            <!--                      </v-btn>-->
            <!--                    </v-date-picker>-->
            <!--                  </v-menu>-->
            <!--                </template>-->
            <!--              </div>-->
            <!--              <div class="input_wrap">-->
            <!--                <div class="input_area radio hrz type_btn">-->
            <!--                  <label>엘리베이터 <span class="essential">*</span></label>-->
            <!--                  <div class="input_box">-->
            <!--                    <label>-->
            <!--                      <input type="radio" name="whether" checked>-->
            <!--                      <span>-->
            <!--                        <span>있음</span>-->
            <!--                      </span>-->
            <!--                    </label>-->
            <!--                  </div>-->
            <!--                  <div class="input_box">-->
            <!--                    <label>-->
            <!--                      <input type="radio" name="whether">-->
            <!--                      <span>-->
            <!--                        <span>없음</span>-->
            <!--                      </span>-->
            <!--                    </label>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="input_area radio hrz type_btn">-->
            <!--                  <label>사다리차 이용 <span class="essential">*</span></label>-->
            <!--                  <div class="input_box">-->
            <!--                    <label>-->
            <!--                      <input type="radio" name="ladder" checked>-->
            <!--                      <span>-->
            <!--                        <span>동의함</span>-->
            <!--                      </span>-->
            <!--                    </label>-->
            <!--                  </div>-->
            <!--                  <div class="input_box">-->
            <!--                    <label>-->
            <!--                      <input type="radio" name="ladder">-->
            <!--                      <span>-->
            <!--                        <span>동의 안함</span>-->
            <!--                      </span>-->
            <!--                    </label>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="order_precautions_area">-->
            <!--                <p class="order_precautions_head">※ 주문 전 확인하세요.</p>-->
            <!--                <p class="order_precautions_body">일룸 공식몰에서 직접 배송/설치하는 상품입니다. 배송에 필요한 추가 정보를 선택해주세요. 고객님의 선택 정보에 따라-->
            <!--                  설치기사님이 방문 전에 연락드릴 예정입니다.</p>-->
            <!--                <p class="order_precautions_body">사다리차 비용은 5층 이하 10만원, 6층 이상은 20만원입니다. 사다리차 이용 시 추가비용은 고객님 부담이며 동의가-->
            <!--                  필요합니다.</p>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
          <div class="payment_sec_main discount_info">
            <div class="payment_sec_head">
              <h4 class="ttl">할인 및 포인트</h4>
            </div>
            <div class="payment_sec_body">
              <div class="input_area hrz">
                <label>장바구니 쿠폰</label>
                <div class="input_box disabled">
                  <input type="text" disabled>
                </div>
                <ZinDialog ref="couponDialog1" dialog-title="쿠폰적용(장바구니)" :topBtn="true" :isSelect="true" :max-w="540">
                  <template v-slot:btn>
                    <button class="btn strong h_m">쿠폰적용</button>
                  </template>
                  <template v-slot:bodyArea>
                    <div class="coupon_ttl_area">
                      <!-- Dev : 조건에 충족하지 않은 쿠폰은 사용할수 없게 disabled 되며 disabled 클래스 추가-->
                      <h6 class="ttl">장바구니 쿠폰</h6>
                    </div>
                    <div class="cart_coupon_wrap">
                      <div class="cart_coupon_area cart">
                        <div class="radio_group cart">
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon" checked>
                                <span>적용 안함</span>
                              </label>
                            </div>
                          </div>
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon">
                                <span>신규가입 축하 10% 쿠폰 ( ~ 12/31까지)</span>
                                <span class="shipping_discount"><span>100,000</span>원</span>
                              </label>
                            </div>
                          </div>
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon" disabled>
                                <span class="disabled">App 첫 구매 5% 쿠폰( ~ 5/31까지)</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:btnGroup>
                    <button class="btn h_m basic col col_6 shipping" @click="$refs.couponDialog1.dialog = false">취소
                    </button>
                    <button class="btn h_m strong col col_6 shipping" @click="$refs.couponDialog1.dialog = false">
                      100,000원 할인 적용
                    </button>
                  </template>
                </ZinDialog>
                <p class="coupon_num">보유 <span>2</span>개, 사용가능 <span>2</span>개</p>
              </div>
              <div class="input_area hrz">
                <label>배송비 쿠폰</label>
                <div class="input_box disabled">
                  <input type="text" disabled>
                </div>
                <!--Dev : 쿠폰 개수가 0 개일시에 disable -->
                <ZinDialog ref="couponDialog" dialog-title="쿠폰적용(배송비)" :topBtn="true" :max-w="540">
                  <template v-slot:btn>
                    <button class="btn strong h_m" disabled>쿠폰적용</button>
                  </template>
                  <template v-slot:bodyArea>
                    <div class="coupon_ttl_area">
                      <!-- Dev : 조건에 충족하지 않은 쿠폰은 사용할수 없게 disabled 되며 disabled 클래스 추가-->
                      <h6 class="ttl">배송비 쿠폰</h6>
                    </div>
                    <div class="cart_coupon_wrap">
                      <div class="cart_coupon_area">
                        <div class="radio_group shipping">
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon" checked>
                                <span>적용 안함</span>
                              </label>
                            </div>
                          </div>
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon">
                                <span>온라인 첫 구매 무료배송 쿠폰 ( ~ 12/31까지)</span>
                              </label>
                            </div>
                          </div>
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon" disabled>
                                <span class="disabled">App 첫 구매 5% 쿠폰( ~ 5/31까지)</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="coupon_ttl_area">
                      <!-- Dev : 조건에 충족하지 않은 쿠폰은 사용할수 없게 disabled 되며 disabled 클래스 추가-->
                      <h6 class="ttl">쿠폰적용 배송지</h6>
                    </div>
                    <div class="cart_coupon_wrap">
                      <div class="cart_coupon_area">
                        <div class="radio_group shipping">
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon2" checked>
                                <span>적용 안함</span>
                              </label>
                            </div>
                          </div>
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon2">
                                <span>일룸iloom</span>
                                <span class="shipping_discount"><span>3,000</span>원</span>
                              </label>
                            </div>
                          </div>
                          <div class="input_area radio">
                            <div class="input_box">
                              <label>
                                <input type="radio" name="coupon" disabled>
                                <span class="disabled">BEST SHOP (인천물류센터)</span>
                                <span class="shipping_discount"><span class="discount_disabled">0</span>원</span>
                              </label>
                            </div>
                          </div>
                          <p class="shipping_coupon_info">※ 배송비 쿠폰 적용 시, 도서산간 배송비는 제외합니다.</p>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:btnGroup>
                    <button class="btn h_m strong c_grd shipping" @click="$refs.couponDialog.dialog = false">3,000원 할인
                      적용
                    </button>
                  </template>
                </ZinDialog>
                <p class="coupon_num">보유 <span>0</span>개, 사용가능 <span>0</span>개</p>
              </div>
              <div class="input_area hrz">
                <label>포인트</label>
                <div class="input_box">
                  <input type="text" placeholder="0">
                </div>
                <div class="input_area check type_box type_all">
                  <div class="input_box">
                    <label>
                      <input type="checkbox">
                      <span class="checkmark">
                          모두사용
                        </span>
                    </label>
                  </div>
                </div>
                <p class="coupon_num">보유 포인트<span>12,500P</span></p>
              </div>
            </div>
          </div>
          <div class="payment_sec_main payment_method">
            <div class="payment_sec_head">
              <h4 class="ttl">결제수단</h4>
            </div>
            <div class="payment_sec_body">
              <div class="input_area radio type_btn inline">
                <div class="input_box" v-for="(item, idx2) in paymentMethod" :key="idx2">
                  <label>
                    <input type="radio" name="payment" :value="item.way" v-model="payMethod">
                    <span>
                        <span>
                        {{ item.way }}
                          </span>
                      </span>
                  </label>
                </div>
              </div>
              <div class="input_area check type_box type_all">
                <div class="input_box">
                  <label>
                    <input type="checkbox">
                    <span>지금 선택한 결제수단을 다음에도 사용</span>
                  </label>
                </div>
              </div>
              <!-- Dev : 결제수단 별 안내문구 콘텐츠 수급 필요-->
              <div class="payment_information_method">
                <p class="info_txt">※ 가상계좌 결제 안내</p>
                <ul class="info_list">
                  <li>현금으로 결제한 모든 금액은 신한은행과 채무지급보증계약을 체결하여 고객님의 안전거래를 보장하고 있습니다.</li>
                  <li>주문자와 입금자가 다를 경우 반드시 실제로 입금하실 분의 이름을 입금자명에 입력해주세요.</li>
                  <li>입금금액이 최종 결제금액과 일치한 경우만 입금되므로 입금 금액을 정확히 확인해주세요.</li>
                  <li>주문 완료 후 익일 24시 이내에 입금하지 않으면 주문은 자동 취소됩니다.</li>
                </ul>
              </div>
              <!--                <div class="payment_information_method">-->
              <!--                  <p class="info_txt">※ PAYCO 결제 안내</p>-->
              <!--                  <ul class="info_list">-->
              <!--                    <li>PAYCO는 온/오프라인 쇼핑은 물론 송금, 맴버쉽 적립까지 가능한 통합서비스입니다.</li>-->
              <!--                    <li>등록된 카드 또는 페이코 포인트로 결제할 수 있습니다.</li>-->
              <!--                    <li>휴대폰과 카드명의자가 동일해야 결제가 가능하며, 결제금액의 제한은 없습니다.</li>-->
              <!--                    <li>PAYCO에서 제공하는 카드사별 무이자, 할인혜택을 받을 수 있습니다.</li>-->
              <!--                  </ul>-->
              <!--                </div>-->
              <!--                <div class="payment_information_method">-->
              <!--                  <p class="info_txt">※ 계좌이체 결제 안내</p>-->
              <!--                  <ul class="info_list">-->
              <!--                    <li>현금으로 결제한 모든 금액은 신한은행과 채무지급보증계약을 체결하여 고객님의 안전거래를 보장하고 있습니다.</li>-->
              <!--                    <li>결제와 동시에 즉시 이체되며, 별도의 수수료가 부과되지 않습니다.</li>-->
              <!--                    <li>공동인증서는 거래하시는 은행이나 증권사의 홈페이지에서 발급받으실 수 있습니다.</li>-->
              <!--                    <li>계좌이체 시 은행 별 서비스 가능시간을 확인하신 후 결제를 진행해 주세요.</li>-->
              <!--                  </ul>-->
              <!--                </div>-->
              <!--                <div class="payment_information_method">-->
              <!--                  <p class="info_txt">※ 토스 결제 안내</p>-->
              <!--                  <ul class="info_list">-->
              <!--                    <li>토스는 비밀번호 혹은 지문인식 등의 간단한 방법으로 결제할 수 있는 간편 결제 서비스입니다.</li>-->
              <!--                    <li>단 한번의 인증으로 소유한 여러 계좌를 한번에 관리할 수 있습니다.</li>-->
              <!--                    <li>결제에 사용할 은행계좌는 휴대폰명의자와 일치해야 합니다.</li>-->
              <!--                    <li>취소 시 토스머니로 환불됩니다.</li>-->
              <!--                    <li>토스에서 제공되는 카드사별 무이자, 할인혜택을 받을 수 있습니다.</li>-->
              <!--                  </ul>-->
              <!--                </div>-->
            </div>
          </div>
        </div>
        <div class="cart_sec_payment">
          <div class="cart_sec_payment_info">
            <dl class="payment_sum">
              <dt>최종 결제금액</dt>
              <dd>{{ $get(item, 'totalAmount') | toPrice }}<span>원</span></dd>
            </dl>
            <dl class="payment_price">
              <dt>총 상품금액</dt>
              <dd>{{ $get(item, 'totalPrice') | toPrice }}<span>원</span></dd>
              <dt>
                할인금액
                <div role="button" class="shipping_layer" @click="discountActive()">
                  <template v-if="!isDiscount">
                    <i class="arw arw_bottom"></i>
                  </template>
                  <template v-else>
                    <i class="arw arw_top"></i>
                  </template>
                </div>
              </dt>
              <dd class="total_discount" :class="{'is_active' : isActivation}">{{ $get(item, 'salePrice') | toPrice }}<span>원</span></dd>
              <div class="discount_point_area" :class="{'is_active' : isDiscount}">
                <dl class="discount_point">
                  <dt>└ 상품 즉시할인</dt>
                  <dd>{{ $get(item, 'productSalePrice') | toPrice }}<p>원</p></dd>
                  <dt>└ 상품 쿠폰할인</dt>
                  <dd>{{ $get(item, 'productCouponPrice') | toPrice }}<p>원</p></dd>
                  <dt>└ 장바구니 할인쿠폰</dt>
                  <dd>{{ $get(item, 'cartCouponPrice') | toPrice }}<p>원</p></dd>
                </dl>
              </div>
              <dt>포인트 사용</dt>
              <dd class="point_use">{{ $get(item, 'mileageUsed') | toPrice }}<span>원</span></dd>
              <dt>배송비</dt>
              <dd>{{ $get(item, 'deliveryPrice') | toPrice }}<span>원</span></dd>
            </dl>
            <dl class="point_txt">
              <dt>
                최대 적립 예정 포인트
              </dt>
              <dd>{{ $get(item, 'mileageSaved') | toPrice }}<span>원</span></dd>
            </dl>
          </div>
          <div class="agree_check">
            <div class="input_area check type_box type_all">
              <div class="input_box">
                <label>
                  <input type="checkbox">
                  <span>전체동의</span>
                </label>
              </div>
            </div>
            <div class="input_area check">
              <div class="input_box">
                <label>
                  <input type="checkbox">
                  <span>구매동의 <span class="required">(필수)</span></span>
                </label>
              </div>
              <span>주문 상품의 상품명, 가격, 배송정보, 할인내역 등을 최종 확인하였으며, 구매에 동의합니다. (전자상거래법 제 8조 2항)</span>
              <div class="input_box">
                <label>
                  <input type="checkbox">
                  <span>개인정보 제3자 제공동의 <span class="required">(필수)</span></span>
                  <button class="privacy_btn">보기</button>
                </label>
              </div>
            </div>
          </div>
          <div class="full_btn_area">
            <button class="btn h_l strong" @click="pay">{{ $get(item, 'totalAmount') | toPrice }}<span>원</span> 결제하기</button>
          </div>
        </div>
      </section>
    </main>
  </v-app>
</template>

<script>
import ZinDialog from "~/components/common/ZinDialog";
import Comment from "~/components/common/Comment";
import LayerPopup from "~/components/common/LayerPopup";
import StoreSelectItem from "~/components/store/StoreSelectItem";
import ZinTabs from "~/components/common/ZinTabs";
import moment from 'moment'
// import "moment/locale/ko";
import ZinSelectItem from "~/components/common/ZinSelectItem";
import { loadTossPayments } from '@tosspayments/sdk';

let tossPayments;

export default {
  name: "store-order-payment-member",
  components: {
    ZinDialog,
    Comment,
    LayerPopup,
    StoreSelectItem,
    ZinTabs,
    ZinSelectItem,
  },
  data() {
    return {
      address: '',
      postCode: '',
      item: {},
      payMethod: '',
      commentData: {
        commentInput: "",
      },
      orderItems: [
        {
          company: '일룸 iloom',
          shipping: '직접배송 (배송비 착불 5,000원)',
          itemList: [
            {
              img: "/img/store/@_thumb_01.png",
              company: '일룸 iloom',
              itemName: '엘바패밀리',
              itemIntro: '1400폭 스칸딕 4인 라운딩 낮은 원목 패밀리 테이블',
              option: '색상:',
              color: '베이지',
              option2: '사이즈:',
              size: '300cm',
              quantity: '1개',
              price: {
                cost: 429000,
                item: 471900,
                discount: 10,
              },
            },
            {
              img: "/img/store/@_thumb_02.png",
              company: '일룸 iloom',
              itemName: '모리니',
              itemIntro: '2100폭 6인 세라믹 테이블',
              option: '색상:',
              color: '베이지',
              option2: '사이즈:',
              size: '300cm',
              quantity: '2개',
              price: {
                cost: 799000,
              },
            },
            {
              img: "/img/store/@_thumb_03.png",
              company: '일룸 iloom',
              itemName: '그라나다',
              itemIntro: '1200폭 와이드체스트(거울형) 화장대',
              option: '색상:',
              color: '베이지',
              option2: '사이즈:',
              size: '300cm',
              quantity: '2개',
              price: {
                cost: 470000,
              },
            },
          ],
        },
        {
          company: '지인 Z:IN',
          shipping: '택배 (배송비 무료)',
          itemList: [
            {
              img: "/img/store/@_thumb_04.png",
              company: '지인 Z:IN',
              itemName: '심플라인',
              itemIntro: '디자인 도어 (ZNO80)',
              option: '색상:',
              color: '베이지',
              option2: '사이즈:',
              size: '300cm',
              quantity: '1개',
              price: {
                cost: 299000,
              },
            },
          ],
        },
      ],
      shipping: [
        {
          name: '우리집',
          badges: '기본배송지',
          recipient: '김지인',
          phone: '010-1234-5678',
          tel: '02-1234-5678',
          post: '(04637)',
          address: '서울시 중구 후암로98 지인아파트 101동 101호',
        },
        {
          name: '회사1',
          badges: '기본배송지',
          recipient: '김지인',
          phone: '010-1234-5678',
          tel: '02-1234-5678',
          post: '(04637)',
          address: '서울시 중구 후암로98 지인아파트 101동 101호',
        },
        {
          name: '회사2',
          badges: '기본배송지',
          recipient: '김지인',
          phone: '010-1234-5678',
          tel: '02-1234-5678',
          post: '(04637)',
          address: '서울시 중구 후암로98 지인아파트 101동 101호',
        },
        {
          name: '회사3',
          badges: '기본배송지',
          recipient: '김지인',
          phone: '010-1234-5678',
          tel: '02-1234-5678',
          post: '(04637)',
          address: '서울시 중구 후암로98 지인아파트 101동 101호',
        },
      ],
      paymentMethod: [
        {
          way: '신용/체크카드',
        },
        {
          way: '가상계좌',
        },
        {
          way: '계좌이체',
        },
        {
          way: 'PAYCO',
        },
        {
          way: '삼성페이',
        },
        {
          way: '토스',
        },
      ],
      couponItems: [
        {
          forwording: '일룸 iloom',
          couponList: [
            {
              company: '엘바패밀리',
              product: '1400폭 스칸딕 4인 라운딩 낮은 원목 패밀리테이블',
              option: '색상:',
              color: '베이지',
              option2: '사이즈:',
              size: '300cm',
              price: {
                default: 429000,
                discount: 10,
              },
              quantity: '1개',
            },
          ],
        },
      ],
      phoneSelect: [
        { value: '010', text: '010', disabled: false },
        { value: '011', text: '011', disabled: false },
        { value: '016', text: '016', disabled: false },
        { value: '017', text: '017', disabled: false },
        { value: '018', text: '018', disabled: false },
        { value: '019', text: '019', disabled: false },
      ],
      telSelect: [
        { value: '02', text: '02', disabled: false },
        { value: '031', text: '031', disabled: false },
        { value: '032', text: '032', disabled: false },
        { value: '033', text: '033', disabled: false },
        { value: '041', text: '041', disabled: false },
        { value: '042', text: '042', disabled: false },
        { value: '043', text: '043', disabled: false },
        { value: '044', text: '044', disabled: false },
        { value: '051', text: '051', disabled: false },
        { value: '052', text: '052', disabled: false },
        { value: '053', text: '053', disabled: false },
        { value: '054', text: '054', disabled: false },
        { value: '055', text: '055', disabled: false },
        { value: '061', text: '061', disabled: false },
        { value: '062', text: '062', disabled: false },
        { value: '063', text: '063', disabled: false },
        { value: '064', text: '064', disabled: false },
        { value: '010', text: '010', disabled: false },
        { value: '011', text: '011', disabled: false },
        { value: '016', text: '016', disabled: false },
        { value: '017', text: '017', disabled: false },
        { value: '018', text: '018', disabled: false },
        { value: '019', text: '019', disabled: false },
      ],
      couponSelect: [
        { value: '적용 안함', text: '적용 안함', disabled: false },
        { value: '일룸가구 BRAND DAY 최대100,000원 할인', text: '일룸가구 BRAND DAY 최대100,000원 할인', disabled: false },
        { value: '웰컴 온라인 전 상품 5% 할인', text: '웰컴 온라인 전 상품 5% 할인', disabled: false },
        { value: '웰컴 앱 첫 구매 전 상품 5% 할인', text: '웰컴 앱 첫 구매 전 상품 5% 할인', disabled: true },
      ],
      shippingSelect: [
        { value: '경비실', text: '경비실', disabled: false },
        { value: '문 앞', text: '문 앞', disabled: false },
        { value: '직접 받고 부재 시 경비실', text: '직접 받고 부재 시 경비실', disabled: false },
        { value: '직접 받고 부재 시 문 앞', text: '직접 받고 부재 시 문 앞', disabled: false },
        { value: '택배함', text: '택배함', disabled: false },
        { value: '직접 입력', text: '직접 입력', disabled: false },
      ],
      isSave: false,
      isDiscount: false,
      isActivation: false,
      isPoint: false,
      activeIndex: 0,
      menu: false,
      tabMenu: ['배송지 선택', '직접 입력'],
      date: '',
      items: ['일룸가구 Brand Day 10% 할인', '적용안함', '웰컴 온라인 전 상품 5% 할인', '웰컴 앱 첫 구매 전 상품 5% 할인'],
      shippingSelectVal: '',
      computedDateFormattedMomentjs: '',
    }
  },
  async fetch() {
    try {
      //임시 로그인 처리
      const signInRes = await this.$nuxt.$fetch({
        api: { 
          path: `/svc/signIn`,
          method: 'post'
        },
        data: {
          id: 'test7',
          password: 1234,
        }
      });      
      console.log('signInRes', signInRes);

      const res = await this.$nuxt.$fetch({
        api: { path: `/svc/orderSvcApi/svcReqOrderSheet` },
      });
      if (res.data.result != "200") {
        throw this.$get(res, "data.resultMessage", "error");
      }
      console.log('res', res);

      this.item = res.data.item;
      console.log('this.item', this.item);      
    } catch(e) {
      console.error(e);
    }
  },
  filters: {
    toPrice(price) {
      return price;
    },
    toDeliveryState(itemGroup) {
      const deliveryType = '((택배))';
      let price = 0;
      if(itemGroup && itemGroup.item && itemGroup.item.deliveryPrice) {
        price = itemGroup.item.deliveryPrice;
      }
      let strPrice = '무료';
      if(price > 0) {
        strPrice = price + '원';
      }

      let strPriceType = '배송비';      

      return `${deliveryType} (${strPriceType} ${strPrice})`;
    }
  },
  methods: {    
    getPostCode(data) {
      console.log('data', data);
      let address = data.address;
      if(data.extraAddress) {
        address += `(${data.extraAddress})`;
      }
      // console.log(address);
      this.address= address;
      this.postCode = data.postCode;
    },
    pay() {
      const amount = this.item.totalAmount;
      if(this.payMethod === '신용/체크카드') {        
        tossPayments.requestPayment('카드', {
          amount,
          orderId: 'A_bMi0QCiK_OXyjYZmCMf',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: window.location.origin + '/test/toss/success',
          failUrl: window.location.origin + '/test/toss/fail',
        });
      } else if(this.payMethod === '가상계좌') {
        tossPayments.requestPayment('가상계좌', {
          amount,
          orderId: 'zqlmtvN-BDtbxzJXkgEHF',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: window.location.origin + '/test/toss/success',
          failUrl: window.location.origin + '/test/toss/fail',
        });
      } else if(this.payMethod === '계좌이체') {
        tossPayments.requestPayment('계좌이체', {
          amount,
          orderId: 'A_bMi0QCiK_OXyjYZmCMf',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: window.location.origin + '/test/toss/success',
          failUrl: window.location.origin + '/test/toss/fail',
        });
      } else if(this.payMethod === 'PAYCO') {
        tossPayments.requestPayment('카드', {
          amount,
          orderId: 'A_bMi0QCiK_OXyjYZmCMf',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: window.location.origin + '/test/toss/success',
          failUrl: window.location.origin + '/test/toss/fail',
          easyPay: 'PAYCO',
          flowMode: 'DIRECT'
        });
      } else if(this.payMethod === '삼성페이') {
        tossPayments.requestPayment('카드', {
          amount,
          orderId: 'A_bMi0QCiK_OXyjYZmCMf',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: window.location.origin + '/test/toss/success',
          failUrl: window.location.origin + '/test/toss/fail',
          easyPay: 'SAMSUNGPAY',
          flowMode: 'DIRECT'
        });
      } else if(this.payMethod === '토스') {
        tossPayments.requestPayment('카드', {
          amount,
          orderId: 'A_bMi0QCiK_OXyjYZmCMf',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: window.location.origin + '/test/toss/success',
          failUrl: window.location.origin + '/test/toss/fail',
          easyPay: 'TOSSPAY',
          flowMode: 'DIRECT'
        });
      } else {
        alert('결제 수단을 선택하세요');
      }
    },
    selDate() {
      this.computedDateFormattedMomentjs = this.date ? moment(this.date).format('YYYY.MM.DD dddd') : '';
      this.menu = false
    },
    currentShippingSelect(v) {
      this.shippingSelectVal = v;
    },
    cancelModal() {
      this.$refs.couponDialog.dialog = false;
    },
    numSet(val) {
      if (!val) return val = '';
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    discountSet(val, percent) {
      let calcVal = Math.abs(val * (percent / 100));
      return calcVal;
    },
    toggleLayerPopup(i) {
      Object.keys(this.$refs).forEach(el => {
        if (el.startsWith('layerPopup1')) {
          // console.log(el);
          el === `layerPopup1${i}` ? this.$refs[el][0].toggle() : this.$refs[el][0].hide();
        }
        // console.log(this.$refs[el][0])
        // console.log(el)
      })
      // this.$refs[`layerPopup${i}`][0].toggle();
    },
    toggleLayerPopup2(i, k) {
      Object.keys(this.$refs).forEach(el => {
        if (el.startsWith('layerPopup2')) {
          el === `layerPopup2${i}${k}` ? this.$refs[el][0].toggle() : this.$refs[el][0].hide();
        }
        // console.log(this.$refs[el][0])
        // console.log(el)
      })
    },
    toggleLayerPopup3() {
      // console.log(this.$refs);
      this.$refs.layerPopup.toggle();
    },
    saveActive() {
      this.isSave = !this.isSave;
    },
    discountActive() {
      this.isDiscount = !this.isDiscount;
      this.isActivation = !this.isActivation;
      this.isPoint = !this.isPoint;
    },
  },
  async mounted() {
    const config = JSON.parse(process.env.FRONT_VISIBILITY_CONFIG);
    const tossClientKey = config.tossClientKey;
    tossPayments = await loadTossPayments(tossClientKey);    
  }
}
</script>

<style scoped>


</style>