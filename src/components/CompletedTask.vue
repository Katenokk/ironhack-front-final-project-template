<template>
   
    <div  class="flex justify-between mb-4 items-center ">
                
                <p v-if="errorMsg"> {{ errorMsg }}</p>
                <div class="w-full">
                    <p v-if="!isEditing" @click="editTask" class="position w-full line-through text-grey-200 hover:bg-gray-100"> {{ title }}  
                    </p>
                    <input v-else v-model="title" type="text" maxlength="50" class="w-full shadow appearance-none border rounded  py-2 px-3 mr-4 text-grey-darker hover:bg-gray-100"/>
                </div>
                
            
               <div class="flex justify-end">
                    <div class="tooltip tooltip-success" data-tip="save">
                        <button @click="saveTask"  class="flex-no-shrink p-2  border-2 border-none"><font-awesome-icon id="my_save_icon" color="#104406" icon="fa-solid fa-floppy-disk" /></button>
                    </div>
                    <div class="tooltip tooltip-warning" data-tip="not done">
                        <button @click="isComplete" class="flex-no-shrink p-2 border-2 border-none hover:bg-green min-w-fit"><font-awesome-icon icon="fa-solid fa-arrow-rotate-left" id="my_undo_icon" color="#a88c0e"/></button>
                    </div>
                    <div class="tooltip tooltip-error" data-tip="delete">
                        <button  @click="deleteTask" class="flex-no-shrink p-2 border-2 border-none" id="my_delete_icon" color="#7a0417"><font-awesome-icon icon="fa-solid fa-trash" /></button>
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
        isDone: true,
        errorMsg: null,
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
                this.errorMsg = error;
            }
        },
        editTask() {
            this.isEditing = !this.isEditing;
        },
        async isComplete() {
            try {
                this.done = !this.done; //cambia el v-if del boton
                this.isDone = !this.isDone; //cambia el is_complete a true
                await this.taskStore.changeTask(this.isDone, this.taskId);
                
            }
            catch(error) {
                console.log(error);
                this.errorMsg = error;
            }
        }
    }
}
</script>

<style>
#my_save_icon path {
    fill:#104406;
}
#my_undo_icon path {
    fill: #a88c0e;
}
#my_delete_icon path {
    fill: #7a0417;
}
.position {
    position: relative;
}

</style>