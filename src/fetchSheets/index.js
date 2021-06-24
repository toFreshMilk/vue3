const API = {
  SESSION: {
    path: '/auth/svc/jwt',
    method: 'get',
    withCredentials: true
  },
  LOGIN: {
    path: '/svc/signIn',
    method: 'post',
  },
  //member
  MEMBER_FIND_ID: {
    path: '/svc/member/memberChk',
    method: 'post',
  },
  MEMBER_FIND_NICKNAME: {
    path: '/svc/member/memberChk',
    method: 'post',
  },
  MEMBER_SIGNUP: {
    path: '/svc/member/memberReg',
    method: 'post',
  },
  MEMBER_INFO: {
    path: '/svc/member/memberInfo',
    method: 'post',
  },
  TERMS: {
    path: '/svc/terms/rTerms',
    method: 'get'
  },
  //scrap
  SCRAP_READ: {
    path: '/svc/scrap/rScrap',
    method: 'get'
  },
  SCRAP_CREATE: {
    path: '/svc/scrap/cScrap',
    method: 'post'
  },
  SCRAP_DELETE: {
    path: '/svc/scrap/dScrap',
    method: 'post'
  },
  //common
  COMMON_CODE: {
    path: '/svc/codeSvcApi/svcList',
    method: 'get'
  },
  //homestyle
  RECOMMEND_HOMESTYLING: {
    path: '/svc/productRecommend/rProductRecommend',
    method: 'get'
  },
  POPULAR_HOMESTYLING: {
    path: '/svc/proStyle/rProStyleList',
    method: 'get'
  },
  PROHIBITED_HOMESTYLING: {
    path: '/svc/prohibitWord/rProhibitWord',
    method: 'get'
  },
  WRITE_COMMENT_HOMESTYLING: {
    path: '/svc/review/cReview',
    method: 'post'
  },
  //comment
  WRITE_COMMENT_EVENT: {
    path: '/svc/review/cEventReview',
    method: 'post'
  },
  DELETE_COMMENT: {
    path: '/svc/review/dReview',
    method: 'post'
  },
  RECOMMENT_TAPLIST: {
    path: '/svc/recTag/rRecTag',
    method: 'get'
  },
  MAIN_PLACEHOLDER_SEARCH: {
    path: '/svc/placeholder/rPlaceholder',
    method: 'get'
  },
  //event
  EVENT_PARTICIPATE: {
    path: '/svc/event/cApplyEvent',
    method: 'post'
  },
  EVENT_DETAIL: {
    path: '/svc/event/rWpEventDetail',
    method: 'get'
  },
  EVENT_LIST: {
    path: '/svc/event/rWpEvent',
    method: 'get'
  },
  EVENT_READ_COMMENT: {
    path: '/svc/review/rEventReview',
    method: 'get'
  },
  //statistics
  COUNT_STATISTICS_SEARCH: {
    path: '/svc/recTag/recKeyCnt',
    method: 'get'
  },
  COUNT_STATISTICS_BANNER: {
    path: '/svc/banner/rBannerCnt',
    method: 'get'
  },
  COUNT_STATISTICS_POPUP: {
    path: '/svc/popup/rPopupCnt',
    method: 'get'
  },
  PRODUCT_CATEGORY_LIST: {
    path: '/svc/productCategorySvcApi/listCategory',
    method: 'get'
  },
  //interior_MYHOME
  INTERIOR_MYHOME_WRITE: {
    path: 'svc/decoMyHomeSvcApi/svcSaveItem',
    method: 'post'
  },
  INTERIOR_MYHOME_GET_TEMP_CONTENT: {
    path: 'svc/decoMyHomeSvcApi/svcGetTmp',
    method: 'post'
  },
  INTERIOR_MYHOME_LIST: {
    path: 'svc/decoMyHomeSvcApi/svcList',
    method: 'get'
  },
  INTERIOR_MYHOME_WEEKLYBESTLIST: {
    path: 'svc/decoMyHomeSvcApi/svcWeeklyBestList',
    method: 'get'
  },
  INTERIOR_MYHOME_ONE_BY_SEQ: {
    path: 'svc/decoMyHomeSvcApi/svcReadItem',
    method: 'get'
  },
  INTERIOR_MYHOME_REMOVE_MY_POST: {
    path: 'svc/decoMyHomeSvcApi/svcRemoveItem',
    method: 'post'
  },
  //interior_MYHOME_COMMENT
  INTERIOR_MYHOME_COMMENT: {
    path: 'svc/decoMyHomeSvcApi/svcReply',
    method: 'get'
  },
  INTERIOR_MYHOME_REGIST_COMMENT: {
    path: 'svc/decoMyHomeSvcApi/svcSaveReply',
    method: 'post'
  },
  INTERIOR_MYHOME_REMOVE_COMMENT: {
    path: 'svc/decoMyHomeSvcApi/svcRemoveItem',
    method: 'post'
  },
  INTERIOR_MYHOME_REPORT_COMMENT: {
    path: 'svc/decoMyHomeSvcApi/svcReportReply',
    method: 'post'
  },
  //interior_EXPERT
  INTERIOR_EXPERT_LIST: {
    path: 'svc/expertsSuggestionApi/svcList',
    method: 'get'
  },
  INTERIOR_EXPERT_LIST_ONE_BY_SEQ: {
    path: 'svc/expertsSuggestionApi/svcReadItem',
    method: 'get'
  },
  //interior_HOMECOMMING
  INTERIOR_HOMECOMMING_LIST: {
    path: 'svc/homecommingSvcApi/svcList',
    method: 'get'
  },
  INTERIOR_HOMECOMMING_LIST_ONE_BY_SEQ: {
    path: 'svc/homecommingSvcApi/svcReadItem',
    method: 'get'
  },
  INTERIOR_HOMECOMMING_SCRAP: {
    path: 'svc/homecommingSvcApi/svcScrap',
    method: 'post'
  },
  INTERIOR_HOMECOMMING_COMMENT: {
    path: 'svc/homecommingSvcApi/svcReply',
    method: 'get'
  },
  INTERIOR_HOMECOMMING_REGIST_COMMENT: {
    path: 'svc/homecommingSvcApi/svcSaveReply',
    method: 'post'
  },
  INTERIOR_HOMECOMMING_REMOVE_COMMENT: {
    path: 'svc/homecommingSvcApi/svcRemoveReply',
    method: 'post'
  },
  INTERIOR_HOMECOMMING_REPORT_COMMENT: {
    path: 'svc/homecommingSvcApi/svcReportReply',
    method: 'post'
  },
  //store
  STORE_CATEGORY_LIST: {
    path: 'svc/productSvcApi/productList',
    method: 'get'
  },
  STORE_CATEGORY_DEPTHS: {
    path: 'svc/productCategorySvcApi/storeListCategory',
    method: 'get'
  },
  STORE_BEST_LIST: {
    path: 'svc/productSvcApi/bestPrdList',
    method: 'get'
  }
}

export default API
