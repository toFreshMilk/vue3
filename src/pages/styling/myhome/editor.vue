<template>
  <v-app id="container">
    <main id="contents" class="styling_page editor_page">

      <div class="write_inner">
        <div class="tab_group">
          <div class="tab_frame tip_tab">
            <div @click="tipToggle = !tipToggle" class="tab_head">
              <div class="ttl_area">
                <span class="ic_area">
                  <i class="ic ic_guide_c"></i>
                </span>
                <h5 class="ttl">내가 꾸민 우리집 작성 시 필요한 <span class="has_color">TIP</span>을 알려드려요!</h5>
              </div>
              <span :class="{'is_active':tipToggle}" class="arw_area">
              <i class="arw arw_mid_top"></i>
            </span>
            </div>
            <div v-show="tipToggle" class="tab_body">
              <ul class="tip_ls">
                <li class="tip_item">간단한 자기소개 후, 꾸민 집에 관한 이야기를 들려주세요. (사진 최소 5장)</li>
                <li class="tip_item">도면이 있으면 좋아요. (손으로 그리신 그림도 좋아요!)</li>
                <li class="tip_item">사진은 장당 최대 20MB까지 업로드 가능합니다.</li>
                <li class="tip_item">사진은 이미지 파일 Jpg, png, webp, helf, heic, gif 확장자를 지원합니다.</li>
                <li class="tip_item">콘텐츠는 관리자에 의해 일부 수정될 수 있습니다.</li>
                <li class="tip_item">등록된 사진은 재가공되어 지인몰 기획전 등에 사용될 수 있습니다.</li>
                <li class="tip_item">작성해주신 콘텐츠는 에디터 검수 후 필수조건 미충족, 부적절한 게시글 또는 게시판 성격과 맞지 않는 경우,
                  블라인드 처리 될 수 있습니다.
                </li>
              </ul>
            </div>
          </div>
          <div class="tab_frame info_tab">
            <div @click="infoToggle = !infoToggle" class="tab_head">
              <div class="ttl_area">
              <span class="ic_area">
                <i class="ic ic_write_c"></i>
              </span>
                <h5 class="ttl">이웃들이 꾸미신 집을 잘 이해 할 수 있도록 <span class="has_color">필수정보</span>를 입력해주세요!</h5>
              </div>
              <span :class="{'is_active':infoToggle}" class="arw_area">
              <i class="arw arw_mid_top"></i>
            </span>
            </div>
            <div v-show="infoToggle" class="tab_body">
              <form>
                <div class="input_area text hrz must_input">
                  <label for="title">제목</label>
                  <div class="input_box">
                    <input type="text" v-model="subject" id="title" placeholder="제목을 입력해주세요">
                  </div>
                </div>
                <ZinSelectItem editorOrigin="setHomeTypeOption" @setHomeTypeOption="setHomeTypeOption" selectTitle="주거형태" placeHolder="주거형태를 선택해주세요." :text-style="true" :hrz-style="true"
                               :has_arw="true" :selectData="homeTypeOption" :inline="false"/>
                <ZinSelectItem editorOrigin="setAreaSizeOption" @setAreaSizeOption="setAreaSizeOption" selectTitle="평형" placeHolder="평형을 선택해주세요." :text-style="true" :hrz-style="true"
                               :has_arw="true" :selectData="areaSizeOption" :inline="false"/>
                <ZinSelectItem editorOrigin="setBudgetOption" @setBudgetOption="setBudgetOption" selectTitle="예산" placeHolder="예산을 선택해주세요." :text-style="true" :hrz-style="true"
                               :has_arw="true" :selectData="budgetOption" :inline="false"/>
                <ZinSelectItem editorOrigin="setRangeOption" @setRangeOption="setRangeOption" selectTitle="시공범위" placeHolder="범위를 선택해주세요." :text-style="true" :hrz-style="true"
                               :has_arw="true" :selectData="rangeOption" :inline="false"/>
                <ZinSelectItem editorOrigin="setWhoOption" @setWhoOption="setWhoOption" selectTitle="누구와" placeHolder="누구와를 선택해주세요." :text-style="true" :hrz-style="true"
                               :has_arw="true" :selectData="whoOption" :inline="false"/>
                <div class="input_area check type_btn inline must_input">
                  <label>공간</label>
                  <div class="box_group">
                    <div v-for="(selectItem, i) in spaceOption" :key="'spaceOption'+i" class="input_box" >
                      <label :for="'space'+i">
                        <input type="checkbox" name="space" :id="'space'+i"
                               :value="selectItem.value" v-model="selectedSpaceOption">
                        <span>{{ selectItem.text }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="input_area check type_btn inline must_input ">
                  <label>스타일</label>
                  <div class="box_group">
                    <div v-for="(selectItem, i) in styleOption" :key="'styleOption'+i" class="input_box" >
                      <label :for="'style'+i">
                        <input type="checkbox" name="style" :id="'style'+i"
                               :value="selectItem.value" v-model="selectedStyleOption">
                        <span>{{ selectItem.text }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="input_area check colorPick_area inline must_input">
                  <label>컬러</label>
                  <div class="box_group">
                    <div v-for="(selectItem,i) in colorOption" :key="'colorOption'+i" class="input_box">
                      <label :for="'color'+i">
                        <input type="checkbox" name="color" :id="'color'+i"
                               :value="selectItem.value" v-model="selectedColorOption">
                        <span :style="`background:${selectItem.value}`" :class="selectItem.colorName"
                              class="color_chip"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="tab_frame pic_tab">
            <div class="tab_head">
              <div class="ttl_area">
              <span class="ic_area">
                <i class="ic ic_gallery_c"></i>
              </span>
                <h5 class="ttl">
                  <span class="has_color">대표 사진을</span> 등록해주세요.
                </h5>
                <p>대표 사진은 20MB를 초과할 수 없습니다. JPG, JPEG, PNG, GIF 파일을 업로드 하실 수 있어요.</p>
              </div>
            </div>
            <div class="tab_body">
              <div class="upload_box for_pc">
                <h6>PC</h6>
                <div rold="button" class="upload_btn">
                  <div class="txt_area">
                    <i class="ic_plus_l ic">
                    </i>
                    <p>업로드</p>
                  </div>
                  <figure :style="`background-image:url(${pcImgUpload})`" class="uploaded_img"></figure>
                  <input type="file">
                  <!-- 0616 삭제 버튼 추가-->
                  <button v-if="pcImgUpload" class="delete">
                    <i class="ic ic_delete_w"></i>
                  </button>
                </div>
                <small>*권장 사이즈 : 1920x1152 (5:3 비율)</small>
              </div>
              <div class="upload_box for_mob">
                <h6>MO</h6>
                <div rold="button" class="upload_btn">
                  <div class="txt_area">
                    <i class="ic_plus_l ic">
                    </i>
                    <p>업로드</p>
                  </div>
                  <figure class="uploaded_img"></figure>
                  <input type="file">
                  <!-- 0616 삭제 버튼 추가-->
                  <button v-if="mobImgUpload" class="delete">
                    <i class="ic ic_delete_w"></i>
                  </button>
                </div>
                <small>*권장 사이즈 : 720x900 (4:5 비율)</small>
              </div>
            </div>
          </div>
        </div>
        <div class="editor_area">
          <!-- 임시 에디터 이미지 -->
<!--          <img src="/img/styling/@_editor_bg.png">-->
          <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="editorContent"></vue-editor>
        </div>
        <div class="editor_hash hash_btn_group">
          <button v-for="(item, i) in hash" :key="'hash' + i">
            <span class="hash_item gray_type">{{ item }}
              <button @click="deleteHashTag(i)" class="delete_btn"><i class="ic ic_close_s"></i></button></span>
          </button>
          <div class="hash_input_area">
            <span class="hash_item gray_type">
              <span ref="chkTxt" class="txt_area">{{ hashInput }}</span>
              <input
                v-bind:value="hashInput" v-on:input="updateInput" v-on:keyup.enter="insertHashTag(hashInput)"
                @input="inputwidthCalc()" @focus="inputwidthCalc()" @blur="inputwidthCalc()"
                :style="`width:${hashInputWidth}px`" placeholder="태그입력" maxlength="30" type="text">
            </span>
          </div>
        </div>
        <div class="page_foot">
          <div class="btn_wrap clearFix">
            <div class="temporary_btn btn_area">
              <button class="btn h_m line" @click="registerMyPost(true)">임시저장</button>
            </div>
            <div class="confirm_btn btn_area">
              <nuxt-link to="./">
                <button class="btn h_m line">취소</button>
              </nuxt-link>
              <button class="btn h_m strong" @click="registerMyPost">등록</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </v-app>
</template>
<script>
import ZinSelectItem from "~/components/common/ZinSelectItem";
import ZinDialog from "~/components/common/ZinDialog";
import API from "~/fetchSheets";

export default {
  name: "editor",
  components: {
    ZinDialog,
    ZinSelectItem,
  },
  methods: {
    checkTempContent: async function() {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_MYHOME_GET_TEMP_CONTENT.path,
            method: API.INTERIOR_MYHOME_GET_TEMP_CONTENT.method,
          },
          //data: {},
        });
        // console.log("res");
        // console.log(res);
        this.tempData = res.data;
        if ( res.resultCount === "1" ) {
          this.warningDialog();
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 0614 Dev : 작성중 게시물 알림창 메소드
    warningDialog() {
      let setOldContent = this.setOldContent;
      this.$dialog.confirm(
        '<div class="save_modal_cnt">\n' +
        '  <p class="h6_ttl">작성 중이던 게시물이 있습니다.<br>\n' +
        '            이어서 작성하시겠습니까?</p>\n' +
        '  <small>* 새로쓰기를 누르면 작성중이던 게시물은 삭제됩니다</small>\n' +
        '</div>',
        function () { setOldContent(); }, function () {},
        { btns: {
            submit: { label: '이어쓰기' },
            cancel: { label: '새로쓰기' },
          }, title: '임시저장 안내', motion: 'fade', overlay: true,},
        'small');
    },
    setOldContent: function() {
      // this.tempData = this.tempData || {};
      // this.tempData = {
      //   "id": "55",
      //   "label": "",
      //   "seq": 55,
      //   "subject": "테스형",
      //   "homeType": {
      //     "value": "1",
      //     "label": "1",
      //     "refId": "1"
      //   },
      //   "homeSize": [
      //     {
      //       "value": "2",
      //       "label": "2",
      //       "refId": "2"
      //     }
      //   ],
      //   "budget": [
      //     {
      //       "value": "3",
      //       "label": "3",
      //       "refId": "3"
      //     }
      //   ],
      //   "range": {
      //     "value": "4",
      //     "label": "4",
      //     "refId": "4"
      //   },
      //   "space": [
      //     {
      //       "value": "5",
      //       "label": "5",
      //       "refId": "5"
      //     }
      //   ],
      //   "who": [
      //     {
      //       "value": "6",
      //       "label": "6",
      //       "refId": "6"
      //     }
      //   ],
      //   "style": [
      //     {
      //       "value": "7",
      //       "label": "7",
      //       "refId": "7"
      //     }
      //   ],
      //   "color": [
      //     {
      //       "value": "8",
      //       "label": "8",
      //       "refId": "8"
      //     }
      //   ],
      //   "photoPc": null,
      //   "photoMo": null,
      //   "content": "내용은 4000byte까지입니다.",
      //   "hashtag": "테스트",
      //   "dispYn": {
      //     "value": "Y",
      //     "label": "전시"
      //   },
      // }
      this.subject = this.tempData.subject;
      this.selectedCollection.homeTypeOption = this.tempData.homeType.value;
      this.selectedCollection.areaSizeOption = this.tempData.homeSize.value;
      this.selectedCollection.budgetOption = this.tempData.budget.value;
      this.selectedCollection.rangeOption = this.tempData.range.value;
      this.selectedCollection.whoOption = this.tempData.who.value;
      this.selectedSpaceOption = this.tempData.space.value;
      this.selectedStyleOption = this.tempData.style.value;
      this.selectedColorOption = this.tempData.color.value;
      this.pcImgUpload = this.tempData.photoPc;
      this.mobImgUpload = this.tempData.photoMo;
      this.editorContent = this.tempData.content;
      this.hash = this.tempData.hashtag;
    },
    registerMyPost: async function( isTemp = false ) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API.INTERIOR_MYHOME_WRITE.path,
            method: API.INTERIOR_MYHOME_WRITE.method,
          },
          data: {
            seq: -1,
            subject: this.subject,
            homeType: this.selectedCollection.homeTypeOption,
            homeSize: this.selectedCollection.areaSizeOption,
            budget: this.selectedCollection.budgetOption,
            range: this.selectedCollection.rangeOption,
            who: this.selectedCollection.whoOption,
            space: this.selectedSpaceOption,
            style: this.selectedStyleOption,
            color: this.selectedColorOption,
            photoPc: 888,
            photoMo: 999,
            content: this.editorContent,
            hashtag: this.hash,
            tmpYn: isTemp,
            dispYn: "Y",
          },
        });
        // console.log("res");
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    setHomeTypeOption: function(v) {
      this.selectedCollection.homeTypeOption = v;
    },
    setAreaSizeOption: function(v) {
      this.selectedCollection.areaSizeOption = v;
    },
    setBudgetOption: function(v) {
      this.selectedCollection.budgetOption = v;
    },
    setRangeOption: function(v) {
      this.selectedCollection.rangeOption = v;
    },
    setWhoOption: function(v) {
      this.selectedCollection.whoOption = v;
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("image", file);
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    insertHashTag(tag){
      this.hash.push(tag);
    },
    deleteHashTag(i){
      this.hash.splice(i, 1);
    },

    updateInput(e) {
      let updatedText = e.target.value;
      this.hashInput = updatedText;
    },
    inputwidthCalc(){
      let txtArea = this.$refs.chkTxt;
      let width = txtArea.clientWidth;
      setTimeout(()=>{
        width = txtArea.clientWidth;
        if(width<55){
          width= 55
        }else if(width>425){
          width = 425
        }
        this.hashInputWidth = width + 5
      }, 1);
    },
  },
  data() {
    return {
      tempData: {},
      subject: "",
      selectedCollection : {
        homeTypeOption : "",
        areaSizeOption : "",
        budgetOption : "",
        rangeOption : "",
        whoOption : "",
      },
      selectedSpaceOption : [],
      selectedStyleOption : [],
      selectedColorOption : [],
      pcImgUpload:'/img/styling/@_editor_upload.png',
      mobImgUpload:null,
      editorContent: "Some initial content",
      hash: ['태그1', '태그2'],

      hashInput: null,
      hashInputWidth: 60,
      tipToggle: false,
      infoToggle: true,
      homeTypeOption: [
        { value: '원룸/오피스텔', text: '원룸/오피스텔', disabled: false },
        { value: '아파트', text: '아파트', disabled: false },
        { value: '빌라/연립', text: '빌라/연립', disabled: false },
        { value: '단독주택', text: '단독주택', disabled: false },
        { value: '사무공간', text: '사무공간', disabled: false },
        { value: '상업공간', text: '상업공간', disabled: false },
        { value: '기타', text: '기타', disabled: false },
      ],
      areaSizeOption: [
        { value: '10평 이하', text: '10평 이하', disabled: false },
        { value: '10평형대', text: '10평형대', disabled: false },
        { value: '20평형대', text: '20평형대', disabled: false },
        { value: '30평형대', text: '30평형대', disabled: false },
        { value: '40평형대', text: '40평형대', disabled: false },
        { value: '50평 이상', text: '50평 이상', disabled: false },
      ],
      budgetOption: [
        { value: '1백만원 이하', text: '1백만원 이하', disabled: false },
        { value: '3백만원 이하', text: '3백만원 이하', disabled: false },
        { value: '5백만원 이하', text: '5백만원 이하', disabled: false },
        { value: '1천만원 이하', text: '1천만원 이하', disabled: false },
        { value: '천만원 이하', text: '천만원 이하', disabled: false },
        { value: '3천만원 이하', text: '3천만원 이하', disabled: false },
        { value: '3천만원 이상', text: '3천만원 이상', disabled: false },
      ],
      rangeOption: [
        { value: '리모델링', text: '리모델링', disabled: false },
        { value: '부분 리모델링', text: '부분 리모델링', disabled: false },
        { value: '홈스타일링', text: '홈스타일링', disabled: false },
        { value: '건축', text: '건축', disabled: false },
        { value: 'DIY', text: 'DIY', disabled: false },
        { value: '셀프조치', text: '셀프조치', disabled: false },
        { value: '셀프시공', text: '셀프시공', disabled: false },
      ],
      spaceOption: [
        { value: '홈인테리어', text: '홈인테리어', disabled: false },
        { value: '거실', text: '거실', disabled: false },
        { value: '주방', text: '주방', disabled: false },
        { value: '욕실', text: '욕실', disabled: false },
        { value: '침실', text: '침실', disabled: false },
        { value: '작은방', text: '작은방', disabled: false },
        { value: '자녀방', text: '자녀방', disabled: false },
        { value: '서재', text: '서재', disabled: false },
        { value: '드레스룸', text: '드레스룸', disabled: false },
        { value: '파우더룸', text: '파우더룸', disabled: false },
        { value: '발코니', text: '발코니', disabled: false },
        { value: '원룸', text: '원룸', disabled: false },
        { value: '취미룸', text: '취미룸', disabled: false },
        { value: '놀이방', text: '놀이방', disabled: false },
        { value: '알파룸', text: '놀이방', disabled: false },
        { value: '현관', text: '현관', disabled: false },
        { value: '게스트룸', text: '게스트룸', disabled: false },
        { value: '전실', text: '전실', disabled: false },
        { value: '기타', text: '기타', disabled: false },
      ],
      whoOption: [
        { value: '싱글', text: '싱글', disabled: false },
        { value: '신혼부부', text: '신혼부부', disabled: false },
        { value: '아이와', text: '아이와', disabled: false },
        { value: '부모님과', text: '부모님과', disabled: false },
        { value: '친구와', text: '친구와', disabled: false },
        { value: '반려동물과', text: '반려동물과', disabled: false },
        { value: '기타', text: '기타', disabled: false },
      ],
      styleOption: [
        { value: '모던', text: '모던', disabled: false },
        { value: '북유럽', text: '북유럽', disabled: false },
        { value: '빈티지/인더스트리얼', text: '빈티지/인더스트리얼', disabled: false },
        { value: '내츄럴', text: '내츄럴', disabled: false },
        { value: '프로방스', text: '프로방스', disabled: false },
        { value: '로맨틱', text: '로맨틱', disabled: false },
        { value: '클래식/엔틱', text: '클래식/엔틱', disabled: false },
        { value: '젠/오리엔탈/전통', text: '젠/오리엔탈/전통', disabled: false },
        { value: '유니크', text: '유니크', disabled: false },
        { value: '심플', text: '심플', disabled: false },
        { value: '미니멀', text: '미니멀', disabled: false },
      ],
      colorOption: [
        {
          colorName: 'white',
          value: '#fff',
        },
        {
          colorName: 'black',
          value: '#212121',
        },
        {
          colorName: 'gray',
          value: '#CECECE',
        }, {
          colorName: 'red',
          value: '#D81D1D',
        },
        {
          colorName: 'orange',
          value: '#E39444',
        },
        {
          colorName: 'yellow',
          value: '#FAEF63',
        },
        {
          colorName: 'green',
          value: '#559128',
        },
        {
          colorName: 'skyblue',
          value: '#A8CBF5',
        },
        {
          colorName: 'blue',
          value: '#185DAD',
        },
        {
          colorName: 'navy',
          value: '#482A9B',
        },
        {
          colorName: 'pink',
          value: '#E5589E',
        },
        {
          colorName: 'burgundy',
          value: '#840808',
        },
        {
          colorName: 'brown',
          value: '#835827',
        },
        {
          colorName: 'khaki',
          value: '#647141',
        },
        {
          colorName: 'beige',
          value: '#EAE1CC',
        },
        {
          colorName: 'gold',
          value: 'url(/img/styling/img_colorPick_gold.png)',
        },
        {
          colorName: 'silver',
          value: 'url(/img/styling/img_colorPick_silver.png)',
        },
      ],
    }
  },
  mounted() {
    this.checkTempContent();
  },
}
</script>