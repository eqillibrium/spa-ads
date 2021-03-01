<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm-6 xl-3 offset-sm3>
        <h1 class="text--secondary my-3"> Orders </h1>
        <v-list
          subheader
          two-line
          flat
        >
          <v-list-item-group
            v-for="order of orders"
            :key="order.id"
          >
            <v-list-item>
                <v-list-item-action>
                  <v-checkbox
                    @change="markDone(order)"
                    :input-value="order.done"
                    color="green"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ order.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.prhone }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn color="dark" :to="'/ad/' + order.adId">Open</v-btn>
                </v-list-item-action>
                <v-spacer></v-spacer>

            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: '123',
          name: 'John',
          prhone: '+7 999 999 99 99',
          adId: '1',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = !order.done
      console.log(order.done)
    }
  }
}
</script>
