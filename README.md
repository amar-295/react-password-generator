# React Password Generator 🔐

A secure, customizable, and modern password generator built with **React 19**, **Vite**, and **Tailwind CSS v4**.

![License](https://img.shields.io/github/license/amar-295/react-password-generator)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC)

## ✨ Features & Implementation

### 1. 🔐 Secure Random Password Generation
Uses `Math.random()` to generate unpredictable passwords based on user-selected criteria. The logic is wrapped in `useCallback` for performance optimization.

```javascript
const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (number) str += "0123456789";
  if (character) str += "!@#$%^&*()_+=[]{}~`?><";

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length);
    pass += str.charAt(char);
  }

  setPassword(pass);
}, [length, number, character, setPassword]);
```

### 2. 📋 One-Click Copy to Clipboard
Implemented using `useRef` to select the password field programmatically and the Clipboard API for a seamless user experience.

```javascript
const passwordRef = useRef(null);

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999); // Select all for mobile/desktop
  window.navigator.clipboard.writeText(password);
}, [password]);
```

### 3. 🎛️ Real-Time Customization
React states manage real-time updates for length (8-32), number inclusion, and special characters.

```javascript
/* State Management */
const [length, setLength] = useState(8);
const [number, setNumber] = useState(true);
const [character, setCharacter] = useState(false);
```

### 4. ⚡ Optimized Performance
- **`useCallback`**: Prevents function recreation on every render.
- **`useEffect`**: Automatically regenerates the password when dependencies (length, settings) change.


## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: Configured for [Netlify](https://www.netlify.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/amar-295/react-password-generator.git
    cd passwordGenerator
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory, ready to be deployed.

## ☁️ Deployment

This project includes a `netlify.toml` configuration file for seamless deployment on **Netlify**.

1.  Connect your repository to Netlify.
2.  The build settings (`npm run build`, `dist` directory) will be automatically detected.
3.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
