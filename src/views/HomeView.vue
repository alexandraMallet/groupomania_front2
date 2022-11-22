<template>
  <div class="home-container">
    <nav>
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/signup">S'inscrire</router-link>
    </nav>
    <div class="image-container">
      <img alt="Vue logo" src="../assets/icon-left-font-monochrome-white.png">
    </div>
    <h1>Bienvenue sur le réseau social de votre entreprise !</h1>
  </div>

</template>

<script>
export default {
  name: 'HomeView',
  created() {
    if (localStorage) {
      localStorage.clear();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/index.scss';

.home-container {
  height: 100%;
  width: 100%;

  nav {
    display: flex;
    padding-top: 75px;
    padding-left: 50px;
    background-color: $color-secondary;
    height: 100px;

    a {
      margin-right: 10px;
      margin-left: 10px;
    }
  }

  .image-container {
    display: flex;
    width: 100%;
    height: 300px;
    background-color: $color-primary;
    justify-content: center;

    img {
      height: 300px;
    }

  }

  h1 {
    margin: 30px;
    display: flex;
    justify-content: center;
    color: $color-primary;
  }

}
</style>