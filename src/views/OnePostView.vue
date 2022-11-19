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
            <p v-if="post.modifiedBy"> modifiée par {{ post.modifiedBy }}</p>
            <p v-if="post.modifiedAt">le {{ post.modifiedAt.split("T")[0] }}</p>

        </div>
    </div>
    <!-- <div class="like-dislike">
            <button @submit="addOrRemoveLike"><img src="@/assets/like-button-black-icon.png" /></button>
            <p class="likes">{{ post.likes }}</p>
            <button @submit="addOrRemoveDislike"><img src="@/assets/dislike-button-black-icon.png" /></button>
            <p class="likes">{{ post.dislikes }}</p>
        </div> -->

    <div v-if="rightToChange" class="modify">
        <Button type="submit" :buttonText="buttonTextModifier" @click="linkToModify"/>
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
            user:null,
            rightToChange:false,
            postId: null,
        }
    },
    created() {
        this.user = JSON.parse(localStorage.user);
        this.postId = this.$route.params.id;

        axios.get('http://localhost:3000/api/post/' + this.postId, {
            headers: {
                'Authorization': `Bearer ${this.user.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.post = response.data;
            })
            .then(() => {
                if((this.post.userId === this.user.userId) || this.user.isAdmin) {
                    this.rightToChange = true;
                }
            })
            .catch(error => console.log(error));

    },
    methods: {
        linkToModify() {
            this.$router.push('/modifier/' + this.postId);
        }

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