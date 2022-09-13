<template>
  <!-- modal perfil usuario -->


  <input type="checkbox" id="my-modal-5" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="h-2/3 bg-purple-400 flex justify-center items-center">
        <div class="py-12 px-12 my-2 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">
              Edit your profile
            </h1>
            <p
              class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"
            >
              Add your personal info:
            </p>
          </div>
          <form @submit.prevent="updateProfile" class="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              id="user_name"
              v-model="user_name"
            />
            <input
              type="text"
              placeholder="Your last name"
              class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              id="user_last_name"
              v-model="user_last_name"
            />
            <!-- <input
              type="text"
              placeholder="Your image url"
              class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              id="user_avatar"
              v-model="user_avatar"
            /> -->

            <div>
              <img
                v-if="src"
                :src="src"
                alt="Avatar"
                class="avatar image"
                :style="{ height: size, width: size }"
              />
              <img
                v-else-if="preview"
                :src="preview"
                alt="Avatar"
                class="avatar image"
                :style="{ height: size, width: size }"
              />
              <div
                v-else
                
                class="avatar no-image"
                :style="{ height: size, width: size }"
              ></div>

              <div :style="{ width: size }" class="pointer">
                <label class="button primary block rounded-full mt-1 py-2 px-4 bg-violet-400 text-violet-700 hover:file:bg-purple-100" for="single">
                  {{ uploading ? "Uploading ..." : "Upload image" }}
                </label>
                <input
                  
                  style="visibility: hidden; position: absolute;"
                  type="file"
                  id="single"
                  accept="image/*"
                  @change="uploadAvatar"
                  :disabled="uploading"
                  file:rounded-full file:bg-violet-50
                />
              </div>
            </div>

            <div class="text-center mt-6">
              <button
                type="submit"
                class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="modal-action">
        <label for="my-modal-5" class="btn">Back to dashboard</label>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase";
export default {
  props: {
    user_name: String,
    user_last_name: String,
    user_avatar: String,
    myPath: String,
  },
  data() {
    return {
      size: "10em",
      uploading: false,
      src: "",
      files: null,
      path: '',
      myPath: "",
      preview: "",
    };
  },
  mounted() {
    //this.downloadImage();
    this.getPreview();
    
  },
  methods: {
    updateProfile() {
      const user_name = this.user_name;
      const user_last_name = this.user_last_name;
      const myPath = this.myPath;
      this.$emit("updateProfile", user_name, user_last_name, myPath);
    },
    async downloadImage() {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(this.path[1]);
    
        if (error) throw error;
        this.src = URL.createObjectURL(data);
        //this.src = myPath;
        console.log(this.path[1]);
        const myPath = "https://xmhajjrmgutujqbewfmp.supabase.co/storage/v1/object/public/avatars/"+this.path[1];
        this.myPath = myPath;
        console.log(myPath)
      } catch (error) {
        console.log(error.message);
      }
    },
    async uploadAvatar(evt) {
      this.files = evt.target.files;
      try {
        this.uploading = true;
        if (!this.files || this.files.length === 0) {
          throw new Error("You must select an image.");
        }
        const file = this.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        console.log('file name: ' + fileName)
        const filePath = `${fileName}`;//es lo mismo¿?

        let { data, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        this.path = data.Key.split('/');//de aquí sale myPath, el [1] de data
        console.log(this.path)
        
      } catch (error) {
        console.log(error.message)
      } finally {
        this.uploading = false;
        this.downloadImage();
        this.updateProfile();
      }
    },
    async getPreview() {
      const user = supabase.auth.user();
        let { data, error } = await supabase
          .from("profiles")
          .select(`avatar_url`)
          .eq("id", user.id)
          .single();
        if(error) { 
          throw error};
        if(data) {
          this.preview = data.avatar_url;
          console.log(this.preview)
        }
    }

  },
 
};
</script>

<style>
  .no-image {
    width: 200px;
    height: 200px;
    /*background-color: rgb(226, 217, 206);*/
    background-image: url("https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg");
    background-repeat: no-repat;
    background-size: cover;
  }
  
  .upload-btn {
    background-color: aqua;
  }
</style>