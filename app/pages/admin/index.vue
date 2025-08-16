<script setup lang="ts">

definePageMeta({
  layout: 'admin-layout'
})

interface User {
  user_id: number;
  email: string;
  password: string;
  username: string;
  role: string;
}

const users = ref<User[]>([]);

onMounted(async () => {
  const res = await fetch('/api/admin/user')
  const data = await res.json()
  users.value = data.users as User[]
})

</script>

<template>
  <ul>
  <li v-for="user in users" :key="user.user_id">
    {{ user.username}}
    {{ user.password }}
  </li>
</ul>
</template>

<style scoped>

</style>