<template>
  <div>Welcome to your dashboard!</div>
  <button class="bg-slate-600 " @click="signOut">Log out</button>
  <TaskItem/>
  <NewTask/>
</template>

<script>
import TaskItem from '../components/TaskItem.vue'
import NewTask from '../components/NewTask.vue';
import router from "../router";
import { useUserStore } from "../store/user";
import { mapStores } from 'pinia';

export default {
  components: {
    TaskItem,
    NewTask
  },
  computed: {
        ...mapStores(useUserStore)
    },
  methods: {
      async signOut() {
        try {
            await this.userStore.signOut();
           
            router.push({ path: '/auth' }); 
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