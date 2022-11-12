<template>
    <label class="image" for="image">{{ inputFileText }}</label>
    <div class="style-input">
        <input type="file" class="image-input" name="image" accept="image/png, image/jpeg">
        <Button class="style-button" :buttonText="buttonText"/>
    </div>
</template>
  
<script>

import Button from './Button.vue';

export default {
    name: 'InputFile',
    props: {
        inputFileText: {
            type: String,
            required: true,
        }
    },
    components: {
        Button,
    },
    data() {
        return {
            buttonText: "Parcourir"
        }
    }
};
</script>
  
<style scoped lang="scss">

.style-input {
    position: relative;
    height: 50px;
    width: 700px;

    input {
        position: relative;
        z-index: 2;
        opacity: 0;
    }

    .style-button {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 1;
    }
}

</style>