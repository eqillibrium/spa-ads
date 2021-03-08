// import { keys } from 'core-js/fn/array'
import fb from 'firebase/app'
import 'firebase/database'
class Ad {
  constructor (
    title,
    description,
    promo = false,
    img,
    ownerId,
    id = null
  ) {
    this.title = title
    this.description = description
    this.promo = promo
    this.img = img
    this.ownerId = ownerId
    this.id = id
  }
}

export default {
  state: {
    ads: [
      // { title: 'First add', description: 'Some ad', promo: true, img: 'https://geeksus.ru/wp-content/uploads/2018/10/Quadro-P6000-11.jpg', id: '1' },
      // { title: 'Second add', description: 'Another ad', promo: true, img: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701415764.jpg', id: '2' },
      // { title: 'First add', description: 'And a new one', promo: false, img: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701590589.jpg', id: '3' }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          payload.promo,
          payload.img,
          getters.user.id
        )
        const ad = await fb.database().ref('ads').push(newAd)
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        const resultAds = []
        Object.keys(ads).forEach(key => {
          const newAd = ads[key]
          resultAds.push(
            new Ad(
              newAd.title,
              newAd.description,
              newAd.promo,
              newAd.img,
              newAd.ownerId,
              key
            )
          )
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
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
