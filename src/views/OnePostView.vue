<template>
    <Header />

    <div v-if="$data.post" class="post-card">
        <p>{{ post.text }}</p>
        <img :src="post.imageUrl" />
        <div class="post-infos">
            <p>{{ post.createdAt.split("T")[0] }}</p>
            <p>{{ post.user[0].pseudo }}</p>
            <p v-if="post.modifiedBy"> modifiée par {{ post.modifiedBy }}</p>
            <p v-if="post.modifiedAt">le {{ post.modifiedAt.split("T")[0] }}</p>

        </div>
    </div>
    <div v-if="$data.post" class="like-dislike">
        <button @click.prevent="addOrRemoveLike"><img src="@/assets/like-button-black-icon.png" /></button>
        <p class="likes">{{ post.likes }}</p>
       

        <!-- <button @click="likePost" type="submit" title="Aimer ce post !" class="button" :class="{ liked: myLikeStatus }">
            <font-awesome-icon :icon="`fa-solid fa-thumbs-${myLikeStatus ? 'up' : 'down'}`" /> Like !
        </button> -->
    </div>

    <div v-if="rightToChange" class="modify">
        <Button type="submit" :buttonText="buttonTextModifier" @click="linkToModify" />
        <Button type="submit" :buttonText="buttonTextSupprimer" @click="deletePost" />
    </div>

</template>

<script>

import axios from 'axios'
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

export default {
    name: 'OnePostView',
    components: {
        Button,
        Header
    },
    data() {
        return {
            post: null,
            buttonTextModifier: 'modifier',
            buttonTextSupprimer: 'supprimer',
            userConnected: null,
            rightToChange: false,
            postId: null,
        }
    },
    created() {
        this.userConnected = JSON.parse(localStorage.user);
        this.postId = this.$route.params.id;

        axios.get('http://localhost:3000/api/post/' + this.postId, {
            headers: {
                'Authorization': `Bearer ${this.userConnected.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.post = response.data;
            })
            .then(() => {
                if ((this.post.userId === this.userConnected.userId) || this.userConnected.isAdmin) {
                    this.rightToChange = true;
                }
            })
            .catch(error => console.log(error));

    },
    // computed: {
    //     myLikeStatus() {
    //         if (!this.user) return false
    //         if (!Array.isArray(this.posts.usersLiked)) return false
    //         return !!this.posts.usersLiked.find(item => item === this.user._id)
    //     }
    // },
    methods: {
        linkToModify() {
            this.$router.push('/modifier-publication/' + this.postId);
        },
        deletePost() {
            axios.delete('http://localhost:3000/api/post/' + this.postId, {
                headers: {
                    'Authorization': `Bearer ${this.userConnected.token}`
                }
            })
                .then(() => {
                    this.$router.push('/publications/');
                })
                .catch(error => console.log(error));

        },
        addOrRemoveLike() {
            axios.post('http://localhost:3000/api/post/' + this.postId + '/like', {}, {
                
                headers: {
                    'Authorization': `Bearer ${this.userConnected.token}`
                }
            })
                // .then(() => rappeler les données)
                .catch(() => console.log("erreur front"));
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

    .post-infos {
        display: flex;
        justify-content: space-between;
        margin: 10px;
    }
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