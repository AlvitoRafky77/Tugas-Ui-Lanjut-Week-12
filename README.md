# akulaharjuna - To-Do List with Categories

To-Do List application built with Vue 3, Vue Router, and Pinia for state management.

## 🎯 New Feature: Categories

Organize your todos by categories! The new Categories feature allows you to:
- Group todos into 6 predefined categories: Work, Personal, Shopping, Study, Health, and Other
- View all categories with todo statistics (total, pending, completed)
- Navigate to category-specific views to see filtered todos
- Add new todos directly to a specific category
- Track progress with visual progress bars for each category

### 📹 Video Presentation

Watch the feature demonstration and implementation explanation:
**[🎥 Loom Video Link - Coming Soon]**

## 🚀 Features

### Main Features
- ✅ Add, edit, and delete todos
- ✅ Mark todos as completed
- ✅ View pending and completed todos separately
- ✅ Toast notifications for user actions

### Categories Feature (NEW! 🆕)
- 📁 **Categories Overview** - View all 6 categories with statistics
- 🏷️ **Category Selection** - Assign category when creating todos
- 📊 **Progress Tracking** - Visual progress bars showing completion rate
- 🎯 **Category Detail View** - Dedicated page for each category with filtered todos
- 🔄 **Dynamic Routing** - Use `/categories/:name` for category-specific views

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management library
- **Vite** - Next generation frontend tooling

## 📂 Project Structure

```
src/
├── components/
│   ├── Header.vue          # Navigation header
│   └── Footer.vue          # Footer component
├── views/
│   ├── Todo.vue           # Main todo list view
│   ├── Completed.vue      # Completed todos view
│   ├── Categories.vue     # Categories overview (NEW!)
│   └── CategoryDetail.vue # Single category detail (NEW!)
├── stores/
│   ├── index.js
│   └── todos.js           # Pinia store with categories support (UPDATED!)
├── router/
│   └── index.js           # Vue Router configuration (UPDATED!)
├── App.vue
└── main.js
```

## 🎨 Implementation Highlights

### State Management (Pinia)
The todos store has been enhanced with:
- `categories` - Array of available categories
- `todosByCategory(categoryName)` - Getter to filter todos by category
- `categoryStats` - Computed statistics for all categories

### Routing
New routes added:
- `/categories` - Categories overview page
- `/categories/:name` - Dynamic route for category details (e.g., `/categories/work`)

### Component Updates
- **Todo.vue** - Added category dropdown for todo creation
- **Header.vue** - Added navigation link to Categories page
- **Categories.vue** - New page displaying all categories with statistics
- **CategoryDetail.vue** - New page for managing todos within a specific category

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
