# AI Safety Incident Dashboard

A responsive web application for tracking and reporting AI safety incidents with transparency and ease.

**Live Demo** [View Live project](https://sparkle-hood.vercel.app/)

## Table of Contents

- [AI Safety Incident Dashboard](#ai-safety-incident-dashboard)
- [Features](#features)
- [Device Screenshots](#device-screenshots)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Customization](#customization)
- [Contact](#contact)

---

## Features

- 🚨 **Incident Management**

  - **Report new AI safety incidents** – Easily submit reports.
  - **View and expand incident details** – Detailed view for each incident.
  - **Sort by newest/oldest reports** – Quickly sort incidents based on their report date.

- 🔍 **Advanced Filtering**

  - **Filter by severity level** (Low, Medium, High) – Quickly narrow down incidents by severity.
  - **Search by title or description** – Search functionality to find specific incidents, with **highlighted search results** for better visibility.

- 📱 **Responsive Design**

  - **Mobile-friendly interface** – Full functionality on mobile devices.
  - **Desktop-optimized layout** – Tailored design for desktop use.

- ✨ **Interactive UI**

  - **Smooth animations with Framer Motion** – Enjoy seamless transitions and animations.
  - **Floating action button on mobile** – Easy access to report new incidents on mobile.
  - **Click-outside to close functionality** – Close modals or forms by clicking outside.

- 📊 **Data Visualization**
  - **Clear incident severity indicators** – Visual cues for severity (Low, Medium, High).
  - **Organized list view** – Clean, organized incident list for better readability.

---

## Device Screenshots

### Mobile Phones

| ![Mobile Phone 1](./screenshots/iphone1.png) | ![Mobile Phone 2](./screenshots/iphone2.png) | ![Mobile Phone 3](./screenshots/iphone3.png) |
| :------------------------------------------: | :------------------------------------------: | :------------------------------------------: |

### Laptops

![Laptop 1](./screenshots/mac.png)

### Tablets

| ![Tablet 1](./screenshots/pad1.png) | ![Tablet 2](./screenshots/pad2.png) |
| :---------------------------------: | :---------------------------------: |

---

## Technologies Used

- **Frontend**
  - React (TypeScript)
  - Tailwind CSS
  - Framer Motion (Animations)
- **Build Tools**
  - Vite
  - npm

---

## Project Setup

Before you begin, ensure you have the following installed for the project

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js): For managing dependencies.

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sanketyelugotla/SparkleHood.git
   cd SparkleHood
   ```

2. **Install dependencies:**
   Install the required dependencies by running the following command in the frontend directory:

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. After the server starts, you can open the app in your browser at [http://localhost:5173](http://localhost:5173).

   - The project should automatically open in your default web browser.
   - If it does not, manually open the browser and go to [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```bash
  SparkleHood/
  ├── src/
  │ ├── components/ # React components
  │ │ ├── IncidentFilter.tsx # For filtering and sorting
  │ │ ├── IncidentForm.tsx # For for adding a new incident
  │ │ ├── IncidentList.tsx # For displaying incidents
  │ │ ├── IncidentCard.tsx # Card for individual incident
  │ │ └── CustomSelect.tsx # Custom dropdown component
  │ ├── data/ # Mock data
  │ │ └── mockData.ts # Mock data of incidents
  │ ├── types/ # TypeScript types
  │ │ └── incident.ts # Data types of incident
  │ └── App.tsx # Main application
  ├── public/ # Static assets
  ├── package.json
  └── README.md
```

---

## Usage

### Viewing Incidents

- Scroll through the chronological list of reported incidents
- Click any incident card to expand/collapse detailed description
- Utilize filters to quickly locate specific incidents

### Reporting New Incidents

#### Desktop Experience

- Persistent form panel in the right sidebar
- Real-time validation for all form fields

#### Mobile Experience

- Floating action button (+) in bottom-right corner
- Smooth circular reveal animation originating from button
- Optimized vertical layout for touch input

### Filtering & Sorting

#### Severity Levels

- Three-tiered classification (Low/Medium/High)
- Visual color-coding for quick identification

#### Sorting Options

- Chronological (Newest first)
- Reverse chronological (Oldest first)

#### Search Functionality

- Full-text search across titles and descriptions
- Case-insensitive matching

---

## Customization

### Visual Styling

- Modify Tailwind CSS classes in component files
- Adjust color palette in @theme in index.css
- Update animation durations in Framer Motion components

### Data Management

- Edit src/data/mockData.ts to modify sample incidents
- Adjust default form values in IncidentForm.tsx
- Feature Expansion

### API Integration

- Replace mock data fetches with API calls
- Add loading/error states for network requests

### Enhanced Filtering

- Add new filter categories (status, date ranges)
- Implement multi-select capabilities

---

## Contact

- 📧 **Email:** [sanketyelugotla123@gmail.com](mailto:sanketyelugotla123@gmail.com)
- 💼 **LinkedIn:** [@sanketyelugotla](https://www.linkedin.com/in/sanketyelugotla/)
- 🌐 **Portfolio:** [Visit my work here](https://sanketyelugotla.vercel.app)
