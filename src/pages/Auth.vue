<template>
<SignIn v-if="!signedIn" @isSignedIn="isSignedIn"/>
 
<SignUp  v-if="signedIn" @welcome="message" @isSignedIn="isSignedIn"/>
  

</template>

<script>
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import { useUserStore } from "../store/user";

export default {
   setup() {
    const userStore = useUserStore();
    return {userStore}
  },
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      signedIn: false,
      welcomeMsg: ""
    }
  },
  methods: {
    message() {
      this.welcomeMsg = "you received an email";//borrar luego?
      console.log(this.welcomeMsg);
    },
    isSignedIn() {
    console.log("llama a Auth")
    this.signedIn = !this.signedIn;
  }
  },
  
}
</script>

<style>

</style>