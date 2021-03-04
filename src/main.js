/* eslint-disable quotes */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import fb from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  created: function () {
    fb.initializeApp({
      apiKey: "AIzaSyDB9bvSE0a5Blgkn3Oz1Kb8rPAQx8qUSfA",
      authDomain: "itc-ads-6c5cf.firebaseapp.com",
      projectId: "itc-ads-6c5cf",
      storageBucket: "itc-ads-6c5cf.appspot.com",
      messagingSenderId: "129335222682",
      appId: "1:129335222682:web:fa8f980a617e822a1c9a23",
      measurementId: "G-4MKPN120PQ"
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
