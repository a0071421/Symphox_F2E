<template>
  <div>
    <div class="card" v-if="orders.length && (status === 'in_progress' || status === '')">
      <div class="card-header">
      進行中
      </div>
      <div class="card-body in_progress">
        <div v-for="item in completeds" :key="item.id" class="card-content d-flex">
          <div class="bg-cover card-img" :style="{'background-image': `url(${item.logo})`}"></div>
          <div class="content-detail">
            <div class="pd-undo clearfix">
              <span>{{ item.status.type }}</span>
              <span class="float-right">預計出貨: {{ item.date}}</span>
            </div>
            <p class="pd-name word-wrap">{{ item.name }}</p>
          </div>
          <input type="checkbox" class="selectpd" :value="item.id" v-model="changeArray">
        </div>
      </div>
    </div>
    <div v-if="orders.length && (status === 'in_progress' || status === '')" class="text-right">
      <button class="btn" @click="changeStatus">更改狀態</button>
    </div>
    <div class="card" v-if="orders.length && (status === 'completed' || status === '')">
      <div class="card-header">
      已完成
      </div>
      <div class="card-body">
        <div v-for="item in in_progress" :key="item.id" class="card-content d-flex">
          <div class="pd-undo bg-cover card-img" :style="{'background-image': `url(${item.logo})`}"></div>
          <div class="content-detail">
            <div class="pd-completed clearfix">
              <span>{{ item.status.type }}</span>
              <span class="float-right">預計出貨: {{ item.date}}</span>
            </div>
            <p class="pd-name word-wrap">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      changeArray: []
    }
  },
  props: ['status'],
  methods: {
    getOrders () {
      this.$store.dispatch('orders/getOrders')
    },
    changeStatus () {
      const vm = this
      this.$store.dispatch('orders/changeStatus', vm.changeArray)
    }
  },
  computed: {
    completeds () {
      return this.$store.state.orders.completeds
    },
    in_progress () {
      return this.$store.state.orders.in_progress
    },
    orders () {
      return this.$store.state.orders.orders
    }
  },
  created () {
    const vm = this
    vm.getOrders()
    /* const api = 'http://localhost:3000/orders/5'
    vm.$http.delete(api).then((response) => {
    }) */
  }
}
</script>
