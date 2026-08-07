# 🏛️ Landmark – AI-Powered Indian Monument Recognition & Travel Guide

An AI-powered web application that identifies **23 Indian monuments** from uploaded images using **Transfer Learning (DenseNet121)** and provides concise monument information, historical insights, interactive location maps, nearby attractions, and an AI-powered travel guide to help users explore India's rich cultural heritage.

---

## 📖 Overview

Planning a trip or learning about Indian heritage often requires searching across multiple websites. This project simplifies that experience by recognizing a monument from an image and instantly presenting essential information in one place.

---

## ✨ Features

- 🏛️ Recognizes 23 Indian monuments from uploaded images
- 🧠 Deep learning model built using DenseNet121 Transfer Learning
- 📜 Displays concise historical and architectural information
- 📍 Interactive Google Maps location
- 🌍 Nearby attractions and places to visit
- 🤖 AI-powered Travel Guide using Gemini
- 🎨 Modern and responsive web interface

---

## 📸 Screenshots

### Home Page
<img width="671" height="395" alt="image" src="https://github.com/user-attachments/assets/bf83b120-db04-4074-9f47-39335dfe997f" />

---

### Upload Image
<img width="620" height="232" alt="image" src="https://github.com/user-attachments/assets/d78c2b27-2b8c-4662-b52a-b735beb6f41a" />



---
### Landmark Detection
<img width="613" height="341" alt="Screenshot 2026-08-07 105659" src="https://github.com/user-attachments/assets/a814fa14-d19b-45a7-b438-45db5f92f0b9" />

---

### Monument History 

<img width="677" height="317" alt="image" src="https://github.com/user-attachments/assets/cb6e1306-827c-493c-a5a8-5175ef04a55d" />
--- 

### Architectural Highlights

<img width="670" height="323" alt="image" src="https://github.com/user-attachments/assets/96447001-9b24-48d6-a746-d09954435f85" />


---
 ### Speciality Of Heritage
 <img width="679" height="261" alt="image" src="https://github.com/user-attachments/assets/7bb88de6-7b95-4ff3-bf7a-484bfe3c0eec" />

---
### Monument Gallery
<img width="680" height="309" alt="image" src="https://github.com/user-attachments/assets/d38e15bb-e086-4f0e-b3bd-86c7eb81c925" /> 

---
### Integrated with Google Maps
<img width="633" height="358" alt="image" src="https://github.com/user-attachments/assets/50553cbd-2f4c-4d46-84fe-aff964052430" />

---

### AI Travel Guide

<img width="572" height="345" alt="image" src="https://github.com/user-attachments/assets/56b6e0d8-6aaa-4541-b35b-0e906e6722cb" />


---

## 🏗️ Project Architecture

```
User Uploads Image
        │
        ▼
Image Preprocessing
        │
        ▼
DenseNet121 Model
        │
        ▼
Monument Prediction
        │
        ├───────────────┐
        ▼               ▼
 Monument Details   AI Travel Guide (Gemini)
        │               │
        └───────┬───────┘
                ▼
          Web Application
```

---

## 🧠 Model Details

- **Model:** DenseNet121
- **Transfer Learning:** ImageNet Pretrained Weights
- **Fine-Tuning:** Classification head trained for 23 monument classes
- **Framework:** TensorFlow / Keras

---


## 🛠️ Tech Stack

### Machine Learning

- TensorFlow
- Keras
- DenseNet121
- NumPy
- Pillow

### Backend

- Flask
- Python

### Frontend

- HTML
- CSS
- JavaScript

### APIs

- Google Maps
- Gemini API

---


## 🎯 Future Improvements

- Increase the number of monument classes
- Support real-time camera recognition
- Add multilingual support

---

## 👩‍💻 Author

**Harshini Perumal**

- B.E. Artificial Intelligence & Machine Learning
- Nitte Meenakshi Institute Of Technology 
- Bangalore

---



