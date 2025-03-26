# MapView Project

## 📌 Overview
MapView is a web application that integrates **OpenStreetMap** with user authentication and a dashboard. It provides users with a map interface to interact with geospatial data.

## ✨ Features
- **User Authentication**: Secure login and registration using JWT.
- **Dashboard**: Displays user-specific information.
- **Map View**: Interactive map using **Leaflet/OpenLayers**.
- **Responsive UI**: Styled with Material UI, Bootstrap, or Styled Components.
- **Full-Stack Integration**: Backend with **Node.js + Express**, frontend with **React.js**.

## 🛠️ Tech Stack
### Frontend:
- React.js
- React Router
- Leaflet/OpenLayers (for map rendering)
- Material UI / Bootstrap / Styled Components (for UI styling)

### Backend:
- Node.js + Express
- SQLite (for database)
- JWT Authentication

## 🚀 Getting Started
### Clone the Repository
```sh
# Clone the main repository
git clone https://github.com/BabithaReddy7/MapView.git
cd MapView
```

### Install Frontend Dependencies
```sh
cd mapview-frontend
npm install
```

### Install Backend Dependencies
```sh
cd ../backend
npm install
```

### Running the Application
#### Start Backend Server
```sh
cd backend
node index.js
```

#### Start Frontend Server
```sh
cd ../mapview-frontend
npm start
```

## 🛠️ Deployment
- **Frontend**: Netlify / Vercel / AWS S3
- **Backend**: Heroku / AWS / GCP

## 📜 License
This project is **open-source** and available under the [MIT License](LICENSE).
