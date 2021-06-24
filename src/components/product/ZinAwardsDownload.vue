<template>
  <div class="modal_wrap" :class="{'is_show': showModal}">
    <div class="modal awards_down">
      <div class="modal_head">
        <div class="ttl_area bar_ttl">
          <h4 class="ttl">다운로드</h4>
        </div>
      </div>
      <div class="modal_body">
        <section class="awards_down_sec">
          <div class="tbl_list type_small">
            <table>
              <colgroup>
                <col width="30">
                <col>
                <col width="100">
              </colgroup>
              <thead>
              <tr>
                <th>
                  <div class="input_area check type_box type_all">
                    <div class="input_box">
                      <label @change="allChk">
                        <input v-model="fileAllChk" type="checkbox">
                        <span></span>
                      </label>
                    </div>
                  </div>
                </th>
                <th>파일명</th>
                <th>파일크기</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(file, i) in fileData" :key="'file'+i">
                <td>
                  <div class="input_area check">
                    <div class="input_box">
                      <label @change="chked">
                        <input v-model="fileChk" type="checkbox" :value="i">
                        <span></span>
                      </label>
                    </div>
                  </div>
                </td>
                <td class="name taL">
                  <span>{{ file.name }} <i class="ic ic_file_b"></i></span>
                </td>
                <td>{{ file.size }}MB</td>
              </tr>
              </tbody>
            </table>
            <p v-if="fileChk.length > 0" class="file_info"><span class="count">{{ fileChk.length }}</span>개 <span class="file_size">{{ calcSize(fileChk) }}</span>MB</p>
          </div>
        </section>
        <div class="btn_area">
          <button class="btn strong w_m h_m download_btn" >다운로드</button>
        </div>
      </div>
      <button class="close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ZinAwards",
  components: {
  },
  data() {
    return {
      showModal: false,
      fileAllChk: false,
      fileChk: [],
      fileData: [
        {
          id: 1,
          name: 'HI-MACS 시공 상세도.pdf',
          size: 1.35,
        },
        {
          id: 2,
          name: 'HI-MACS 시공 상세도HI-MACS 시공 상세도HI-MACS 시공 상세도HI-MACS 시공 상세도.pdf',
          size: 1.35,
        },
      ],
    };
  },
  methods: {
    calcSize(files) {
      let size = 0
      if(files.length < 1) return
      files.forEach(v => {
        size += this.fileData[v].size
      })
      return size
    },
    closeModal() {
      this.showModal = false;
    },
    allChk() {
      this.fileChk = [];
      if(this.fileAllChk) {
        this.fileData.forEach((v,i) => {
          this.fileChk.push(i)
        })
      }
    },
    chked() {
      if(this.fileChk.length === this.fileData.length) this.fileAllChk = true;
      else if(this.fileChk.length === 0)  this.fileAllChk = false;
    },
  },
};
</script>

<style scoped>

</style>