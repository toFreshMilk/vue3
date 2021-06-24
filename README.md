# 가이드
- https://ionsdp.atlassian.net/wiki/spaces/ICE4P/pages/1305804801/service

# justten-service-basecamp

> JUSTTEN frontend service base template

## Setting TS

https://medium.com/@sgroff04/configure-typescript-tslint-and-prettier-in-vs-code-for-react-native-development-7f31f0068d2

# Assan Template Kit

http://54.180.41.10/assanTemplate/AssanTemplatesKit/

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run loc

# build for production and launch server
$ yarn run build
$ yarn run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

# 소스 구조

아래 내용은 vue의 서버사이드 랜더링을 지원하는 [Nuxt.js 문서](https://nuxtjs.org/docs/2.x/get-started/installation)을 참고하여 이 프로젝트 관련 내용을 요약하여 작성함. 더 자세한 내용은 문서를 참고.

    .
    ├── _core                   # 아이스 코어 소스(인증 기능, 문제 발생 시 아이온에 지원 요청)
    ├── .nuxt                   # yarn build 명령어 실행 시 vue 파일이 브라우저 호환성에 맞춰서 html, js파일 등으로 변경됨.
    ├── config                  # 로컬, 스테이징, 운영 등에 따른 설정 파일(소스에서 이 값을 사용할수 있음)
    ├── src                     # 소스 파일(아래 폴더 대부분은 nuxt.js에서 기본으로 생성해주는 폴더임)
    │   ├── assets              # css, 이미지, 폰트 등 리소스 파일(소스 빌드시 컴파일 됨)
    │   ├── components          # pages 폴더에서 사용하는 공통 컴포넌트
    │   ├── fetchSheets         # _core 폴더에서 이 폴더 파일의 Path를 참조하고 있음.(API 호출 path)
    │   ├── layouts             # 전체 HTML 레이아웃 폴더
    │   ├── middleware          # 각 페이지 호출 전 처리해야할 함수 정의
    │   ├── pages               # 화면 파일. 폴더구조와 파일명에 따라 자동으로 URL path가 정의 됨
    │   ├── plugins             # 공통 함수, 태그, 속성 등을 정의할 수 있음 
    │   ├── static              # 소스 빌드시 컴파일 되지 않고 그대로 복사 됨. favicon.ico 같이 정적 파일이 위치함.
    │   ├── store               # vue 파일끼리 변수를 주고 받을 수 있지만 그게 복잡해지는 경우 store를 사용하여 공통 변수처럼 공유함
    │   └── ...
    ├── package.json            # 사용 라이브러리 및 명령어 설정
    ├── nuxt.config.js          # 다른 모든 설정 파일을 import 하고 실제로 설정이 적용되는 파일. 위의 폴더에 대한 설정을 여기서 해줌
    └── ...

## Nuxt 라이프 사이클

참고 -> https://nuxtjs.org/docs/2.x/concepts/nuxt-lifecycle/

첫 호출 시 서버를 호출하고 그 다음부터는 프론트 서버 호출 없이 웹 브라우저에서만 랜더링이 일어남.

로그를 찍어보면 대략적인 라이프사이클 확인 가능

### 첫 페이지 호출 시
1) 프론트 서버 - asyncData() - created() - fetch()
2) 클라이언트(웹브라우저) - created() - mounted()

### 다음 페이지 이동 시
1) 프론트 서버 - 없음
2) 클라이언트(웹브라우저) - asyncData() - created() - fetch() - mounted()


- 보통 fetch()에서 API를 호출하여 데이터를 조회함
- 페이지 처리에 [context](https://nuxtjs.org/docs/2.x/internals-glossary/context)가 필요할 경우 asyncData()에서 조회함

참고 -> https://nuxtjs.org/docs/2.x/concepts/server-side-rendering/#server-side-rendering-steps-with-nuxtjs


## 레이아웃

layouts 폴더에서 전체 레이아웃을 지정할 수 있음. 기본적으로 default.vue 파일을 레이아웃으로 사용함.

layouts/default.vue
```
<template>
  <div>
    <h1>Default Title!</h1>
    <Nuxt /> <!-- 이 부분에 들어옴 -->
  </div>
</template>
```

위와 같이 정의할 경우 pages 폴더에 있는 vue 파일은 위의 `<Nuxt />` 부분에 들어감.

그런데 필요할 경우 아래와 같이 vue 파일에서 다른 layout 파일을 지정해줄 수 있음.

layouts/second.vue
```
<template>
  <div>
    <h1>Second Title!</h1>
    <Nuxt /> <!-- 아래의 template이 이 부분에 들어옴 -->
  </div>
</template>
```

pages/index.vue
```
<template>
  <div>
    Index!
  </div>
</template>
<script>
export default {
  layout: 'second'
}
</script>
```

* vue 파일에서 `<nuxt-link>`로 페이지 이동 시 `<Nuxt>`부분만 바뀌지만 `<a>` 링크로 이동 시 전체 페이지 레이아웃이 새로고침 됨(더 느림)

참고 -> https://nuxtjs.org/docs/2.x/directory-structure/layouts/

## 컴포넌트 props, emit 처리

공통 컴포넌트(components 폴더의 vue 파일) 사용 시 props를 통해 컴포넌트에서 사용할 변수를 전달할 수 있고 컴포넌트에서 this.$emit()을 사용하여 부모로 이벤트 전달이 가능함. 혹은 store를 통해서 컴포넌트간 변수를 공유할 수 있음.

## store 폴더

참고 -> https://nuxtjs.org/docs/2.x/directory-structure/store/

nuxt에서 기본적으로 생성해주는 store 관련 폴더. Vue 파일 간 변수를 공유할 수 있음. 위 메뉴얼의 방식으로 _core에서 이미 사용하고 있기 때문에 하위 폴더에서 store를 정의하고 modules에 추가해서 사용하고 있음.