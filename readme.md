# Movie Wishlist - Full Stack MERN Application

A modern, full-stack movie and series wishlist application built with React, Node.js, Express, and MongoDB. Users can maintain their movie and series wishlist, mark items as watched, and rate them with comments.

## 🎬 Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens
- **Wishlist Management**: Add movies and series by title to your personal wishlist
- **Watch Status Tracking**: Mark movies as watched and move them between lists
- **Rating System**: Rate watched movies/series with 1-5 stars
- **Comments**: Add detailed comments and reviews for watched content
- **Dual Lists**: Separate views for wishlist and watched items

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant UI updates without page refreshes
- **Intuitive Interface**: Clean, modern design with easy navigation
- **Search & Filter**: View movies by status (wishlist/watched)
- **Data Persistence**: All data securely stored in MongoDB

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JSON Web Tokens (JWT)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **MongoDB** (v4.4 or higher) - Local installation or MongoDB Atlas account
- **Git** - For cloning the repository

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie-wishlist.git
cd movie-wishlist
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Create environment file
Create a `.env` file in the backend root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/movie-wishlist
# For MongoDB Atlas, use:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-wishlist

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_secure_123456789
JWT_EXPIRE=7d

# Client Configuration
CLIENT_URL=http://localhost:3000
```

#### Start the backend server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Open a new terminal and navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Create environment file
Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start the frontend development server
```bash
npm run dev
```

The frontend application will run on `http://localhost:3000`

### 4. Database Setup

#### For Local MongoDB:
1. Start MongoDB service on your system
2. The application will automatically create the database and collections

#### For MongoDB Atlas:
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster and database
3. Update the `MONGO_URI` in your backend `.env` file
4. Add your IP address to the Atlas whitelist

## 📖 Usage Guide

### Getting Started

1. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - You'll be redirected to the login page

2. **Create an Account**
   - Click "Create a new account" on the login page
   - Fill in your username, email, and password
   - Click "Create account" to register

3. **Login**
   - Enter your email and password
   - Click "Sign in" to access the dashboard

### Using the Application

#### Dashboard
- View all your movies and series in one place
- See both wishlist and watched items
- Quick access to add new items

#### Adding Movies/Series
1. Click the "Add Movie/Series" button
2. Enter the title of the movie or series
3. Select the type (Movie or Series)
4. Click "Add to Wishlist"

#### Managing Your Wishlist
- **View Wishlist**: Click "Wishlist" in the navigation
- **Mark as Watched**: Click "Mark as Watched" on any wishlist item
- **Delete Items**: Click the trash icon to remove items

#### Rating and Reviewing
1. When marking an item as watched, a rating modal will appear
2. Select a rating from 1-5 stars
3. Add optional comments about the movie/series
4. Click "Save Rating" to complete

#### Viewing Watched Movies
- Click "Watched" in the navigation to see all rated content
- Edit ratings and comments by clicking "Edit Rating"
- Move items back to wishlist with "Move to Wishlist"

#### Account Management
- Your username is displayed in the top navigation
- Click "Logout" to sign out of the application

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Movie Endpoints (Protected)

#### Get All Movies
```http
GET /api/movies
Authorization: Bearer <token>

# Optional query parameters:
GET /api/movies?status=wishlist
GET /api/movies?status=watched
```

#### Add Movie to Wishlist
```http
POST /api/movies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Matrix",
  "type": "movie"
}
```

#### Update Movie (Mark as Watched, Rate, Comment)
```http
PUT /api/movies/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "watched",
  "rating": 5,
  "comment": "Amazing movie with great special effects!"
}
```

#### Delete Movie
```http
DELETE /api/movies/:id
Authorization: Bearer <token>
```

## 📁 Project Structure

```
movie-wishlist/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Movie.js              # Movie schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   └── movies.js             # Movie CRUD routes
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server setup
│   └── package.json              # Backend dependencies
└── frontend/
    ├── public/                   # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── auth/             # Login & Register components
    │   │   ├── movies/           # Movie-related components
    │   │   ├── layout/           # Navigation & Layout components
    │   │   └── common/           # Reusable components
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication state management
    │   ├── hooks/
    │   │   └── useApi.jsx        # Custom API hook
    │   ├── services/
    │   │   └── api.js            # API service functions
    │   ├── styles/
    │   │   └── index.css         # Global styles with Tailwind
    │   ├── App.jsx               # Main application component
    │   └── main.jsx              # Application entry point
    ├── .env                      # Frontend environment variables
    └── package.json              # Frontend dependencies
```

## 🎨 Key Components

### Frontend Components

- **AuthContext**: Manages user authentication state globally
- **MovieList**: Displays movies with filtering and actions
- **MovieCard**: Individual movie display with actions
- **RatingModal**: Star rating and comment interface
- **AddMovie**: Form for adding new movies to wishlist
- **Navbar**: Navigation with user info and logout

### Backend Models

- **User Model**: Stores user credentials and authentication data
- **Movie Model**: Stores movie information, ratings, and user associations

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: API endpoints require valid authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured for production
3. Deploy the backend folder

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Update `VITE_API_URL` to point to your deployed backend
3. Deploy the `dist` folder

### Environment Variables for Production

**Backend:**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=your_frontend_domain
```

**Frontend:**
```env
VITE_API_URL=your_backend_api_url
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with validation
- [ ] User login and logout
- [ ] Adding movies to wishlist
- [ ] Marking movies as watched
- [ ] Rating and commenting on movies
- [ ] Editing existing ratings
- [ ] Moving movies between lists
- [ ] Deleting movies
- [ ] Navigation between pages
- [ ] Responsive design on mobile

### Running Tests

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature-name'`
4. Push to your branch: `git push origin feature-name`
5. Create a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify environment variables in `.env`
- Ensure all dependencies are installed

**Frontend won't connect to backend:**
- Verify `VITE_API_URL` in frontend `.env`
- Check if backend is running on correct port
- Look for CORS issues in browser console

**Authentication not working:**
- Check JWT secret configuration
- Verify token storage in browser
- Check for expired tokens

**Database connection issues:**
- Verify MongoDB connection string
- Check database permissions
- Ensure network connectivity

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 Acknowledgments

- MongoDB for the excellent documentation
- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- The open-source community for inspiration and resources

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#🐛-troubleshooting)
2. Search existing [GitHub issues](https://github.com/your-username/movie-wishlist/issues)
3. Create a new issue with detailed information
4. Join our [Discord community](https://discord.gg/your-server) for real-time help

---

**Happy movie watching! 🍿**