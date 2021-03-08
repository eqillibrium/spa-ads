<template>
<div v-if="!loading">
  <v-container fluid>
      <v-layout row>
          <v-flex xs12>
              <v-carousel>
                <v-carousel-item v-for="ad of promoAds" :key="ad.id" :src="ad.img">
                  <div class="carus-link">
                    <v-btn class="error" :to="'/ad/' + ad.id"> {{ ad.title }}</v-btn>
                  </div>
                </v-carousel-item>
              </v-carousel>
          </v-flex>
      </v-layout>
  </v-container>
  <v-container grid-list-lg>
    <v-layout class="d-flex flex-wrap">
      <v-flex
        xs-12
        sm-6
        md-4

        v-for="ad of ads"
        :key="ad.id">
        <v-card
          class="mx-auto"
          max-width="300"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="ad.img"
          >
            <v-card-title>{{ ad.title }}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ ad.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
            >
              Share
            </v-btn>

            <v-btn
              dark
              color="dark"
              :to="'/ad/' + ad.id"
            >
              Buy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
<div v-else>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-center pt-10">
        <v-progress-circular
          dark
          :width="3"
          color="green"
          indeterminate
          size="100"
      ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  // data () {
  //   return {
  //     ads: [
  //       { title: 'First add', description: 'Some ad', promo: true, img: 'https://geeksus.ru/wp-content/uploads/2018/10/Quadro-P6000-11.jpg', id: '1' },
  //       { title: 'Second add', description: 'Another ad', promo: true, img: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701415764.jpg', id: '2' },
  //       { title: 'First add', description: 'And a new one', promo: false, img: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701590589.jpg', id: '3' }
  //     ]
  //   }
  // }
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .carus-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>
