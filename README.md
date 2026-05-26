# 🧠 MindCare – Intelligent Student Wellness Platform



---

# 📖 Overview

**MindCare** is an intelligent student wellness platform developed using **Spring Boot** and **React**.  
The application focuses on improving student wellbeing through AI-assisted conversations, wellness monitoring, and emergency communication systems.

The platform provides:
- AI-powered conversational support
- Wellness tracking and recommendations
- Emergency SMS alert mechanisms
- Secure and scalable backend APIs
- Modern responsive UI with Glassmorphism design

MindCare is built with a scalable architecture where **Spring Boot acts as the core backend system** handling API routing, chatbot communication, emergency workflows, and application services.

---

# 🚀 Features

## 🤖 AI Conversational Chatbot
- Real-time student interaction system
- Gemini AI powered conversations
- Distress detection and supportive responses
- Intelligent wellness assistance

## 🚨 Emergency Alert System
- Automated SMS emergency notifications
- Twilio API integration
- Emergency escalation workflows
- Fast communication support

## 📊 Wellness Monitoring
- Personalized wellbeing tracking
- Wellness recommendations
- Dynamic assessment modules
- Student-focused support mechanisms

## 🏗️ Scalable Spring Boot Architecture
- RESTful API development
- Layered backend architecture
- Modular service implementation
- Enterprise-level project structure

## 🎨 Modern User Interface
- React + Vite frontend
- TypeScript support
- Tailwind CSS Glassmorphism UI
- Responsive and accessible design

---

# 🛠️ Technology Stack

## Frontend
| Technology | Purpose |
|---|---|
| React | User Interface |
| Vite | Frontend Build Tool |
| TypeScript | Type Safety |
| Tailwind CSS | UI Styling |
| Axios | API Communication |

---

## Backend
| Technology | Purpose |
|---|---|
| Spring Boot | Backend Framework |
| Spring Web | REST APIs |
| Spring Data JPA | Database Operations |
| Maven | Dependency Management |
| Twilio SDK | SMS Alerts |
| Gemini API | AI Chat Support |

---

# 🏗️ System Architecture

```text
                   ┌─────────────────────┐
                   │    React Frontend   │
                   │ (Vite + Tailwind)   │
                   └──────────┬──────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │   Spring Boot Backend  │
                 │  APIs & Business Logic │
                 └──────────┬─────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          ▼                                   ▼
 ┌──────────────────┐               ┌──────────────────┐
 │   Gemini AI API  │               │  Twilio Services │
 │ Conversational AI│               │ Emergency Alerts │
 └──────────────────┘               └──────────────────┘
