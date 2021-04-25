<template>
  <div>
    <div class="input-group d-flex">
      <label class="input-label" for="title">商品名稱: </label>
      <input type="text" class="input-control" id="title">
      <a href="#" class="addbtn">
        <i class="fas fa-plus-circle fa-2x"></i>
      </a>
    </div>
    <div class="input-group d-flex">
      <label class="input-label" for="url">圖示連結: </label>
      <input type="text" class="input-control" id="url">
    </div>
    <div class="input-group d-flex">
      <label class="input-label" for="email">訂單狀態: </label>
      <select class="input-control" id="status">
          <option value="">請選擇</option>
          <option value="11111">1</option>
          <option value="22222">2</option>
      </select>
    </div>
  </div>
</template>
