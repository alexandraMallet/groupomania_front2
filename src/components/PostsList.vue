<template>
    <div class="posts">
      <p>Ici s'afficheront toutes les publications</p>
      <PostCard></PostCard>
      <PostCard></PostCard>
      <PostCard></PostCard>
      <PostCard></PostCard>
      <PostCard></PostCard>
      <!-- <PostCard v-for="post in posts" :key="post.id" :event="post" /> -->
    </div>
  
  </template>
  
  <script>
      import PostCard from '@/components/PostCard.vue';
      export default {
          name: 'PostList',
          components: {
              PostCard,
          }
      }
  </script>
  
  <style scoped lang="scss">

  @import '@/assets/index.scss';
  .posts {
      width: 95%;
      height: fit-content;
      margin: 10px;
      border: 1px solid $color-primary;
  }
  </style>