import { wrapFunctional } from './utils'

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

export const LazyImageGallery = import('../..\\components\\gallery\\imageGallery.vue' /* webpackChunkName: "components/image-gallery" */).then(c => wrapFunctional(c.default || c))
export const LazyImageGalleryDialog = import('../..\\components\\gallery\\imageGalleryDialog.vue' /* webpackChunkName: "components/image-gallery-dialog" */).then(c => wrapFunctional(c.default || c))
export const LazyProductAttribute = import('../..\\components\\product\\attribute.vue' /* webpackChunkName: "components/product-attribute" */).then(c => wrapFunctional(c.default || c))
export const LazyProductInfo = import('../..\\components\\product\\productInfo.vue' /* webpackChunkName: "components/product-info" */).then(c => wrapFunctional(c.default || c))
export const LazyProductComments = import('../..\\components\\attributes_overview\\productComments.vue' /* webpackChunkName: "components/product-comments" */).then(c => wrapFunctional(c.default || c))
export const LazyProductOverview = import('../..\\components\\attributes_overview\\productOverview.vue' /* webpackChunkName: "components/product-overview" */).then(c => wrapFunctional(c.default || c))
export const LazyProductSpecifications = import('../..\\components\\attributes_overview\\productSpecifications.vue' /* webpackChunkName: "components/product-specifications" */).then(c => wrapFunctional(c.default || c))
export const LazyAddressAdd = import('../..\\components\\address\\addressAdd.vue' /* webpackChunkName: "components/address-add" */).then(c => wrapFunctional(c.default || c))
export const LazyAddressAll = import('../..\\components\\address\\addressAll.vue' /* webpackChunkName: "components/address-all" */).then(c => wrapFunctional(c.default || c))
export const LazyAddressMap = import('../..\\components\\address\\addressMap.vue' /* webpackChunkName: "components/address-map" */).then(c => wrapFunctional(c.default || c))
export const LazyTransactionOrder = import('../..\\components\\transaction\\order.vue' /* webpackChunkName: "components/transaction-order" */).then(c => wrapFunctional(c.default || c))
export const LazyTransactionTranactionInfo = import('../..\\components\\transaction\\tranactionInfo.vue' /* webpackChunkName: "components/transaction-tranaction-info" */).then(c => wrapFunctional(c.default || c))
export const LazyTransactionTransactionbacup = import('../..\\components\\transaction\\transactionbacup.vue' /* webpackChunkName: "components/transaction-transactionbacup" */).then(c => wrapFunctional(c.default || c))
