import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _086f979a = () => interopDefault(import('..\\pages\\auth\\index.vue' /* webpackChunkName: "pages/auth/index" */))
const _18952220 = () => interopDefault(import('..\\pages\\auth\\forgetpassword.vue' /* webpackChunkName: "pages/auth/forgetpassword" */))
const _5bd18a9e = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _3ee9a7bc = () => interopDefault(import('..\\pages\\auth\\smsverification.vue' /* webpackChunkName: "pages/auth/smsverification" */))
const _5b90c845 = () => interopDefault(import('..\\pages\\panel\\amin.vue' /* webpackChunkName: "pages/panel/amin" */))
const _9e1d1980 = () => interopDefault(import('..\\pages\\panel\\brands.vue' /* webpackChunkName: "pages/panel/brands" */))
const _220d5a72 = () => interopDefault(import('..\\pages\\panel\\category.vue' /* webpackChunkName: "pages/panel/category" */))
const _391d1068 = () => interopDefault(import('..\\pages\\panel\\comments.vue' /* webpackChunkName: "pages/panel/comments" */))
const _b4a964dc = () => interopDefault(import('..\\pages\\panel\\create-product.vue' /* webpackChunkName: "pages/panel/create-product" */))
const _37425660 = () => interopDefault(import('..\\pages\\panel\\dashboard.vue' /* webpackChunkName: "pages/panel/dashboard" */))
const _399828e4 = () => interopDefault(import('..\\pages\\panel\\gallery.vue' /* webpackChunkName: "pages/panel/gallery" */))
const _7cefa082 = () => interopDefault(import('..\\pages\\panel\\pages\\index.vue' /* webpackChunkName: "pages/panel/pages/index" */))
const _609c05aa = () => interopDefault(import('..\\pages\\panel\\products\\index.vue' /* webpackChunkName: "pages/panel/products/index" */))
const _59b1097b = () => interopDefault(import('..\\pages\\panel\\properties\\index.vue' /* webpackChunkName: "pages/panel/properties/index" */))
const _a284f7e0 = () => interopDefault(import('..\\pages\\panel\\sellers.vue' /* webpackChunkName: "pages/panel/sellers" */))
const _44b1af1a = () => interopDefault(import('..\\pages\\panel\\transaction.vue' /* webpackChunkName: "pages/panel/transaction" */))
const _020c2a54 = () => interopDefault(import('..\\pages\\panel\\products\\Inventory\\_id.vue' /* webpackChunkName: "pages/panel/products/Inventory/_id" */))
const _7558de73 = () => interopDefault(import('..\\pages\\panel\\products\\seller\\_id.vue' /* webpackChunkName: "pages/panel/products/seller/_id" */))
const _c8392adc = () => interopDefault(import('..\\pages\\panel\\products\\_id.vue' /* webpackChunkName: "pages/panel/products/_id" */))
const _c94da2ba = () => interopDefault(import('..\\pages\\panel\\properties\\_id.vue' /* webpackChunkName: "pages/panel/properties/_id" */))
const _61d67cd0 = () => interopDefault(import('..\\pages\\panel\\pages\\_pageId\\rows\\index.vue' /* webpackChunkName: "pages/panel/pages/_pageId/rows/index" */))
const _1ed7967b = () => interopDefault(import('..\\pages\\panel\\pages\\_pageId\\rows\\_rowId\\cols.vue' /* webpackChunkName: "pages/panel/pages/_pageId/rows/_rowId/cols" */))
const _b5c2e87c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auth",
    component: _086f979a,
    name: "auth"
  }, {
    path: "/auth/forgetpassword",
    component: _18952220,
    name: "auth-forgetpassword"
  }, {
    path: "/auth/login",
    component: _5bd18a9e,
    name: "auth-login"
  }, {
    path: "/auth/smsverification",
    component: _3ee9a7bc,
    name: "auth-smsverification"
  }, {
    path: "/panel/amin",
    component: _5b90c845,
    name: "panel-amin"
  }, {
    path: "/panel/brands",
    component: _9e1d1980,
    name: "panel-brands"
  }, {
    path: "/panel/category",
    component: _220d5a72,
    name: "panel-category"
  }, {
    path: "/panel/comments",
    component: _391d1068,
    name: "panel-comments"
  }, {
    path: "/panel/create-product",
    component: _b4a964dc,
    name: "panel-create-product"
  }, {
    path: "/panel/dashboard",
    component: _37425660,
    name: "panel-dashboard"
  }, {
    path: "/panel/gallery",
    component: _399828e4,
    name: "panel-gallery"
  }, {
    path: "/panel/pages",
    component: _7cefa082,
    name: "panel-pages"
  }, {
    path: "/panel/products",
    component: _609c05aa,
    name: "panel-products"
  }, {
    path: "/panel/properties",
    component: _59b1097b,
    name: "panel-properties"
  }, {
    path: "/panel/sellers",
    component: _a284f7e0,
    name: "panel-sellers"
  }, {
    path: "/panel/transaction",
    component: _44b1af1a,
    name: "panel-transaction"
  }, {
    path: "/panel/products/Inventory/:id?",
    component: _020c2a54,
    name: "panel-products-Inventory-id"
  }, {
    path: "/panel/products/seller/:id?",
    component: _7558de73,
    name: "panel-products-seller-id"
  }, {
    path: "/panel/products/:id",
    component: _c8392adc,
    name: "panel-products-id"
  }, {
    path: "/panel/properties/:id",
    component: _c94da2ba,
    name: "panel-properties-id"
  }, {
    path: "/panel/pages/:pageId/rows",
    component: _61d67cd0,
    name: "panel-pages-pageId-rows"
  }, {
    path: "/panel/pages/:pageId/rows/:rowId/cols",
    component: _1ed7967b,
    name: "panel-pages-pageId-rows-rowId-cols"
  }, {
    path: "/",
    component: _b5c2e87c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
