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


        <font-awesome-icon v-if="!likeStatus" icon="fa-solid fa-heart" class="no-like" @click.prevent="addOrRemoveLike"></font-awesome-icon>
        <font-awesome-icon v-else icon="fa-solid fa-heart" class="like" @click.prevent="addOrRemoveLike"></font-awesome-icon>



        <p class="likes">{{ post.likes }}</p>


        <!-- <button @click="likePost" type="submit" title="Aimer ce post !" class="button" :class="{ liked: myLikeStatus }">
<font-awesome-icon :icon="`fa-solid fa-thumbs-${myLikeStatus ? 'up' : 'down'}`" /> Like !
</button> -->
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
    data() {
        return {
            userLogged: {},
            likeStatus: false
        }
    },
    created() {
        this.userLogged = JSON.parse(localStorage.userLogged);

        
    },
    methods: {
        addOrRemoveLike() {
            axios.post('http://localhost:3000/api/post/' + this.post._id + '/like', {}, {

                headers: {
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
                .then(() => { this.$emit('update-like') })
                .catch(() => console.log("erreur front"));
        }
    }
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



    .no-like {
        height: 20px;
        color: $color-secondary;
    }

    .no-like:hover {
        transform: scale(1.09);
        cursor: pointer;
    }






}
</style>