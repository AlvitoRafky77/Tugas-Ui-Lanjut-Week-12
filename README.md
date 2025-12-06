# Aplikasi To-Do List dengan Fitur Kategori

Tugas Pengembangan UI Lanjut - Week 12  
Aplikasi manajemen tugas (To-Do List) yang dibangun menggunakan Vue 3, Vue Router, dan Pinia untuk state management.

## 📋 Deskripsi Proyek

Aplikasi ini adalah sistem manajemen tugas yang memungkinkan pengguna untuk membuat, mengedit, menghapus, dan mengorganisir tugas-tugas mereka berdasarkan kategori. Aplikasi ini dibuat sebagai bagian dari mata kuliah Pengembangan UI Lanjut dengan fokus pada implementasi fitur kategori yang terintegrasi.

## 🎯 Fitur Utama Aplikasi

### Fitur Dasar
- ✅ **Tambah Tugas** - Menambahkan tugas baru dengan kategori yang dipilih
- ✅ **Edit Tugas** - Mengubah teks tugas yang sudah ada
- ✅ **Hapus Tugas** - Menghapus tugas dari daftar
- ✅ **Tandai Selesai** - Menandai tugas sebagai selesai atau belum selesai
- ✅ **Tampilan Terpisah** - Melihat tugas yang pending dan yang sudah selesai secara terpisah
- ✅ **Notifikasi Toast** - Menampilkan pesan notifikasi untuk setiap aksi pengguna

## Link Video Presentasi : 
https://www.loom.com/share/d5a21804e1d4408897d73a4cdd68ac51

### Fitur Kategori (BARU! 🆕)
Fitur kategori memungkinkan pengguna untuk mengorganisir tugas mereka dengan lebih baik:

1. **📁 Halaman Kategori Utama** (`/categories`)
   - Menampilkan 6 kategori yang sudah ditentukan: Work (Pekerjaan), Personal (Pribadi), Shopping (Belanja), Study (Belajar), Health (Kesehatan), dan Other (Lainnya)
   - Setiap kartu kategori menampilkan ikon emoji yang sesuai
   - Statistik real-time untuk setiap kategori (total tugas, pending, selesai)
   - Progress bar visual yang menunjukkan persentase penyelesaian
   - Kartu kategori dapat diklik untuk masuk ke halaman detail

2. **🏷️ Pemilihan Kategori**
   - Saat menambah tugas baru, pengguna dapat memilih kategori dari dropdown
   - Setiap tugas memiliki badge kategori yang menampilkan kategorinya
   - Default kategori adalah "Other" jika tidak dipilih

3. **📊 Tracking Progress**
   - Progress bar menampilkan persentase tugas yang sudah selesai di setiap kategori
   - Statistik dinamis yang update otomatis saat status tugas berubah
   - Visual yang jelas antara tugas pending (kuning) dan completed (hijau)

4. **🎯 Halaman Detail Kategori** (`/categories/:name`)
   - Halaman khusus untuk setiap kategori dengan URL dinamis
   - Menampilkan hanya tugas yang sesuai dengan kategori tersebut
   - Form untuk menambah tugas baru langsung ke kategori tersebut
   - Header dengan badge yang menunjukkan jumlah total, completed, dan pending
   - Tombol back untuk kembali ke halaman kategori utama
   - Fitur edit dan hapus tugas langsung dari halaman kategori

5. **🔄 Dynamic Routing**
   - Route dinamis menggunakan parameter `:name` di URL
   - Contoh: `/categories/work`, `/categories/personal`, dll.
   - Navigasi yang smooth menggunakan Vue Router

## 🛠️ Teknologi yang Digunakan

- **Vue 3** - Framework JavaScript progresif untuk membangun user interface
- **Vue Router** - Library routing resmi untuk Vue.js, digunakan untuk navigasi antar halaman
- **Pinia** - Library state management modern untuk Vue, menggantikan Vuex
- **Vite** - Build tool modern yang cepat untuk development dan production

## 📂 Struktur Proyek

