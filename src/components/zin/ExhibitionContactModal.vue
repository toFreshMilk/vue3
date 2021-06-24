<template>
<div :class="contactModalOpen ? 'is_show' : ''" class="modal_wrap has_overlay exhibition_modal contact_modal">
<div class="modal">
  <div class="modal_head">
    <h4 class="ttl">
      문의하기
    </h4>
  </div>
  <div class="modal_body">
    <ZinSelectItem placeHolder="문의 유형을 선택해주세요."
                   :has_arw="true" :selectData="contactType" :inline="false"/>
    <div class="input_area textarea clearFix">
      <div class="input_box">
        <v-textarea auto-grow rows="1" row-height="20" v-model="textInputLength" maxlength="1000"
                    placeholder="문의할 내용을 입력해주세요."></v-textarea>
        <div class="txt_length">
          <span>{{textInputLength.length}}</span>/1,000Byte
        </div>
      </div>
    </div>
    <div class="bg_box">
      <ul class="dot_ls">
        <li class="dot_txt">
          답변은 마이페이지 &lt;상담내역&gt;에서 확인하실 수 있습니다.
        </li>
      </ul>
    </div>
  </div>
  <div class="modal_foot">
    <div class="btn_area full_btn_area  grid grid_5">
      <button @click="modalHide()" class="btn h_m line col col_6">
       취소
      </button>
      <button @click="modalHide()" class="btn h_m strong col col_6">
      문의하기
      </button>
    </div>
  </div>
</div>
</div>
</template>
<script>
import ZinSelectItem from "~/components/common/ZinSelectItem";
export default {
  name: 'ExhibitionContactModal',
  components:{
    ZinSelectItem
  },
  props: {
    postData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      textInputLength:'',
      contactModalOpen: false,
      contactType:[
        {
          text:'시공 문의',
          value:'시공 문의',
        },
        {
          text:'제품/전시제품 문의',
          value:'제품/전시제품 문의',
        },
        {
          text:'기타',
          value:'기타',
        },
      ],
    }
  },
  methods: {
    modalHide() {
      this.$nuxt.$emit('htmlOverShow')
      this.contactModalOpen = false
    },
    contactCancel(){
      this.$dialog.alert('문의 작성을 취소하시겠습니까?', function () {
      }, {
        btns: {
          submit: { label: '취소' },
          cancel: { label: '확인' },
        },motion: 'fade',
      }, 'small')
    },
    errorMessage(){
      this.$dialog.alert('문의 유형을 선택해주세요.', function () {
      },function(){},'small')
    },
  },
}

</script>