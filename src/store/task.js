// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    loading: null,
    pendingTasks: [],
    completedTasks: []
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;

      const { data, error } = await supabase
        .from("tasks")
        .select("*") //todos
        .order("id", { ascending: false }); //orden descendente
      console.log(data);
      this.tasks = data;
      this.loading = false;
      this.completedTasks = data.filter(t => t.is_complete === true);
      this.pendingTasks = data.filter(t => t.is_complete === false);
      
      //console.log(JSON.parse(JSON.stringify(this.completedTasks)));
      //this.pendingTasks = this.filterPending(this.tasks);
    },
    //filtrar tareas completadas:
    // async filterCompleted(tareas) {
    // await tareas.filter(t => t.is_complete === true);
    // console.log(tareas) //proxy con TODAS las tareas
    // return tareas;
    // },
    //filtrar tareas pendientes:
    // async filterPending(tareas) {
    //   await tareas.filter(t => t.is_complete === false);
    //   return tareas;
    // },
    
    // Hacer POST
    async addTask(taskname, id) {
      
      await supabase.from("tasks").insert([
        {
          title: taskname,
          is_complete: false,
          user_id: id, 
        },
      ]);
      await this.fetchTasks() 
    },
    async deleteTask(taskId) {

      await supabase.from("tasks")
      .delete()
      .match({ id: taskId })
      await this.fetchTasks() 
    },
    // Hacer el PUT (edit)
    async saveTask(title, taskId) {
      await supabase
      .from("tasks")
      .update({ title: title })
      .match({ id: taskId })
      await this.fetchTasks()
    },
    // Hacer el PUT (cambiar entre completada y pendiente)
    async changeTask(isDone, taskId) {
      await supabase
      .from("tasks")
      .update({ is_complete: isDone }) //??????
      .match({ id: taskId })
      await this.fetchTasks()

    }
    
  },
});
