import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4a765608 = () => interopDefault(import('..\\pages\\auth\\index.vue' /* webpackChunkName: "pages/auth/index" */))
const _15dbc064 = () => interopDefault(import('..\\pages\\auth\\forgetpassword.vue' /* webpackChunkName: "pages/auth/forgetpassword" */))
const _b7270fda = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _6923129e = () => interopDefault(import('..\\pages\\auth\\smsverification.vue' /* webpackChunkName: "pages/auth/smsverification" */))
const _2de605a7 = () => interopDefault(import('..\\pages\\panel\\amin.vue' /* webpackChunkName: "pages/panel/amin" */))
const _42ece022 = () => interopDefault(import('..\\pages\\panel\\brands.vue' /* webpackChunkName: "pages/panel/brands" */))
const _22e116d4 = () => interopDefault(import('..\\pages\\panel\\category.vue' /* webpackChunkName: "pages/panel/category" */))
const _39f0ccca = () => interopDefault(import('..\\pages\\panel\\comments.vue' /* webpackChunkName: "pages/panel/comments" */))
const _60368f18 = () => interopDefault(import('..\\pages\\panel\\create-product.vue' /* webpackChunkName: "pages/panel/create-product" */))
const _03fab6a4 = () => interopDefault(import('..\\pages\\panel\\dashboard.vue' /* webpackChunkName: "pages/panel/dashboard" */))
const _deb3ca28 = () => interopDefault(import('..\\pages\\panel\\gallery.vue' /* webpackChunkName: "pages/panel/gallery" */))
const _3aea5be4 = () => interopDefault(import('..\\pages\\panel\\pages\\index.vue' /* webpackChunkName: "pages/panel/pages/index" */))
const _7d8ff708 = () => interopDefault(import('..\\pages\\panel\\products\\index.vue' /* webpackChunkName: "pages/panel/products/index" */))
const _096e1b59 = () => interopDefault(import('..\\pages\\panel\\properties\\index.vue' /* webpackChunkName: "pages/panel/properties/index" */))
const _5c2fb36e = () => interopDefault(import('..\\pages\\panel\\sellers.vue' /* webpackChunkName: "pages/panel/sellers" */))
const _f6be0110 = () => interopDefault(import('..\\pages\\panel\\transaction.vue' /* webpackChunkName: "pages/panel/transaction" */))
const _cc46b990 = () => interopDefault(import('..\\pages\\panel\\products\\Inventory\\_id.vue' /* webpackChunkName: "pages/panel/products/Inventory/_id" */))
const _0b445d5e = () => interopDefault(import('..\\pages\\panel\\products\\seller\\_id.vue' /* webpackChunkName: "pages/panel/products/seller/_id" */))
const _c57fc920 = () => interopDefault(import('..\\pages\\panel\\products\\_id.vue' /* webpackChunkName: "pages/panel/products/_id" */))
const _8f65bffe = () => interopDefault(import('..\\pages\\panel\\properties\\_id.vue' /* webpackChunkName: "pages/panel/properties/_id" */))
const _d0f55da4 = () => interopDefault(import('..\\pages\\panel\\pages\\_pageId\\rows\\index.vue' /* webpackChunkName: "pages/panel/pages/_pageId/rows/index" */))
const _6740bc5d = () => interopDefault(import('..\\pages\\panel\\pages\\_pageId\\rows\\_rowId\\cols.vue' /* webpackChunkName: "pages/panel/pages/_pageId/rows/_rowId/cols" */))
const _39fdfaa4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _4a765608,
    name: "auth"
  }, {
    path: "/auth/forgetpassword",
    component: _15dbc064,
    name: "auth-forgetpassword"
  }, {
    path: "/auth/login",
    component: _b7270fda,
    name: "auth-login"
  }, {
    path: "/auth/smsverification",
    component: _6923129e,
    name: "auth-smsverification"
  }, {
    path: "/panel/amin",
    component: _2de605a7,
    name: "panel-amin"
  }, {
    path: "/panel/brands",
    component: _42ece022,
    name: "panel-brands"
  }, {
    path: "/panel/category",
    component: _22e116d4,
    name: "panel-category"
  }, {
    path: "/panel/comments",
    component: _39f0ccca,
    name: "panel-comments"
  }, {
    path: "/panel/create-product",
    component: _60368f18,
    name: "panel-create-product"
  }, {
    path: "/panel/dashboard",
    component: _03fab6a4,
    name: "panel-dashboard"
  }, {
    path: "/panel/gallery",
    component: _deb3ca28,
    name: "panel-gallery"
  }, {
    path: "/panel/pages",
    component: _3aea5be4,
    name: "panel-pages"
  }, {
    path: "/panel/products",
    component: _7d8ff708,
    name: "panel-products"
  }, {
    path: "/panel/properties",
    component: _096e1b59,
    name: "panel-properties"
  }, {
    path: "/panel/sellers",
    component: _5c2fb36e,
    name: "panel-sellers"
  }, {
    path: "/panel/transaction",
    component: _f6be0110,
    name: "panel-transaction"
  }, {
    path: "/panel/products/Inventory/:id?",
    component: _cc46b990,
    name: "panel-products-Inventory-id"
  }, {
    path: "/panel/products/seller/:id?",
    component: _0b445d5e,
    name: "panel-products-seller-id"
  }, {
    path: "/panel/products/:id",
    component: _c57fc920,
    name: "panel-products-id"
  }, {
    path: "/panel/properties/:id",
    component: _8f65bffe,
    name: "panel-properties-id"
  }, {
    path: "/panel/pages/:pageId/rows",
    component: _d0f55da4,
    name: "panel-pages-pageId-rows"
  }, {
    path: "/panel/pages/:pageId/rows/:rowId/cols",
    component: _6740bc5d,
    name: "panel-pages-pageId-rows-rowId-cols"
  }, {
    path: "/",
    component: _39fdfaa4,
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
