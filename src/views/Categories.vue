<template>
  <h3>📁 Categories</h3>
  <p class="subtitle">Organize your todos by category</p>

  <div class="categories-grid">
    <div
      v-for="stat in categoryStats"
      :key="stat.name"
      class="category-card"
      @click="goToCategory(stat.name)"
    >
      <div class="category-icon">{{ getCategoryIcon(stat.name) }}</div>
      <h4>{{ stat.name }}</h4>
      <div class="category-stats">
        <div class="stat-item">
          <span class="stat-label">Total:</span>
          <span class="stat-value">{{ stat.total }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Pending:</span>
          <span class="stat-value pending">{{ stat.pending }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Completed:</span>
          <span class="stat-value completed">{{ stat.completed }}</span>
        </div>
      </div>
      <div v-if="stat.total > 0" class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: (stat.completed / stat.total * 100) + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTodos } from '@/stores/todos'
import { mapState } from 'pinia'

export default {
  name: 'CategoriesView',
  computed: {
    ...mapState(useTodos, ['categoryStats'])
  },
  methods: {
    goToCategory(categoryName) {
      this.$router.push(`/categories/${categoryName.toLowerCase()}`)
    },
    getCategoryIcon(category) {
      const icons = {
        'Work': '💼',
        'Personal': '🏠',
        'Shopping': '🛒',
        'Study': '📚',
        'Health': '💪',
        'Other': '📝'
      }
      return icons[category] || '📝'
    }
  }
}
</script>

<style scoped>
.subtitle {
  color: #666;
  margin-bottom: 24px;
  font-size: 14px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.category-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  border-color: #4CAF50;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 12px;
}

.category-card h4 {
  text-align: center;
  margin: 0 0 16px 0;
  font-size: 20px;
  color: #333;
}

.category-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: bold;
  color: #333;
}

.stat-value.pending {
  color: #FF9800;
}

.stat-value.completed {
  color: #4CAF50;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  transition: width 0.3s ease;
}
</style>
