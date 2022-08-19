// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*") //todos
        .order("id", { ascending: false }); //orden descendente
      console.log(data);
      this.tasks = data;
    },
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
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
