<template>
  <div>Auth page:</div>
  <SignIn v-if="!signedIn"/>
  
  <SignUp v-if="signedIn"/>
  <button v-if="!signedIn" @click="signedIn=true">click here to sign up</button>
  <button v-if="signedIn" @click="signedIn=false">click here to sign in</button>
</template>

<script>
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';

export default {
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      signedIn: true
    }
  }
}
</script>

<style>

</style>