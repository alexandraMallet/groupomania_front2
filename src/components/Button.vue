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

<style scoped>
button {
  height: 30px;
  width: 100px;
  display: flex;
  text-align: center;
  background-color: #FD2D01;
  color: #4E5166;
  border-radius: 50px;
  border: none;
  margin: 20px;
}
</style>