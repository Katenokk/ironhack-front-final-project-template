<template>

   <!-- <form @submit.prevent="signUp(email, password)">
    <label for="email">Enter your e-mail</label>
    <input type="e-mail" placeholder="e-mail" id="email" v-model="email" name="email">
    <br>
    <label for="password">Enter your password</label>
    <input type="password" placeholder="password" id="password" v-model="password" name="password">
    <br>
    <label for="repeatPassword">Repeat your password</label>
    <input type="password" placeholder="repeat your password" id="repeatPassword" v-model="repeatPassword" name="repeatPassword">
    <br>
    <button type="submit">Sign Up</button>
  </form> -->
  <div class="w-full flex flex-wrap">

        <div class="w-full md:w-1/2 flex flex-col">


            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Welcome to the to-do app!</p>
                <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="signUp(email, password)">
                    <div class="flex flex-col pt-4">
                        <label for="email" name="email" class="text-lg">Email</label>
                        <input v-model="email" type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
    
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Password</label>
                        <input v-model="password" name="password" type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="flex flex-col pt-4">
                        <label for="repPassword" class="text-lg">Repeat password</label>
                        <input v-model="repeatPassword" name="repeatPassword" type="password" id="repPassword" placeholder="repeat password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
    
                    <input type="submit" value="Sign Up" class="bg-black  font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>Do you have an account? <a href="#" class="underline font-semibold">Sign in here.</a></p>
                </div>
            </div>

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
            email: "",
            password: "",
            repeatPassword: ""
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
       
        async signUp(email, password) {
            this.email = email;
            this.password = password;
                console.log(this.email)
            try {
            await this.userStore.signUp(this.email, this.password);//no va de ninguna forma
           
            router.push({ path: '/' }); //hay que poner this.router?
            }
        
        catch(error) {
            console.log("error");
            }  
        }
        
    }
    }
    

</script>

<style>

</style>