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
                      @click="triggerUpload"
                    >
                      Upload
                      <v-icon
                        right
                        dark
                      >
                        mdi-cloud-upload
                      </v-icon>
                    </v-btn>
                    <input ref="fileInput"
                    type="file"
                    style="display: none;"
                    accept="image/*"
                    @change="onFileChange"
                    >
                    </v-flex>
                  </v-layout>
                  <v-layout row class="mt-3">
                    <v-flex xs12>
                      <img
                      width="300"
                      :src="imageSrc"
                      v-if="imageSrc"
                      >
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
                          :disabled="!valid || !image || loading">
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
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          img: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
