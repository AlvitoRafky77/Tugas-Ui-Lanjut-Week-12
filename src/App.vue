<template>
  <div class="layout">
    <AppHeader />
    <main class="main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue"
import AppFooter from "./components/Footer.vue"
export default {
  name: 'AppRoot',
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>
