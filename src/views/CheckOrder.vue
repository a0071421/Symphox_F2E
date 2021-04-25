<template>
  <div class="d-flex">
    <div class="input-group">
      <label class="input-label" for="status">訂單狀態: </label>
      <select class="input-control" id="status">
        <option value="">請選擇</option>
        <option value="11111">1</option>
        <option value="22222">2</option>
      </select>
    </div>
    <Card></Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
  }
}
</script>
