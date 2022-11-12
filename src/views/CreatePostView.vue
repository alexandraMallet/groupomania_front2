<template>
    <div class="header-app">
        <nav>
            <router-link to="/publications">Toutes les publications</router-link> |
            <router-link to="/publier">Publier</router-link> |
            <router-link to="/">Se déconnecter</router-link>
        </nav>
        <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div class="form-contener">
        <form class="create-post-form" @submit.prevent="submitPost">

            <label for="pseudo">Pseudo :</label>
            <input id="pseudo" v-model="pseudo" placeholder="votre pseudo" />

            <label for="post">Que souhaitez-vous partager aujourd'hui ?</label>
            <textarea id="post" v-model="post" placeholder="votre texte ici"></textarea>

            <InputFile :inputFileText="inputFileText"/>


        </form>

    </div>



</template>

<script>

import InputFile from '@/components/InputFile.vue';

export default {
    name: 'CreatePostView',
    components: {
        InputFile,
    },
    data() {
        return {
            inputFileText: "Choisissez une image :"
        }
    }
}
</script>

<style scoped lang="scss">

@import '@/assets/index.scss';

.header-app {
    display: flex;
    justify-content: space-between;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: $color-tertiary;

        &.router-link-exact-active {
            color: $color-primary;
        }
    }
}

.form-contener {
    height: fit-content;
    width: 95%;
    border: 1px solid $color-tertiary;
}

.post-image {
    height: 30px;
    width: 100px;
    background-color: $color-primary;
    color: $color-tertiary;
    border-radius: 50px;
    border: none;
    margin: 20px;
}
</style>