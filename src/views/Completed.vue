<template>
  <div class="completed-container">
    <div class="completed-header">
      <h3>Completed ✅</h3>
      <div class="completed-meta">
        <span class="count">{{ completedTodos.length }} items</span>
        <button v-if="completedTodos.length" @click="clearCompleted" class="clear-btn">Clear Completed</button>
      </div>
    </div>

    <div v-if="!completedTodos.length" class="empty-state">Tidak ada task yang selesai</div>

    <ul v-else class="completed-list">
      <li v-for="completedTodo in completedTodos" :key="completedTodo.id" class="completed-item">
        <div class="completed-left">
          <span class="completed-text">{{ completedTodo.text }}</span>
        </div>
        <div class="completed-actions">
          <button class="btn-secondary" @click="toggleComplete(completedTodo.id)">Mark as Pending</button>
          <button class="btn-danger" @click="destroyTodo(completedTodo.id)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useTodos } from '@/stores/todos'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
  name: 'CompletedTodos',
  computed: {
    ...mapState(useTodos, ['completedTodos']),
  },
  methods: {
    ...mapActions(useTodos, ['toggleComplete', 'destroyTodo', 'clearCompleted'])
  },
}
</script>
