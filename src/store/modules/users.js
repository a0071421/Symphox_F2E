import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    success: true
  },
  mutations: {
    SUCCESS (state, payload) {
      state.success = payload
    }
  },
  actions: {
    login (context, payload) {
      const api = 'http://localhost:3000/accounts'
      axios.get(api).then((response) => {
        const dbAccount = response.data
        if (dbAccount.email === payload.email &&
            dbAccount.password === payload.password) {
          localStorage.setItem('tempAccount', JSON.stringify(payload))
          router.push('/home')
        } else {
          context.commit('SUCCESS', false)
        }
      })
    }
  }
}
