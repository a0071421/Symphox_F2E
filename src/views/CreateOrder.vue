<template>
  <div class="flex-grow-50">
    <form @submit.prevent="addAllPd">
      <div v-for="(field, i) in pdfields" :key="i" class="border p-1 m-b-1">
        <div class="input-group d-flex">
          <label class="input-label" for="title">商品名稱: </label>
          <input type="text" class="input-control" id="title" required v-model="field.name">
          <a v-if="i === 0" href="#" class="addbtn" @click.prevent="$store.commit('orders/NEWPD', uuid())">
            <i class="fas fa-plus-circle fa-2x"></i>
          </a>
          <a v-if="i !== 0" href="#" class="minusbtn" @click.prevent="pdfields.splice(i, 1)">
            <i class="fas fa-minus-circle fa-2x"></i>
          </a>
        </div>
        <div class="input-group d-flex">
          <label class="input-label" for="url">圖示連結: </label>
          <input type="text" class="input-control" id="url" required v-model="field.logo">
        </div>
        <div class="input-group d-flex">
          <label class="input-label" for="email">訂單狀態: </label>
          <select class="input-control" id="status" required v-model.number="field.status.code" @change="setType(i, field.status.code)">
            <option value="">請選擇</option>
            <option value="1">處理中</option>
            <option value="2">已成立</option>
          </select>
        </div>
      </div>
      <div class=text-right>
        <button type="sumbit" class="btn">新增</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ordersLength: 0
    }
  },
  methods: {
    uuid () { // 產生uuid
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    addAllPd () {
      const vm = this
      const date = vm.getDate()
      const uuid = vm.uuid()
      this.$store.dispatch('orders/addAllPd', { date, uuid })
    },
    setType (i, code) {
      this.$store.commit('orders/SETTYPE', { i, code })
    },
    getDate () {
      const d = new Date()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear() - 1911
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return String([year, month, day].join('/'))
    }
  },
  computed: {
    orders () {
      return this.$store.state.orders.orders
    },
    pdfields () {
      return this.$store.state.orders.pdfields
    }
  },
  created () {
    const vm = this
    vm.$store.dispatch('orders/getOrders')
    vm.$store.commit('orders/NEWPD')
  }
}
</script>
