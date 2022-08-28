<template>
<!-- copia seguridad -->
  <!-- <div class="w-full flex flex-wrap">

        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Welcome to the to-do app!</p>
                <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="isValid()">
                    <div class="flex flex-col pt-4">
                        <label for="email" name="email" class="text-lg">Email</label>
                        <input required v-model="email" type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
    
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Password</label>
                        <input required v-model="password" name="password" type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="flex flex-col pt-4">
                        <label for="repPassword" class="text-lg">Confirm password</label>
                        <input required v-model="repeatPassword" name="repeatPassword" type="password" id="repPassword" placeholder="confirm password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <p v-if="errorMsg" class="text-red">
                            {{ errorMsg }}
                    </p>
                    <input type="submit" value="Sign Up" class="bg-black  font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                </form>

            </div>

        </div>

       
    </div> -->






<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://cdn-icons-png.flaticon.com/512/2883/2883031.png" alt="trisquel">
      
      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Create your account</h2>
        <p v-if="errorMsg" class="mt-2 text-center text-sm text-red-600"> 
       {{ errorMsg }}
      </p> 
      
    </div>
    <form class="flex flex-col  mt-8 space-y-6" @submit.prevent="isValid()">
      <input type="hidden" name="remember" value="true">
      <div class="flex flex-col gap-4 rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email" name="email"  class="sr-only">Email</label>
          <input  v-model="email" type="email" id="email" placeholder="your@email.com"  autocomplete="email" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input required v-model="password" name="password" type="password" id="password" placeholder="Password"  autocomplete="current-password" class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        </div>
         <div>
          <label for="repPassword" class="sr-only">Confirm password</label>
          <input required v-model="repeatPassword" name="repeatPassword" type="password" id="repPassword" placeholder="Confirm password" 
        class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <!-- rellenar con algo? -->

      
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: mini/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign Up
          <label for="my-modal" ></label>
        </button>
      </div>
    </form>
  <label for="my-modal" class="btn modal-button">meter en sign up</label>
  </div>
</div>

</template>

<script>
import router from "../router";
//import { ref } from "vue";
import { useUserStore } from "../store/user";
import { mapStores } from 'pinia';
export default {
    // setup() {
    // const user = useUserStore();
    // return { user };
    // },
   
    data() {
        return {
            email: null,
            password: null,
            repeatPassword: null,
            errorMsg: null,
           
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        
        async signUp(email, password) {
            this.email = email;
            this.password = password;
            try {
            await this.userStore.signUp(this.email, this.password);
           
            router.push({ path: '/auth' }); //tiene que ir a la ventana de sign in despues de crear el usurio
            this.$router.go(); //refresca
            
            
            }
         
            catch(error) {
            console.log(error);
            } 
            //falta otro error?? 
        },
        //comprobaciones entrada datos usuario:
        isValid() {
            if (this.checkEmail(this.email) && this.checkPassword(this.password, this.repeatPassword)) {
                console.log("todo correcto");
                this.signUp(this.email, this.password);
                this.$emit("welcome");
            } else {
                console.log(this.errorMsg)
            }


        },
        checkEmail(email) {
            this.email = email;
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                     return true;
                }
                    else {
                        this.errorMsg ="please enter a valid email";
            }
        },
        checkPassword(password, repeatPassword) {
            this.password = password;
            this.repeatPassword = repeatPassword;
            if (password.length<6) { //añadir regex para letras y números? y arreglar el mostacho
                this.errorMsg = "the password must have at least 6 characters";
            } else if (password !== repeatPassword) {
                this.errorMsg = "please type the correct password";
            } else {
                return true;
            }
        }
        
    }
    }
    

</script>

<style>

</style>