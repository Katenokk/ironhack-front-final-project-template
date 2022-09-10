<template>
    <AppHeader/>
    <router-view class="app-main" />
    <Footer></Footer>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/user.js';
import Footer from "./components/Footer.vue";
 
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
 
onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e)
  }
})

</script>

<style>
#app {
  /*height: 100%;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f4f4f4;
 
}  
</style>