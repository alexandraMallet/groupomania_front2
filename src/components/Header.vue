<template>
    <div class="header-app">
        <img alt="Logo" src="../assets/icon-left-font-monochrome-white-rogne.png">

        <nav v-if="auth">
            <router-link to="/">accueil</router-link> |
            <router-link to="/publier">publier</router-link> |
            <router-link to="/connexion">se déconnecter</router-link>
        </nav>
    </div>
</template>


<script>

export default {
  name: 'Header',
  data() {
    return {
      auth: null
    }
  }, 
created() {
    this.auth = localStorage.length;
}
}

</script>

<style scoped lang="scss">
@import '@/assets/index.scss';


.header-app{
    display: flex;
    justify-content: space-between;
    background-color: $color-secondary;
    height: 150px;


    nav {
        display: flex;
        padding-top: 60px;
        padding-left: 50px;

        a {
            margin-right: 10px;
            margin-left: 10px;
        }
    }

    img {
        height: 50px;
        margin: 50px;
    }
}


</style>