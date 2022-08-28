<template>
<!-- copia seguridad -->
 <!-- <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Welcome to the to-do app!</p>
                
                <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="signIn(email, password)">
                    <div class="flex flex-col pt-4">
                        <label for="email" name="email" class="text-lg">Email</label>
                        <input required v-model="email" type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
    
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Password</label>
                        <input required v-model="password" name="password" type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                   
                    <input type="submit" value="Sign In" class="bg-black  text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                </form>
               <p v-if="errorMsg"> {{ errorMsg }}</p>
            </div>

        </div>
    </div> -->

<!-- nuevo -->

<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://cdn-icons-png.flaticon.com/512/2883/2883031.png" alt="trisquel">
      
      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Welcome to the to-do app!</h2>
        <p v-if="errorMsg" class="mt-2 text-center text-sm text-red-600"> 
       {{ errorMsg }}
      </p> 
      
    </div>
    <form class="flex flex-col  mt-8 space-y-6" @submit.prevent="signIn(email, password)">
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
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
        </div>
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: mini/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
    
  </div>
</div>

</template>

<script>
import router from "../router";
import { useUserStore } from "../store/user";
import { mapStores } from 'pinia';
export default {
    data() {
        return {
            email: null,
            password: null,
            errorMsg: null
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        async signIn(email, password) {
            this.email = email;
            this.password = password;
            try {
            await this.userStore.signIn(this.email, this.password); 
            router.push({ path: '/' }); 
            }
        
        catch(error) {
            console.log(error.message);
            this.errorMsg = error.message;
        
            }  
        }
        
    }
}
</script>

<style>

</style>