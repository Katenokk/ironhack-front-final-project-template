<template>

    <div  class="flex justify-between mb-4 items-center">
                <!-- <p v-if="statusMsg" class="status-msg"> {{ statusMsg }}</p> -->
                
                <p v-if="errorMsg"> {{ errorMsg }}</p>
                <div class="w-1/2">
                    <p v-if="!isEditing" @click="editTask" class="position text-grey-darkest hover:bg-gray-100" > {{  title}} 
                    </p>
                   
                    <input v-else v-model="title" maxlength="50" type="text" class="shadow appearance-none border rounded py-2 px-3 text-grey-darker hover:bg-gray-100"/>
                </div>
               
               <div class="flex justify-end">
               
                <!-- save changes -->
                <div class="tooltip tooltip-success" data-tip="save">
                    <button @click="saveTask" class="flex-no-shrink p-2  border-2 border-none"> <font-awesome-icon icon="fa-solid fa-floppy-disk " id="my_save_icon" color="#104406"/> </button>
                </div>
                
                <!-- task completed -->
                <div class="tooltip tooltip-accent" data-tip="done!">
                    <button @click="isComplete" class="flex-no-shrink p-2  border-2 border-none" id="my_done_icon" color="#3c9e28"> <font-awesome-icon icon="fa-solid fa-circle-check" /> </button>
                </div>
                
                <!-- delete task -->
                <div class="tooltip tooltip-error" data-tip="delete">
                    <button  @click="deleteTask" class="flex-no-shrink p-2  border-2 border-none" id="my_delete_icon" color="#7a0417"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                </div>
                
               </div>
                
    </div>
</template>

<script> 
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";

export default {
    setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    return {userStore, taskStore}
  },
  data() {
    return {
        isEditing: false,
        isDone: false,
        isActive: false,
        statusMsg: null,
        errorMsg: null,
        //maxLength: 40
    }
  },
 
    props: {
        title: String,
        taskId: Number,
        
    },
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
                console.log(error);
            }
        },
        editTask() {
            this.isEditing = !this.isEditing;
        },
        async isComplete() {
            try {
               
                this.isDone = !this.isDone; //cambia el is_complete a true
                
                await this.taskStore.changeTask(this.isDone, this.taskId);
                
                
            }
            catch(error) {
                console.log(error);
            }
        },
       
    }
}
</script>

<style>
#my_save_icon path {
    fill:#104406;
}
#my_done_icon path {
    fill:#3c9e28;
}
#my_delete_icon path {
    fill:#7a0417;
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