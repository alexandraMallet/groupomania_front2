<template>
    <div class="post-card">
        <p>{{ post.text }}</p>
        <img :src="post.imageUrl" />
        <p>{{ post.createdAt.split("T")[0] }} by {{ post.userPseudo }}</p>
    </div>
    <div class="like-dislike">
        <button @submit="addOrRemoveLike"><img src="@/assets/like-button-black-icon.png" /></button>
        <p class="likes">{{ post.likes }}</p>
        <button @submit="addOrRemoveDislike"><img src="@/assets/dislike-button-black-icon.png" /></button>
        <p class="likes">{{ post.dislikes }}</p>
    </div>

</template>

<script>

import axios from 'axios'

export default {
    name: 'PostCard',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
        addOrRemoveLike() {
            const user = JSON.parse(localStorage.user);

            axios.post('http://localhost:3000/api/post/:id/like', {
                'like': 1,
                headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
            })
            .then(() => console.log("publication likée"))
            .catch((error) => console.log(error));
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.post-card {
    height: 200px;
    width: 95%;
    margin: 20px;
    border: 1px solid $color-primary;

    img {
        height: 100px;
        width: 100px;
    }
}

.like-dislike {
    display: flex;

    button {
        position: relative;
        height: 25px;
        width: 25px;
        border-radius: 50px;
        box-shadow: none;

        img {
            position: absolute;
            left: 0px;
            top: 0px;
            height: 25px;
            width: 25px;
        }
    }


}
</style>