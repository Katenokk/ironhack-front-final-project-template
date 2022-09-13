<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
          Create your account
        </h2>
        <!-- error message -->
        <div
          v-if="errorMsg"
          class="bg-red-100 mt-3 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span class="block sm:inline"> {{ errorMsg }} </span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </span>
        </div>
      </div>
      <form class="flex flex-col mt-6 space-y-6" @submit.prevent="isValid()">
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
          <div>
            <label for="repPassword" class="sr-only">Confirm password</label>
            <input
              required
              v-model="repeatPassword"
              name="repeatPassword"
              type="password"
              id="repPassword"
              placeholder="Confirm password"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <!-- rellenar con algo? -->
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
            Sign Up
          </button>
        </div>
      </form>
      <div class="text-center pb-12">
        <p>
          Already have an account?
          <button @click="isSignedIn" class="underline font-semibold">
            click here to sign in
          </button>
        </p>
      </div>
    </div>
  </div>

  <div
    v-if="isSignedUp"
    class="flex max-w-xl mx-auto items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
    role="alert"
  >
    <svg
      class="fill-current w-4 h-4 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
      />
    </svg>
    <p>
      You received an email with a confirmation link, please, confirm your
      account.
    </p>
  </div>
</template>

<script>
import router from "../router";
import { useUserStore } from "../store/user";
import { mapStores } from "pinia";
export default {
  // setup() {
  // const user = useUserStore();
  // return { user };
  // },

  data() {
    return {
      email: null,
      password: null,
      repeatPassword: null,
      errorMsg: null,
      isSignedUp: false,
      users: [],
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async signUp(email, password) {
      this.email = email;
      this.password = password;
      const res = await this.userStore.userExist(this.email);
      try {
        if (res === false) {
          //si ese email no esta registrado
          await this.userStore.signUp(this.email, this.password);
          this.isSignedUp = true; //no redirige
        } else {
          this.errorMsg = "The user already exists";
        }
      } catch (error) {
        console.log(error);
        this.errorMsg = error.message;
      }
      //falta otro error??
    },
    //comprobaciones entrada datos usuario:
    isValid() {
      if (
        this.checkEmail(this.email) &&
        this.checkPassword(this.password, this.repeatPassword)
      ) {
        this.signUp(this.email, this.password);
      } else {
        console.log(this.errorMsg);
      }
    },
    checkEmail(email) {
      this.email = email;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        this.errorMsg = "please enter a valid email";
        setTimeout(() => {this.errorMsg = null}, 2000);
      }
    },
    checkPassword(password, repeatPassword) {
      this.password = password;
      this.repeatPassword = repeatPassword;
      //al menos una min. una may. y un número, de 6 a 20 cc
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (password.match(passw)) {
        if (password !== repeatPassword) {
          this.errorMsg = "Please type the correct password";
          setTimeout(() => {this.errorMsg = null}, 2000);
        } else {
          return true;
        }
      } else {
        this.errorMsg = "The password must have at least...."
        setTimeout(() => {this.errorMsg = null}, 2000);
        return false;
      }
    },
    //llama a Auth para cambiar el v-if a y mostrar signIn
    isSignedIn() {
      this.$emit("isSignedIn");
    },
  },
};
</script>

<style></style>