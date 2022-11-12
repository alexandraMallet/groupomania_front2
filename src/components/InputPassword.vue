<template>
    <label for="password">Password :</label>
    <input class="input-password" placeholder="(au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial)"/>
</template>

<script>
export default {
    name: 'InputPassword',
};
</script>

<style scoped lang="scss">
input {
    height: 50px;
    width: 700px;
}
</style>