<template>
    <div class="posts">
        <PostCard v-for="post in antechrono" :key="post.id" :post="post" class="post-card-vue"
            @update-like="updateLike" />
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

        const maDate = new Date()
        console.log(maDate);
        console.log(maDate.toLocaleDateString("fr"))
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
    width: 100%;
    height: fit-content;
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
}

.post-card-vue {
    margin: 20px;
    max-width: 400px;
}

.post-card-vue:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 $color-secondary;
    cursor: pointer;
}
</style>