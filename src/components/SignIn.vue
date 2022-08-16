<template>
<div>Formulario Sign in!!!</div>
  <form @submit.prevent="">
    <label for="user">Enter your user name</label>
    <input type="text" placeholder="name" id="user">
    <label for="email">Enter your e-mail</label>
    <input type="e-mail" placeholder="e-mail" id="email">
    <button type="submit">Sign In</button>
  </form>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {

    }
}
</script>

<style>

</style>