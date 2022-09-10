<template>

<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
         
        </button>

        

      </div>
    </form>
    <div class="text-center pb-12">
  <p>Already have an account? 
    <button  @click="isSignedIn" class="underline font-semibold">click here to sign in</button>
    </p>
  </div>
  </div>
</div>

<div v-if="isSignedUp">
  <p>
    Please, confirm your email and then sign in to your account
  </p>
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
            isSignedUp: false,
            users: []
           
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    // mounted() {
    //   this.fetchUsers();
    // },
    methods: {
      // async fetchUsers() {
      // const { data, error } = await supabase
      //   .from("users")
      //   .select("*") 
      //   .order("id", { ascending: false }); 
      // console.log(data);
      // this.users = data;
      // },  
      // async userExists() {
      //   if(email_confirmed_at in this.userStore.user) {//usar esto en el dashboard para el aviso
      //     return true;
      //   }
      // },  
        async signUp(email, password) {
            this.email = email;
            this.password = password;
            const res = await this.userStore.userExist(this.email);
            try {
            if(res === false) { //si ese email no esta registrado
            await this.userStore.signUp(this.email, this.password);
            this.isSignedUp = true; //no redirige
            } else {
              this.errorMsg = "el usuario ya está registrado"
            }
            }
            catch(error) {
            console.log(error);
            this.errorMsg = error.message;
            } 
            //falta otro error?? 
        },
        //comprobaciones entrada datos usuario:
        isValid() {
            if (this.checkEmail(this.email) && this.checkPassword(this.password, this.repeatPassword)) {
                
            this.signUp(this.email, this.password);
                
            } else {
                console.log(this.errorMsg);
                
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
        },
        //llama a Auth para cambiar el v-if a y mostrar signIn
          isSignedIn() {
          this.$emit("isSignedIn")
        }
        
    }
    }
    

</script>

<style>
.footer-bottom {
  /*height: 85%;*/
   margin-bottom: 265px;  
}
</style>