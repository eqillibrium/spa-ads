<template>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="dark"
                  dark
                  flat
                >
                  <v-toolbar-title>Login form</v-toolbar-title>

                </v-toolbar>
                <v-card-text>
                  <v-form
                    ref="form"
                    v-model="valid"
                    validation
                  >
                    <v-text-field
                      label="email"
                      name="email"
                      prepend-icon="mdi-account"
                      type="email"
                      v-model="email"
                      :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="password"
                      :counter="10"
                      :rules="passwordRules"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="onSubmit"
                    :disabled="!valid"
                    >Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 10) || 'Password must be equla or more than 10 characters'
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => console.log(err))
      }
    }
  },
  created () {
    if (this.$route.query.loginError) {
      this.$store.dispatch('setError', 'Please log in to access this page')
    }
  }
}
</script>
