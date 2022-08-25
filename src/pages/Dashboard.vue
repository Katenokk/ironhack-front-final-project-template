<template>
<h2 v-if="taskStore.loading">Loading...</h2>
  <div >Welcome to your dashboard  {{ userStore.user.email }}!</div> 
  <button class="bg-slate-600 p-2 border-2 rounded text-teal border-teal" @click="signOut">Log out</button>
<br/>  
<div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="text-grey-darkest">Todo List</h1>
            <NewTask/>
        </div>
        <!-- mensaje de "todas las tareas completadas" -->
        <p v-if="taskStore.pendingTasks.length === 0"> {{ allCompleted }} </p>
        <div class="prueba">
          <!-- lista de tareas no completadas -->
          <p class="not-finished">Stuff I have to do:</p>
           <TaskItem v-for="task in taskStore.pendingTasks" :key="task.id" :taskId="task.id" :title="task.title"/>
           
           <!-- lista de tareas completadas -->
           <p class="finished">Stuff I've done:</p>
           <CompletedTask v-for="task in taskStore.completedTasks" :key="task.id" :taskId="task.id" :title="task.title"/>
            <button @click="deleteAllCompleted" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"> Delete all </button>
           <!-- también funciona con un filter directo!! -->
           <!-- <TaskItem v-for="task in taskStore.tasks.filter(t => t.is_complete === true)" :key="task.id" :taskId="task.id" :title="task.title"/> -->
        </div>
    </div>
</div>
 
  
</template>

<script>
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
    CompletedTask
  },
  data() {
    return {
      taskList: null,
      allCompleted: "Yay! You've completed all your tasks!"
      
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
.finished {
  color: blue;
  font-weight: bold;
}
.not-finished {
  color: red;
  font-weight: bold;
}
</style>