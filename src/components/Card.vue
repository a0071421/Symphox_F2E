<template>
  <div>
    <div class="card" v-if="status === 'in_progress' || status === ''">
      <div class="card-header">
      進行中
      </div>
      <div class="card-body undo">
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
    <div class="text-right">
      <button class="btn" @click="changeStatus">更改狀態</button>
    </div>
    <div class="card" v-if="status === 'completed' || status === ''">
      <div class="card-header">
      已完成
      </div>
      <div class="card-body">
        <div v-for="item in undos" :key="item.id" class="card-content d-flex">
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
      orders: [],
      changeArray: []
    }
  },
  props: ['status'],
  methods: {
    getOrders () {
      const vm = this
      const api = 'http://localhost:3000/orders'
      vm.$http.get(api).then((response) => {
        vm.orders = response.data
      })
    },
    changeStatus () {
      const vm = this
      vm.changeArray.forEach((item) => {
        const api = `http://localhost:3000/orders/${item}`
        const pd = vm.completeds.find((pd) => pd.id === item)
        pd.status.code = '3'
        pd.status.type = '已取消'
        vm.$http.put(api, { ...pd }).then((response) => {
          vm.getOrders()
        })
      })
    }
  },
  computed: {
    completeds () {
      const vm = this
      return vm.orders.filter((item) => Number(item.status.code) === 1 || Number(item.status.code) === 2).sort((d1, d2) => {
        return Date.parse(d2.date) - Date.parse(d1.date)
      })
    },
    undos () {
      const vm = this
      return vm.orders.filter((item) => Number(item.status.code) === 3 || Number(item.status.code) === 4).sort((d1, d2) => {
        return Date.parse(d2.date) - Date.parse(d1.date)
      })
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
