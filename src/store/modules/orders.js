import axios from 'axios'
export default {
  namespaced: true,
  state: {
    orders: [], // 所有訂單
    completeds: [], // 已送達、已取消訂單
    in_progress: [], // 進行中、已成立訂單
    pdfields: [] // 新增產品欄位
  },
  mutations: {
    ORDERS (state, payload) {
      state.orders = payload
    },
    COMPLETEDS (state) {
      state.completeds = state.orders.filter((item) => Number(item.status.code) === 1 || Number(item.status.code) === 2).sort((d1, d2) => {
        return Date.parse(d2.date) - Date.parse(d1.date)
      })
    },
    IN_PROGRESS (state) {
      state.in_progress = state.orders.filter((item) => Number(item.status.code) === 3 || Number(item.status.code) === 4).sort((d1, d2) => {
        return Date.parse(d2.date) - Date.parse(d1.date)
      })
    },
    NEWPD (state) {
      state.pdfields.push({
        id: '',
        name: '',
        logo: '',
        status: {
          code: '',
          type: ''
        },
        date: ''
      })
    },
    SETTYPE (state, { i, code }) {
      if (Number(code) === 1) {
        state.pdfields[i].status.type = '處理中'
      } else if (Number(code) === 2) {
        state.pdfields[i].status.type = '已成立'
      } else {
        state.pdfields[i].status.type = ''
      }
    }
  },
  actions: {
    getOrders (context) {
      const api = 'http://localhost:3000/orders'
      axios.get(api).then((response) => {
        context.commit('ORDERS', response.data)
        context.commit('COMPLETEDS')
        context.commit('IN_PROGRESS')
      })
    },
    changeStatus (context, payload) {
      payload.forEach((item) => {
        const api = `http://localhost:3000/orders/${item}`
        const pd = context.state.completeds.find((pd) => pd.id === item)
        pd.status.code = '3'
        pd.status.type = '已取消'
        axios.put(api, { ...pd }).then((response) => {
          context.dispatch('getOrders')
        })
      })
    },
    addAllPd (context, { date, uuid }) {
      const api = 'http://localhost:3000/orders'
      context.state.pdfields.forEach((item) => {
        item.date = date
        item.id = uuid
        axios.post(api, { ...item }).then((response) => {
          console.log(response)
        })
      })
      context.state.pdfields = []
      context.commit('NEWPD')
    }
  }
}
