<template>
  <!-- modal perfil usuario -->
  <!-- <input type="checkbox" id="my-modal-5" class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
   
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
    </div> -->



    <input type="checkbox" id="my-modal-5" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <div class="h-2/3 bg-purple-400 flex justify-center items-center">
    <div class="py-12 px-12 my-2 bg-white rounded-2xl shadow-xl z-20">
		<div>
			<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Create your profile</h1>
			<p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create your profile </p>
		</div>
		<form @submit.prevent="updateProfile" class="space-y-4">
			<input type="text" placeholder="Your name" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
      id="user_name"
      v-model="user_name"
      />
			<input type="text" placeholder="Your last name" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
      id="user_last_name"
      v-model="user_last_name"
      />
      <input type="text" placeholder="Your image url" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" 
      id="user_avatar"
      v-model="user_avatar"
      />
      <div class="text-center mt-6">
				<button type="submit" class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Create profile</button>
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
export default {
props: {
  user_name: String,
  user_last_name: String,
  user_avatar: String
},
data() {
    return {
      
      //user_name: "",
      //user_last_name: "",
      //user_avatar: "",
      // name: "",
      // nombre: "",
      // apellido: "",
      // foto: ""
    };
  },
methods: {
  updateProfile() {
    
    const usuario = this.user_name;
    const surname = this.user_last_name;
    const afoto = this.user_avatar;
    this.$emit("updateProfile", usuario, surname, afoto);
    
  }
}
}
</script>

<style>

</style>