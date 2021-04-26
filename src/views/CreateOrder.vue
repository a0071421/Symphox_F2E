<template>
  <div class="flex-grow-50">
    <form @submit.prevent="addAllPd">
      <div v-for="(field, i) in pdfields" :key="i" class="border p-1 m-b-1">
        <div class="input-group d-flex">
          <label class="input-label" for="title">商品名稱: </label>
          <input type="text" class="input-control" id="title" required v-model="field.name">
          <a v-if="i === 0" href="#" class="addbtn" @click.prevent="createNewPd()">
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
      pdfields: [],
      orders: [],
      ordersLength: 0
    }
  },
  methods: {
    getOrders () {
      const vm = this
      const api = 'http://localhost:3000/orders'
      vm.$http.get(api).then((response) => {
        vm.orders = response.data
        vm.ordersLength = vm.orders.length
        vm.createNewPd()
      })
    },
    createNewPd () {
      const vm = this
      vm.ordersLength++
      vm.pdfields.push({
        id: vm.ordersLength,
        name: '',
        logo: '',
        status: {
          code: '',
          type: ''
        },
        date: ''
      })
    },
    addAllPd () {
      const vm = this
      vm.pdfields[0].date = vm.getDate()
      const api = 'http://localhost:3000/orders'
      vm.pdfields.forEach((item) => {
        vm.$http.post(api, { ...item }).then((response) => {
          console.log(response)
        })
      })
      vm.pdfields = []
      vm.createNewPd()
    },
    setType (i, code) {
      const vm = this
      if (Number(code) === 1) {
        vm.pdfields[i].status.type = '處理中'
      } else if (Number(code) === 2) {
        vm.pdfields[i].status.type = '已成立'
      } else {
        vm.pdfields[i].status.type = ''
      }
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
  created () {
    const vm = this
    vm.getOrders()
    console.log(vm.getDate())
  }
}
</script>
