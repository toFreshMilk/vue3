<template>
  <div>
    
  </div>

</template>

<script>
import { mapState } from "vuex";
import head from 'lodash/head';

export default {
  layout: "productLNB",
  created() {
    let category = head(this.categoryList).category;
    this.$router.push("/product/category/" + category);
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.productCategory.categoryList,
    }),
  },
}
</script>
