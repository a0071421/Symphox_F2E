<template>
  <div class="d-flex">
    <div class="input-group">
      <label class="input-label" for="status">訂單狀態: </label>
      <select class="input-control" id="status" v-model="select_status">
        <option value="">請選擇</option>
        <option value="in_progress">進行中</option>
        <option value="completed">已完成</option>
      </select>
    </div>
    <Card :status="select_status"></Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  data () {
    return {
      select_status: ''
    }
  },
  components: {
    Card
  }
}
</script>
