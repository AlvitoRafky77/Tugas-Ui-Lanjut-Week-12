<template>
  <header class="header">
    <h1>My List</h1>
    <nav>
      <RouterLink to="/" class="nav-link">Todo</RouterLink>
      <RouterLink to="/completed" class="nav-link">Completed</RouterLink>
      <RouterLink to="/categories" class="nav-link">Categories</RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>