```
src/
├── components/
│   ├── Header.vue          # Komponen navigasi header dengan menu utama
│   └── Footer.vue          # Komponen footer aplikasi
├── views/
│   ├── Todo.vue           # Halaman utama daftar tugas yang pending
│   ├── Completed.vue      # Halaman daftar tugas yang sudah selesai
│   ├── Categories.vue     # Halaman overview semua kategori (BARU!)
│   └── CategoryDetail.vue # Halaman detail kategori spesifik (BARU!)
├── stores/
│   ├── index.js           # File konfigurasi Pinia store
│   └── todos.js           # Pinia store untuk todos dengan dukungan kategori (DIPERBARUI!)
├── router/
│   └── index.js           # Konfigurasi Vue Router dengan route baru (DIPERBARUI!)
├── App.vue                # Root component aplikasi
└── main.js                # Entry point aplikasi
```

## 🎨 Detail Implementasi

### 1. State Management dengan Pinia (`stores/todos.js`)

Store todos telah ditingkatkan dengan fitur-fitur berikut:

**State:**
- `nextId` - ID otomatis untuk tugas baru
- `todos` - Array yang menyimpan semua tugas
- `categories` - Array berisi 6 kategori yang tersedia

**Getters:**
- `pendingTodos` - Filter tugas yang belum selesai
- `completedTodos` - Filter tugas yang sudah selesai
- `todosByCategory(categoryName)` - Filter tugas berdasarkan nama kategori (untuk halaman detail)
- `categoryStats` - Menghitung statistik untuk semua kategori (total, completed, pending)

**Actions:**
- `storeTodo(payload)` - Menyimpan tugas baru dengan kategori
- `updateTodo(payload)` - Update data tugas
- `toggleComplete(id)` - Toggle status completed/pending
- `destroyTodo(id)` - Hapus tugas dari store
- `clearCompleted()` - Hapus semua tugas yang sudah selesai

### 2. Routing dengan Vue Router (`router/index.js`)

Route yang tersedia:
- `/` - Halaman utama (Todo.vue) menampilkan tugas pending
- `/completed` - Halaman tugas yang sudah selesai
- `/categories` - Halaman overview semua kategori (BARU!)
- `/categories/:name` - Route dinamis untuk detail kategori, contoh: `/categories/work` (BARU!)

### 3. Komponen dan Views

**Todo.vue** (DIPERBARUI)
- Menambahkan dropdown select untuk memilih kategori saat membuat tugas
- Menampilkan badge kategori pada setiap item tugas
- Integrasi dengan Pinia store untuk categories

**Categories.vue** (BARU)
- Menampilkan grid card untuk semua kategori
- Setiap card memiliki ikon emoji, nama kategori, dan statistik
- Progress bar visual untuk setiap kategori
- Clickable card yang navigate ke halaman detail
- Hover effect untuk UX yang lebih baik

**CategoryDetail.vue** (BARU)
- Header dengan ikon kategori dan badge statistik
- Form untuk menambah tugas langsung ke kategori tersebut
- Daftar tugas yang difilter berdasarkan kategori
- Fitur edit dan hapus tugas
- Toggle checkbox untuk mark as completed
- Tombol back untuk kembali ke halaman categories
- Empty state message jika kategori kosong
- Toast notification untuk feedback user

### 4. Fitur Visual dan UX

- **Progress Bar**: Menampilkan persentase completion secara visual
- **Emoji Icons**: Setiap kategori memiliki ikon emoji yang unik dan relevan
- **Color Coding**: Badge dengan warna berbeda untuk pending (kuning) dan completed (hijau)
- **Hover Effects**: Efek hover pada card kategori dengan transform dan shadow
- **Responsive Grid**: Layout grid yang responsive untuk kartu kategori
- **Toast Notifications**: Feedback visual untuk setiap aksi pengguna
- **Empty State**: Pesan yang user-friendly saat kategori kosong

## 📹 Video Presentasi

Link video demonstrasi fitur dan penjelasan implementasi:
**[🎥 Link Video Loom - Akan Ditambahkan]**

## 💻 Cara Menjalankan Proyek

### Prerequisites (Prasyarat)
- Node.js versi 20.19.0 atau 22.12.0 ke atas
- npm (Node Package Manager) - terinstall otomatis dengan Node.js

