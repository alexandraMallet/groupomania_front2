<template>
    <Header />

   <PostCard v-if="$data.post" class="one-post" :key="post.id" :post="post"/>

    <div v-if="rightToChange" class="modify">
        <Button type="submit" :buttonText="buttonTextModifier" @click="linkToModify" />
        <Button type="submit" :buttonText="buttonTextSupprimer" @click="deletePost" />
    </div>

</template>

<script>

import axios from 'axios'
import PostCard from '@/components/PostCard.vue';
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';

export default {
    name: 'OnePostView',
    components: {
        PostCard,
        Button,
        Header
    },
    data() {
        return {
            post: null,
            buttonTextModifier: 'modifier',
            buttonTextSupprimer: 'supprimer',
            userLogged: {},
            rightToChange: false,
            postId: null,
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
                    'Authorization': `Bearer ${this.userLogged.token}`
                }
            })
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => console.log(error));

        },
        // addOrRemoveLike() {
        //     axios.post('http://localhost:3000/api/post/' + this.postId + '/like', {}, {
                
        //         headers: {
        //             'Authorization': `Bearer ${this.userLogged.token}`
        //         }
        //     })
        //         // .then(() => rappeler les données)
        //         .catch(() => console.log("erreur front"));
        // }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.one-post :hover {
    
    transform: none;
    box-shadow: none;
    cursor: default;

}

</style>