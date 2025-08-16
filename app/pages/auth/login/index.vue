<script lang="ts" setup>
import { ref } from 'vue'
import { navigateTo } from '#app'
import Swal from 'sweetalert2'

const email = ref('')
const password = ref('')
const user = useState<any>('user', () => null)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    return Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please enter both email and password.',
      confirmButtonColor: '#22c55e'
    })
  }

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      } as any
    })

    if (res.success) {
      user.value = res.user
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${res.user.username}!`,
        confirmButtonColor: '#22c55e'
      })
      navigateTo(res.user.role === 'admin' ? '/admin' : '/client')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: res.error || 'Invalid credentials',
        confirmButtonColor: '#ef4444'
      })
    }
  } catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: err.message,
      confirmButtonColor: '#ef4444'
    })
  }
}
</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
    <div class="flex flex-col md:flex-row w-full max-w-4xl shadow-lg border border-gray-300 rounded-none overflow-hidden">
      <!-- Left Side -->
      <div class="hidden md:block md:w-1/2">
        <img
          src="/images/SystemLogo.png"
          alt="Login visual"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <!-- Right Side -->
      <div class="w-full md:w-1/2 bg-white p-10 flex flex-col justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-8 text-center">
            Welcome to Three's Maria's
          </h1>

          <v-form @submit.prevent="handleLogin" class="space-y-6">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              variant="outlined"
              color="green darken-2"
              density="comfortable"
              required
              class="!rounded-none -mb-7"
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
              Login
            </v-btn>
          </v-form>
        </div>

        <div>
          <v-divider class="border-gray-300" />
            <p class="text-center text-gray-600 mt-5 text-sm">
              Don’t have an account?
              <NuxtLink to="/auth/signup" class="text-green-600 font-semibold ml-1">
                Create one
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
