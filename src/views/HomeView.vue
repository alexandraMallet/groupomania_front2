<template>
  <div class="header-app">
    <nav>
      <router-link to="/login">Se connecter</router-link> | 
      <router-link to="/signup">S'inscrire</router-link>
    </nav>
  </div>
  <img alt="Vue logo" src="../assets/logo.png">
  <h1>Bienvenue sur le réseau social de votre entreprise !</h1>


  <router-view />
</template>

<script>
  export default {
      name: 'HomeView',
  };
</script>

<style lang="scss">
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #4E5166;
}

h1 {
  color: #FD2D01;
}

h2 {
  color: #FFD7D7;
}

h3 {
  color: #4E5166;
}
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
//   img {
//       width: max-content;
//       height: 200px;
//     }
</style>