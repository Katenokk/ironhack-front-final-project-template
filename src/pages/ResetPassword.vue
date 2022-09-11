<template>
  <div class="min-h-full flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://cdn-icons-png.flaticon.com/512/2883/2883031.png" alt="trisquel">
      
      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Create a new password</h2>
        <p v-if="errorMsg" class="mt-2 text-center text-sm text-red-600"> 
       {{ errorMsg }}
      </p> 
      
    </div>
    <form class="flex flex-col  mt-8 space-y-6" >
      <input type="hidden" name="remember" value="true">
      <div class="flex flex-col gap-4 rounded-md shadow-sm -space-y-px">
        <div>
          <label for="password" class="sr-only">New password</label>
          <input required v-model="newPassword" name="password" type="password" id="password" placeholder="new password"  autocomplete="current-password" class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        </div>
         <div>
          <label for="repPassword" class="sr-only">Repeat new password</label>
          <input required v-model="repeatPassword" name="repeatPassword" type="password" id="repPassword" placeholder="repeat new password" 
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
          Save
         
        </button>

        

      </div>
    </form>
  
  </div>
</div>


</template>

<script>
import { useUserStore } from "../store/user";
import router from "../router";

export default {
  setup() {
    const userStore = useUserStore();
    
    return {userStore}
  },
  data() {
    return {
      newPassword: null,
      repeatPassword: null,
      errorMsg: null
      }
  },
}
  
</script>

<style>

</style>