<script>
export default {
  props: {
    author: String,
    content: String,
    currentUser: String,
  },
};
</script>

<template>
  <div class="container mb-2 w-50">
    <div
      :class="
        author === currentUser
          ? 'card text-bg-primary bg-opacity-75'
          : 'card text-bg-gray-100 bg-opacity-75'
      "
    >
      <div class="card-body">
        <h4 class="card-title">{{ author }}</h4>
        <div>{{ content }}</div>
      </div>
    </div>
  </div>
</template>
