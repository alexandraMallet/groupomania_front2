<template>
    <Header />


    <div v-if="$data.post" class="post-card">


        <p>{{ post.text }}</p>
        <img :src="post.imageUrl" />
        <div v-if="$data.post" class="post-infos">
            <p>{{ post.createdAt.split("T")[0] }}</p>
            <p>{{ post.user[0].pseudo }}</p>
            <p v-if="post.modifiedBy"> modifiée par {{ post.modifiedBy }}</p>
            <p v-if="post.modifiedAt">le {{ post.modifiedAt.split("T")[0] }}</p>

        </div>

        <div class="like-info">
            <div class="like_icon">
                <font-awesome-icon v-if="!likeStatus" icon="fa-solid fa-heart" class="no-like"
                    @click.prevent="addOrRemoveLike">
                </font-awesome-icon>
                <font-awesome-icon v-else icon="fa-solid fa-heart" class="like" @click.prevent="addOrRemoveLike">
                </font-awesome-icon>
            </div>
            <p class="likes">{{ post.likes }}</p>
        </div>
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
            post: {},
            buttonTextModifier: 'modifier',
            buttonTextSupprimer: 'supprimer',
            userLogged: {},
            rightToChange: false,
            postId: '',
            likeStatus: false
        }
    },
    created() {

        this.userLogged = JSON.parse(localStorage.userLogged);
        this.postId = this.$route.params.id;

        axios.get('http://localhost:3000/api/post/' + this.postId, {
            headers: {
                'Authorization': `Bearer ${this.userLogged.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.post = response.data;
            })
            .then(() => {
                if ((this.post.userId === this.userLogged.userId) || this.userLogged.isAdmin) {
                    this.rightToChange = true;
                }
            })
            .catch(error => console.log(error));
    },
    mounted() {
        this.changeLikeStatus()
    },
    methods: {
        linkToModify() {
            this.$router.push('/modifier-publication/' + this.postId);
        },
        deletePost() {
            axios.delete('http://localhost:3000/api/post/' + this.postId, {
                headers: {
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => console.log(error));

        },
        getPost() {
            axios.get('http://localhost:3000/api/post/' + this.postId, {
                headers: {
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.post = response.data;
                })
                .then(() => {
                    if ((this.post.userId === this.userLogged.userId) || this.userLogged.isAdmin) {
                        this.rightToChange = true;
                    }
                })
                .then(() => this.changeLikeStatus())
                .catch(error => console.log(error));
        },
        addOrRemoveLike() {
            axios.post('http://localhost:3000/api/post/' + this.post._id + '/like', {}, {

                headers: {
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
                .then(() => { this.getPost() })
                .catch(() => console.log("erreur front"));
        },
        changeLikeStatus() {
            const usersLiked = this.post.usersLiked
            console.log(this.post.usersLiked);
            if (usersLiked) {
                this.likeStatus = usersLiked.find(u => u === this.userLogged.userId);
            }
        }
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