<template>
<SignIn v-if="!signedIn" @isSignedIn="isSignedIn"/>
 
<SignUp  v-if="signedIn"  @isSignedIn="isSignedIn"/>
  

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
    }
  },
  methods: {
    isSignedIn() {
    this.signedIn = !this.signedIn;
  }
  },
  
}
</script>

<style>

</style>