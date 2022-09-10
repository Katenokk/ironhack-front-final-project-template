<template>
  <div
    class="h-4/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 height-80"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://cdn-icons-png.flaticon.com/512/2883/2883031.png"
          alt="trisquel"
        />

        <h2
          class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900"
        >
          Welcome to the to-do app!
        </h2>
        <p v-if="errorMsg" class="mt-2 text-center text-sm text-red-600">
          {{ errorMsg }}
        </p>
      </div>
      <form
        class="flex flex-col mt-8 space-y-6"
        @submit.prevent="signIn(email, password)"
      >
        <input type="hidden" name="remember" value="true" />
        <div class="flex flex-col gap-4 rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" name="email" class="sr-only">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="your@email.com"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              required
              v-model="password"
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              autocomplete="current-password"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              @click="forgotPassword"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: mini/lock-closed -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
      <div class="text-center pb-12">
        <p>
          Don't have an account?
          <button @click="isSignedIn" class="underline font-semibold">
            click here to sign up
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import { useUserStore } from "../store/user";
// import { mapStores } from 'pinia';
//import { supabase } from "../supabase";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      email: null,
      password: null,
      errorMsg: null,
    };
  },
  // computed: {
  //     ...mapStores(useUserStore)
  // },
  mounted() {},
  methods: {
    async signIn(email, password) {
      this.email = email;
      this.password = password;
      try {
        await this.userStore.signIn(this.email, this.password);
        router.push({ path: "/" });
      } catch (error) {
        console.log(error.message);
        this.errorMsg = error.message;
      }
    },

    async forgotPassword(email) {
      try {
        await this.userStore.forgotPassword(this.email);
        //si el usuario  existe
        const res = await this.userStore.userExist(this.email);
        console.log(res);
        if (res) {
          router.push({ path: "/reset_pwd" }); //va a la vista ResetPassword
        } else {
          this.errorMsg = "The user doesn't exist";
          console.log(this.errorMsg);
        }
      } catch (error) {
        console.log(error);
        this.errorMsg = error.message;
      }
    },
    //llama a Auth para cambiar el v-if a y mostrar signUp
    isSignedIn() {
      this.$emit("isSignedIn")
     
    }
  },
};
</script>

<style>
.height-80 {
  /*height: 80vh; no sirve para nada ahora
    ??*/
  margin-bottom: 120px;
}
.m-top {
  margin-top: 0;
}
</style>