<template>
    <div class="scrap_area">
        <button class="btn scrap_btn ic_before" :class="{'is_active': scrapProduct.isActive}" @click="toggleScrap" />
    </div>
</template>
<script>
import debounce from 'lodash/debounce';
export default {
    props: {
        productId: { 
            type: Number ,
            productId: ''
        },
        product: {
            type: Object,
            default:() => {}
        }
    },
    data() {
        return {
            scrapProduct: {
                isActive: false,
            }
        }
    },
    methods: {
        toggleScrap: debounce(function (e) {
            //handle
            const idIdx = this.myScrapData.indexOf(id)
            if (idIdx === -1) {
                this.myScrapData.push(id)
            } else {
                this.myScrapData.splice(idIdx, 1)
            }
        }),
    }
    
}
</script>