import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserInfoStore = defineStore("usersInfo", {
    state: () => ({
        usersInfo: [],
        loading: null,
        
      }),
      actions: {
        async fetchUsersInfo() {
            this.loading = true;
      
            const { data, error } = await supabase
              .from("users")
              .select("*") 
              .order("id", { ascending: false }); 
            console.log(data);
            this.usersInfo = data;
            this.loading = false;
           
          },
          
      }
})