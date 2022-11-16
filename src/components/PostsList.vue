<template>
    <div class="posts">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

</template>
  
<script>

import axios from 'axios';
import PostCard from '@/components/PostCard.vue';

export default {
    name: 'PostList',
    components: {
        PostCard,
    },
    data() {
        return {
            posts: null,
            token: null
        }
    },
    methods: {
        getToken() {
            const user = localStorage.getItem(user.token, JSON.parse(user));
            this.token = user.token;
        }
    },
    created() {
        axios
            .get("http://localhost:3000/api/post", {
                headers: {
                    auth: this.token
    }

})
            .then(response => {
    console.log(response.data);
    this.posts = response.data.posts;
})
    .catch(error => {
        console.log(error);
    });
    }
}
</script>
  
<style scoped lang="scss">
@import '@/assets/index.scss';

.posts {
    width: 95%;
    height: fit-content;
    margin: 10px;
    border: 1px solid $color-tertiary;
}
</style>