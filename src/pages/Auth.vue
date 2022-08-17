<template>
  <div>Auth page:</div>
  <SignIn v-if="!signedIn"/>
  
  <SignUp v-if="signedIn"/>
  <!-- shows if the user clicks the "sign in" button -->
  <div v-if="signedIn" class="text-center pt-12 pb-12">
  <p>Do you have an account? 
    <button  @click="signedIn=false" class="underline font-semibold">click here to sign in</button>
    </p>
  </div>
<!-- shows if the user clicks the "sign up" button -->
  <div v-if="!signedIn" class="text-center pt-12 pb-12">
  <p>Don't have an account? 
    <button  @click="signedIn=true" class="underline font-semibold">click here to sign up</button>
    </p>
  </div>

  <!-- <button v-if="!signedIn" @click="signedIn=true">click here to sign up</button> -->
  <!-- <button v-if="signedIn" @click="signedIn=false">click here to sign in</button> -->
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