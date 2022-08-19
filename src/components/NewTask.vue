<template>
   <div class="flex mt-4">
                <p v-if="statusMsg"> {{ statusMsg }}</p>
                <p v-if="errorMsg"> {{ errorMsg }}</p>
                <input 
                v-model="taskname"
                class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add new task">
                <button @click="addTask" class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </div>
</template>

<script>
//import router from "../router";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";

export default {
     setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    return {userStore, taskStore}
  },
    data() {
        return {
           
            taskname: "",
            is_complete: false,
            statusMsg: "",
            errorMsg: ""
        
        }
    },

methods: {
    async addTask() {
        
        console.log(this.taskname)
        try {
          await this.taskStore.addTask(this.taskname, this.userStore.user.id);
          this.taskname = null;
          
        }
        catch(error) {
            this.errorMsg = `Error: ${error}`
            console.log(this.errorMsg);
            } 
    }
}
}

</script>

<style>

</style>