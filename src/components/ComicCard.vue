<script>
export default {
  props: {
    comic: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tieu de:</strong>
      {{ comic.title }}
    </div>
    <div class="p-1">
      <strong>Tac gia:</strong>
      {{ comic.author }}
    </div>
    <div class="p-1">
      <strong>Mo ta:</strong>
      {{ comic.description }}
    </div>
    <div class="p-1">
      <strong>Chuong:</strong>
      {{ comic.chapters }}
    </div>
    <div class="p-1">
      <strong>Truyen yêu thích:&nbsp;</strong>
      <i v-if="comic.favorite" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div>
  </div>
</template>
