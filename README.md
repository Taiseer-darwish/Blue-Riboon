# Blue-Ribbon

# Blue Ribbon Club — Sports & Members Management App

A small **React + Firebase** application that allows managing sports, members, and their subscriptions — with a clean UI, form validation, and full CRUD functionality.

---

## Features

- **Sports Page:** View, add, edit, and delete sports (name + image).
- **Members Page:** View, add, edit, and delete members (name + image).
- **Subscriptions Page:**
- Select a member and subscribe them to multiple sports.
- Prevent duplicate subscriptions for the same sport.
- Data stored in **Firebase Firestore**.
- Images uploaded to **Cloudinary** (unsigned preset).
- Full **CRUD** (Create / Read / Update / Delete) operations for both sports and members.
- **Form validation** with React Hook Form + Yup (custom error messages).
- **Responsive UI** built with Tailwind CSS.
- **SweetAlert2** for success & error alerts.
- **Lazy loading** for images using `react-lazy-load-image-component`.
- Reusable components (Card, FAB, EntityForm, EditEntity, etc).
- Smooth UX: loading states, preventing double submits, and responsive layout.

---

## Tech Stack

| Technology                          | Purpose                    |
| ----------------------------------- | -------------------------- |
| **React (Vite)**                    | Frontend framework         |
| **React Router**                    | Page navigation            |
| **Tailwind CSS**                    | Styling and responsiveness |
| **React Hook Form + Yup**           | Form validation            |
| **Firebase Firestore**              | Database                   |
| **Cloudinary**                      | Image storage              |
| **SweetAlert2**                     | User alerts and modals     |
| **Context API**                     | State management           |
| **React Lazy Load Image Component** | Optimized image loading    |
| **Vercel**                          | Deployment                 |

---

## Firestore Structure

### `sports`

```json
{
  "name": "Football",
  "imageURL": "https://res.cloudinary.com/...",
  "createdAt": "timestamp"
}
```

### `members`

```json
{
  "name": "Ahmed",
  "imageURL": "https://res.cloudinary.com/...",
  "createdAt": "timestamp"
}
```

### `subscriptions`

```json
{
  "memberId": "memberDocId",
  "sportId": "sportDocId",
  "date": "2025-10-23T..."
}
```

 ## How It Works 

**Sports:**
Displays a grid of sports cards.
Floating “+” button to add a new sport.
Each card has an options menu to edit or delete.

**Members:**
Same layout as sports.
Add, edit, and delete members easily.
Each member’s subscribed sports appear dynamically.

**Subscriptions:**
Select a member from a dropdown (dark theme).
Choose one or more sports using checkboxes.
“Subscribe” button saves all selected subscriptions.
Prevents duplicate subscriptions.


 ## Validation & UX
Used React Hook Form + Yup for robust validation:
Name is required (min 3 characters).
Image is required on add, optional on edit.
Prevented double submissions during async actions (isLoading states).
Displayed custom alerts via SweetAlert2.
Used preview images before upload via URL.createObjectURL.


## Deployment
**Hosted on Vercel.**
**Live Demo:** ***https://blue-riboon.vercel.app/***
**epository**: ***https://github.com/Taiseer-darwish/Blue-Riboon***


## Developer
Developed by Taiseer Darwish
Front-End & Cross-Platform Developer | ITI Graduate
 Email: taiseerdarwish@gmail.com

