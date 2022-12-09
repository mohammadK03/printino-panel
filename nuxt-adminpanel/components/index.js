export const ImageGallery = () => import('../..\\components\\gallery\\imageGallery.vue' /* webpackChunkName: "components/image-gallery" */).then(c => wrapFunctional(c.default || c))
export const ImageGalleryDialog = () => import('../..\\components\\gallery\\imageGalleryDialog.vue' /* webpackChunkName: "components/image-gallery-dialog" */).then(c => wrapFunctional(c.default || c))
export const ProductAttribute = () => import('../..\\components\\product\\attribute.vue' /* webpackChunkName: "components/product-attribute" */).then(c => wrapFunctional(c.default || c))
export const ProductInfo = () => import('../..\\components\\product\\productInfo.vue' /* webpackChunkName: "components/product-info" */).then(c => wrapFunctional(c.default || c))
export const ProductComments = () => import('../..\\components\\attributes_overview\\productComments.vue' /* webpackChunkName: "components/product-comments" */).then(c => wrapFunctional(c.default || c))
export const ProductOverview = () => import('../..\\components\\attributes_overview\\productOverview.vue' /* webpackChunkName: "components/product-overview" */).then(c => wrapFunctional(c.default || c))
export const ProductSpecifications = () => import('../..\\components\\attributes_overview\\productSpecifications.vue' /* webpackChunkName: "components/product-specifications" */).then(c => wrapFunctional(c.default || c))
export const AddressAdd = () => import('../..\\components\\address\\addressAdd.vue' /* webpackChunkName: "components/address-add" */).then(c => wrapFunctional(c.default || c))
export const AddressAll = () => import('../..\\components\\address\\addressAll.vue' /* webpackChunkName: "components/address-all" */).then(c => wrapFunctional(c.default || c))
export const AddressMap = () => import('../..\\components\\address\\addressMap.vue' /* webpackChunkName: "components/address-map" */).then(c => wrapFunctional(c.default || c))
export const TransactionOrder = () => import('../..\\components\\transaction\\order.vue' /* webpackChunkName: "components/transaction-order" */).then(c => wrapFunctional(c.default || c))
export const TransactionTranactionInfo = () => import('../..\\components\\transaction\\tranactionInfo.vue' /* webpackChunkName: "components/transaction-tranaction-info" */).then(c => wrapFunctional(c.default || c))
export const TransactionTransactionbacup = () => import('../..\\components\\transaction\\transactionbacup.vue' /* webpackChunkName: "components/transaction-transactionbacup" */).then(c => wrapFunctional(c.default || c))

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
