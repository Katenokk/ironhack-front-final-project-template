<template>
  <Nav />
  <Modal @updateProfile="updateProfile" :user_name="user_name"/>
  <div class="text-center">
    <h2 v-if="taskStore.loading">Loading...</h2>
    <label for="my-modal-5" class="btn modal-button">Edit profile</label>
    <div class="mt-4">
      Welcome to your dashboard
      <span class="text-purple-600"> {{ this.nombre }} &nbsp; </span>
      <span class="text-green-500"> {{ this.apellido }}</span>
      <br />
      <span> {{ userStore.user.email }} </span> !
    </div>
    <div class="w-20 h-20 m-auto">
      <img :src="`${this.foto}`" alt="mi imagen!" />
    </div>
    <!-- perfil usuario -->
    <!-- <div class="flex flex-col items-center">
      <form @submit.prevent="updateProfile" class="flex flex-col items-center">
        <label for="user_name">Your first name</label>
        <input
          id="user_name"
          type="text"
          placeholder="your first name"
          v-model="user_name"
          
        />
        <label for="user_last_name">Your last name</label>
        <input
          id="user_last_name"
          type="text"
          placeholder="your last name"
          v-model="user_last_name"
        />
        <label for="user_avatar">Your avatar (paste here your url)</label>
        <input
          id="user_avatar"
          type="text"
          placeholder="your avatar url"
          v-model="user_avatar"
        />
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div> -->
  </div>

  <div
    class="h-100 w-full h-screen flex items-center justify-center bg-teal-lightest font-sans"
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
  user_name: String
},
  data() {
    return {
      allCompleted: "You don't have any pending tasks :)",
      user_name: "",
      user_last_name: "",
      user_avatar: "",
      name: "",
      nombre: "",
      apellido: "",
      foto: ""
    };
  },
  mounted() {
    this.taskStore.fetchTasks();
    this.getProfile();
    //this.userInfoStore.fetchUsersInfo();
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
    async updateProfile(usuario) {
      try {
        
        const user = supabase.auth.user();
        const updates = {
          id: user.id,
          //username: this.user_name,
          username: usuario,
         
          avatar_url: this.user_avatar,
          user_lastname: this.user_last_name,
          updated_at: new Date(),
        };
        console.log(usuario)
        let { data, error } = await supabase.from("profiles").upsert(updates);
        console.log(data);
        if (error) {
          throw error;
        }
      } catch (error) {
        alert(error.message);
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
        }

        if (data) {
          this.user_name = data.username;
          this.nombre = data.username;
          this.user_last_name = data.user_lastname;
          this.apellido = data.user_lastname;
          this.user_avatar = data.avatar_url;
          this.foto = data.avatar_url;
         
        }
      } catch (error) {
        alert(error.message);
      }
    },

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
};
</script>

<style>
/* button {
  margin-right: 0%; 
} */
</style>