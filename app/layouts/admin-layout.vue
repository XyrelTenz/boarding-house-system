<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 to-green-50">
    <!-- Sidebar -->
    <aside
        :class="[
              'bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl transition-[width] duration-500 ease-in-out flex flex-col fixed md:static z-50 h-screen',
              isOpen ? 'w-64' : 'w-24',
              isMobile ? (isOpen ? 'left-0' : '-left-64') : ''
            ]"
    >
      <!-- Logo Section -->
      <div class="flex items-center justify-center p-4 border-b border-slate-200/60 bg-gradient-to-r from-green-600 to-green-400">
        <div v-if="isOpen" class="flex items-center gap-2 whitespace-nowrap">
          <div class="relative">
            <div class="w-10 h-10 flex items-center justify-center">
              <i class="mdi mdi-home-city text-white text-xl"></i>
            </div>
          </div>
          <div>
            <h1 class="text-lg font-bold text-white">Admin Panel</h1>
          </div>
        </div>
        <div v-else class="relative">
          <div class="w-10 h-10 flex items-center justify-center">
            <i class="mdi mdi-home-city text-white text-xl"></i>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-4 px-2 space-y-1">
        <NuxtLink
            v-for="item in menu"
            :key="item.to"
            :to="item.to"
            :class="getLinkClass(item.to)"
            @click="handleNavClick"
        >
          <div
              class="flex items-center justify-center w-8 h-8"
              :class="isActive(item.to) ? 'bg-green-100 text-green-600' : 'text-slate-600'"
          >
            <i :class="['mdi', item.icon, 'text-md']"></i>
          </div>
          <div v-if="isOpen" class="flex flex-col ml-2">
            <span class="font-medium text-sm">{{ item.label }}</span>
            <span class="text-xs text-slate-400">{{ item.description }}</span>
          </div>
          <div
              v-if="isActive(item.to)"
              :class="[isOpen ? 'block' : 'hidden']"
              class="ml-auto w-1 h-6 bg-green-600 rounded-full"
          ></div>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 min-w-0">
      <!-- Enhanced Header -->
      <header class="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div class="flex justify-between items-center py-2">
          <div class="flex items-center">
            <v-btn
                @click="toggleSidebar"
                variant="text"
                icon
                class="text-slate-600 hover:bg-transparent active:bg-transparent"
                size="large"
            >
              <v-icon size="24">
                {{ isOpen ? 'mdi mdi-backburger' : 'mdi mdi-forwardburger' }}
              </v-icon>
            </v-btn>


            <div class="flex items-center gap-2">
              <div class="w-1 h-8 bg-green-600"></div>
              <div class="flex flex-col">
                <h1 class="text-lg lg:text-xl text-slate-700">{{ pageTitle }}</h1>
                <div class="flex flex-row items-center gap-2 text-xs lg:text-sm text-slate-500">
                  <p class="mdi mdi-clock-time-five-outline"></p>
                  <p>{{ getCurrentDate() }}</p>
                </div>
              </div>
            </div>

          </div>

          <!-- Enhanced Profile Menu -->
          <div class="flex items-center gap-4">
            <!-- Profile Dropdown -->
            <v-menu offset-y location="bottom end">
              <template #activator="{ props }">
                <div
                    v-bind="props"
                    class="flex items-center gap-3 cursor-pointer px-3 py-2"
                >
                  <div class="text-right">
                    <p class="text-sm font-medium text-slate-700">Xyrel D. Tenefrancia</p>
                    <p class="text-xs text-slate-500 text-center">Administrator</p>
                  </div>
                  <div class="relative">
                    <div class="w-10 h-10 flex items-center justify-center shadow-lg ring-1 ring-green-600 rounded-full">
                      <i class="mdi mdi-account text-xl"></i>
                    </div>
                  </div>
                </div>
              </template>

              <v-card class="shadow-md border-0 min-w-[180px]">
                <v-card-text class="p-1">
                  <v-list dense class="p-0">

                    <!-- Profile -->
                    <v-list-item :ripple="false" class="hover:bg-slate-50 px-2 py-1 cursor-pointer">
                      <template #prepend>
                        <v-icon class="text-slate-600 text-lg">mdi-account-circle</v-icon>
                      </template>
                      <v-list-item-title>
                        <NuxtLink to="/admin/profile" class="text-slate-700 text-sm font-medium">
                          Profile
                        </NuxtLink>
                      </v-list-item-title>
                    </v-list-item>

                    <v-divider class="my-0"></v-divider>

                    <!-- Sign Out -->
                    <v-list-item :ripple="false" class="hover:bg-red-50 px-2 py-1 cursor-pointer">
                      <template #prepend>
                        <v-icon class="text-red-500 text-lg">mdi-logout</v-icon>
                      </template>
                      <v-list-item-title>
                        <button @click="logout" class="text-red-500 text-sm font-medium">
                          Sign Out
                        </button>
                      </v-list-item-title>
                    </v-list-item>

                  </v-list>
                </v-card-text>
              </v-card>


            </v-menu>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 overflow-y-auto">
        <div class="max-w-8xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div
        v-if="isMobile && isOpen"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import { useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const { logout } = useAuth()
const isOpen = ref(true)
const isMobile = ref(false)
const route = useRoute()

// Admin Menu
const menu = [
  {
    label: 'Dashboard',
    to: '/admin/',
    icon: 'mdi-view-dashboard',
    description: 'Overview & stats'
  },
  {
    label: 'Boarders',
    to: '/admin/boarders',
    icon: 'mdi-account-group',
    description: 'Manage residents'
  },
  {
    label: 'Rooms',
    to: '/admin/rooms',
    icon: 'mdi-bed',
    description: 'Room assignments'
  },
  {
    label: 'Payments',
    to: '/admin/payments',
    icon: 'mdi-credit-card',
    description: 'Billing & fees'
  },
  {
    label: 'Staff',
    to: '/admin/staff',
    icon: 'mdi-account-tie',
    description: 'Manage staff'
  },
  {
    label: 'Records',
    to: '/admin/reports',
    icon: 'mdi-chart-line',
    description: 'Reports & analytics'
  },
]

// Titles for pages
const routeTitles: Record<string, string> = {
  '/admin/': 'Dashboard Overview',
  '/admin/boarders': 'Boarders Management',
  '/admin/rooms': 'Room Assignments',
  '/admin/payments': 'Payments & Billing',
  '/admin/staff': 'Staff Management',
  '/admin/reports': 'Records & Reports',
  '/admin/settings': 'System Settings',
  '/admin/profile': 'Profile Settings',
}

// Computed page title
const pageTitle = computed(() => routeTitles[route.path] || 'Dashboard')

// Get current date
const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const normalizePath = (p: string) => p.replace(/\/+$/, '')

const isActive = (path: string) => {
  const current = normalizePath(route.path)
  const target = normalizePath(path)

  if (current === target) return true
  return target !== '/admin' && current.startsWith(target);

}

const getLinkClass = (path: string) => [
  'group flex items-center p-4 mx-2 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm',
  isOpen.value ? 'gap-4 justify-start' : 'justify-center',
  isActive(path)
      ? 'bg-green-50 border border-green-200/60 shadow-sm'
      : ''
]

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) isOpen.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

// Toggle sidebar
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// Close sidebar on mobile navigation
const handleNavClick = () => {
  if (isMobile.value) isOpen.value = false
}
</script>


<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.v-list-item {
  transition: all 0.2s ease;
}

.v-btn {
  transition: all 0.2s ease;
}
</style>