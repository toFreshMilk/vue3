<template>
  <div class="pagination_group">
    <button
      class="pagination_arw arw_perv type_first"
      :disabled="pager.currentPage === 1"
      @click="goFirstPage()"
    >
      <i class="arw arw_2_left"></i>
    </button>
    <button
      class="pagination_arw arw_perv"
      :disabled="pager.currentPage === 1"
      @click="goPage(pager.currentPage - 1)"
    >
      <i class="arw arw_left"></i>
    </button>
    <div class="pager_nums">
      <button
        v-for="page in pager.pages"
        :key="page"
        :disabled="pager.currentPage === page"
        @click="goPage(page)"
        :class="pager.currentPage === page ? 'is_active' : ''"
      >
        {{ page }}
      </button>
    </div>
    <button
      class="pagination_arw arw_next"
      :disabled="pager.currentPage === pager.totalPages"
      @click="goPage(pager.currentPage + 1)"
    >
      <i class="arw arw_right"></i>
    </button>
    <button
      class="pagination_arw arw_next type_last"
      :disabled="pager.currentPage === pager.totalPages"
      @click="goLastPage()"
    >
      <i class="arw arw_2_right"></i>
    </button>
  </div>
</template>

<script>
import paginate from "jw-paginate";

export default {
  name: "Pagination",
  props: {
    totalCount: {
      type: Number,
      default: 1,
    },
    currentNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 12,
    },
    maxPages: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      pager: {},
    };
  },
  watch: {
    totalCount() {
      this.setPage(this.currentNo);
    },
    currentNo() {
      this.setPage(this.currentNo);
    },
  },
  created() {
    if (!this.$listeners.changePage) {
      //throw 'Missing required event listener: "changePage"';
    }

    // set page if items array isn't empty
    //if (this.items && this.items.length) {
    this.setPage(this.currentNo);
    //}
  },
  methods: {
    setPage(page) {
      const { totalCount, pageSize, maxPages } = this;

      // get new pager object for specified page
      const pager = paginate(totalCount, page, pageSize, maxPages);

      // get new page of items from items array
      //const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // update pager
      this.pager = pager;
    },
    goPage(page) {
      this.setPage(page);

      // emit change page event to parent component
      this.$emit("changePage", page);
    },
    goFirstPage() {
      if (this.pager.currentPage > 10) {
        this.goPage(this.pager.currentPage - 10);
      } else {
        this.goPage(1);
      }
    },
    goLastPage() {
      if (this.pager.currentPage + 10 > this.pager.totalPages) {
        this.goPage(this.pager.totalPages);
      } else {
        this.goPage(this.pager.currentPage + 10);
      }
    },
  },
};
</script>

<style scoped>
</style>