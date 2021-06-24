<template>
  <div class="snb_wrap">
    <div class="snb">
      <div v-if="noneTitle" class="page_ttl_area ttl_area">
        <slot name="title"></slot>
      </div>
      <div v-for="(dep1, i) in menuData" :key="'snb_dep_' + i"
           class="snb_node" :class="isActive(dep1.category) ? 'current_cate':''">
        <NuxtLink :to="getLink(dep1.category)" :class="isActive(dep1.category) ? 'nuxt-link-exact-active':''">
          <span>{{ dep1.name }}</span>
        </NuxtLink>
        <v-expand-transition>
        <ul v-if="dep1.subItems.length > 0" v-show="activeMenu.category.dep1 === dep1.category && activeMenu.state.dep1" class="dep_list dep2_list">
          <li v-for="(dep2, j) in dep1.subItems" :key="'snb_dep_'+i+'_'+j" class="snb_node">
            <NuxtLink :to="getLink(dep2.category)" :class="isActive(dep2.category) ? 'nuxt-link-exact-active':''">
              <span>{{ dep2.name }}</span>
            </NuxtLink>
            <button v-if="dep2.subItems.length > 0" @click="foldMenu(dep2.category, 2)" class="fold_btn"
                    :class="{'is_active': activeMenu.category.dep2 === dep2.category && activeMenu.state.dep2}">
              <i class="arw arw_bottom"></i>
            </button>
            <v-expand-transition>
              <ul v-if="dep2.subItems.length > 0" v-show="activeMenu.category.dep2 === dep2.category && activeMenu.state.dep2"
                  class="dep_list dep3_list">
                <li v-for="(dep3, k) in dep2.subItems" :key="'snb_dep_'+i+'_'+j+'_'+k" class="snb_node">
                  <NuxtLink :to="getLink(dep3.category)" :class="isActive(dep3.category) ? 'nuxt-link-exact-active':''">
                    <span>{{ dep3.name }}</span>
                  </NuxtLink>
                  <button v-if="dep3.subItems.length > 0" @click="foldMenu(dep3.category, 3)" class="fold_btn"
                          :class="{'is_active': activeMenu.category.dep3 === dep3.category && activeMenu.state.dep3}">
                    <i class="arw arw_bottom"></i>
                  </button>
                  <v-expand-transition>
                    <ul v-if="dep3.subItems.length > 0" v-show="activeMenu.category.dep3 === dep3.category && activeMenu.state.dep3"
                        class="dep_list dep4_list">
                      <li v-for="(dep4, l) in dep3.subItems" :key="'snb_dep_'+i+'_'+j+'_'+k+'_'+l">
                        <NuxtLink :to="getLink(dep4.category)" :class="isActive(dep4.category) ? 'nuxt-link-exact-active':''">
                          <span>{{ dep4.name }}</span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </v-expand-transition>
                </li>
              </ul>
            </v-expand-transition>
          </li>
        </ul>
        </v-expand-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "StoreSnb",
  data() {
    return {
      menuData: [],
      currentPath: [],
      activeMenu: {
        category: {
          dep1: "",
          dep2: "",
          dep3: "",
          dep4: "",
        },
        state: {
          dep1: false,
          dep2: false,
          dep3: false,
          dep4: false,
        },
      }
    };
  },
  props: {
    currentCategory: {
      type: Object,
      default: {},
    },
    noneTitle:{
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.storeCategory.categoryList,
    }),
    ...mapGetters("storeCategory", ["getCategoryPath"]),
  },
  async fetch() {
    this.currentPath = this.getCategoryPath(this.currentCategory.category);
    this.currentPath.forEach((path, i) => {
      this.activeMenu.category['dep' + (i+1)] = path.category;
      this.activeMenu.state['dep' + (i+1)] = true;
    });
  },
  methods: {
    isActive(category) {
      let findIdx = this.currentPath.findIndex((cat) => {
        return cat.category === category;
      });
      return (findIdx > -1);
    },
    getLink(category) {
      return `/store/category/${category}`;
    },
    foldMenu(category, dep) {
      if (this.activeMenu.category["dep" + dep] !== category) {
        this.activeMenu.category["dep" + dep] = category;
        this.activeMenu.state["dep" + dep] = true;
      } else {
        this.activeMenu.state["dep" + dep] = !this.activeMenu.state["dep" + dep];
        if (dep === 2) {
          this.activeMenu.category["dep3"] = "";
          this.activeMenu.state["dep3"] = false;
          this.activeMenu.category["dep4"] = "";
          this.activeMenu.state["dep4"] = false;
        }
        if (dep === 3) {
          this.activeMenu.category["dep4"] = "";
          this.activeMenu.state["dep4"] = false;
        }
      }
    },
  },
  async mounted() {
    this.menuData.push(...this.categoryList);
  },
};
</script>

<style scoped>

</style>
