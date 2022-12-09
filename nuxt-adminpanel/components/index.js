export { default as ImageGallery } from '../..\\components\\gallery\\imageGallery.vue'
export { default as ImageGalleryDialog } from '../..\\components\\gallery\\imageGalleryDialog.vue'
export { default as ProductAttribute } from '../..\\components\\product\\attribute.vue'
export { default as ProductInfo } from '../..\\components\\product\\productInfo.vue'
export { default as ProductComments } from '../..\\components\\attributes_overview\\productComments.vue'
export { default as ProductOverview } from '../..\\components\\attributes_overview\\productOverview.vue'
export { default as ProductSpecifications } from '../..\\components\\attributes_overview\\productSpecifications.vue'
export { default as AddressAdd } from '../..\\components\\address\\addressAdd.vue'
export { default as AddressAll } from '../..\\components\\address\\addressAll.vue'
export { default as AddressMap } from '../..\\components\\address\\addressMap.vue'
export { default as TransactionOrder } from '../..\\components\\transaction\\order.vue'
export { default as TransactionTranactionInfo } from '../..\\components\\transaction\\tranactionInfo.vue'
export { default as TransactionTransactionbacup } from '../..\\components\\transaction\\transactionbacup.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
