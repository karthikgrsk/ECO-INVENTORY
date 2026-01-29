# 🌱 ECO-INVENTORY  
**Intelligent Food Inventory, Waste Reduction & Redistribution System**

![Java](https://img.shields.io/badge/Java-21-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![Maven](https://img.shields.io/badge/Build-Maven-orange)
![Database](https://img.shields.io/badge/Database-H2-lightgrey)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📌 What This Project Does

ECO-INVENTORY is a **backend-driven Spring Boot application** that helps reduce food waste by managing food inventory, predicting spoilage, and enabling redistribution through donation centers.

The system tracks food items, monitors expiry dates, analyzes consumption patterns, and securely exposes APIs for managing inventory and donations.

This project is designed as a **clean, scalable backend** suitable for real-world use cases and backend developer interviews.

---

## 💡 Why This Project Is Useful

Food wastage often happens due to:
- Poor inventory tracking
- No visibility into expiry timelines
- Lack of redistribution mechanisms

ECO-INVENTORY solves this by providing:

- ✅ Centralized food inventory management  
- ✅ Expiry-based spoilage prediction  
- ✅ Consumption-based demand estimation  
- ✅ Donation & redistribution tracking  
- ✅ Secure REST APIs with JWT authentication  
- ✅ Clean layered architecture (industry-standard)

---

## 🧱 Architecture Overview

The project follows a **layered architecture**:

Controller → Service → Repository → Database


**Key modules:**
- `controller` – REST APIs
- `service` – Business logic & AI-style predictions
- `repository` – JPA-based data access
- `model` – Entity definitions
- `security` – JWT authentication & authorization
- `config` – Application & security configuration

---

## 🛠 Tech Stack

### Backend
- **Java 21**
- **Spring Boot**
- **Spring Security (JWT)**
- **Spring Data JPA**
- **H2 In-Memory Database**
- **Maven**

### Tooling
- **Swagger / OpenAPI** – API documentation
- **Git & GitHub** – version control

---

## 📂 Project Structure

ECO-INVENTORY
│
├── backend
│ ├── src/main/java/com/foodloss
│ │ ├── controller
│ │ ├── service
│ │ ├── repository
│ │ ├── model
│ │ ├── dto
│ │ ├── security
│ │ └── config
│ │
│ ├── src/main/resources
│ │ └── application.properties
│ │
│ └── pom.xml
│
├── frontend # planned
├── .gitignore
└── README.md


---

## 🚀 Getting Started

### Prerequisites
- Java **21**
- Maven **3.8+**
- Git

---

### Installation & Run

1️⃣ **Clone the repository**
git clone https://github.com/karthikgrsk/ECO-INVENTORY.git
cd ECO-INVENTORY/backend

2️⃣ Build the project
mvn clean install

3️⃣ Run the application
mvn spring-boot:run

Access the Application
Swagger UI (API Docs)
http://localhost:8080/swagger-ui/index.html

H2 Database Console
http://localhost:8080/h2-console

🗄 Database Configuration (H2)
Property	Value
JDBC URL	jdbc:h2:mem:testdb
Username	sa
Password	(empty)

🔐 Security
JWT-based authentication

Stateless session management

Protected endpoints using Spring Security

Custom JwtAuthenticationFilter

🧠 Intelligent Logic
The application includes AI-inspired logic such as:

Expiry-based spoilage detection

Average consumption-based demand estimation

Alerts for near-expiry food items

Redistribution recommendations to donation centers

These logics are implemented in the service layer and can be extended further.

🧪 Usage Examples
Once authenticated, users can:

Add and manage food items

Track consumption records

Register donation centers

Transfer excess food to donation centers

View alerts for potential food waste

(Refer to Swagger UI for request/response examples.)

🆘 Getting Help
API documentation is available via Swagger UI

Review the codebase for service-level logic

For issues or feature requests, open a GitHub Issue

🤝 Contributing
Contributions are welcome!

Fork the repository

Create a feature branch

Commit changes with clear messages

Open a pull request

(See CONTRIBUTING.md when available.)
