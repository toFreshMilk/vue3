import moment from 'moment'
import Vue from 'vue'

export function formatTextDate(value, format) {
  if (!value) {
    return ''
  }

  return moment(value, 'YYYYMMDDHHmm').format(format)
}


export function makeFilterFunction(format) {
  return value => formatTextDate(value, format)
}

export function timeFromNow(value) {
  if (!value) {
    return ''
  }
  const now = moment();
  const time = moment(value, 'YYYYMMDDHHmm');

  const hoursAfar = now.diff(time, 'hours');
  if (hoursAfar > 23) {
    return time.format('YYYY.MM.DD');
  }

  if (hoursAfar >= 1 && hoursAfar <= 23) {
    return `${hoursAfar}시간 전`;
  }


  const minAfar = now.diff(time, 'minutes');
  if (minAfar >= 10) {
    return `${Math.floor(minAfar / 10)}0분 전`
  }

  return "방금 전"

}

/**
 * Ex: <div>Today is {{ (new Date()) | textDate }}</div> => Today is 2020.07.24
 */
Vue.filter('textDate', makeFilterFunction('YYYY.MM.DD'))

/**
 * Ex: <div>Today is {{ (new Date()) | textDate }}</div> => Today is 2020.07.24 21:33
 */
Vue.filter('textDateTime', makeFilterFunction('YYYY.MM.DD HH:mm'))

/**
 * Ex: <div>Today is {{ (new Date()) | textDate }}</div> => Today is 21:33
 */
Vue.filter('textTime', makeFilterFunction('HH:mm'))

/**
 * Ex: <div>Today is {{ (new Date()) | textDate }}</div> => Today is 24
 */
Vue.filter('textDay', makeFilterFunction('DD'))

/**
 * Ex: <div>Today is {{ (new Date()) | textDate }}</div> => Today is Wed
 */
Vue.filter('textWeekday', makeFilterFunction('ddd'))


Vue.filter('timeFromNow', timeFromNow);