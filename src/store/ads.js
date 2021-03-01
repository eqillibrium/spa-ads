export default {
  state: {
    ads: [
      { title: 'First add', description: 'Some ad', promo: true, img: 'https://geeksus.ru/wp-content/uploads/2018/10/Quadro-P6000-11.jpg', id: '1' },
      { title: 'Second add', description: 'Another ad', promo: true, img: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701415764.jpg', id: '2' },
      { title: 'First add', description: 'And a new one', promo: false, img: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701590589.jpg', id: '3' }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    createAd ({ commit }, payload) {
      payload.id = Math.random()
      commit('createAd', payload)
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
