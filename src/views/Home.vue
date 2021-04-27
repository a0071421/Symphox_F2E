<template>
  <div>
    <div class="account text-right">
     <a href="#" @click.prevent="logout">
      <i class="fas fa-user-circle fa-2x"></i>
     </a>
    </div>
    <div class="home">
      <div class="dropdown">
        <button class="btn">訂單管理</button>
        <div class="dropdown-content">
          <router-link class="link" to="/home/checkOrder">訂單查詢</router-link>
          <router-link class="link" to="/home/createOrder">新增訂單</router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  methods: {
    logout () {
      const vm = this
      localStorage.removeItem('tempAccount')
      vm.$store.commit('users/SUCCESS', true)
      vm.$router.push('/')
    }
  },
  components: {
  }
}
</script>
