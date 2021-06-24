<template>
  <main id="contents" class="zin_page application_detail_page">
    <!-- <aside class="snb_sec divider_snb flL">
          <ProductSnb
            currentCate="브랜드 이야기"
            :currentMenu="currentMenu"
            :menuData="snb"
            :BannerShow="false"
          />
        </aside> -->
    <article class="divider_cnt flR">
      <div class="page_head application_detail_head">
        <div class="ttl_group">
          <div class="ttl_area clearFix">
            <h2 class="ttl flL">지엔느 지원서</h2>
            <p class="flR">* 필수 입력 항목</p>
          </div>
        </div>
      </div>
      <div class="page_body application_detail_body">
        <section class="application_sec basic_info_sec">
          <div class="ttl_group">
            <div class="ttl_area">
              <h4 class="ttl">기본정보</h4>
            </div>
          </div>
          <div class="content_body">
            <form action="">
              <div class="label_content">
                <div class="label_wrap">
                  <label>이름(한글)</label>
                </div>
                <div class="content_wrap">
                  <span>조혜연</span>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label class="must_input">이름(영문)</label>
                </div>
                <!--                    <div class="content_wrap p12">-->
                <!--                      <div class="input_area text">-->
                <!--                        <div class="input_box">-->
                <!--                          <input type="text" id="engName" placeholder="이름을 입력해주세요">-->
                <!--                        </div>-->
                <!--                      </div>-->
                <!--                    </div>-->
                <div class="content_wrap p12">
                  <div class="input_area text is_error">
                    <div class="input_box">
                      <input
                        type="text"
                        id="engName"
                        placeholder="이름을 입력해주세요"
                      />
                    </div>
                    <span class="error_txt">영문 이름을 입력 해 주세요.</span>
                  </div>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label>닉네임</label>
                </div>
                <div class="content_wrap">
                  <span>아다지오</span>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label>아이디</label>
                </div>
                <div class="content_wrap">
                  <span>abcdefg117</span>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label>휴대폰 번호</label>
                </div>
                <div class="content_wrap">
                  <span>010-1234-5678</span>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label class="must_input">전화번호</label>
                </div>
                <div class="content_wrap p12">
                  <div class="zin_frame clearFix">
                    <ZinSelectItem
                      class="flL"
                      placeHolder="02"
                      :text-style="true"
                      :hrz-style="true"
                      :has_arw="true"
                      :selectData="telephoneOption"
                      :inline="true"
                    />
                    <div class="input_area text flL">
                      <div class="input_box w326">
                        <input
                          type="text"
                          id="phoneNum"
                          placeholder="전화번호를 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label>이메일 주소</label>
                </div>
                <div class="content_wrap">
                  <span>abcdefg117@gmail.com</span>
                </div>
              </div>
              <div class="label_content pic_upload_content">
                <div class="label_wrap">
                  <label class="must_input">사진<br />(얼굴이 잘 보이게)</label>
                </div>
                <div class="content_wrap">
                  <div class="upload_box">
                    <div role="button" class="upload_btn">
                      <!-- @click="$refs.oversizeAlert.isShow = true" -->
                      <div class="txt_area">
                        <!--                            <i class="ic_plus_l ic">-->
                        <!--                            </i>-->
                        <!-- <p>업로드</p> -->
                      </div>
                      <!-- <figure class="uploaded_img"> -->
                      <img class="uploaded_img" id="thumbnailimng" />
                      <!-- </figure> -->
                      <input
                        type="file"
                        name="facePic"
                        @change="setThumbnail"
                      />
                      <button class="delete" type="button">
                        <i class="ic ic_delete_w"></i>
                      </button>
                    </div>
                    <LayerPopup ref="oversizeAlert">
                      <template v-slot:cnt>
                        <div class="layer_popup_cnt">
                          <p>
                            파일 용량이 20MB를 초과했습니다.<br />
                            다시 확인해 주세요.
                          </p>
                        </div>
                      </template>
                    </LayerPopup>
                  </div>
                </div>
                <!--                    <div class="content_wrap">-->
                <!--                      <div class="upload_box" @click="$refs.oversizeAlert.isShow=true">-->
                <!--                        <div rold="button" class="upload_btn">-->

                <!--                          <div class="txt_area">-->
                <!--                            <i class="ic_plus_l ic">-->
                <!--                            </i>-->
                <!--                            <p>업로드</p>-->
                <!--                          </div>-->
                <!--                          <figure class="uploaded_img"></figure>-->
                <!--                          <input type="file" name="facePic">-->
                <!--                        </div>-->
                <!--                        <LayerPopup ref="oversizeAlert">-->
                <!--                          <template v-slot:cnt>-->
                <!--                            <div class="layer_popup_cnt">-->
                <!--                              <p>파일 용량이 20MB를 초과했습니다.<br>-->
                <!--                                다시 확인해 주세요.</p>-->
                <!--                            </div>-->
                <!--                          </template>-->
                <!--                        </LayerPopup>-->
                <!--                      </div>-->
                <!--                    </div>-->
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label class="must_input">주소</label>
                </div>
                <div class="content_wrap post_search_wrap p12">
                  <div class="zin_frame">
                    <div class="input_area text clearFix">
                      <button class="btn h_m basic c_blk flL">
                        우편번호 검색
                      </button>
                      <div class="input_box disabled w326 flL">
                        <input type="text" id="addressInput" disabled />
                      </div>
                    </div>
                  </div>

                  <div class="input_area text">
                    <div class="input_box disabled">
                      <input type="text" id="addressInput1" disabled />
                    </div>
                  </div>
                  <div class="input_area text">
                    <div class="input_box">
                      <input
                        type="text"
                        id="addressInput2"
                        placeholder="상세주소를 입력해주세요"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label>생년월일</label>
                </div>
                <div class="content_wrap">
                  <span>1994.03.24</span>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label>결혼기념일</label>
                </div>
                <div class="content_wrap clearFix p12">
                  <div class="input_area text flL w238 has_datepicker">
                    <template>
                      <v-menu
                        ref="menu01"
                        v-model="menu01"
                        :close-on-content-click="false"
                        :return-value.sync="date1"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="computedDateFormattedMomentjs1"
                            label="결혼기념일"
                            prepend-icon=""
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date1"
                          no-title
                          scrollable
                          locale="ko-kr"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu01 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu01.save(date1)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </template>
                    <!--                          <div class="input_box disabled w238">-->
                    <!--                            <div class="ic_wrap">-->
                    <!--                              <i class="ic ic_canlender"></i>-->
                    <!--                            </div>-->
                    <!--                          </div>-->
                  </div>
                  <div class="input_area check flL checkbox">
                    <div class="input_box w50">
                      <label @change="MarriedFalse">
                        <input type="checkbox" id="unmarried" /><span
                          >미혼</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label class="must_input">취업유무</label>
                </div>
                <div class="content_wrap p12">
                  <ZinSelectItem
                    class="select_item w238"
                    placeHolder="선택"
                    :text-style="true"
                    :hrz-style="true"
                    :has_arw="true"
                    :selectData="jobOption"
                    :inline="false"
                  />
                </div>
              </div>
              <div class="label_content">
                <div class="label_wrap">
                  <label>직업/종사 분야, 업무</label>
                </div>
                <div class="content_wrap p12">
                  <div class="input_area text">
                    <div class="input_box">
                      <input
                        type="text"
                        id="job"
                        placeholder="직업/종사 분야, 업무를 입력해주세요."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        <section class="application_sec resume_sec">
          <div class="ttl_group">
            <div class="ttl_area">
              <h4 class="ttl">자기소개서</h4>
            </div>
          </div>
          <div class="content_body">
            <form action="">
              <div class="label_content">
                <div class="label_wrap">
                  <label class="must_input">자기소개 및<br />지원동기</label>
                </div>
                <div class="content_wrap p12">
                  <div class="input_area text textarea_wrap">
                    <div class="input_box textarea_box">
                      <textarea
                        name="selfPR"
                        id="selfPR"
                        wrap="virtual"
                        placeholder="자기소개서 및 지원동기를 입력해주세요."
                      ></textarea>
                      <div id="textLength" class="text_length">0/500자</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div class="detail_form_wrap">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h5 class="ttl">인테리어/시공 관련</h5>
                </div>
              </div>
              <div class="content_body">
                <form action="">
                  <div class="label_content">
                    <div class="label_wrap">
                      <label class="must_input"
                        >인테리어/디자인<br />관심도</label
                      >
                    </div>
                    <div class="content_wrap p12">
                      <strong
                        >인테리어 및 리빙 디자인에 대한 관심이 있으신지, 혹은
                        본인의 특별한 경험이 있으신가요?</strong
                      >
                      <!--                          <div class="input_area text textarea_wrap">-->
                      <!--                            <div class="input_box textarea_box">-->
                      <!--                          <textarea name="interiorLike" id="interiorLike" wrap="virtual"-->
                      <!--                                    placeholder="인테리어/디자인 관심도를 입력해주세요."></textarea>-->
                      <!--                              <div id="textLength2" class="text_length">0/500자</div>-->
                      <!--                            </div>-->
                      <!--                          </div>-->
                      <div class="input_area text is_error textarea_wrap">
                        <div class="input_box textarea_box">
                          <textarea
                            name="interiorLike"
                            id="interiorLike"
                            wrap="virtual"
                            placeholder="인테리어/디자인 관심도를 입력해주세요."
                          ></textarea>
                          <div id="textLength2" class="text_length">
                            0/500자
                          </div>
                        </div>
                        <div class="error_txt">
                          인테리어/디자인 관심도를 입력해주세요.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="label_content">
                    <div class="label_wrap">
                      <label class="must_input">리모델링 경험</label>
                    </div>
                    <div class="content_wrap p12">
                      <strong
                        >인테리어 / 리모델링 시공 경험이 있으신가요?</strong
                      >
                      <div class="input_area radio hrz type_btn">
                        <div class="input_box">
                          <label>
                            <input
                              type="radio"
                              name="interior"
                              id="interiorYes"
                            />
                            <span>
                              <span class="button_txt">있다</span>
                            </span>
                          </label>
                        </div>
                        <div class="input_box">
                          <label>
                            <input
                              type="radio"
                              name="interior"
                              id="interiorYes"
                            />
                            <span>
                              <span class="button_txt">없다</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="label_content">
                    <div class="label_wrap">
                      <label class="must_input">리모델링 계획</label>
                    </div>
                    <div class="content_wrap p12">
                      <strong
                        >향후 1 ~ 2년 내, 인테리어 / 리모델링 시공을 할 의향이
                        있으신가요?</strong
                      >
                      <div class="input_area radio hrz type_btn">
                        <div class="input_box">
                          <label>
                            <input type="radio" name="plan" id="planYes" />
                            <span>
                              <span class="button_txt">있다</span>
                            </span>
                          </label>
                        </div>
                        <div class="input_box">
                          <label>
                            <input type="radio" name="plan" id="planNo" />
                            <span>
                              <span class="button_txt">없다</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="label_content">
                    <div class="label_wrap">
                      <label class="must_input">현재 주거 환경</label>
                    </div>
                    <div class="content_wrap p12">
                      <strong
                        >향후 1 ~ 2년 내, 인테리어 / 리모델링 시공을 할 의향이
                        있으신가요?</strong
                      >
                      <div class="zin_frame">
                        <div class="input_area radio hrz type_btn w600">
                          <div class="input_box">
                            <label @change="EtcFalse1">
                              <input
                                type="radio"
                                name="housetype"
                                id="housetypeAPT"
                              />
                              <span>
                                <span class="button_txt">아파트</span>
                              </span>
                            </label>
                          </div>
                          <div class="input_box">
                            <label @change="EtcFalse2">
                              <input
                                type="radio"
                                name="housetype"
                                id="housetypeHouse"
                              />
                              <span>
                                <span class="button_txt">단독주택</span>
                              </span>
                            </label>
                          </div>
                          <div class="input_box">
                            <label @change="EtcFalse3">
                              <input
                                type="radio"
                                name="housetype"
                                id="housetypeVilla"
                              />
                              <span>
                                <span class="button_txt">빌라</span>
                              </span>
                            </label>
                          </div>
                          <div class="input_box">
                            <label @change="EtcTrue">
                              <input
                                type="radio"
                                name="housetype"
                                id="houseEtc"
                              />
                              <span>
                                <span class="button_txt">기타</span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="input_area text w300">
                        <div class="input_box disabled">
                          <input
                            type="text"
                            id="housetypeEtc"
                            placeholder="기타 입력"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section class="application_sec online_sec">
          <div class="ttl_group">
            <div class="ttl_area">
              <h4 class="ttl">온라인 활동</h4>
            </div>
          </div>
          <div class="content_body">
            <div class="detail_form_wrap blog_form_wrap">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h5 class="ttl">블로그</h5>
                </div>
              </div>
              <form action="">
                <div class="label_content">
                  <div class="label_wrap">
                    <label>블로그 주소</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input
                          type="text"
                          id="name"
                          placeholder="블로그 주소를 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>필명</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input
                          type="text"
                          id="name"
                          placeholder="필명을 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="label_content subject_content">
                  <div class="label_wrap">
                    <label>블로그 주제</label>
                  </div>
                  <div class="content_wrap p12">
                    <ZinSelectItem
                      placeHolder="선택"
                      selectTitle="주제1"
                      :text-style="true"
                      :hrz-style="true"
                      :has_arw="true"
                      :selectData="subjectOption1"
                      :inline="true"
                    />
                    <ZinSelectItem
                      placeHolder="선택"
                      selectTitle="주제2"
                      :text-style="true"
                      :hrz-style="true"
                      :has_arw="true"
                      :selectData="subjectOption2"
                      :inline="true"
                    />
                    <ZinSelectItem
                      placeHolder="선택"
                      selectTitle="주제3"
                      :text-style="true"
                      :hrz-style="true"
                      :has_arw="true"
                      :selectData="subjectOption3"
                      :inline="true"
                    />
                  </div>
                </div>
                <div class="label_content visitor_form">
                  <div class="label_wrap">
                    <label>평균 일일방문자 수</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input type="text" id="name" placeholder="명수 입력" />
                      </div>
                    </div>
                    <span class="txt_right">명</span>
                  </div>
                </div>
                <div class="label_content neighbor_form">
                  <div class="label_wrap">
                    <label>나를 이웃으로 추가한<br />사람의 수</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input type="text" id="name" placeholder="명수 입력" />
                      </div>
                    </div>
                    <span class="txt_right">명</span>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>가장 공들여 썼던<br />포스팅 URL(1개)</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input
                          type="text"
                          id="name"
                          placeholder="URL을 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>추가 블로그</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text textarea_wrap">
                      <div class="input_box textarea_box">
                        <textarea
                          name="addBlog"
                          id="addBlog"
                          wrap="virtual"
                          placeholder="추가된 블로그 정보를 기입해주세요."
                        ></textarea>
                        <div id="textLengthMore" class="text_length">
                          0/1000자
                        </div>
                      </div>
                      <span
                        >활동 블로그가 2개 이상일 경우, 대표 블로그 1개로
                        기입해주시기 바랍니다. 추가1 : 블로그 URL/필명/블로그
                        주제/개설일/평균 일일방문자 수/나를 이웃으로 추가한
                        사람의 수</span
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="detail_form_wrap sns_form_wrap">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h5 class="ttl">SNS</h5>
                </div>
              </div>
              <form action="">
                <div class="label_content instagram_content">
                  <div class="label_wrap">
                    <label>인스타그램</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text hrz w562">
                      <label for="title">계정 URL</label>
                      <div class="input_box w460">
                        <input
                          type="text"
                          id="title"
                          placeholder="URL을 입력해주세요."
                        />
                      </div>
                    </div>
                    <div class="input_area text hrz">
                      <label for="title">팔로워 수</label>
                      <div class="input_box">
                        <input type="text" id="title" placeholder="명수 입력" />
                      </div>
                    </div>
                    <span class="txt_right">명</span>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>유튜브</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text hrz w562">
                      <label for="title">계정 URL</label>
                      <div class="input_box w460">
                        <input
                          type="text"
                          id="title"
                          placeholder="URL을 입력해주세요."
                        />
                      </div>
                    </div>
                    <div class="input_area text hrz">
                      <label for="title">구독자 수</label>
                      <div class="input_box">
                        <input type="text" id="title" placeholder="명수 입력" />
                      </div>
                    </div>
                    <span class="txt_right">명</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section class="application_sec experience_sec">
          <div class="ttl_group">
            <div class="ttl_area">
              <h4 class="ttl">패널활동경험</h4>
            </div>
          </div>
          <div class="content_body">
            <div class="detail_form_wrap support_wrap mgb_40">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h5 class="ttl">소비자패널 및 기업 서포터즈 활동 경험</h5>
                  <span
                    >가장 열심히 참여하셨던 활동을 중심으로 최대 3개까지만
                    기입해주세요.</span
                  >
                </div>
              </div>
              <form action="">
                <div class="label_content">
                  <div class="label_wrap">
                    <label>패널명</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input
                          type="text"
                          id="name"
                          placeholder="패널명을 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>기간</label>
                  </div>
                  <div class="content_wrap p12 period_wrap">
                    <div class="input_area text clearFix period_area">
                      <template>
                        <v-menu
                          ref="menu02"
                          v-model="menu02"
                          :close-on-content-click="false"
                          :return-value.sync="date2"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs2"
                              label="시작일"
                              prepend-icon=""
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date2"
                            no-title
                            scrollable
                            locale="ko-kr"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu02 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu02.save(date2)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </template>
                      <template>
                        <v-menu
                          ref="menu03"
                          v-model="menu03"
                          :close-on-content-click="false"
                          :return-value.sync="date3"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs3"
                              label="종료일"
                              prepend-icon=""
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date3"
                            no-title
                            scrollable
                            locale="ko-kr"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu03 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu03.save(date3)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </template>
                    </div>
                    <div class="ic_period">~</div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>구체적 활동 내용</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text experience_input_area">
                      <div class="input_box">
                        <input
                          type="text"
                          id="ExperienceTxt"
                          placeholder="구체적 활동 내용을 입력해주세요."
                        />
                        <div id="experienceTxtLength" class="txt_input_length">
                          0/50자
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="detail_form_wrap mgb_40">
              <form action="">
                <div class="label_content">
                  <div class="label_wrap">
                    <label>패널명</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input
                          type="text"
                          id="name"
                          placeholder="패널명을 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>기간</label>
                  </div>
                  <div class="content_wrap p12 period_wrap">
                    <div class="input_area text clearFix period_area">
                      <template>
                        <v-menu
                          ref="menu04"
                          v-model="menu04"
                          :close-on-content-click="false"
                          :return-value.sync="date4"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs4"
                              label="시작일"
                              prepend-icon=""
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date4"
                            no-title
                            scrollable
                            locale="ko-kr"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu04 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu04.save(date4)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </template>
                      <template>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date5"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs5"
                              label="종료일"
                              prepend-icon=""
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date5"
                            no-title
                            scrollable
                            locale="ko-kr"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date5)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </template>
                      <!--                          <div class="input_box w238 flL ic_datepicker">-->
                      <!--                            <input type="text" id="name" placeholder="시작일">-->
                      <!--                          </div>-->
                      <!--                          <div class="input_box w238 flL ic_datepicker2">-->
                      <!--                            <input type="text" id="name" placeholder="종료일">-->
                      <!--                          </div>-->
                    </div>
                    <div class="ic_period">~</div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>구체적 활동 내용</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text experience_input_area">
                      <div class="input_box">
                        <input
                          type="text"
                          id="ExperienceTxt2"
                          placeholder="구체적 활동 내용을 입력해주세요."
                        />
                        <div id="experienceTxtLength2" class="txt_input_length">
                          0/50자
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="detail_form_wrap">
              <form action="">
                <div class="label_content">
                  <div class="label_wrap">
                    <label>패널명</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text">
                      <div class="input_box">
                        <input
                          type="text"
                          id="name"
                          placeholder="패널명을 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>기간</label>
                  </div>
                  <div class="content_wrap p12 period_wrap">
                    <div class="input_area text clearFix period_area">
                      <template>
                        <v-menu
                          ref="menu06"
                          v-model="menu06"
                          :close-on-content-click="false"
                          :return-value.sync="date6"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs6"
                              label="종료일"
                              prepend-icon=""
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date6"
                            no-title
                            scrollable
                            locale="ko-kr"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu06 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu06.save(date6)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </template>
                      <template>
                        <v-menu
                          ref="menu07"
                          v-model="menu07"
                          :close-on-content-click="false"
                          :return-value.sync="date7"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs7"
                              label="종료일"
                              prepend-icon=""
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date7"
                            no-title
                            scrollable
                            locale="ko-kr"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu07 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu07.save(date7)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </template>
                      <!--                          <div class="input_box w238 flL ic_datepicker">-->
                      <!--                            <input type="text" id="name" placeholder="시작일">-->
                      <!--                          </div>-->
                      <!--                          <div class="input_box w238 flL ic_datepicker2">-->
                      <!--                            <input type="text" id="name" placeholder="종료일">-->
                      <!--                          </div>-->
                    </div>
                    <div class="ic_period">~</div>
                  </div>
                </div>
                <div class="label_content">
                  <div class="label_wrap">
                    <label>구체적 활동 내용</label>
                  </div>
                  <div class="content_wrap p12">
                    <div class="input_area text experience_input_area">
                      <div class="input_box">
                        <input
                          type="text"
                          id="ExperienceTxt3"
                          placeholder="구체적 활동 내용을 입력해주세요."
                        />
                        <div id="experienceTxtLength3" class="txt_input_length">
                          0/50자
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section class="application_sec about_zenne_sec">
          <div class="ttl_group">
            <div class="ttl_area">
              <h4 class="ttl">Z:IN에 대해서</h4>
            </div>
          </div>
          <div class="detail_form_wrap">
            <div class="ttl_group">
              <div class="ttl_area">
                <h5 class="ttl">지인에 대해서</h5>
                <span
                  >* 아래는 Z:IN 브랜드에 대한 질문입니다.
                  <a href="#" class="about_link">지인 소개</a> 페이지를
                  참조하세요.</span
                >
              </div>
            </div>
            <form action="">
              <div class="about_content">
                <p class="must_input">
                  Z:IN 브랜드의 미션은 ‘프리미엄, 친환경 인테리어 자재를
                  제공함으로써 풍요로운 생활 공간을 창조합니다.’ 입니다.<br />
                  그리고 자연에 대한 긴 생각(친환경), 사람에 대한
                  긴:생각(신뢰성), 공간에 대한 긴:생각(전문성) 이 세 가지를 핵심
                  가치로 삼고 이를 실천하기 위해 노력합니다.<br />
                  평소 Z:IN 브랜드에 갖고 있던 이미지에 대해 솔직하게
                  서술해주세요.
                </p>
                <div class="input_area text about_zin_area">
                  <div class="input_box">
                    <input
                      type="text"
                      id="brandImgTxt"
                      placeholder="브랜드 이미지 문항을 입력해주세요."
                    />
                    <div id="brandImgTxtLength" class="about_txt_length">
                      0/50자
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="detail_form_wrap">
            <div class="ttl_group">
              <div class="ttl_area">
                <h5 class="ttl">지엔느에 대해서</h5>
              </div>
            </div>
            <form action="">
              <div class="about_content how_come_content">
                <p class="must_input">
                  지엔느 모집은 어떤 경로를 통해 알게 되었습니까?
                </p>
                <div class="input_area check type_btn inline">
                  <div class="box_group">
                    <div
                      v-for="(selectItem, index) in spaceOption"
                      :key="'spaceOption' + index"
                      class="input_box"
                    >
                      <label>
                        <input type="checkbox" />
                        <span>{{ selectItem.text }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="about_content how_come_content2 clearFix">
                <div class="input_area text hrz flL">
                  <label for="title">잡지 이름</label>
                  <div class="input_box disabled">
                    <input
                      type="text"
                      id="title"
                      placeholder="잡지 이름"
                      disabled
                    />
                  </div>
                </div>
                <div class="input_area text hrz flL">
                  <label for="title">추천자명</label>
                  <div class="input_box disabled">
                    <input
                      type="text"
                      id="title"
                      placeholder="추천자명"
                      disabled
                    />
                  </div>
                </div>
                <div class="input_area text hrz flL">
                  <label for="title">기타</label>
                  <div class="input_box disabled">
                    <input type="text" id="title" placeholder="기타" disabled />
                  </div>
                </div>
              </div>
            </form>
            <div class="about_content have_you_content">
              <p class="must_input">지엔느 응모 경험이 있습니까?</p>
              <div class="input_area radio hrz type_btn">
                <div class="input_box">
                  <label>
                    <input type="radio" name="experience" id="ExperienceYes" />
                    <span>
                      <span class="button_txt">있다</span>
                    </span>
                  </label>
                </div>
                <div class="input_box">
                  <label>
                    <input type="radio" name="experience" id="ExperienceNo" />
                    <span>
                      <span class="button_txt">없다</span>
                    </span>
                  </label>
                </div>
              </div>
              <p class="must_input strong_point">
                (희망활동) 다음 중 본인이 좀 더 강점을 가지고 활동할 수 있는
                분야를 체크해주세요.
              </p>
              <div class="input_area radio hrz type_btn strong_area">
                <div class="input_box">
                  <label>
                    <input type="radio" name="whether" id="writer" />
                    <span>
                      <span class="button_txt">필진</span>
                    </span>
                  </label>
                </div>
                <div class="input_box">
                  <label>
                    <input type="radio" name="whether" id="videoMaker" />
                    <span>
                      <span class="button_txt">영상제작</span>
                    </span>
                  </label>
                </div>
                <div class="input_box">
                  <label>
                    <input type="radio" name="whether" id="PhotoGrapher" />
                    <span>
                      <span class="button_txt">사진촬영</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="page_foot application_detail_foot">
        <div class="btn_group clearFix">
          <div class="save_button flL">
            <!--                <button class="btn h_m basic">-->
            <!--                  <span>임시저장</span>-->
            <!--                </button>-->
            <ZinDialog
              ref="draftSaveDialog"
              dialog-title=""
              :topBtn="false"
              :max-w="410"
              :subTtl="false"
              class="draft_save_modal"
            >
              <template v-slot:btn>
                <button class="btn h_m w_m basic">
                  <span>임시저장</span>
                </button>
              </template>
              <template v-slot:bodyArea>
                <div class="body_cnt_body draft_save_body">
                  <p>임시저장 되었습니다.</p>
                </div>
              </template>
              <template v-slot:btnGroup>
                <button
                  class="btn h_m strong col col_12 draft_save_btn"
                  @click="$refs.draftSaveDialog.dialog = false"
                >
                  확인
                </button>
              </template>
            </ZinDialog>
          </div>
          <div class="submit_button flR">
            <ZinDialog
              ref="cancelDialog"
              dialog-title=""
              :topBtn="false"
              :max-w="410"
              :subTtl="false"
              class="canceldialog_modal flL"
            >
              <template v-slot:btn>
                <button class="btn h_m w_m basic">
                  <span>취소</span>
                </button>
              </template>
              <template v-slot:bodyArea>
                <div class="body_cnt_body draft_save_body">
                  <p>지원서 작성을 취소하시겠습니까?</p>
                </div>
              </template>
              <template v-slot:btnGroup>
                <button
                  class="btn h_m basic col col_6 draft_save_btn"
                  @click="$refs.cancelDialog.dialog = false"
                >
                  취소
                </button>
                <button
                  class="btn h_m strong col col_6 draft_save_btn"
                  @click="$refs.cancelDialog.dialog = false"
                >
                  확인
                </button>
              </template>
            </ZinDialog>

            <ZinDialog
              ref="submitDialog"
              dialog-title=""
              :topBtn="false"
              :max-w="410"
              :subTtl="false"
              class="submitDialog_modal flL"
            >
              <template v-slot:btn>
                <button class="btn h_m w_m strong">
                  <span>제출</span>
                </button>
              </template>
              <template v-slot:bodyArea>
                <div class="body_cnt_body draft_save_body">
                  <p>지원서를 제출하시겠습니까?</p>
                </div>
              </template>
              <template v-slot:btnGroup>
                <button
                  class="btn h_m basic col col_6 draft_save_btn"
                  @click="$refs.submitDialog.dialog = false"
                >
                  취소
                </button>
                <button
                  class="btn h_m strong col col_6 draft_save_btn"
                  @click="$refs.submitDialog.dialog = false"
                >
                  확인
                </button>
              </template>
            </ZinDialog>
            <!--                <button class="btn h_m strong">-->
            <!--                  <span>제출</span>-->
            <!--                </button>-->
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<script>
import ProductSnb from "~/components/zinBrand/brandSnb";
import ZinSelectItem from "~/components/common/ZinSelectItem";
import moment from "moment";
import "moment/locale/ko";
import ZinDialog from "~/components/zinBrand/ZinDialog";
import LayerPopup from "~/components/common/LayerPopup";

export default {
  layout: "zinBrand",
  name: "application",
  components: {
    ProductSnb,
    ZinSelectItem,
    ZinDialog,
    LayerPopup,
  },
   
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  data() {
    return {
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
      snb: [
        {
          name: "브랜드 이야기",
          link: "/zin/brand/",
          dep2: [
            {
              name: "지인 소개",
              link: "/zin/brand/about/",
            },
            {
              name: "지인 TV",
              link: "/zin/brand/tv/",
            },
            {
              name: "뉴스레터",
              link: "/zin/brand/news/",
            },
            {
              name: "프로슈머 지엔느",
              link: "/zin/brand/zenne/activity/",
              dep3: [
                {
                  name: "지엔느 소개",
                  link: "/zin/brand/zenne/about/",
                },
                {
                  name: "지엔느 활동",
                  link: "/zin/brand/zenne/activity/",
                },
                {
                  name: "지엔느 모집 안내",
                  link: "/zin/brand/zenne/recruitment/",
                },
              ],
            },
          ],
        },
      ],
      telephoneOption: [
        { value: "02", text: "02", disabled: false },
        { value: "052", text: "052", disabled: false },
        { value: "053", text: "053", disabled: false },
        { value: "054", text: "054", disabled: false },
      ],
      jobOption: [
        { value: "취업", text: "취업", disabled: false },
        { value: "미취업", text: "미취업", disabled: false },
      ],
      subjectOption1: [
        { value: "02", text: "02", disabled: false },
        { value: "052", text: "052", disabled: false },
        { value: "053", text: "053", disabled: false },
        { value: "054", text: "054", disabled: false },
      ],
      subjectOption2: [
        { value: "02", text: "02", disabled: false },
        { value: "052", text: "052", disabled: false },
        { value: "053", text: "053", disabled: false },
        { value: "054", text: "054", disabled: false },
      ],
      subjectOption3: [
        { value: "02", text: "02", disabled: false },
        { value: "052", text: "052", disabled: false },
        { value: "053", text: "053", disabled: false },
        { value: "054", text: "054", disabled: false },
      ],
      spaceOption: [
        { value: "Z:IN 홈페이지", text: "Z:IN 홈페이지", disabled: false },
        { value: "Z:IN 블로그", text: "Z:IN 블로그", disabled: false },
        {
          value: "지엔느/이웃블로그",
          text: "지엔느/이웃블로그",
          disabled: false,
        },
        { value: "페이스북", text: "페이스북", disabled: false },
        { value: "인스타그램", text: "인스타그램", disabled: false },
        { value: "잡지", text: "잡지", disabled: true },
        { value: "지엔느추천", text: "지엔느추천", disabled: false },
        { value: "기타", text: "기타", disabled: false },
      ],
      date1: "",
      date2: "",
      date3: "",
      date4: "",
      date5: "",
      date6: "",
      date7: "",
      // menu01: '',
      // menu02: '',
      // menu03: '',
      // menu04: '',
      // menu05: '',
      // menu06: '',
      // menu07: '',
    };
  },
  computed: {
    computedDateFormattedMomentjs1() {
      return this.date1 ? moment(this.date1).format("YYYY.MM.DD dddd") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.date2 ? moment(this.date2).format("YYYY.MM.DD dddd") : "";
    },
    computedDateFormattedMomentjs3() {
      return this.date3 ? moment(this.date3).format("YYYY.MM.DD dddd") : "";
    },
    computedDateFormattedMomentjs4() {
      return this.date4 ? moment(this.date4).format("YYYY.MM.DD dddd") : "";
    },
    computedDateFormattedMomentjs5() {
      return this.date5 ? moment(this.date5).format("YYYY.MM.DD dddd") : "";
    },
    computedDateFormattedMomentjs6() {
      return this.date6 ? moment(this.date6).format("YYYY.MM.DD dddd") : "";
    },
    computedDateFormattedMomentjs7() {
      return this.date7 ? moment(this.date7).format("YYYY.MM.DD dddd") : "";
    },
  },
  methods: {
    setThumbnail(v) {
      const elem = v.target;
      if (elem.files[0].size > 1024*1024*20) {
        this.$refs.oversizeAlert.isShow = true;
        elem.outerHTML
      } else {
        const preview = document.querySelector("#thumbnailimng");
        preview.src = URL.createObjectURL(elem.files[0]);
        preview.onload = function () {
          URL.revokeObjectURL(preview.src);
        };
      }
    },
    EtcTrue(e) {
      let t = e.target;
      if (t.checked) {
        let el = document.getElementById("housetypeEtc");
        el.disabled = false;
        el.parentElement.classList.remove("disabled");
      }
    },
    EtcFalse1(e) {
      let f = e.target;
      if (f.checked) {
        let el = document.getElementById("housetypeEtc");
        el.disabled = true;
        el.parentElement.classList.add("disabled");
      }
    },
    EtcFalse2(e) {
      let g = e.target;
      if (g.checked) {
        let el = document.getElementById("housetypeEtc");
        el.disabled = true;
        el.parentElement.classList.add("disabled");
      }
    },
    EtcFalse3(e) {
      let h = e.target;
      if (h.checked) {
        let el = document.getElementById("housetypeEtc");
        el.disabled = true;
        el.parentElement.classList.add("disabled");
      }
    },
  },
  mounted() {
    $(document).ready(function () {
      $("#selfPR").on("keyup", function () {
        $("#textLength").html($(this).val().length + " / 500자");

        if ($(this).val().length > 500) {
          $(this).val($(this).val().substring(0, 500));
          $("#textLength").html("500 / 500자");
        }
      });

      $("#interiorLike").on("keyup", function () {
        $("#textLength2").html($(this).val().length + " / 500자");

        if ($(this).val().length > 500) {
          $(this).val($(this).val().substring(0, 500));
          $("#textLength2").html("500 / 500자");
        }
      });

      $("#addBlog").on("keyup", function () {
        $("#textLengthMore").html($(this).val().length + " / 1000자");

        if ($(this).val().length > 1000) {
          $(this).val($(this).val().substring(0, 1000));
          $("#textLengthMore").html("1000 / 1000자");
        }
      });

      $("#ExperienceTxt").on("keyup", function () {
        $("#experienceTxtLength").html($(this).val().length + " / 50자");

        if ($(this).val().length > 50) {
          $(this).val($(this).val().substring(0, 50));
          $("#experienceTxtLength").html("50 / 50자");
        }
      });

      $("#ExperienceTxt2").on("keyup", function () {
        $("#experienceTxtLength2").html($(this).val().length + " / 50자");

        if ($(this).val().length > 50) {
          $(this).val($(this).val().substring(0, 50));
          $("#experienceTxtLength2").html("50 / 50자");
        }
      });

      $("#ExperienceTxt3").on("keyup", function () {
        $("#experienceTxtLength3").html($(this).val().length + " / 50자");

        if ($(this).val().length > 50) {
          $(this).val($(this).val().substring(0, 50));
          $("#experienceTxtLength3").html("50 / 50자");
        }
      });

      $("#brandImgTxt").on("keyup", function () {
        $("#brandImgTxtLength").html($(this).val().length + " / 50자");

        if ($(this).val().length > 50) {
          $(this).val($(this).val().substring(0, 50));
          $("#brandImgTxtLength").html("50 / 50자");
        }
      });
    });
  },
};
</script>

<style scoped>
</style>