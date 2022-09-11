// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    emails: []
  }),

  actions: {
    
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
      //console.log(user);
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      },
      {
        redirectTo: "https://velvety-gnome-ddd067.netlify.app/auth"
      });
      if (error) throw error;
      if (user) this.user = user;
      
    },
    // Hacer sign in
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },);
      if (error) throw error;
      if (user) this.user = user;
      
    },
    // Hacer log out 
    async signOut() {
    const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
    //forgot password:
    async forgotPassword(email) {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email , {
        
        redirectTo: 'https://velvety-gnome-ddd067.netlify.app/reset_pwd/',
        });
        console.log(data)
        if (error) throw error;

       

    },
    //saber si el email de un usuario existe y está confirmado
    async userExist(email){
      const { data, error } = await supabase.from('profiles').select('email');
      if (error) throw error;
      //console.log(error)
      if (data) this.emails = data;
      
      const result = data.filter(el => el.email === email);
   
      if (result.length >0) {
        return true;
      }
      else {
        return false;
      }
    },
    
    
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
 
});
