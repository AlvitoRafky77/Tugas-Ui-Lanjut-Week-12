<template>
  <div class="category-detail">
    <div class="category-header">
      <button @click="goBack" class="back-button">← Back</button>
      <div class="category-title">
        <span class="category-icon">{{ categoryIcon }}</span>
        <h3>{{ categoryName }}</h3>
      </div>
      <div class="category-summary">
        <span class="badge">{{ categoryTodos.length }} todos</span>
        <span class="badge completed">{{ completedCount }} completed</span>
        <span class="badge pending">{{ pendingCount }} pending</span>
      </div>
    </div>

    <!-- Add new todo form -->
    <div class="add-todo-section">
      <form @submit.prevent="onAdd">
        <input
          v-model="newTodo.text"
          type="text"
          name="text"
          :placeholder="`Add new todo to ${categoryName}...`"
        />
        <button :disabled="!newTodo.text" type="submit">Add</button>
      </form>
    </div>

    <!-- Todo list -->
    <div class="todos-list">
      <div v-if="categoryTodos.length === 0" class="empty-state">
        <p>📭 No todos in this category yet!</p>
        <p class="empty-hint">Add your first todo above</p>
      </div>

      <ul v-else>
        <li v-for="todo in categoryTodos" :key="todo.id" class="todo-item" :class="{ completed: todo.isCompleted }">
          <div v-if="editingId !== todo.id" class="todo-left">
            <input
              type="checkbox"
              :checked="todo.isCompleted"
              @change="onToggleComplete(todo.id, todo.text)"
            />
            <span>{{ todo.text }}</span>
          </div>
          <div class="todo-actions" v-if="editingId !== todo.id">
            <button @click="startEdit(todo)" class="btn-edit">Edit</button>
            <button @click="destroyTodo(todo.id)" class="btn-remove">Remove</button>
          </div>

          <div v-if="editingId === todo.id" class="todo-edit">
            <input v-model="editingText" type="text" />
            <button @click="saveEdit" class="btn-save">Save</button>
            <button @click="cancelEdit" class="btn-cancel">Cancel</button>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="toastVisible" class="toast">{{ toastMessage }}</div>
  </div>
</template>

<script>
import { useTodos } from '@/stores/todos'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'CategoryDetailView',
  data() {
    return {
      newTodo: {
        text: null,
      },
      editingId: null,
      editingText: null,
      toastVisible: false,
      toastMessage: null,
      toastTimer: null,
    }
  },
  computed: {
    ...mapState(useTodos, ['todosByCategory']),
    categoryName() {
      // Capitalize first letter
      const name = this.$route.params.name
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    categoryTodos() {
      return this.todosByCategory(this.categoryName)
    },
    completedCount() {
      return this.categoryTodos.filter(todo => todo.isCompleted).length
    },
    pendingCount() {
      return this.categoryTodos.filter(todo => !todo.isCompleted).length
    },
    categoryIcon() {
      const icons = {
        'Work': '💼',
        'Personal': '🏠',
        'Shopping': '🛒',
        'Study': '📚',
        'Health': '💪',
        'Other': '📝'
      }
      return icons[this.categoryName] || '📝'
    }
  },
  methods: {
    ...mapActions(useTodos, ['storeTodo', 'updateTodo', 'destroyTodo', 'toggleComplete']),

    goBack() {
      this.$router.push('/categories')
    },

    onAdd() {
      this.storeTodo({
        text: this.newTodo.text,
        category: this.categoryName
      })
      this.newTodo.text = null
      this.showToast(`✅ Added to ${this.categoryName}`)
    },

    startEdit(todo) {
      this.editingId = todo.id
      this.editingText = todo.text
    },

    cancelEdit() {
      this.editingId = null
      this.editingText = null
    },

    saveEdit() {
      if (!this.editingText) return
      this.updateTodo({ id: this.editingId, text: this.editingText })
      this.showToast('✏️ Todo updated')
      this.cancelEdit()
    },

    onToggleComplete(id, text) {
      this.toggleComplete(id)
      const todo = this.categoryTodos.find(t => t.id === id)
      if (todo && todo.isCompleted) {
        this.showToast(`✅ "${text}" completed!`)
      }
    },

    showToast(message) {
      this.toastMessage = message
      this.toastVisible = true
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toastVisible = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.category-detail {
  max-width: 800px;
  margin: 0 auto;
}

.category-header {
  margin-bottom: 24px;
}

.back-button {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 16px;
  font-size: 14px;
}

.back-button:hover {
  background: #e0e0e0;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.category-icon {
  font-size: 36px;
}

.category-title h3 {
  margin: 0;
  font-size: 28px;
}

.category-summary {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  background: #e0e0e0;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.badge.completed {
  background: #C8E6C9;
  color: #2E7D32;
}

.badge.pending {
  background: #FFE0B2;
  color: #E65100;
}

.add-todo-section {
  margin-bottom: 24px;
}

.add-todo-section form {
  display: flex;
  gap: 8px;
}

.add-todo-section input {
  flex: 1;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
}

.add-todo-section input:focus {
  outline: none;
  border-color: #4CAF50;
}

.add-todo-section button {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.add-todo-section button:hover:not(:disabled) {
  background: #45a049;
}

.add-todo-section button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: #666;
}

.empty-state p {
  margin: 8px 0;
}

.empty-hint {
  font-size: 14px;
  color: #999;
}

.todos-list ul {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 8px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;
}

.todo-item.completed {
  opacity: 0.6;
  background: #f5f5f5;
}

.todo-item:hover {
  border-color: #4CAF50;
}

.todo-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.todo-left input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-left span {
  font-size: 16px;
}

.todo-item.completed .todo-left span {
  text-decoration: line-through;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.todo-actions button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.btn-edit:hover {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.btn-remove:hover {
  background: #f44336;
  color: white;
  border-color: #f44336;
}

.todo-edit {
  display: flex;
  gap: 8px;
  flex: 1;
}

.todo-edit input {
  flex: 1;
  padding: 8px;
  border: 2px solid #2196F3;
  border-radius: 6px;
}

.btn-save {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancel {
  background: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #323232;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

@keyframes slideIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
