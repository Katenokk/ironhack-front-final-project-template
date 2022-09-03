<template>
  <!-- modal perfil usuario -->
  <input type="checkbox" id="my-modal-5" class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg">Create your profile</h3>
    <div class="flex flex-col items-center">
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
    </div>

    <div class="modal-action">
      <label for="my-modal-5" class="btn">Back</label>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
props: {
  user_name: String
},
data() {
    return {
      
      //user_name: "",
      user_last_name: "",
      user_avatar: "",
      name: "",
      nombre: "",
      apellido: "",
      foto: ""
    };
  },
methods: {
  updateProfile() {
    console.log(this.user_name)
    const usuario = this.user_name;
    this.$emit("updateProfile", usuario);
    
  }
}
}
</script>

<style>

</style>