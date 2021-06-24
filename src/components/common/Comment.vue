<template>

  <div class="detail_inner">
    <div class="sec_head">

      <div class="ttl_area">
        <h4 @click="$refs.declareComment.snackbar = true" class="ttl">댓글 <span
          class="c_point3">{{ total }}</span> <!-- dev class 수정 0531 -->
        </h4>
      </div>
    </div>
    <div class="sec_body comments_sec_body">
      <form action="" class="comment_input_group">
        <div class="input_area textarea clearFix" :class="commentData.commentInput.length > 100 ? 'is_error':''">
          <div class="input_box">
            <v-textarea v-model="commentData.commentInput" auto-grow rows="1" row-height="20"
                        placeholder="댓글을 작성해주세요."></v-textarea>
          </div>
          <button type="button" class="btn_txt"
                  @click="[registComment()]"
                  :disabled="commentData.commentInput.length > 0 && commentData.commentInput.length < 101 ? false:true">
            등록
          </button>
        </div>
      </form>
      <div class="comment_list">
        <div v-for="(comment, index) in commentData.comments" :key="'comments'+index" class="comment_item">
          <p class="name">{{ comment.name }}</p>
          <p class="comment">{{ comment.content }}</p>
          <div class="info_group comment_info_group">
            <div class="time_area">
              <span v-transTimeFormat>{{ comment.modDate }}</span>
            </div>
            <div v-if="!comment.mine" class="declare_area">

              <ZinDialog :ref="'commentDeclare' + comment.id" dialogTitle="신고하기" :maxW="540"
                         :contour="true" :noticeArea="true">
                <template v-slot:btn>
                  <button>신고</button>
                </template>
                <template v-slot:bodyArea>
                  <h6 class="ttl">신고 사유를 선택해 주세요.</h6>
                  <div class="radio_group report_ls">
                    <div v-for="(reason, i) in reportReason" :key="'reportReason'+i" class="report_item input_area radio">
                      <div class="input_box">
                        <label @change="chkRadio('comment' + comment.id, i)">
                          <input type="radio" :name="'comment' + comment.id"><span>{{ reason }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:btnGroup>
                  <button @click="$refs['commentDeclare' + comment.id][0].dialog = false"
                          class="col col_6 btn h_m line">취소
                  </button>
                  <button @click="[reportComment(comment.id), $refs['commentDeclare' + comment.id][0].dialog = false]"
                          :disabled="activeBtn === 'comment' + comment.id ? false : true"
                          class="col col_6 btn m strong h_m ">신고
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

            </div>
            <div v-if="comment.mine" class="delete_area">
              <ZinDialog :ref="'commentDel' + comment.id" dialogTitle="댓글 삭제">
                <template v-slot:btn>
                  <button>삭제</button>
                </template>
                <template v-slot:bodyArea>
                  <p>댓글을 삭제하시겠습니까?</p>
                </template>
                <template v-slot:btnGroup>
                  <button @click="$refs['commentDel' + comment.id][0].dialog = false" class="col col_6 btn h_m line">취소</button>
                  <button @click="[removeComment(comment.id),$refs['commentDel' + comment.id][0].dialog = false]"
                          class="col col_6 btn h_m strong">삭제
                  </button>
                </template>
              </ZinDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination v-if="showPaging && (commentData.comments !== null && commentData.comments.length > 0) && maxItems === null" :totalCount="total" :currentNo="pageNo" :pageSize="pageSize" @changePage="onChangePage"/>
  </div>

</template>

<script>
import ZinDialog from "~/components/common/ZinDialog";
import Pagination from "~/components/common/Pagination";
import ZinSnack from "~/components/common/ZinSnack";
import API from "~/fetchSheets";

export default {
  name: "Comment",
  components: {
    ZinDialog, Pagination, ZinSnack,

  },
  props: {
    // commentData: {
    //   type: Object,
    // },
    //부모 컴포넌트의 메뉴
    commentParent: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 5,
      showPaging: true,
      maxItems: null,
      activeBtn: '',
      reportReason: [
        '상품과 관련 없는 내용',
        '욕설/비방/음란물 개제',
        '광고/홍보물/불법성 정보 게재',
        '게시물 도배',
        '명예훼손/저작권침해',
        '개인정보 노출',
        '기타',
      ],
      swtchingApiPath: {
        // 내가꾸민우리집
        myhome : {
          getComment : "INTERIOR_MYHOME_COMMENT",
          registComment : "INTERIOR_MYHOME_REGIST_COMMENT",
          removeComment : "INTERIOR_REMOVE_COMMENT",
          reportComment : "INTERIOR_REPORT_COMMENT",
          requiredParam : "decoMyHomeSeq",
          reportKey : "decoMyHomeReplySeq" // 키값 확인 필요
        },
        // 집들이그램
        house : {
          getComment : "INTERIOR_HOMECOMMING_COMMENT",
          registComment : "INTERIOR_HOMECOMMING_REGIST_COMMENT",
          removeComment : "INTERIOR_HOMECOMMING_REMOVE_COMMENT",
          reportComment : "INTERIOR_HOMECOMMING_REPORT_COMMENT",
          requiredParam : "homecommingSeq",
          reportKey : "homecommingReplySeq",
        },
        // 전문가 시공제안
      },
      commentData: {
        commentInput: "",
        comments: [],
      },
      reportMsg: -1,
    }
  },
  async fetch() {
    await this.getComment();
  },
  methods: {
    chkRadio: function (name, idx) {
      this.activeBtn = name;
      this.reportMsg = idx;
    },
    // 댓글 조회
    getComment: async function() {
      try {
        let dataParam = {
          page: this.pageNo,
          size: this.pageSize,
          commentSeq: this.$route.params.seq,
        };
        delete Object.assign(dataParam, {[this.swtchingApiPath[this.commentParent]["requiredParam"]]: dataParam["commentSeq"]})["commentSeq"];
        const res = await this.$nuxt.$fetch({
          api: {
            path: API[this.swtchingApiPath[this.commentParent]["getComment"]]["path"],
            method: API[this.swtchingApiPath[this.commentParent]["getComment"]]["method"],
            query: dataParam,
          }
        });

        if (res.data.result !== "200") {
          throw this.$get(res, "data.resultMessage", "error");
        }

        let newItems = res.data.items;
        newItems.forEach(function(item) {
          delete Object.assign(item, {["name"]: item["creUser"] })["creUser"];
          delete Object.assign(item, {["content"]: item["reply"] })["reply"];
          delete Object.assign(item, {["update"]: item["creDate"] })["creDate"];
          //내가 작성한 글 여부 : BO에서 따로 flag 값 넘겨줌
          delete Object.assign(item, {["mine"]: item["reportYn"] === null })["reportYn"]; //주석처리시 (신고) / 주석 풀면 (삭제)
        });
        this.commentData.comments = newItems;
        this.total = this.$get(res, "data.totalCount", 0);
        this.$emit("setCommentArrayLength", this.total);
      } catch (e) {
        console.log(e)
      }
    },
    // 댓글 작성
    registComment: async function() {
      //todo: 금칙어 체크
      // 임시 로그인 처리
      await this.login();
      try {
        let dataParam = {
          seq: -1,
          reply: this.commentData.commentInput,
          commentSeq: this.$route.params.seq,
        };
        delete Object.assign(dataParam, {[this.swtchingApiPath[this.commentParent]["requiredParam"]]: dataParam["commentSeq"]})["commentSeq"];
        const res = await this.$nuxt.$fetch({
          api: {
            path: API[this.swtchingApiPath[this.commentParent]["registComment"]]["path"],
            method: API[this.swtchingApiPath[this.commentParent]["registComment"]]["method"],
          },
          data: dataParam,
        });
        if (res.data.result !== "200") {
          throw this.dialogAlert(res.data.resultMessage);
        }
        openSnackbar('등록되었습니다.');
        // 댓글 내용 초기화
        this.commentData.commentInput = "";
        await this.getComment();

      } catch (e) {
        console.log(e);
      }
    },
    // 댓글 삭제
    removeComment: async function(commnetId) {
      try {
        const res = await this.$nuxt.$fetch({
          api: {
            path: API[this.swtchingApiPath[this.commentParent]["removeComment"]]["path"],
            method: API[this.swtchingApiPath[this.commentParent]["removeComment"]]["method"],
          },
          data: {
            seq: commnetId,
          },
        });

        if (res.data.result !== "200") {
          throw this.dialogAlert(res.data.resultMessage);
        }

        openSnackbar('삭제되었습니다.');
        await this.getComment();

      } catch (e) {
        console.log(e);
      }
    },
    //댓글 신고
    reportComment: async function(_id) {
      try {
        let dataParam = {
          commentSeq: _id,
          reportCd: this.reportMsg
        };
        delete Object.assign(dataParam, {[this.swtchingApiPath[this.commentParent]["reportKey"]]: dataParam["commentSeq"]})["commentSeq"];
        const res = await this.$nuxt.$fetch({
          api: {
            path: API[this.swtchingApiPath[this.commentParent]["reportComment"]]["path"],
            method: API[this.swtchingApiPath[this.commentParent]["reportComment"]]["method"],
          },
          data: dataParam
        });

        if (res.data.result !== "200") {
          throw this.dialogAlert(res.data.resultMessage);
        }

        openSnackbar('신고되었습니다.');
        await this.getComment(); // 신고한 후 데이터 호출시 reportYn값 변화 없음

      } catch (e) {
        console.log(e);
      }
    },
    dialogAlert(text) {
      Dialog.alert(text, function () {
      }, { motion: 'fade' }, 'small')
    },
    // 페이지이동
    async onChangePage(pageNo) {
      this.pageNo = pageNo;
      await this.getComment();
    },
    async login() {
      console.log('로그인 진행 페이지로 이동');
      // 임시로그인 처리
      try {
        await this.$nuxt.$fetch({
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
    },
  },
}
</script>