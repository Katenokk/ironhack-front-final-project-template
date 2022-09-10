<template>
  <div class="">
    <SignIn v-if="!signedIn" @isSignedIn="isSignedIn"/>
    <!-- shows if the user clicks the "sign in" button -->
  <!-- <div v-if="!signedIn" class="text-center pt-12 pb-12">

<p>Don't have an account? 
  <button  @click="signedIn=true" class="underline font-semibold">click here to sign up</button>
  </p>
</div> -->
  </div>
 


  
  <SignUp  v-if="signedIn" @welcome="message" @isSignedIn="isSignedIn"/>
  <!-- shows if the user clicks the "sign up" button -->
  <!-- <div v-if="signedIn" class="text-center pt-12 pb-12">
  <p>Already have an account? 
    <button  @click="signedIn=false" class="underline font-semibold">click here to sign in</button>
    </p>
  </div> -->

 


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