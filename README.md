### **✦ Website**
 https://hostel-management-fbproj.web.app/

### **✦ Railway Backend Project**
 https://railway.com/invite/2-7qAHC-J__

✧ *Note: Integer (`INT`) data type is preferred for all IDs.*

<h1 align="center">  
. ݁₊ ⊹ . ݁˖ . ݁  Digital Hostel Management System  . ݁₊ ⊹ . ݁˖ . ݁  
</h1>

<p align="center">
<img src="https://img.shields.io/badge/Frontend-Firebase-9370DB?style=for-the-badge" />
<img src="https://img.shields.io/badge/Backend-Railway-6A5ACD?style=for-the-badge" />
<img src="https://img.shields.io/badge/Database-MySQL-8A2BE2?style=for-the-badge" />
</p>

---

## ✦ About This Project  

✧ **Digital Hostel Management System** is a full-stack web application designed to digitally manage hostel operations, improve student safety, and simplify communication between **students** and **wardens**.

✧ The system replaces manual processes with a **secure, structured, and accessible platform**.

✧ Built with real-world deployment in mind using **Firebase Hosting**, **Railway backend**, and **MySQL database**.

---

## ✦ Core Features  

### ✧ Student Module  
⋆ Secure login & registration  
⋆ Profile management with ID proof upload  
⋆ Register & track complaints  
⋆ Night-out (leave) requests  
⋆ Escort / safe-walk requests  
⋆ Anonymous incident reporting  
⋆ Request status tracking  
⋆ Hostel rulebook access  
⋆ Announcements feed  

### ✧ Warden Module  
⋆ Dashboard with live statistics  
⋆ Complaint management & resolution  
⋆ Approve / reject night-out requests  
⋆ Manage escort requests  
⋆ Review anonymous reports  
⋆ Post hostel announcements  
⋆ Profile management  

---

## ✦ Accessibility & UI Enhancements  

✧ Dark / Light mode toggle  
✧ Font size controls (A / A+ / A++)  
✧ Multilingual support  
  ⋆ English  
  ⋆ हिंदी  
  ⋆ मराठी  
✧ Fully responsive layout  

---

## ✦ Tech Stack  

### ✧ Frontend  
⋆ HTML5  
⋆ CSS3  
⋆ Vanilla JavaScript  
⋆ Firebase Hosting  

### ✧ Backend  (INSIDE FUNCTIONS)
⋆ Node.js  
⋆ Express.js  
⋆ Railway Deployment  

### ✧ Database  
⋆ MySQL (Railway-connected)  

---

## ✦ Deployment Architecture  

User Browser
↓
Firebase Hosting (Frontend)
↓
Railway Backend (Node + Express)
↓
MySQL Database


---

## ✦ Frontend Hosting — Firebase  

✧ The frontend is deployed as a **static web app** using Firebase Hosting.

bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy


## **✦ Backend Hosting — Railway**

✧ Backend runs on **Railway** using **Node.js + Express.js**  
✧ MySQL database is provisioned and managed through Railway  
✧ Sensitive credentials are handled securely via environment variables  
✧ **Environment variables are shared between the backend repository and the MySQL service**

---

## **✦ Database Overview**

✧ Core tables used in the system:

⋆ `users`  
⋆ `complaints`  
⋆ `nightout`  
⋆ `escorts`  
⋆ `anonymous_reports`  
⋆ `announcements`  

---

## **✦ API Routes**

### **✧ Complaints**

⋆ `POST /complaints`  
⋆ `GET /complaints`  
⋆ `GET /complaints/:studentId`  
⋆ `PUT /complaints/:id`  

---

### **✧ Night-Out Requests**

⋆ `POST /nightout`  
⋆ `GET /nightout`  
⋆ `GET /nightout/:studentId`  
⋆ `PUT /nightout/:id`  

---

### **✧ Escort Requests**

⋆ `POST /escorts`  
⋆ `GET /escorts`  
⋆ `GET /escorts/student/:studentId`  
⋆ `PUT /escorts/:id`  

---

### **✧ Anonymous Reports**

⋆ `POST /anonymous`  
⋆ `GET /anonymous`  
⋆ `PUT /anonymous/:id`  

---

### **✧ Announcements**

⋆ `POST /announcements`  
⋆ `GET /announcements`  

. ݁₊ ⊹ . ݁˖ . ݁
