<template>
  <div>
    <v-app id="container">
      <main id="contents">
        <div class="error_wrap">
          <div class="error_body pos_center">
            <div v-if="error.statusCode === 404" class="txt_area complete_text">
              <div class="img_area">
                <i class="ic ic_404"></i>
              </div>
              <p>
                존재하지 않는 주소를 입력하셨거나,<br />요청하신 페이지의 주소가
                변경, 삭제되어,<br />찾을 수 없습니다.
              </p>
            </div>
            <div v-else class="txt_area complete_text">
              <div class="img_area">
                <i class="ic ic_service_error"></i>
              </div>
              <p>
                지금 이 서비스와 연결할 수 없습니다.<br />문제를 해결하기 위해
                노력하고 있습니다.<br />잠시 후 다시 확인해주세요.
              </p>
            </div>
          </div>
          <div class="error_foot pos_bottom">
            <div class="item_inner">
              <a href="/" class="btn l gr strong"> 홈으로 이동 </a>
            </div>
          </div>
        </div>
      </main>
    </v-app>
    <footer></footer>
  </div>
</template>


<script>
export default {
  layout: "empty",
  props: ["error"],
  // layout: "noGnb",
  head: {
    title: "LG Zin",
  },
};
</script>

<style scoped>
</style>
