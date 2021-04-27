<template>
  <div class="login">
    <form @submit.prevent="login">
      <h2 class="text-center">Login</h2>
      <div v-if="!success" class="invalid-feedback text-right">
        帳號或密碼有誤
      </div>
      <div class="input-group">
        <label class="input-label" for="email">Email*</label>
        <input class="input-control" type="email" id="email" placeholder="請輸入信箱" required v-model="account.email">
      </div>
      <div class="input-group">
        <label class="input-label" for="password">Password*(不可含數字外的任何符號)</label>
        <input class="input-control" type="password" id="password" placeholder="請輸入密碼" pattern="^\d+$" required v-model="account.password">
      </div>
      <div class="text-right">
        <button type="submit" class="btn">登入</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: JSON.parse(localStorage.getItem('tempAccount')) ||
      {
        email: '',
        password: ''
      } // 暫存帳戶
    }
  },
  methods: {
    login () {
      this.$store.dispatch('users/login', this.account)
    }
  },
  computed: {
    success () {
      return this.$store.state.users.success
    }
  }
}
</script>
