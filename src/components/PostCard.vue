<template>

    <router-link class="post-link" :to="{ name: 'OnePostView', params: { id: post._id } }">
        <div class="post-card">

            <p>{{ post.text }}</p>
            <img :src="post.imageUrl" />
            <div class="post-infos">
                <p>{{ post.createdAt.split("T")[0] }}</p>
                <p>{{ post.user[0].pseudo }}</p>
                <p v-if="post.modifiedBy"> modifiée par {{ post.modifiedBy }}</p>
                <p v-if="post.modifiedAt">le {{ post.modifiedAt.split("T")[0] }}</p>
            </div>
        </div>
    </router-link>

    <div class="like-dislike">
        <button @click="addOrRemoveLike"><img src="@/assets/like-button-black-icon.png" /></button>
        <p class="likes">{{ post.likes }}</p>
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

    // methods: {
    //     addOrRemoveLike() {
    //         const userConnected = JSON.parse(localStorage.user);

    //         axios.post('http://localhost:3000/api/post/' +:id + '/like', {
    //             'like': 1,
    //             headers: {
    //                 'Authorization': `Bearer ${userConnected.token}`
    //             }
    //         })
    //             .then(() => console.log("publication likée"))
    //             // .catch((error) => console.log(error));
    //     }
    // }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.post-card {
    height: 250px;
    width: 95%;
    margin: 20px;
    border: 1px solid $color-primary;
    color: $color-tertiary;
    text-decoration: none;

    img {
        height: 100px;
        width: 100px;
    }

    .post-infos {
        display: flex;
        justify-content: space-between;
        margin: 10px;
    }

}

.post-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 $color-secondary;
}

.like-dislike {
    display: flex;
    margin-left: 20px;

    p {
        margin-left: 5px;
        margin-right: 10px;
    }

    button {
        position: relative;
        height: 25px;
        width: 25px;
        border-radius: 50px;
        margin-left: 10px;
        z-index: 2;
    

        img {
            position: absolute;
            left: -2px;
            top: -2px;
            height: 25px;
            width: 25px;
            border-radius: 50px;
            z-index: 1;
        }

        img:hover {
            transform: scale(1.01);
            box-shadow: 0 0 0 5px $color-secondary;
            cursor: pointer;
        }

    }

    


}
</style>