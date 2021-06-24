export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      mediaList: [
        { url: '#', icon: 'fa-facebook' },
        { url: '#', icon: 'fa-twitter' },
        { url: '#', icon: 'fa-instagram' },
        { url: '#', icon: 'fa-rss' },
      ],
      amount: 1,
      currentSize: '',
      singleOption: {},
      mixOption: '',
      tempCartList: [],
      tempTotalMoney: '0',
    }
  },
  computed: {
    salePrice () {
      return this.$get(this.product, 'siteProductSaleInfo.salePrice', '')
    },
    total () {
      return this.salePrice * this.amount
    },
    saleInfo () {
      return this.$get(this.product, 'siteProductSaleInfo', {})
    },
    detailInfo () {
      return this.$get(this.product, 'productDetail', {})
    },
    optionType () {
      return this.$get(this.product, 'productDetail.optionType.value', '')
    },

    getTempTotalItem () {
      return this.tempCartList.reduce((acc, item) => acc + item.quantity, 0)
    },
    getTempTotalPrice () {
      return this.tempCartList.reduce((acc, item) => acc + item.optionPrice * item.quantity, 0)
    },
  },
  mounted () {
    // this.amount = this.$get(this.product, 'siteProductSaleInfo.minOrderQuantity', 1)
    const type = this.$get(this.product, 'productDetail.optionType.value', '')
    const price = this.$get(this.product, 'siteProductSaleInfo.salePrice', 0)
    const minQuant = this.$get(this.product, 'siteProductSaleInfo.minOrderQuantity', 0)
    if (type === 'none') {
      const id = this.product.id
      const name = '기분'
      this.tempCartList.push({ id, name, quantity: minQuant, optionPrice: price })
    }
  },
  methods: {

    increment (idx, quant) {
      this.$set(this.tempCartList[idx], 'quantity', quant + 1)
    },

    decrement (idx, quant) {
      if (quant > 1) {
        this.$set(this.tempCartList[idx], 'quantity', quant - 1)
      }
    },

    addToCard () {
      if (this.tempCartList && this.tempCartList.length) {
        this.$emit('addToCart', this.tempCartList)
      }
    },

    buyNow () {
      if (this.tempCartList && this.tempCartList.length) {
        this.$emit('buyNow', this.tempCartList)
      }
    },

    getOptions (option) {
      const idx = this.tempCartList.findIndex(item => item.id === option.id)
      if (idx === -1) {
        this.tempCartList.push({ ...option, quantity: 1 })
      } else {
        const item = this.tempCartList[idx]
        this.$set(this.tempCartList[idx], 'quantity', item.quantity + 1)
      }
    },

    removeCartItem (idx) {
      this.tempCartList.splice(idx, 1)
    },

  },
}
