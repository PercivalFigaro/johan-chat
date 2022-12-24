<script>
export default {
  props: {
    author: String,
    content: String,
  },
};
</script>

<template>
  <div class="m-1">
    <div>By {{ author }}</div>
    <div>{{ content }}</div>
  </div>
</template>
