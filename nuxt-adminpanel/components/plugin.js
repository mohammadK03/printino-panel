import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  ImageGallery: () => import('../..\\components\\gallery\\imageGallery.vue' /* webpackChunkName: "components/image-gallery" */).then(c => wrapFunctional(c.default || c)),
  ImageGalleryDialog: () => import('../..\\components\\gallery\\imageGalleryDialog.vue' /* webpackChunkName: "components/image-gallery-dialog" */).then(c => wrapFunctional(c.default || c)),
  ProductAttribute: () => import('../..\\components\\product\\attribute.vue' /* webpackChunkName: "components/product-attribute" */).then(c => wrapFunctional(c.default || c)),
  ProductInfo: () => import('../..\\components\\product\\productInfo.vue' /* webpackChunkName: "components/product-info" */).then(c => wrapFunctional(c.default || c)),
  ProductComments: () => import('../..\\components\\attributes_overview\\productComments.vue' /* webpackChunkName: "components/product-comments" */).then(c => wrapFunctional(c.default || c)),
  ProductOverview: () => import('../..\\components\\attributes_overview\\productOverview.vue' /* webpackChunkName: "components/product-overview" */).then(c => wrapFunctional(c.default || c)),
  ProductSpecifications: () => import('../..\\components\\attributes_overview\\productSpecifications.vue' /* webpackChunkName: "components/product-specifications" */).then(c => wrapFunctional(c.default || c)),
  AddressAdd: () => import('../..\\components\\address\\addressAdd.vue' /* webpackChunkName: "components/address-add" */).then(c => wrapFunctional(c.default || c)),
  AddressAll: () => import('../..\\components\\address\\addressAll.vue' /* webpackChunkName: "components/address-all" */).then(c => wrapFunctional(c.default || c)),
  AddressMap: () => import('../..\\components\\address\\addressMap.vue' /* webpackChunkName: "components/address-map" */).then(c => wrapFunctional(c.default || c)),
  TransactionOrder: () => import('../..\\components\\transaction\\order.vue' /* webpackChunkName: "components/transaction-order" */).then(c => wrapFunctional(c.default || c)),
  TransactionTranactionInfo: () => import('../..\\components\\transaction\\tranactionInfo.vue' /* webpackChunkName: "components/transaction-tranaction-info" */).then(c => wrapFunctional(c.default || c)),
  TransactionTransactionbacup: () => import('../..\\components\\transaction\\transactionbacup.vue' /* webpackChunkName: "components/transaction-transactionbacup" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
