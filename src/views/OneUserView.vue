<template>

    <HeaderNav />

    <div v-if="$data.user" class="user-card">
        <div v-if="authorized" class="one-profile">
            <p>{{ user.pseudo }}</p>
            <img :src="user.avatarUrl" />
            <p>{{ user.email }}</p>
            <div v-if="posts.length" class="user-posts">
                <PostCard v-for="post in posts" :key="post.id" :post="post" />
            </div>
            <div v-else>
                <p>Aucune publication disponible</p>
            </div>
        </div>
        <Button v-else :buttonText="buttonTextUnauthorized" @click="redirection" />

    </div>

    <Button v-if="rightToModify" :buttonText="buttonTextModifier" @click="linkToModify" />
    <Button v-if="rightToDelete" :buttonText="buttonTextSupprimer" @click="deleteUser" />

</template>

<script>

import axios from 'axios'
import Button from '@/components/Button.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import PostCard from '@/components/PostCard.vue';

export default {
    name: 'OneUserView',
    components: {
        Button,
        PostCard,
        HeaderNav,
    },
    data() {
        return {
            buttonTextModifier: 'modifier',
            buttonTextSupprimer: 'supprimer',
            buttonTextUnauthorized: 'contenu non-autorisé, me rediriger vers les publications',
            authorized: false,
            user: null,
            userConnected: null,
            rightToModify: false,
            rightToDelete: false,
            userId: null,
            posts: []
        }
    },
    created() {
        this.userConnected = JSON.parse(localStorage.user);
        this.userId = this.$route.params.id;


        axios.get('http://localhost:3000/api/auth/' + this.userId, {
            headers: {
                'Authorization': `Bearer ${this.userConnected.token}`
            }
        })
            .then(response => {
                console.log(response.data);
                this.user = response.data;
                this.posts = this.user.posts;
            })
            .then(() => {
                if (this.userId === this.userConnected.userId) {
                    this.rightToModify = true;
                }
                if ((this.userId === this.userConnected.userId) || this.userConnected.isAdmin) {
                    this.authorized = true;
                    this.rightToDelete = true;
                }
            })
            .catch(error => console.log(error));

    },
    methods: {

        linkToModify() {
            this.$router.push('/modifier-compte/' + this.userId);
        },
        redirection() {
            this.$router.push('/publications');
        },
        deleteUser() {
            axios.delete('http://localhost:3000/api/auth/' + this.userId, {
                headers: {
                    'Authorization': `Bearer ${this.userConnected.token}`
                }
            })
                .then(() => {
                    this.$router.push('/publications/');
                    console.log('utilisateurice supprimée')
                })
                .catch(error => console.log(error));

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