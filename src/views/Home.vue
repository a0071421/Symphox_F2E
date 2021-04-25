<template>
  <div class="home">
    <div class="dropdown">
      <button class="btn">訂單管理</button>
      <div class="dropdown-content">
        <router-link class="link" to="/home/checkOrder">訂單查詢</router-link>
        <router-link class="link" to="/home/createOrder">新增訂單</router-link>
      </div>
    </div>
    <router-view></router-view>
    <a href="#">
      <i class="fas fa-user-circle fa-2x"></i>
    </a>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  }
}
</script>
