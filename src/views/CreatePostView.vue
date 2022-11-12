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

            <label for="post-image">Ajouter une image :</label>
            <input type="file" class="post-image" name="post-image" accept="image/png, image/jpeg">

        </form>

    </div>



</template>

<script>
export default {
    name: 'CreatePostView',
    components: {
    }
}
</script>

<style scoped lang="scss">
.header-app {
    display: flex;
    justify-content: space-between;
}
nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #4E5166;
        &.router-link-exact-active {
            color: #FD2D01;
        }
    }
}
.form-contener {
    height: fit-content;
    width: 95%;
    border: 1px solid #4E5166;
}
.post-image {
  height: 30px;
  width: 100px;
  background-color: #FD2D01;
  color: #4E5166;
  border-radius: 50px;
  border: none;
  margin: 20px;
}
</style>