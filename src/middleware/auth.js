import { types, name } from '../../_core/store/sessionService'

// Change this flag to check login session for School 2019.07.19
const isCheckLogin = false

const mustSignedPaths = [
  '/mypage/scrap',
  '/mypage/change-password',
  '/mypage/my-comment/',
  '/mypage/modify-account',
  '/mypage'
]

async function updateSession(store, meResponse) {
  if (meResponse.data) {
    try {
      return await store.dispatch(`${name}/${types.SUCCESS}`, {
        signed: meResponse.data.item.code === 'signed',
        sessionkey: meResponse.data.item.sessionKey || '',
        user: meResponse.data.item.customer
      })
    } catch (e) {
      console.error('IN AUTH MIDDLEWARE : fail session update', e)
    }
  }
}

export default async function (context) {
  const app = context.app;
  const path = context.route.path;

  try {
    if (mustSignedPaths.indexOf(path) === -1) { return; }
    const sessionResponse = await app.fetch(
      {
        api: {
          path: '/auth/svc/jwt',
          method: 'get',
          withCredentials: true,
        },
        query: {},
      },
      null,
      context,
    )
    await updateSession(context.store, sessionResponse)

  } catch (e) {
    console.error('IN AUTH MIDDLEWARE : Session update fail', e)
  }
}
