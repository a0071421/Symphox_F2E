<template>
  <div class="login">
    <form action="">
      <h2 class="text-center">Login</h2>
      <div class="input-group">
        <label class="input-label" for="email">Email*</label>
        <input class="input-control" type="email" id="email" name="email" placeholder="請輸入信箱" required>
      </div>
      <div class="input-group">
        <label class="input-label" for="password">Password*(不可含數字外的任何符號)</label>
        <input class="input-control" type="password" id="password" name="password" placeholder="請輸入密碼" required pattern="^\d+$">
      </div>
      <div class="text-right">
        <button type="submit" class="btn">登入</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
