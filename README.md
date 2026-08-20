# Campus Fixit

**CSBC 252 CAPSTONE PROJECT — PROJECT DIRECTION 🚀**

Guys, I've gone through the CSBC 252 Capstone Project Guide carefully, and I've been thinking about how we can approach this project properly instead of waiting until the deadline and rushing everything.

I propose that we work on:

### **CampusFix**

**A Cloud-Based Campus Service & Maintenance Request Management System**

The idea is simple but gives us enough technical depth to satisfy the actual requirements of the course.

### 💡 THE VISION

CampusFix will be a web-based platform where students/staff can report problems around campus or hostels, attach photos/evidence, and track the progress of their reports.

For example:

> A student notices that a light isn't working in a hostel.

Instead of just telling someone verbally or sending a WhatsApp message, they open CampusFix → log in → report the issue → select the location/category → describe the problem → upload a photo → submit.

The administrator/maintenance side then receives the request and can manage it.

The request can move through:

**PENDING → ASSIGNED → IN PROGRESS → RESOLVED**

The person who reported it can then track the progress.

---

### ☁️ WHY THIS PROJECT FITS THE ASSIGNMENT

The CSBC 252 guide requires us to build a real-world cloud application with a database, AWS deployment, security, authentication, CRUD functionality, and cloud storage where applicable.

CampusFix gives us a genuine reason to use the required AWS technologies:

* **IAM** — access and permission management

* **EC2** — hosting the application/backend

* **Security Groups** — controlling network traffic

* **Amazon RDS** — application database

* **Amazon S3** — storing uploaded photos/documents

* **CloudWatch** — monitoring and logs

* **Application Load Balancer** — optional bonus/high-availability architecture if we finish the core system early

So we're not just adding AWS services because the lecturer told us to. Each service has an actual purpose in the architecture.

---

# 👥 PROPOSED TEAM STRUCTURE

### 1. Samuel Kofi Afrifa — 2425401293

**Cloud & Backend Lead**

Main area:

* Backend/API

* Application architecture

* EC2 deployment

* AWS/application integration

* Git/GitHub coordination

### 2. Clifford Djan — 2425400968

**Frontend Developer**

Main area:

* Frontend

* Student dashboard

* Admin dashboard

* Forms

* Responsive UI

### 3. Herman Bannerman-Hesse — 2425401086

**Database Engineer**

Main area:

* RDS

* Database schema

* ERD

* Relationships

* CRUD data operations

* Database testing

### 4. Jessey Obeng Akonnor — 2425400854

**UI/UX & QA Engineer**

Main area:

* Wireframes

* User experience

* UI consistency

* Test cases

* Functional testing

* Bug identification/documentation

### 5. Aaron Asirifi Boakye — 2425400618

**AWS Infrastructure & Security**

Main area:

* IAM

* Security Groups

* S3

* CloudWatch

* AWS security configuration

* Infrastructure documentation

These are proposed roles, so let's discuss them and adjust them based on everyone's strengths/interests before making them final.

---

# 🧩 CORE FEATURES

### Student/User

* Create account

* Login/logout

* Submit maintenance request

* Select category

* Specify location

* Describe problem

* Upload photo

* View submitted requests

* Track request status

### Administrator

* Login

* View all requests

* Search/filter requests

* View request details

* Assign/manage requests

* Update status

* Add comments

* Resolve requests

---

# 🏗️ PROPOSED ARCHITECTURE

The basic architecture will look roughly like:

USER

↓

**EC2 — CampusFix Application**

↓

**RDS — Application Database**

And:

**User uploads photo**

↓

**S3 — File Storage**

While:

**EC2/Application activity**

↓

**CloudWatch — Logs & Monitoring**

With **IAM + Security Groups** controlling access and infrastructure security.

If the core application is completed properly and we have enough time, we can attempt the optional **Application Load Balancer + multiple EC2 instances** architecture for bonus marks.

---

# 📋 HOW WE'LL BUILD IT

I don't want us to jump straight into AWS without planning.

We'll go in stages:

**1. Project Proposal**

* Problem

* Objectives

* Target users

* Proposed solution

* Roles

* Technologies

**2. System Design**

* Use Case Diagram

* ERD

* AWS Architecture Diagram

* UI Wireframes

**3. Application Development**

* Frontend

* Backend

* Authentication

* Database

* CRUD

* File uploads

**4. AWS Deployment**

* IAM

* EC2

* Security Groups

* RDS

* S3

* CloudWatch

**5. Testing**

* Authentication

* CRUD

* File uploads

* Database

* AWS deployment

* Security

**6. Evidence & Documentation**

We'll keep screenshots and records of the work as we go instead of trying to recreate everything at the end.

**7. Final Report + Presentation**

We'll bring everything together and each person will be able to explain their actual contribution.

---

# ⚠️ IMPORTANT

I'm proposing that we start early and build the project in a structured way rather than waiting until the last minute.

I will take the lead on coordinating the project and getting the initial structure/version moving, but **everyone needs to participate in their assigned area**.

The goal isn't for one person to silently do everything and then have five people appear at presentation time.

Everyone should have something they can genuinely say:

> **"This is what I worked on, this is how I implemented it, and this is how it contributes to CampusFix."**

We'll keep our work and progress documented throughout the project so that contributions are clear.

If someone gets stuck, that's fine—we help each other. The important thing is that everyone communicates and contributes.

---

### 🎯 END GOAL

By the time we're done, we shouldn't just have an assignment.

We should have a properly designed cloud application that we can demonstrate confidently:

**Problem → Solution → Architecture → Development → AWS Deployment → Security → Testing → Results**

And we should be able to defend every major technical decision we made.

The project deadline is **25 August 2026**, so I'd rather we get the foundation right now and improve it progressively than rush everything at the end.

Let's confirm the roles, agree on the project direction, and then we can start with the proposal and system design.    Create just the frontend by Clifford Djan

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a6c07fca-0247-4e90-b8a2-f8d5c16d0b2d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
