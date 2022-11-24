<template>
    <div class="posts">
        <PostCard v-for="post in antechrono" :key="post.id" :post="post" @update-like="updateLike" />
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
            posts: [],
            userLogged: {}
        }
    },
    computed: {
        antechrono() {
            return [...this.posts].reverse();
        }
    },
    created() {
        this.userLogged = JSON.parse(localStorage.userLogged);

        axios
            .get("http://localhost:3000/api/post", {
                headers: {
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
            .then(response => {
                console.log(response.data);
                this.posts = response.data.posts;
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        updateLike() {

            axios
                .get("http://localhost:3000/api/post", {
                    headers: {
                        'Authorization': `Bearer ${this.userLogged.token}`
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.posts = response.data.posts;
                })
                .catch(error => { console.log(error) });
        }

    }
}
</script>
  
<style scoped lang="scss">
@import '@/assets/index.scss';

.posts {
    width: 95%;
    height: fit-content;
    margin: 5px;
    border: 1px solid $color-tertiary;
}
</style>