<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";
import { navigateTo } from "#app";

const username = ref("");
const email = ref("");
const password = ref("");

const handleSignup = async () => {
  if (!username.value || !email.value || !password.value) {
    return Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill in all required fields.",
      confirmButtonColor: "#22c55e",
    });
  }

  try {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        username: username.value,
        email: email.value,
        password: password.value,
        role: "boarder",
      },
    });

    if (res.success) {
      await Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully!",
        confirmButtonColor: "#22c55e",
      });
      navigateTo("/auth/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: res.error || "Something went wrong.",
        confirmButtonColor: "#ef4444",
      });
    }
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: err.message,
      confirmButtonColor: "#ef4444",
    });
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
    <div
        class="flex flex-col md:flex-row w-full max-w-4xl shadow-lg border border-gray-300 rounded-none overflow-hidden"
    >
      <!-- Left Side -->
      <div class="hidden md:block md:w-1/2">
        <img
            src="/images/SystemLogo.png"
            alt="Signup visual"
            class="w-full h-full object-cover"
            loading="lazy"
        />
      </div>

      <!-- Right Side -->
      <div class="w-full md:w-1/2 bg-white p-10 flex flex-col justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-8 text-center">
            Create Your Account
          </h1>

          <v-form @submit.prevent="handleSignup">
            <v-text-field
                v-model="username"
                label="Username"
                variant="outlined"
                color="green darken-2"
                density="comfortable"
                required
                class="!rounded-none"
            />

            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                color="green darken-2"
                density="comfortable"
                required
                class="!rounded-none"
            />

            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                variant="outlined"
                color="green darken-2"
                density="comfortable"
                required
                class="!rounded-none"
            />

            <v-btn
                color="green darken-2"
                type="submit"
                block
                size="large"
                variant="flat"
                class="!rounded-none tracking-wide font-semibold text-lg"
            >
              Sign Up
            </v-btn>
          </v-form>
        </div>

        <div>
          <v-divider class="border-gray-300" />
          <p class="text-center text-gray-600 mt-5 text-sm">
            Already have an account?
            <NuxtLink to="/auth/login" class="text-green-600 font-semibold ml-1">
              Log in
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-input__control:focus-within {
  box-shadow: 0 0 8px rgb(34 197 94 / 0.5);
  border-color: #22c55e !important;
}
</style>
