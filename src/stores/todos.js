import { defineStore } from 'pinia'

export const useTodos = defineStore('useTodos', {
  state: () => ({
    nextId: 1,
    todos: [],
    categories: ['Work', 'Personal', 'Shopping', 'Study', 'Health', 'Other'],
  }),

  getters: {
    pendingTodos: (state) => state.todos.filter(todo => !todo.isCompleted),
    completedTodos: (state) => state.todos.filter(todo => todo.isCompleted),

    // Get todos by category
    todosByCategory: (state) => (categoryName) => {
      return state.todos.filter(todo => todo.category === categoryName)
    },

    // Get category statistics
    categoryStats: (state) => {
      return state.categories.map(category => {
        const todos = state.todos.filter(todo => todo.category === category)
        const completed = todos.filter(todo => todo.isCompleted).length
        return {
          name: category,
          total: todos.length,
          completed,
          pending: todos.length - completed
        }
      })
    },
  },

  actions: {
    storeTodo(payload) {
      if (!payload?.text) return
      this.todos.push({
        id: this.nextId++,
        text: String(payload.text).trim(),
        isCompleted: false,
        category: payload.category || 'Other'
      })
    },

    updateTodo(payload) {
      if (!payload || typeof payload.id === 'undefined') return
      const index = this.todos.findIndex(item => item.id === payload.id)
      if (index === -1) return
      this.todos[index] = { ...this.todos[index], ...payload }
    },

    toggleComplete(id) {
      const index = this.todos.findIndex(item => item.id === id)
      if (index === -1) return
      this.todos[index].isCompleted = !this.todos[index].isCompleted
    },

    destroyTodo(id) {
      const index = this.todos.findIndex(item => item.id === id)
      if (index === -1) return
      this.todos.splice(index, 1)
    },

    clearCompleted() {
      this.todos = this.todos.filter(t => !t.isCompleted)
    }
  }
})
