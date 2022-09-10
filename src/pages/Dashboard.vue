<template>
  <Nav />
  <Modal @updateProfile="updateProfile" 
  :user_name="user_name"
  :user_last_name="user_last_name"
  :myPath="avatar_url"
  />
  <h2 v-if="taskStore.loading">Loading...</h2>
  <!-- <button type="Primary Block" class="flex flex-row items-center content-center justify-start gap-1 h-sm px-2 py-1 rounded-xl text-white bg-blue-500 active:text-gray-100 active:bg-blue-600 active:ring-0 focus:ring-offset-2 focus:ring">
    <font-awesome-icon icon="fa-solid fa-user-plus" />
    
            <p class="">Mejor?</p>
        </button> -->
<!-- tarjeta de perfil -->
  <div class="w-full h-1/4 bg-grey-100 flex flex-row flex-wrap p-3">
    <!--  -->
  <div class="mx-auto w-2/3 max-w-6xl">
<!-- Profile Card -->
<div class="rounded-lg shadow-lg bg-gray-400 w-full flex flex-row flex-wrap p-3 antialiased" style="
  background-image: url('https://images.unsplash.com/photo-1652466380685-c552233a941a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80');
  background-repeat: no-repat;
  background-size: cover;
  background-blend-mode: multiply;
">
  <div class="md:w-1/3 w-full">
    <img v-if="avatar_url" class="rounded-lg shadow-lg antialiased" :src="avatar_url" alt="profile image">  
    <img v-else class="rounded-lg shadow-lg antialiased" :src="default_img" alt="profile image">  
  </div>
  <div class="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
    <div class="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
      <div class="text-2xl text-white leading-tight"> {{ user_name }} {{ user_last_name }}</div>
      <div class="text-normal text-gray-300 hover:text-gray-400 cursor-pointer"><span class="border-b border-dashed border-gray-500 pb-1"></span></div>
      <label for="my-modal-5" class="btn modal-button md:absolute bottom-0 right-0">Edit profile</label>
      <!-- <div class="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0">Last Seen: <b>2 days ago</b></div> -->
    </div>
  </div>
</div>
<!-- End Profile Card -->
  </div>

</div>

  <!-- cambiado a items-start xq quedaba mucho espacio h-screen cambiado a h-full -->
  <div
    class="h-100 w-full h-full flex items-start justify-center bg-teal-lightest font-sans"
  >
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 xl:max-w-6xl">
      <div class="mb-4">
        <h1 class="text-grey-darkest">Todo List</h1>
        <NewTask />
      </div>

      <!-- prueba con divider -->
      <div class="flex flex-col w-full lg:flex-row">
        <div
          class="grid flex-grow lg:w-1/2 min-h-fit card bg-base-200 rounded-box place-items-strech p-4"
        >
          <div>
            <p class="text-red-400">Pending:</p>

            <div class="flex flex-col-reverse">
              <p v-if="taskStore.loading">Loading...</p>
              <p v-else-if="taskStore.pendingTasks.length === 0">
                {{ allCompleted }}
              </p>
              <TaskItem
                v-for="task in taskStore.pendingTasks"
                :key="task.id"
                :taskId="task.id"
                :title="task.title"
              />
            </div>
          </div>
        </div>
        <div class="divider lg:divider-horizontal"></div>
        <div
          class="grid flex-grow lg:w-1/2 min-h-fit card bg-base-200 rounded-box place-items-strech p-4"
        >
          <div>
            <p class="text-green-700">Completed:</p>
            <p v-if="taskStore.loading">Loading...</p>
            <div class="flex flex-col-reverse">
              <CompletedTask
                v-for="task in taskStore.completedTasks"
                :key="task.id"
                :taskId="task.id"
                :title="task.title"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        @click="deleteAllCompleted"
        class="btn btn-outline btn-success btn-sm float-right mt-4"
      >
        Clear completed tasks
      </button>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import TaskItem from "../components/TaskItem.vue";
import NewTask from "../components/NewTask.vue";
import CompletedTask from "../components/CompletedTask.vue";
import router from "../router";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { useUserInfoStore } from "../store/userInfo"; //de momento no lo uso
import { supabase } from "../supabase";
import Modal from "./Modal.vue";



export default {
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    const userInfoStore = useUserInfoStore();
    return { userStore, taskStore, userInfoStore };
  },

  components: {
    TaskItem,
    NewTask,
    CompletedTask,
    Nav,
    Modal
},
props: {
  user_name: String,
  user_last_name: String,
  user_avatar: String,
  myPath: String
},
  data() {
    return {
      allCompleted: "You don't have any pending tasks :)",
      user_name: "",
      user_last_name: "",
      avatar_url: "",
      default_img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
    };
  },
  mounted() {
    this.taskStore.fetchTasks();
    this.getProfile();
    this.insertEmail();//ya está en otro sitio??
    this.userStore.userExist();
  },
  methods: {
    async signOut() {
      try {
        await this.userStore.signOut();
        router.push({ path: "/auth" });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    },
    deleteAllCompleted() {
      this.taskStore.completedTasks.forEach((t) =>
        this.taskStore.deleteTask(t.id)
      );
    },
    async updateProfile(user_name, user_last_name, myPath) {
      try {
        
        const user = supabase.auth.user();
     
        const updates = {
          id: user.id,
          username: user_name,
          avatar_url: myPath,
          user_lastname: user_last_name,
          updated_at: new Date(),
        };
       
        let { data, error } = await supabase.from("profiles").upsert(updates);
        console.log(data);
        if (error) {
          throw error;
        }
      } catch (error) {
        alert(error.message);
      }
      finally {
        this.getProfile(); //si no, no se actualiza al cerrar el modal
      }
      
    },
    async getProfile() {
      try {
        const user = supabase.auth.user();
        
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, avatar_url, user_lastname`)
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          throw error;
          console.log(error)
        }

        if (data) {
          this.user_name = data.username;
          this.user_last_name = data.user_lastname;
          this.avatar_url = data.avatar_url;
        }
      } catch (error) {
        alert(error.message);
      }
    },
    
    //inserta el email de cada usuario a la tabla "profiles"
    async insertEmail() {
        try {
          const user = supabase.auth.user();
          const email = this.userStore.user.email;
          let { data, error } = await supabase.from("profiles").update({email: email}).eq("id", user.id)
          if (error) {
          throw error;
        }
        }
        catch(error) {
          console.log(error)
        }
      },
    


  },
};
</script>

<style>

</style>