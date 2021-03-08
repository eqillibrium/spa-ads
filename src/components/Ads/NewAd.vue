<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm-6 offset-sm3>
                <h1 class="text--secondary my-3">NewAd</h1>
                <v-form
                    ref="form"
                    v-model="valid"
                    validation
                  >
                    <v-text-field
                      label="Ad title"
                      name="title"
                      type="text"
                      v-model="title"
                      required
                      :rules="[ v => !!v || 'Title is required']"
                    ></v-text-field>
                    <v-textarea
                      label="Ad description"
                      name="description"
                      type="text-area"
                      v-model="description"
                      multiline
                      :rules="[ v => !!v || 'description is required']"
                    ></v-textarea>
                  </v-form>
                  <v-layout row class="mb-3 mt-6">
                    <v-flex xs12>
                    <v-btn
                      class="dark--text"
                    >
                      Upload
                      <v-icon
                        right
                        dark
                      >
                        mdi-cloud-upload
                      </v-icon>
                    </v-btn>
                    </v-flex>
                  </v-layout>
                  <v-layout row class="mt-3">
                    <v-flex xs12>
                      <img src="https://geeksus.ru/wp-content/uploads/2018/10/Quadro-P6000-11.jpg" height="100px">
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex xs12>
                      <v-switch
                      label="Add to promo?"
                      v-model="promo"
                      ></v-switch>
                    </v-flex>
                  </v-layout>
                    <v-layout>
                    <v-flex xs12>
                      <v-spacer>
                        <v-btn
                          @click="createAd"
                          color="green"
                          :loading="loading"
                          :disabled="!valid || loading">
                          Create ad
                        </v-btn>
                      </v-spacer>
                    </v-flex>
                  </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          img: 'https://ru.gecid.com/data/news/201711080838-50148/img/02_nvidia_titan_xp_collectors_edition.jpg'
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    }
  }
}
</script>
