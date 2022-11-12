<template>
  <div class="header-app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Se connecter</router-link> | 
      <router-link to="/signup">S'inscrire</router-link>
    </nav>
    <img alt="Vue logo" src="./assets/logo.png"> -->
  </div>

  <router-view />
</template>



<style lang="scss">

@import '@/assets/index.scss';

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
}

h1 {
  color: $color-primary;
}

h2 {
  color: $color-secondary;
}

h3 {
  color: $color-tertiary;
}

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

img {
  width: max-content;
  height: 200px;
}
</style>