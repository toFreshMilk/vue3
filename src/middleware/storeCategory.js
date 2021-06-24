import get from 'lodash/get';

let noHrchyList = [];

async function loadCategory(context, depth) {
  const { app, store } = context;

  try {
    const res = await app.fetch({
      api: {
        /*
        path: "/svc/productCategorySvcApi/listCategory",
        methods: "GET",
        query: {
          category: "A",
          depth: depth,
        },
        */
        path: "/svc/productCategorySvcApi/storeListCategory",
        methods: "GET",
        query: {
          depth: depth,
        },
      },
    },
      null,
      context,
    );

    if (res.data.result !== '200') {
      console.log("resultMessage", res.data.resultMessage);
      throw res.data.resultMessage;
    }
    let catList = get(res, 'data.items', []);

    if (catList.length > 0) {
      noHrchyList.push(...catList);

      // 하위 카테고리를 조회
      let subList = await loadCategory(context, depth+1);

      // 카테고리의 계층 구성
      catList.forEach(cat => {
        cat.subItems = subList.filter(sub => sub.superiorCategory === cat.category);
      });
    }
    return catList;
  } catch (e) {
    console.log(e);
  }
}

export default async function (context) {
  const { app, store } = context;
  
  const isLoaded = store.state.storeCategory.isLoaded;
  if (isLoaded) { return; }

  let catList = await loadCategory(context, 1);

  await store.dispatch("storeCategory/SET_CATEGORY_LIST", catList);
  await store.dispatch("storeCategory/SET_CATEGORY_NO_HRCHY_LIST", noHrchyList);
}
