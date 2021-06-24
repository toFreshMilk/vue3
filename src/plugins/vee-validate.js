import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import ko from 'vee-validate/dist/locale/ko.json';
import * as rules from 'vee-validate/dist/rules';
import { required } from 'vee-validate/dist/rules';
import { configure } from 'vee-validate';
import moment from 'moment';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});


configure({
  classes: {
    invalid: 'is_error',
  },
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: '비밀번호가 일치하지 않습니다.',
});

extend('join_email_required', {
  ...required,
  message: '이메일을 입력해 주세요',
});

extend('isLowcase', {
  validate: value => {
    let checkEngA = /[A-Z]/;
    let isLowcase = checkEngA.test(value);
    if ( isLowcase ) {
      return "영문소문자, 숫자만 사용 가능합니다."
    } else {
      return true
    }
  },
});


extend('korAlpha', {
  validate: value => {
    let regex = /^(?=.*[가-힣|a-zA-Z].*)(?=^.{2,}$)/.test(value);
    let regex2 = /^[가-힣|aA-zZ]{2,20}$/.test(value);
    if (!regex) {
      return '2자 이상 입력해 주세요.';
    }
    if (!regex2) {
      return '2~20자의 한글, 영문만 가능합니다.';
    } else {
      return true;
    }
  },
});

extend('join_email_regex', {
  validate: value => {
    let regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(value);
    if (!regex) {
      return '이메일 형식이 올바르지 않습니다.';
    } else {
      return true;
    }
  },
});

extend('password_regex', {
  validate: value => {
    const length = value.length
    let regexAtLeastTwoType1 = /^(?=.*\d.*)(?=.*[a-zA-Z].*)(?=^.{10,20}$)/.test(value);
    let regexAtLeastTwoType2 = /^(?=.*\d.*)(?=.*\W.*)(?=^.{10,20}$)/.test(value);
    let regexAtLeastTwoType3 = /^(?=.*[a-zA-Z].*)(?=.*\W.*)(?=^.{10,20}$)/.test(value);
    let regexAtleastThree = /^(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*\W.*)(?=^.{8,20}$)/.test(value);
    if (length < 8) {
      return '8자 이상 입력해 주세요.'
    } else if (length > 20) {
      return '비밀번호는 20자까지만 입력 가능합니다.'
    } else if (!regexAtLeastTwoType1 && !regexAtLeastTwoType2 && !regexAtLeastTwoType3 && !regexAtleastThree) {
      return '사용할 수 없는 비밀번호입니다.';
    } else {
      return true;
    }
  },
});

extend("exact_length", {
  params: ["length"],
  validate(val, { length }) {
    if (val.length !== Number(length)) {
      return false
    }

    return true;
  }
});

extend('change_password_rules', {
  validate: value => {
    if (!value) return false;
    const length = value.length
    const upperCount = length - value.replace(/[A-Z]/g, '').length;
    const lowerCount = length - value.replace(/[a-z]/g, '').length;
    const numberCount = length - value.replace(/[0-9]/g, '').length
    const hasSpecial = value.replace(/([A-Za-z0-9/-Z])\w+/g, '').length > 0 ? true : false;
    let combiCount = 0;
    if (length == 1) {
      return "2자 이상 입력해 주세요.";
    }

    if (lowerCount > 0) {
      combiCount += 1;
    }

    if (numberCount > 0) {
      combiCount += 1;
    }

    if (upperCount > 0) {
      combiCount += 1;
    }

    if (hasSpecial) {
      combiCount += 1;
    }

    if (combiCount === 1) {
      return "비밀번호는 영문대소문자, 숫자, 특수문자 중 2가지 이상 조합되어야 합니다.";
    }

    if (combiCount < 3 || length < 10) {
      return "2가지 조합 시 10자 이상, 3가지 조합 시 8자 이상 입력해 주세요.";
    }
    return true;
  }
});


