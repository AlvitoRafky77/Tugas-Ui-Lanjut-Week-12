<template>
  <h3>To-Do ⏳</h3>
  <div>
    <form @submit.prevent="onAdd" class="add-form">
      <div class="form-row">
        <input v-model="todo.text" type="text" name="text" placeholder="Tambah todo..." />
        <select v-model="todo.category" class="category-select">
          <option value="" disabled>Select category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <button :disabled="!todo.text" type="submit">Add</button>
      </div>
    </form>
  </div>

  <div>
    <ul>
      <li v-for="pendingTodo in pendingTodos" :key="pendingTodo.id" class="todo-item">
        <div v-if="editingId !== pendingTodo.id" class="todo-left">
          <input type="checkbox" :checked="pendingTodo.isCompleted" @change="onToggleComplete(pendingTodo.id, pendingTodo.text)" />
          <div class="todo-content">
            <span>{{ pendingTodo.text }}</span>
            <span class="category-badge">{{ pendingTodo.category }}</span>
          </div>
        </div>
        <div class="todo-actions" v-if="editingId !== pendingTodo.id">
          <button @click="startEdit(pendingTodo)">Edit</button>
          <button @click="destroyTodo(pendingTodo.id)">Remove</button>
        </div>

        <div v-if="editingId === pendingTodo.id" class="todo-edit">
          <input v-model="editingText" type="text" />
          <button @click="saveEdit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="toastVisible" class="toast">{{ toastMessage }}</div>
</template>

<script>
import { useTodos } from '@/stores/todos'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
  name: 'TodoView',
  computed: {
    ...mapState(useTodos, [
      'pendingTodos',
      'categories'
    ])
  },

  data () {
    return {
      todo: {
        text: null,
        isCompleted: false,
        category: 'Other'
      },
      editingId: null,
      editingText: null,
      toastVisible: false,
      toastMessage: null,
      toastTimer: null,
    }
  },

  methods: {
    ...mapActions(useTodos, [
      'storeTodo',
      'updateTodo',
      'destroyTodo',
      'toggleComplete'
    ]),

    onAdd() {
      // trigger store action via mapped method
      this.storeTodo(this.todo)
      this.todo.text = null
      this.todo.category = 'Other'
    },

    startEdit(item) {
      this.editingId = item.id
      this.editingText = item.text
    },

    cancelEdit() {
      this.editingId = null
      this.editingText = null
    },

    saveEdit() {
      if (!this.editingText) return
      this.updateTodo({ id: this.editingId, text: this.editingText })
      this.cancelEdit()
    },

    onToggleComplete(id, text) {
      // Toggle the todo in the store
      this.toggleComplete(id)

      // Show toast notification when a todo is marked as completed
      this.toastMessage = `✅ "${text}" selesai`;
      this.toastVisible = true;
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.toastVisible = false;
      }, 2000);
    },
  }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.form-row input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.category-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
}

.category-select:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-row button {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.form-row button:hover:not(:disabled) {
  background: #45a049;
}

.form-row button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.todo-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.category-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.todo-actions {
  display: flex;
  gap: 6px;
}

.todo-actions button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.todo-actions button:hover {
  background: #f5f5f5;
}

.todo-edit {
  display: flex;
  gap: 6px;
  flex: 1;
}

.todo-edit input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #323232;
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 1000;
}
</style>