### Langkah-Langkah Instalasi dan Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   ```
   Perintah ini akan menginstall semua package yang diperlukan yang tercantum di `package.json`

2. **Menjalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia)

3. **Build untuk Production**
   ```bash
   npm run build
   ```
   Akan membuat versi production-ready di folder `dist`

4. **Preview Production Build**
   ```bash
   npm run preview
   ```
   Melihat hasil build production sebelum deploy

5. **Linting dan Formatting**
   ```bash
   npm run lint      # Check dan fix masalah code quality
   npm run format    # Format code dengan Prettier
   ```

## 🎓 Setup IDE dan Browser (Rekomendasi)

### IDE Setup
- **Direkomendasikan**: [VS Code](https://code.visualstudio.com/) 
- **Extension**: [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **Note**: Disable extension Vetur jika terinstall (konflik dengan Vue Official)

### Browser Setup
- **Chrome/Edge/Brave**:
  - Install [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - Aktifkan [Custom Object Formatter](http://bit.ly/object-formatters) di DevTools
  
- **Firefox**:
  - Install [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - Aktifkan [Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📖 Penjelasan Konsep Penting

### Pinia State Management
Pinia adalah library state management yang lebih sederhana dari Vuex. Dalam proyek ini:
- **Centralized State**: Semua data todos disimpan di satu tempat
- **Reactive**: Perubahan state otomatis update UI
- **Getters**: Computed values yang di-cache untuk performa
- **Actions**: Method untuk memodifikasi state

### Vue Router
- **Single Page Application (SPA)**: Tidak reload halaman saat navigasi
- **Dynamic Routes**: Route dengan parameter seperti `/categories/:name`
- **Navigation Guards**: Bisa ditambahkan untuk proteksi route (jika diperlukan)

### Reactive Data Flow
```
User Action → Component Method → Pinia Action → Update State → UI Auto-Update
```

## 🔍 Cara Kerja Fitur Kategori

1. **Saat User Menambah Tugas**:
   - User pilih kategori dari dropdown
   - Component call `storeTodo()` action di Pinia store
   - Tugas disimpan dengan properti `category`
   - UI update otomatis menampilkan tugas baru dengan badge kategori

2. **Saat Membuka Halaman Categories**:
   - Component mengambil `categoryStats` dari Pinia getter
   - Getter menghitung statistik real-time untuk semua kategori
   - Render grid card dengan data statistik dan progress bar

3. **Saat Klik Card Kategori**:
   - Router navigate ke `/categories/:name` (contoh: `/categories/work`)
   - CategoryDetail component membaca parameter `name` dari route
   - Menggunakan getter `todosByCategory(name)` untuk filter tugas
   - Hanya menampilkan tugas yang sesuai dengan kategori tersebut

4. **Update Real-time**:
   - Saat status tugas berubah (toggle complete), Pinia state update
   - Semua getter yang bergantung pada state tersebut auto re-compute
   - Progress bar dan statistik update otomatis tanpa reload

## 📦 Dependencies Utama

- **vue** (v3.5.22) - Core framework
- **vue-router** (v4.6.3) - Routing
- **pinia** (v3.0.4) - State management
- **vite** (v7.1.11) - Build tool dan dev server
- **eslint** & **prettier** - Code quality dan formatting

## 📝 Catatan untuk Dosen

Proyek ini mendemonstrasikan pemahaman tentang:
- ✅ Component-based architecture dengan Vue 3
- ✅ State management dengan Pinia (centralized data)
- ✅ Routing dengan Vue Router (termasuk dynamic routes)
- ✅ Reactive data binding dan computed properties
- ✅ Event handling dan form validation
- ✅ Component communication (props, emits, store)
- ✅ Modern JavaScript (ES6+ features)
- ✅ Code organization dan project structure
- ✅ User experience (UX) considerations (toast notifications, empty states, loading states)

Semua fitur telah diimplementasikan dengan best practices Vue 3 dan mengikuti prinsip clean code.

## 📚 Referensi

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vite Configuration Reference](https://vite.dev/config/)

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
