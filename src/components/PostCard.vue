<template>
    <div class=post-card>

        <router-link class="post-link" :to="{ name: 'OnePostView', params: { id: post._id } }">
            <div class="post-content">
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

        <div class="like-info">
            <div class="like_icon">
                <font-awesome-icon v-show="!likeStatus" icon="fa-solid fa-heart" class="no-like"
                    @click.prevent="addOrRemoveLike">
                </font-awesome-icon>
                <font-awesome-icon v-show="likeStatus" icon="fa-solid fa-heart" class="like"
                    @click.prevent="addOrRemoveLike">
                </font-awesome-icon>
            </div>
            <p class="likes">{{ post.likes }}</p>
        </div>
    </div>

</template>

<script>

import axios from 'axios'
// import { computed } from 'vue'

export default {
    name: 'PostCard',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    emits: ['update-like'],
    data() {
        return {
            userLogged: {},
        }
    },
    created() {
        this.userLogged = JSON.parse(localStorage.userLogged);

        const usersLiked = this.post.usersLiked
        console.log(usersLiked)
        console.log(this.userLogged.userId)
        if (usersLiked) {
            this.likeStatus = usersLiked.find(u => u === this.userLogged.userId);
            console.log(this.likeStatus)
        }

    },
    // computed: {
    //     likeStatus() {
    //         return this.changeLikeStatus();
    //     }
    // },
    methods: {
        addOrRemoveLike() {
            axios.post('http://localhost:3000/api/post/' + this.post._id + '/like', {}, {

                headers: {
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
                .then(() => {
                    const usersLiked = this.post.usersLiked
                    console.log(this.post.usersLiked);
                    console.log(usersLiked)
                    console.log(this.userLogged.userId)
                    if (usersLiked) {
                        this.likeStatus = usersLiked.find(u => u === this.userLogged.userId);
                        console.log(this.likeStatus)
                    }
                })
                .then(() => { this.$emit('update-like') })
                .catch(() => console.log("erreur front"));
        },
        // changeLikeStatus() {
        //     const usersLiked = this.post.usersLiked
        //     console.log(this.post.usersLiked);
        //     console.log(usersLiked)
        //     console.log(this.userLogged.userId)
        //     if (usersLiked) {
        //         this.likeStatus = usersLiked.find(u => u === this.userLogged.userId);
        //         console.log(this.likeStatus)
        //     }
        // }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.post-card {
    height: fit-content;
    width: 95%;
    margin: 20px;
    border: 1px solid $color-primary;
    color: $color-tertiary;

    .post-link {
        text-decoration: none;
        color: $color-tertiary;
    }

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

.like-info {
    display: flex;
    margin-left: 20px;

    p {
        margin-left: 5px;
        margin-right: 10px;
    }



    .no-like {
        height: 20px;
        color: $color-secondary;
    }

    .no-like:hover {
        transform: scale(1.09);
        cursor: pointer;
    }

    .like {
        height: 20px;
        color: $color-primary;
    }

    .like:hover {
        transform: scale(1.09);
        cursor: pointer;
    }



}
</style>