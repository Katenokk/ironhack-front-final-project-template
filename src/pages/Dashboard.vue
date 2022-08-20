<template>
  <div >Welcome to your dashboard!  {{ userStore.user.email }}</div> 
  <button class="bg-slate-600 p-2 border-2 rounded text-teal border-teal" @click="signOut">Log out</button>
<br/>  
<div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="text-grey-darkest">Todo List</h1>
            <NewTask/>
            <!-- <div class="flex mt-4">
                <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add new task">
                <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </div> -->
        </div>
        <div>
           <TaskItem v-for="task in taskStore.tasks" :key="task.id" :taskId="task.id" :title="task.title"/>
        
         
            <!-- <div class="flex mb-4 items-center">
                <p class="w-full text-grey-darkest">Ejemplo</p>
                <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
            </div> -->
          	<!-- <div class="flex mb-4 items-center">
                <p class="w-full line-through text-green">Ejemplo 2</p>
                <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>
                <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
            </div> -->
        </div>
    </div>
</div>
 
  
</template>

<script>
import TaskItem from '../components/TaskItem.vue'
import NewTask from '../components/NewTask.vue';
import router from "../router";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
//import { mapStores } from 'pinia'; --funciona con el setup!

export default {
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    return {userStore, taskStore}
  },
  components: {
    TaskItem, 
    NewTask
  },
  // computed: {
  //       ...mapStores(useUserStore),
  //       ...mapStores(useTaskStore)
  //   },
  mounted() {
      this.taskStore.fetchTasks()
      console.log(this.userStore)
    },
  methods: {
      async signOut() {
        try {
            await this.userStore.signOut();
           
            router.push({ path: '/auth' }); 
            }
        
        catch(error) {
            console.log(`Error: ${error}`);
            }  
      },
      async fetchTasks() {
        try {
          await this.taskStore.fecthTasks();
          this.tasks = tasks;
          console.log(tasks)
        }
        catch(error) {
            console.log(`Error: ${error}`);
            } 
      }
    },
    
}

</script>

<style>

</style>