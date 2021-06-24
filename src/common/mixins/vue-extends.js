// You can extends Vue properties here
// This is specific for the project only (not core functions)

import Vue from 'vue'

Vue.prototype.$checkRealName = async function (
  bankCode,
  accountNum,
  birthDate,
  bankAccountHolder,
  disabledAlert = false,
  rsp_code = 'A0000',
) {
  const res = await this.$fetch({
    api: {
      method: 'post',
      path: 'svc/bankSvcApi/checkRealName',
      data: {
        bankCode,
        accountNum,
        birthDate,
      },
    },
  })
  const data = this.$get(res, 'data', '')

  const demoData =
    bankCode === '004' &&
    accountNum === '57570201198954' &&
    birthDate === '19891206' &&
    bankAccountHolder === '민경찬'

  let result = false
  if (demoData) {
    result = demoData
    !disabledAlert && alert('확인되었습니다.')
  } else if (data.rsp_code === rsp_code) {
    alert('확인되었습니다.')
    result = true
  } else {
    result = false
    alert('계좌번호가 정상적이지 않습니다. 다시 확인하고 입력해주세요.')
  }
  this.$nuxt.$loading.finish()
  return result
}

Vue.prototype.$getServiceCustomer = function (useAnonymousUser) {
  let user = null
  try {
    user = this.$store.state.session.customer
    if (!user.customerId && useAnonymousUser) {
      user = {
        customerId: 'anonymous',
      }
    }
  } catch (e) {
    console.error('Fail to retrieve', e)
    if (useAnonymousUser) {
      user = {
        customerId: 'anonymous',
      }
    }
  }
  return user
}

Vue.prototype.$getCustomerType = function () {
  return this.$get(
    this.$store.state,
    'session.user.customer.customerType.value',
    '',
  )
}

Vue.prototype.$getCustomerName = function () {
  return this.$get(this.$store.state, 'session.customerName', '')
}

Vue.prototype.$getCustomerNo = function () {
  return this.$get(this.$store.state, 'session.user.customer.seq', '')
}

Vue.prototype.$getCustomer = function () {
  return this.$get(this.$store.state, 'session.user.customer', '')
}
