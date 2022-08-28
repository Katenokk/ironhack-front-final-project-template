<template>
 <Nav/>
 <div class="text-center">
  <h2 v-if="taskStore.loading">Loading...</h2>
  <div class="mt-4">Welcome to your dashboard <span class="text-purple-600"> {{ userStore.user.email }} </span>  !</div> 
 </div>
 
  

<div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 xl:max-w-4xl">
        <div class="mb-4">
            <h1 class="text-grey-darkest">Todo List</h1>
            <NewTask/>
        </div>
        
        <!-- <div class="flex  flex-col md:flex-row  md:justify-between" > -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4" >
         
          <div>
            <p class="text-red-400">Pending:</p>
            <div class="flex flex-col-reverse">
           <p v-if="taskStore.pendingTasks.length === 0"> {{ allCompleted }} </p>
            <TaskItem  v-for="task in taskStore.pendingTasks" :key="task.id" :taskId="task.id" :title="task.title"/>
             
            </div>
          </div>
           
          
           <div>
              <p class="text-green-700">Completed:</p>
              <div class="flex flex-col-reverse">
              <CompletedTask v-for="task in taskStore.completedTasks" :key="task.id" :taskId="task.id" :title="task.title"/>
              </div>
           </div>     
        </div> -->

         <!-- prueba con divider -->
           <div class="flex flex-col w-full lg:flex-row">
              <div class="grid flex-grow min-h-fit card bg-base-200 rounded-box place-items-strech p-4">
                <div>
            <p class="text-red-400">Pending:</p>
           
            <div class="flex flex-col-reverse">
               <p v-if="taskStore.loading">Loading...</p>
           <p v-else-if="taskStore.pendingTasks.length === 0"> {{ allCompleted }} </p>
            <TaskItem  v-for="task in taskStore.pendingTasks" :key="task.id" :taskId="task.id" :title="task.title"/>
            </div>

          </div>

                </div> 
              <div class="divider lg:divider-horizontal"></div> 
              <div class="grid flex-grow min-h-fit card bg-base-200 rounded-box place-items-strech p-4">
                 <div>
              <p class="text-green-700">Completed:</p>
              <p v-if="taskStore.loading">Loading...</p>
              <div class="flex flex-col-reverse">
              <CompletedTask v-for="task in taskStore.completedTasks" :key="task.id" :taskId="task.id" :title="task.title"/>
              </div>
           </div>
                </div>
          </div>

         <button @click="deleteAllCompleted" class="btn btn-outline btn-success btn-sm float-right mt-4"> Clear completed tasks </button>
    </div>
</div>
 
  
</template>

<script>
import Nav from "../components/Nav.vue";
import TaskItem from '../components/TaskItem.vue'
import NewTask from '../components/NewTask.vue';
import CompletedTask from "../components/CompletedTask.vue"
import router from "../router";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";

export default {
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    return {userStore, taskStore}
  },
  components: {
    TaskItem, 
    NewTask,
    CompletedTask,
    Nav
  },
  data() {
    return {
      taskList: null,
      allCompleted: "Well done! You've completed all your tasks!"
      
    }
  },
  mounted() { 
      this.taskStore.fetchTasks();  // pero funciona!
   
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
      deleteAllCompleted() {
        this.taskStore.completedTasks.forEach( t => this.taskStore.deleteTask(t.id))
      }
     
      // async fetchTasks() { // esta función nunca ha hecho nada!!! se llama desde el store
      //   try {
      //     await this.taskStore.fetchTasks();
      //     this.tasks = tasks;
      //     console.log(tasks)
      //   }
      //   catch(error) {
      //       console.log(`Error: ${error}`);
      //       } 
      // }
    },
    
}

</script>

<style>
button {
  margin-right: 0%; /*no se va a la derecha*/ 
}
</style>