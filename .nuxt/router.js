import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _08e743ac = () => import('../pages/Writer/index.vue' /* webpackChunkName: "pages/Writer/index" */).then(m => m.default || m)
const _4a64d0f9 = () => import('../pages/Pwa/index.vue' /* webpackChunkName: "pages/Pwa/index" */).then(m => m.default || m)
const _942cb530 = () => import('../pages/Login/index.vue' /* webpackChunkName: "pages/Login/index" */).then(m => m.default || m)
const _69a9509c = () => import('../pages/Manage/index.vue' /* webpackChunkName: "pages/Manage/index" */).then(m => m.default || m)
const _06ef24a8 = () => import('../pages/Blog/Detail/_id/index.vue' /* webpackChunkName: "pages/Blog/Detail/_id/index" */).then(m => m.default || m)
const _c903137e = () => import('../pages/Blog/_id.vue' /* webpackChunkName: "pages/Blog/_id" */).then(m => m.default || m)
const _02796f26 = () => import('../pages/User/_id/index.vue' /* webpackChunkName: "pages/User/_id/index" */).then(m => m.default || m)
const _ed2ca8a4 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/Writer",
			component: _08e743ac,
			name: "Writer"
		},
		{
			path: "/Pwa",
			component: _4a64d0f9,
			name: "Pwa"
		},
		{
			path: "/Login",
			component: _942cb530,
			name: "Login"
		},
		{
			path: "/Manage",
			component: _69a9509c,
			name: "Manage"
		},
		{
			path: "/Blog/Detail/:id?",
			component: _06ef24a8,
			name: "Blog-Detail-id"
		},
		{
			path: "/Blog/:id?",
			component: _c903137e,
			name: "Blog-id"
		},
		{
			path: "/User/:id?",
			component: _02796f26,
			name: "User-id"
		},
		{
			path: "/",
			component: _ed2ca8a4,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
