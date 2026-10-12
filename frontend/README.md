# 🌊 EcoBot – Underwater Plastic Waste Detection

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
EcoBot is an AI-powered web application for detecting and visualizing plastic waste in underwater environments. Built with **YOLOv8**, it enables real-time analysis of underwater images and helps raise awareness about ocean pollution. 🌱

[Live Demo 🚀](https://github.com/chetlasrijith/eco-bot) | [Report Issues 🛠️](https://github.com/chetlasrijith/eco-bot/issues)

---

## 📸 Screenshots

### 🌱 Home Page
Upload underwater images to detect plastic waste using our advanced detection system.  
![Home Page](assets/1.png)

---

### 🧪 Detection Results
View detailed detection results, including confidence scores, plastic level, and global impact.  
![Detection Results](assets/3.png)

---

### 🗺️ Global Plastic Map
Visualize plastic detection points around the globe.  
![Global Map](assets/2.png)

---

## 🚀 Features

✅ Automatically detect plastic waste with YOLOv8 when an image is selected
✅ Summarize detections with confidence scores & plastic level  
✅ Visualize detection locations on a global map (powered by Leaflet)  
✅ Download processed images with annotations  
✅ Responsive web UI for easy access on any device  

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Tailwind CSS, React.js)  
- **Backend**: Python (FastAPI / Flask)  
- **Deep Learning**: YOLOv8 (Ultralytics)  
- **Mapping**: Leaflet.js, OpenStreetMap  
- **Deployment**: Docker, AWS EC2  

---

## 📥 Installation

### Clone the repository
```bash
git clone https://github.com/chetlasrijith/eco-bot.git
cd eco-bot
````

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run the application

```bash
python app.py
```

Then open your browser and go to `http://127.0.0.1:8000`

---

## Deployment

The frontend and Flask API must be deployed separately. Create the API on Render from the repository Blueprint (`render.yaml`). Its backend requirements pin CPU-only PyTorch, and `backend/.python-version` pins Python 3.11 for the supported CPU inference setup. In Vercel, set the project root directory to `frontend`, then set the production environment variable `VITE_API_BASE_URL` to the base URL of the deployed Flask backend (for example, `https://your-backend.onrender.com`, without `/api/detect`). Redeploy the frontend so the new value is included in the build. The frontend will use `http://127.0.0.1:5000` automatically only during local development.

---

## 🧑‍💻 How It Works

1. **Image Selection**: Selecting an underwater image starts detection automatically; the image is sent to the Flask backend for analysis.
2. **Preprocessing**: Images are resized and normalized.
3. **Detection**: YOLOv8 model detects plastic objects and classifies them (e.g., bottles, bags).
4. **Visualization**: Detected objects are highlighted and their coordinates mapped globally.
5. **Download Option**: Users can download annotated images or view results on the global map.

The backend uses the trained weights in `backend/models/ecobot.pt`. The provided labeled dataset contains the same 15 classes but no trained checkpoint, so it is not needed at runtime.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repo
2. Create your branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📞 Contact

Created by [Chetla Srijith](https://github.com/chetlasrijith)
For queries, raise an issue in the repository or connect on [LinkedIn](https://www.linkedin.com/in/srijithchetla/).

---
