import get from 'lodash/get';

export default async function (context) {
  const { app, store } = context;
  
  const isLoaded = store.state.productCategory.isLoaded;
  if (isLoaded) { return; }

  let catList = await loadCategory(context, 1);
  
  await store.dispatch("productCategory/SET_CATEGORY_LIST", catList);
}

async function loadCategory(context, depth) {
  const app = context.app;

  try {
    const res = await app.fetch({
      api: {
        path: "/svc/productCategorySvcApi/listCategory",
        methods: "GET",
      },
      query: {
        category: "A",
        depth: depth,
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
      let subList = await loadCategory(context, depth+1);

      catList.forEach(cat => {
        cat.subItems = new Array();
        subList.forEach(sub => {
          if (sub.superiorCategory === cat.category) {
            cat.subItems.push(sub);
          }
        });
      });
    }

    return catList;
  } catch (e) {
    console.log(e);
  }
}

