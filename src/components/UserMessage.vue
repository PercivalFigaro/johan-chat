<script>
export default {
  props: {
    author: String,
    content: String,
  },
};
</script>

<template>
  <div class="container m-auto mb-1 w-25">
    <div class="card text-bg-primary bg-opacity-75">
      <div class="card-body">
        <h4 class="card-title">{{ author }}</h4>
        <div>{{ content }}</div>
      </div>
    </div>
  </div>
</template>
