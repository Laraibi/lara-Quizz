
# Vue Quizz

Vue Quizz is a web application built using Vue 3 and Vite, designed to provide an interactive and dynamic platform for quizzes. 
This project leverages modern JavaScript libraries and tools to deliver a high-performance, scalable, and user-friendly experience.

## Features

- **Dynamic Quiz Management**: Create, manage, and take quizzes with ease.
- **Responsive Design**: Built with Bootstrap for a seamless experience across devices.
- **State Management**: Utilizes Pinia for efficient state handling.
- **Routing**: Built-in navigation with Vue Router.
- **Icon Integration**: Powered by oh-vue-icons for rich UI elements.

## Tech Stack

- **Frontend**: Vue 3, Bootstrap
- **State Management**: Pinia
- **Routing**: Vue Router
- **Build Tool**: Vite
- **HTTP Client**: Axios

## Project Structure

```
vue-quizz/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable Vue components
│   ├── router/           # Application routing logic
│   ├── stores/           # State management with Pinia
│   ├── App.vue           # Root component
│   ├── main.js           # Application entry point
├── .env.example          # Example environment variables
├── index.html            # Main HTML file
├── jsconfig.json         # JavaScript project configuration
├── package.json          # Project metadata and dependencies
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd vue-quizz
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Development

Start the development server:

```sh
npm run dev
```

### Production

Build the project for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Configuration

- Copy `.env.example` to `.env` and configure environment variables as needed.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.

---

Built with ❤️ using Vue 3 and Vite.
