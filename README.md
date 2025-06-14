# Book Finder Frontend

This project is a frontend application for the Book Finder, built using React and Vite. It provides a user-friendly interface for users to browse, search, and review books. The application is designed to work seamlessly with a backend API that handles user authentication, book management, and reviews.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Book Management**: Users can view a list of books, search for specific titles, and view detailed information about each book.
- **Review System**: Users can submit reviews for books they have read, including ratings and comments.
- **Admin Functionality**: Admin users have the ability to create, update, and delete books.

## Project Structure

```
bookfinder-frontend
├── src
│   ├── assets
│   │   └── images
│   │       └── logo.svg
│   ├── components
│   │   ├── common
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Rating.jsx
│   │   ├── auth
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── books
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── BookList.jsx
│   │   │   └── SearchBar.jsx
│   │   └── reviews
│   │       ├── ReviewForm.jsx
│   │       └── ReviewList.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   └── BookContext.jsx
│   ├── hooks
│   │   ├── useAuth.js
│   │   └── useBooks.js
│   ├── pages
│   │   ├── AdminPage.jsx
│   │   ├── BookDetailPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── RegisterPage.jsx
│   ├── services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── bookService.js
│   ├── utils
│   │   └── helpers.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd bookfinder-frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.