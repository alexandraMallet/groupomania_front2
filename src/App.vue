<template>
  <router-view />
</template>



<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
@import '@/assets/index.scss';

#app {
  font-family: 'Lato', sans-serif;
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

nav {

  a {
    font-weight: bold;
    color: $color-tertiary;

    &.router-link-exact-active {
      color: $color-primary;
    }
  }
}

</style>