extend('consulting_dates', {
  validate: (value) => {
    const [first, second] = value;
    const diff = moment(moment(second, 'YYYYMMDDHHmm')).diff(moment(first, 'YYYYMMDDHHmm'), 'days');
    if (!Math.abs(diff)) {
      return "공사 예상기간을 입력해 주세요."
    }

    if (Math.abs(diff) < 7) {
      return 'Error, more than 7 days';
    }
    return true;
  }
});

localize({
  ko: {
    messages: {//default korean messages
      alpha: '{_field_} 항목에는 영문자만 사용 가능합니다',
      alpha_dash: '{_field_} 항목에는 영문자, 숫자와 특수기호(-),(_)만 사용 가능합니다',
      alpha_num: '{_field_} 항목에는 영문자와 숫자만 사용 가능합니다',
      alpha_spaces: '{_field_} 항목에는 영문자와 공백만 사용 가능합니다',
      between: '{_field_} 항목의 값은 {min}에서 {max} 사이여야 합니다',
      confirmed: '{_field_} 항목의 값이 일치하지 않습니다',
      digits: '{_field_} 항목의 값은 {length}자리의 숫자이어야 합니다',
      dimensions: '{_field_} 항목의 크기는 가로 {width}픽셀, 세로 {height}픽셀이어야 합니다',
      email: '이메일 형식이 올바르지 않습니다.',
      excluded: '{_field_} 항목은 유효한 값이어야 합니다',
      ext: '{_field_} 항목은 유효한 파일이어야 합니다',
      image: '{_field_} 항목은 이미지 파일이어야 합니다',
      integer: '{_field_} 항목의 값은 정수이어야 합니다',
      length: '{_field_} 항목의 값은 {length}자이어야 합니다',
      max_value: '{_field_} 항목의 값은 {max} 이하이어야 합니다',
      max: '{_field_} 항목의 값은 최대 {length}글자이어야 합니다',
      mimes: '{_field_}는 유효한 파일 형식의 파일이어야 합니다',
      min_value: '{_field_} 항목의 값은 {min} 이상이어야 합니다',
      min: '{_field_} 항목의 값은 최소 {length}글자이어야 합니다',
      numeric: '{_field_} 항목에는 숫자만 사용 가능합니다',
      oneOf: '{_field_} 항목의 값은 유효한 값이어야 합니다',
      regex: '{_field_} 항목은 형식에 맞지 않습니다',
      required: '{_field_} 입력해 주세요',
      required_if: '{_field_} 항목은 필수 정보입니다',
      size: '{_field_} 항목의 크기는 {size}KB보다 작아야 합니다',
      double: '{_field_} 필드는 유효한 십진수 여야합니다'
    },
    fields: {//messages for specific fields
      idName: {
        required: '아이디를 입력해 주세요.',
        max: '아이디는 12자까지만 입력 가능합니다.',
        min: '5자 이상 입력해 주세요.',
        alpha_num: '영문소문자, 숫자만 사용 가능합니다.',
      },
      nickname: {
        required: '닉네임을 입력해 주세요.',
        min: '2자 이상 입력해 주세요.',
        max: '닉네임은 20자까지만 입력 입력 가능합니다.',
      },
      password: {
        required: '비밀번호를 입력해 주세요.',
        min: '8자 이상 입력해 주세요.',
        max: '비밀번호는 20자까지만 입력 가능합니다.',
      },
      confirmPassword: {
        required: '비밀번호를 다시 한번 입력해 주세요.',
        confirmed: '새로운 비밀번호와 일치하지 않습니다.',
      },
      email: {
        required: '이메일을 입력해 주세요.',
        email: "이메일 형식이 올바르지 않습니다.",
      },
      address: {
        required: '주소를 입력해 주세요',
      },
      newPassword: {
        required: '새로운 비밀번호를 입력해 주세요.',
        min: '8자 이상 입력해 주세요.',
        max: '비밀번호는 20자까지만 입력 가능합니다.',
      },
      constrDate: {
        required: "공사 예상기간을 입력해 주세요."
      }
    },
  },
});

localize('ko');

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);