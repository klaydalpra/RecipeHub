import express from 'express';
import session from 'express-session'; // Session middleware
import exphbs from 'express-handlebars';
import configRoutes from './routes/index.js';

const app = express();
const staticDir = express.static('public');

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/public', staticDir);

// Configure sessions
app.use(
  session({
    name: 'AuthCookie',
    secret: 'super_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Global logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toUTCString();
  const method = req.method;
  const route = req.originalUrl;
  const authStatus = req.session.user ? 'Authenticated User' : 'Non-Authenticated User';
  console.log(`[${timestamp}] ${method} ${route} (${authStatus})`);
  next();
});

// Make session data available in all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Configure handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure routes
configRoutes(app);

// Start the server
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
