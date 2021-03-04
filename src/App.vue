<template>
  <!-- App.vue -->
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item-group>
           <v-list-item v-for="link of links" :key="link.title" :to="link.url">
             <v-list-item-icon>
               <v-icon>{{ link.icon }}</v-icon>
             </v-list-item-icon>
             <v-list-item-content>
               <v-list-item-title v-text="link.title"></v-list-item-title>
             </v-list-item-content>
           </v-list-item>
           <v-list-item v-if="isUserLoggedIn" @click="onLogout">
              <v-list-item-icon>
               <v-icon>mdi-logout</v-icon>
             </v-list-item-icon>
             <v-list-item-content>
               <v-list-item-title>logout</v-list-item-title>
             </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="dark">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title><router-link to="/" tag="span" class="pointer">SPA</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn depressed color="green" v-for="link of links" :key="link.title" :to="link.url">
            <v-icon left>
              {{ link.icon }}
            </v-icon>
            {{ link.title }}
            </v-btn>
            <v-btn depressed color="green" @click="onLogout" v-if="isUserLoggedIn">
            <v-icon left>
              mdi-logout
            </v-icon>
              logout
            </v-btn>
        </v-toolbar-items>
      <!-- -->
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <template v-if="error">
        <v-snackbar
          :timeout="5000"
          color="dark"
          @input="closeError"
          :value="true"
        >
          {{ error }}
          <v-spacer></v-spacer>
          <template>
            <v-btn
              color="red"
              text
              @click.native="closeError"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </template>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    // eslint-disable-next-line vue/return-in-computed-property
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders' },
          { title: 'New ad', icon: 'mdi-note-plus', url: '/new' },
          { title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list' }
        ]
      }
      return [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        { title: 'Registration', icon: 'mdi-face', url: '/registration' }
      ]
    }
  }
}
</script>

<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>
