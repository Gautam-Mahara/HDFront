⚛️ React + TypeScript + Vite

This project is a React + TypeScript application powered by Vite for blazing-fast development and build performance.
It includes React Router DOM for navigation and Tailwind CSS for styling.

🚀 Features

⚡ Vite for ultra-fast HMR and optimized builds

🔷 React + TypeScript setup

🧭 React Router DOM for client-side routing

🎨 Tailwind CSS for utility-first responsive design

✅ ESLint rules for code quality and consistency

🧩 Tech Stack

React 18

TypeScript

Vite

React Router DOM

Tailwind CSS

ESLint

🛠️ Installation

Clone the repository

git clone https://github.com/your-username/your-react-project.git
cd your-react-project


Install dependencies

npm install


Or using yarn:

yarn install

🌀 Available Scripts
▶️ Run the app in development mode
npm run dev


Your app will be available at:
👉 http://localhost:5173

🏗️ Build for production
npm run build

🔍 Preview production build
npm run preview

🎨 Tailwind CSS Setup

Tailwind CSS is already configured in this project.
To customize your styles, edit the tailwind.config.js file.

Example usage:

export default function Button() {
  return (
    <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
      Click Me
    </button>
  );
}

🧭 React Router Setup

Routing is managed using React Router DOM v6+.

Example in App.tsx:

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

🧹 ESLint Configuration

ESLint is set up for linting TypeScript and React code.
You can expand the configuration by adding type-aware linting or plugins such as:

eslint-plugin-react-x

eslint-plugin-react-dom

Example setup:

import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])

📁 Project Structure
your-react-project/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── package.json

💡 Tips

You can add reusable components under src/components/

Store routes under src/pages/

Use Tailwind’s responsive classes for mobile-first design

Customize your theme in tailwind.config.js

🧑‍💻 Author

Gautam Singh Mahara