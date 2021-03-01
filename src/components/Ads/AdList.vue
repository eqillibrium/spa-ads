<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 xl4>
                <h1 class="text--secondary mb-3">My ads</h1>
                <v-card class="elevation-10 mb-5" v-for="ad in myAds" :key="ad.id">
                  <v-layout>
                    <v-flex xs4>
                      <v-img :src="ad.img" height="200px"></v-img>
                    </v-flex>
                    <v-flex xs8>
                      <v-card-text>
                        <h2 class="text--primary">{{ ad.title }}</h2>
                        <p>{{ ad.description }}</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="info" :to="'/ad/' + ad.id">
                          open
                        </v-btn>
                      </v-card-actions>
                    </v-flex>
                  </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  // data () {
  //   return {
  //     ads: [
  //       {
  //         title: 'First add',
  //         description: 'Some ad',
  //         promo: true,
  //         img: 'https://geeksus.ru/wp-content/uploads/2018/10/Quadro-P6000-11.jpg',
  //         id: '1'
  //       }
  //     ]
  //   }
  // }
  computed: {
    myAds () {
      return this.$store.getters.myAds
    }
  }
}
</script>
