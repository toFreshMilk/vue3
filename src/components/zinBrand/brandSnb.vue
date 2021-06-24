<template>
  <div class="snb_wrap zin_snb_wrap">
    <div class="snb">
      <div
        v-for="(dep1, i) in menuData"
        :key="'snb_dep_' + i"
        class="snb_node"
        :class="currentCate === dep1.name ? 'current_cate' : ''"
      >
        <h4 class="snb_ttl">
          <span>{{ dep1.name }}</span>
        </h4>
        <v-expand-transition>
          <ul
            v-if="dep1.dep2"
            v-show="activeMenu.name.dep1 === dep1.name && activeMenu.state.dep1"
            class="dep_list dep2_list"
          >
            <li
              v-for="(dep2, j) in dep1.dep2"
              :key="'snb_dep_' + i + '_' + j"
              class="snb_node"
            >
              <NuxtLink :to="dep2.link">
                <span @click="setMenu(dep2.name, 2)">{{ dep2.name }}</span>
              </NuxtLink>
              <v-expand-transition>
                <ul
                  v-if="dep2.dep3"
                  v-show="
                    activeMenu.name.dep2 === dep2.name && activeMenu.state.dep2
                  "
                  class="dep_list dep3_list"
                >
                  <li
                    v-for="(dep3, k) in dep2.dep3"
                    :key="'snb_dep_' + i + '_' + j + '_' + k"
                    class="snb_node"
                  >
                    <NuxtLink :to="dep3.link">
                      <span @click="setMenu(dep3.name, 3)">{{
                        dep3.name
                      }}</span>
                    </NuxtLink>
                    <button
                      v-if="dep3.dep4"
                      @click="foldMenu(dep3.name, 3)"
                      class="fold_btn"
                      :class="{
                        is_active:
                          activeMenu.name.dep3 === dep3.name &&
                          activeMenu.state.dep3,
                      }"
                    >
                      <i class="arw arw_bottom"></i>
                    </button>
                    <v-expand-transition>
                      <ul
                        v-if="dep3.dep4"
                        v-show="
                          activeMenu.name.dep3 === dep3.name &&
                          activeMenu.state.dep3
                        "
                        class="dep_list dep4_list"
                      >
                        <li
                          v-for="(dep4, l) in dep3.dep4"
                          :key="'snb_dep_' + i + '_' + j + '_' + k + '_' + l"
                        >
                          <NuxtLink :to="dep4.link">
                            <span @click="setMenu(dep4.name, 4)">{{
                              dep4.name
                            }}</span>
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
    <div v-if="BannerShow" class="banner_menu_wrap">
      <div class="banner_menu search">
        <NuxtLink to="/publish/pc/zin/product/" class="banner_menu_item"
          ><span>Z:IN 제품검색</span></NuxtLink
        >
      </div>
      <div class="banner_menu_group guide_group">
        <p>인테리어 <em>A to Z</em></p>
        <div class="banner_menu">
          <nuxt-link
            v-for="(guide, i) in guideMenu"
            :key="'guide_menu_' + i"
            :to="guide.link"
            class="banner_menu_item"
            ><span>{{ guide.name }}</span></nuxt-link
          >
        </div>
      </div>
      <div class="banner_menu catalog">
        <a href="javascript:;" class="banner_menu_item"
          ><span>Z:IN DIGITAL CATALOG</span></a
        >
      </div>
      <div class="banner_menu trend">
        <nuxt-link to="#" class="banner_menu_item"
          ><span>HAUSYS DESIGN TREND</span></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreSnb",
  data() {
    return {
      guideMenu: [
        {
          name: "벽지",
          link: "#",
        },
        {
          name: "바닥재",
          link: "#",
        },
        {
          name: "창호",
          link: "#",
        },
        {
          name: "리모델링",
          link: "#",
        },
      ],
      activeMenu: {
        name: {
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
      },
    };
  },
  props: {
    currentCate: {
      type: String,
      default: "",
    },
    currentMenu: {
      type: Object,
      default: null,
    },
    menuData: {
      type: Array,
      default: null,
    },
    BannerShow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    foldMenu(name, dep) {
      if (this.activeMenu.name["dep" + dep] !== name) {
        this.activeMenu.name["dep" + dep] = name;
        this.activeMenu.state["dep" + dep] = true;
      } else {
        this.activeMenu.state["dep" + dep] =
          !this.activeMenu.state["dep" + dep];
        if (dep === 2) {
          this.activeMenu.name["dep3"] = "";
          this.activeMenu.state["dep3"] = false;
          this.activeMenu.name["dep4"] = "";
          this.activeMenu.state["dep4"] = false;
        }
        if (dep === 3) {
          this.activeMenu.name["dep4"] = "";
          this.activeMenu.state["dep4"] = false;
        }
      }
    },
    setMenu(name, dep) {
      if (this.currentMenu.name["dep" + dep] !== name) {
        this.currentMenu.name["dep" + dep] = this.activeMenu.name["dep" + dep] =
          name;
      } else {
        if (dep === 2) {
          this.currentMenu.name["dep3"] = this.activeMenu.name["dep3"] = "";
          this.currentMenu.state["dep3"] = this.activeMenu.state[
            "dep3"
          ] = false;
          this.currentMenu.name["dep4"] = this.activeMenu.name["dep4"] = "";
          this.currentMenu.state["dep4"] = this.activeMenu.state[
            "dep4"
          ] = false;
        }
        if (dep === 3) {
          this.currentMenu.name["dep4"] = this.activeMenu.name["dep4"] = "";
          this.currentMenu.state["dep4"] = this.activeMenu.state[
            "dep4"
          ] = false;
        }
      }
      this.currentMenu.state["dep" + dep] = this.activeMenu.state[
        "dep" + dep
      ] = true;
    },
  },
};
</script>

<style scoped>
</style>
