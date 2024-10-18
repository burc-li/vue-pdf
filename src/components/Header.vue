<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = ref([])
routes.value = router.getRoutes().filter(route => !route.meta.hidden)

// 监听当前路由变化
const currentRoute = ref({})
watch(
  () => router.currentRoute.value,
  (value) => {
    currentRoute.value = value
  },
)

const navigateTo = path => {
  router.push({ path })
}
</script>

<template>
  <div class="header-menu">
    <span
      class="menu-item"
      :class="{ active: currentRoute.path === route.path }"
      v-for="route in routes"
      :key="route.path"
      @click="navigateTo(route.path)"
      >{{ route.name }}</span
    >
  </div>
</template>

<style lang="less" scoped>
.header-menu {
  display: flex;
  box-shadow:
    0 1px 0 0 #0000001a,
    0 1px 5px 0 #0000001a;
  .menu-item {
    box-sizing: border-box;
    display: inline-block;
    line-height: @navHeight;
    height: @navHeight;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      color: #2d8cf0;
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.active {
      border-bottom: 2px solid #2465ff;
    }
  }
}
</style>
