<template>

    <div class="header-app">
        <nav>
            <router-link to="/publications">Toutes les publications</router-link> |
            <router-link to="/publier">Publier</router-link> |
            <router-link to="/">Se déconnecter</router-link>
        </nav>
        <img alt="Vue logo" src="../assets/logo.png">
    </div>

    <div v-if="$data.post" class="post-card">
        <p>{{ post.text }}</p>
        <img :src="post.imageUrl" />
        <div class="post-infos">
            <p>{{ post.createdAt.split("T")[0] }}</p>
            <p>{{ post.userPseudo }}</p>
        </div>
    </div>
    <!-- <div class="like-dislike">
            <button @submit="addOrRemoveLike"><img src="@/assets/like-button-black-icon.png" /></button>
            <p class="likes">{{ post.likes }}</p>
            <button @submit="addOrRemoveDislike"><img src="@/assets/dislike-button-black-icon.png" /></button>
            <p class="likes">{{ post.dislikes }}</p>
        </div> -->

    <div  class="modify">
        <Button type="submit" :buttonText="buttonTextModifier" />
        <Button type="submit" :buttonText="buttonTextSupprimer" />
    </div>

    <!-- v-if="post.userId === req.auth.userId" -->

</template>

<script>

import axios from 'axios'
import Button from '@/components/Button.vue';

export default {
    name: 'OnePostView',
    components: {
        Button,
    },
    data() {
        return {
            post: null,
            buttonTextModifier: 'modifier',
            buttonTextSupprimer: 'supprimer',
            user:null
        }
    },
    created() {
        this.user = JSON.parse(localStorage.user);
        const postId = this.$route.params.id;

        axios.get('http://localhost:3000/api/post/' + postId, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.post = response.data;
            })
            .catch(error => console.log(error));

    },
    methods: {

        // addOrRemoveLike() {
        //     const user = JSON.parse(localStorage.user);

        //     axios.post('http://localhost:3000/api/post/:id/like', {
        //         'like': 1,
        //         headers: {
        //             'Authorization': `Bearer ${user.token}`
        //         }
        //     })
        //         .then(() => console.log("publication likée"))
        //         .catch((error) => console.log(error));
        // }
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

    .post-infos {
        display: flex;
        justify-content: space-between;
        margin: 10px;
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