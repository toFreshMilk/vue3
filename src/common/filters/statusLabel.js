import Vue from 'vue';

const consultingStatus = {
  "01": "상담접수",
  "03": "상담취소",
  "04": "TI점연계",
  "05": "상담종료",
  "06": "계약완료",
  "07": "계약실패",
  "08": "계약진행중",
  "09": "상담진행중",
  "10": "공사완료",
  "11": "공사완료 - 사은품배송신청",
  "12": "상담전환접수",
  "17": "통화부재",
}

export function formatConsultingStatus(value) {
  if (!value) return '';
  return consultingStatus[value] || '';
}

export function maskedName(name) {
  if (!name) return '';
  return name[0] + '**';
  // const nameArr = name.split('');
  // const [first, ...res] = nameArr;
  // const masked = res.map(item => "*");
  // return `${first}${masked.join('')}`
}


Vue.filter('statusLabel', formatConsultingStatus);

Vue.filter('maskedName', maskedName)