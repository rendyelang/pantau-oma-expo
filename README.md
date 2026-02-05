# 👵 PantauOma - Elderly Monitoring System

<div align="center">
  <img src="./assets/icons/pantauoma.png" alt="PantauOma Logo" width="180" />
  <br />
  <br />
  <p>
    <b>"Pantau orang tua tercinta, kapan saja, di mana saja."</b>
  </p>
</div>

---

PantauOma adalah aplikasi mobile berbasis **Internet of Things (IoT)** yang dirancang untuk memantau keselamatan lansia secara real-time. Aplikasi ini terintegrasi dengan perangkat wearable untuk mendeteksi lokasi, detak jantung, aktivitas user dan insiden jatuh (fall detection) menggunaka algoritma Random Forest. (IoT & AI masih dalam pengembangan)

---

## 📱 Demo & Screenshots

### Live Demo
Video demo penggunaan aplikasi dapat dilihat melalui link berikut:

### [▶️ Tonton Video Demo (Google Drive)](https://drive.google.com/file/d/1XSpqkAtIVNqIEo5XyNafp79Hvc3C1UGs/view?usp=sharing)

### Gallery
| Home (Safe Condition) | Home (Danger Alert) | History Page | Profile Page |
|:---:|:---:|:---:|:---:|
| <img src="./assets/images/screenshots/home_safe.png" width="200" /> | <img src="./assets/images/screenshots/home_danger.png" width="200" /> | <img src="./assets/images/screenshots/history.jpeg" width="200" /> | <img src="./assets/images/screenshots/profile.png" width="200" /> |

---

## ⚙️ System Architecture

Berikut adalah alur data bagaimana PantauOma bekerja, mulai dari sensor wearable hingga notifikasi di HP anak/wali.

![System Architecture](./assets/images/screenshots/flowchart.png)
---

## 🚀 Key Features

* **📍 Live Location Tracking:** Melacak posisi lansia secara real-time menggunakan peta interaktif (Leaflet/Google Maps).
* **❤️ Health Monitoring:** Menampilkan detak jantung (BPM) dan status aktivitas (Duduk/Berjalan).
* **⚠️ Fall Detection Alert:** Notifikasi instan layar merah "Danger" ketika perangkat mendeteksi lansia terjatuh.
* **🔋 Device Status:** Memantau persentase baterai perangkat wearable dan koneksi Wi-Fi.
* **🌙 Offline Mode:** Data tersimpan lokal menggunakan **SQLite**, memungkinkan riwayat tetap bisa diakses tanpa internet.
* **🎨 Glassmorphism UI:** Tampilan modern dengan efek blur native dan animasi halus.

---

## 🛠️ Tech Stack

**Mobile Framework:**
* ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **Expo SDK 50+**
* ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
* **NativeWind v4** (TailwindCSS for Native)

**Native Modules:**
* `expo-sqlite` (Local Database)
* `expo-blur` (Glass UI Effect)
* `react-native-maps` / `react-native-webview` (Mapping)
* `expo-location` (GPS)

**Backend & Services:**
* ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black) (Realtime Database & Auth)
* **Google Maps API** / **OpenStreetMap**

---
