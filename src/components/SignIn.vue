<template>

 <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Welcome to the to-do app!</p>
                <p>Para entrar: usuario: katia.obr@gmail.com , password: 123456 . Pasen y vean</p>
                <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="signIn(email, password)">
                    <div class="flex flex-col pt-4">
                        <label for="email" name="email" class="text-lg">Email</label>
                        <input required v-model="email" type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
    
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Password</label>
                        <input required v-model="password" name="password" type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                   
                    <input type="submit" value="Sign In" class="bg-black  font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                </form>
              
            </div>

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
            password: null
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
            console.log("error");
            }  
        }
        
    }
}
</script>

<style>

</style>