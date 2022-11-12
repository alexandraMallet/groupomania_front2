
<template>
  <button>{{ buttonText }}</button>
</template>

<script>

export default {
  name: 'Button',
  props: {
    buttonText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">

@import '@/assets/index.scss';

button {
  height: 30px;
  width: 100px;
  background-color: $color-primary;
  color: $color-tertiary;
  border-radius: 50px;
  border: none;
  }
</style>