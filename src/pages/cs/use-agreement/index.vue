<template>
  <v-app id="container">
    <main id="contents" class="zin_page use_agreement_page">
      <div class="min_inner clearFix">
        <article class="divider_cnt">
          <div class="page_head use_agreement_head">
            <section class="ttl_sec">
              <div class="ttl_group">
                <div class="ttl_area">
                  <h3 class="ttl">서비스 이용 약관</h3>
                </div>
              </div>
            </section>
            <section class="select_sec">
              <ZinSelectItem  placeHolder="이전 이용약관 보기" :text-style="true"
                             :has_arw="true" :selectData="telephoneOption"/>
            </section>
          </div>
          <div class="page_body use_agreement_body">
            <div class="content_wrap">
              <h6>제 1 장 총칙</h6>
              <div class="content_detail_wrap">
                <strong>제 1 조 (목적)</strong>
                <p>이 약관은 전기통신사업법 및 정보통신망이용촉진및 정보보호등에 관한 법률 등에 관한 법령에 의하여 (주)LG하우시스(이하 “회사”라 한다)가 제공하는 z-in.com 서비스(이하 “서비스”라 한다)의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 한다.</p>
              </div>
              <div class="content_detail_wrap">
                <strong>제 2 조 (약관의 효력 및 변경)</strong>
                <ul class="number_list">
                  <li>① 본 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</li>
                  <li>② 이 약관의 내용은 서비스의 일부 화면 또는 기타 방법 등에 의하여 그 내용을 게재함으로써 그 효력을 발생합니다.</li>
                </ul>
              </div>
            </div>
            <div class="content_wrap">
              <h6>제 2 장 서비스 회원계약</h6>
              <div class="content_detail_wrap">
                <strong>제 3 조 (회원신천의 승낙)</strong>
                <ul class="number_list">
                  <li>① 본 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</li>
                  <li>② 이 약관의 내용은 서비스의 일부 화면 또는 기타 방법 등에 의하여 그 내용을 게재함으로써 그 효력을 발생합니다.
                    <ul class="ko_list">
                      <li>가. 서비스이용설비에 여유가 없는 경우</li>
                      <li>나. 기술상 지장이 있는 경우</li>
                      <li>다. 기타 회사의 사정상 이용승낙이 곤란한 경우</li>
                    </ul>
                  </li>
                  <li>③ 회사는 다음 각 호의 1에 해당하는 회원신청에 대하여는 이를 승낙하지 아니 할 수 있습니다.</li>
                </ul>
              </div>
              <div class="content_detail_wrap">
                <strong>제 4 조 (회사의 의무)</strong>
                <ul class="number_list">
                  <li>① 회사는 회원이 제 6 조에서 정한 모든 사항을 정확히 기재하여 회원신청을 하였을 때 제2호, 제3호의 경우를 예외로 하여 승낙할 수 있습니다.</li>
                  <li>② 회사는 다음 각 호의 1에 해당하는 회원신청에 대하여는 승낙을 유보할 수 있습니다.</li>
                  <li>③ 회사는 다음 각 호의 1에 해당하는 회원신청에 대하여는 이를 승낙하지 아니 할 수 있습니다.</li>
                </ul>
              </div>
              <div class="content_detail_wrap">
                <span>[부착]</span>
                <p>(시행일) 이 약관은 2011년 11월 7일부터 시행합니다.</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  </v-app>
</template>

<script>
// import ProductSnb from "~/components/publish/zin/ProductSnb";
import ZinSelectItem from "~/components/common/ZinSelectItem";

export default {
  layout: "default",
  name: "use-agreement",
  components:{
    ZinSelectItem,
  },
  created() {
    this.$nuxt.$emit("Header", {
      pageClass: "zin_page",
    });
  },
  data(){
    return{
      telephoneOption: [
        {
          text: "sdfwfeageageag",
          value: 'user-agreement-1',
        }, {
          text: "sdfwfeageageag",
          value: 'user-agreement-2',
        }, {
          text: "eageageageageag",
          value: 'user-agreement-3',
        },
      ],
    }
  },
  methods: {
    linkPromotion(v){
      console.log(v)
    },
  },
}
</script>

<style scoped>

</style>