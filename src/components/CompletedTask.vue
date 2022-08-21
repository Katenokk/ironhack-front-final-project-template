<template>

    <div  class="flex mb-4 items-center">
                <!-- <p v-if="statusMsg" class="status-msg"> {{ statusMsg }}</p> -->
                
                <p v-if="errorMsg"> {{ errorMsg }}</p>
                <p v-if="!isEditing" class="position w-full text-grey-darkest" :class="{complete: isActive}"> {{ title }}  
                <span v-if="statusMsg" class="status-msg">
                    {{ statusMsg }}
                </span>
                </p>
                <input v-else v-model="title" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"/>
               
                <button @click="editTask" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Edit</button>
                <button @click="saveTask" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Save</button>
                <!-- <button v-if="!done" @click="isComplete" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button> -->
                <button @click="isComplete" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">To do</button>
                <button  @click="deleteTask" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
    </div>
</template>

<script> 
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
// import { mapStores } from 'pinia';
export default {
    setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    return {userStore, taskStore}
  },
  data() {
    return {
        isEditing: false,
        done: false,
        isDone: false,
        isActive: false,
        statusMsg: null,
        errorMsg: null
    }
  },
 
    props: {
        title: String,
        taskId: Number,
    },
    //  computed: {
    //     ...mapStores(useUserStore),
    //     ...mapStores(useTaskStore)
    // },
    methods: {
        async deleteTask() {
            await this.taskStore.deleteTask(this.taskId) 
            
        },
        async saveTask() {
          
            try {
                await this.taskStore.saveTask(this.title, this.taskId);
                this.isEditing = !this.isEditing;
            }
            catch(error) {
                console.log(`Error: ${error}`);
            }
        },
        editTask() {
            this.isEditing = !this.isEditing;
        },
        async isComplete() {
            try {
                this.done = !this.done; //cambia el v-if del boton
                this.isDone = !this.isDone; //cambia el is_complete a true
                //this.isActive = !this.isActive; //cambia la clase active
                //this.statusMsg = "your task is complete!";
                await this.taskStore.changeTask(this.isDone, this.taskId);
                //this.statusMsg = null; //se queda como 1 segundo
                
            }
            catch(error) {
                console.log(`Error: ${error}`);
            }
        }
    }
}
</script>

<style>
.complete {
    text-decoration: line-through;
    color: red;
}
.position {
    position: relative;
}
.status-msg {
    position: absolute;
    top: 1em;
    left: 0;
    color: green;
}
</style>