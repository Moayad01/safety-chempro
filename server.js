const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const csrf = require('csurf');
const session = require('express-session');
const multer = require('multer');
const upload = multer(); // sets up multer for multipart/form data

// Serve static files from the dist folder
app.use(express.static('dist'));
// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Parse JSON bodies (if needed)
app.use(bodyParser.json());

// Middleware to parse JSON and URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session configuration
app.use(session({
  secret: '9r$B&E)H@McQfTjWnZr4u7x!A%D*G-Ka',  // A strong secret key for session encryption
  resave: false,  // Avoids resaving session variables if they haven't been modified
  saveUninitialized: false,  // Does not save a session that is new and not modified
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production only
    httpOnly: false,  // Prevent client-side scripts from accessing the cookies, set to true in production for security
    maxAge: 30 * 60 * 1000,  // Set cookie expiration time; here, it's 30 minutes
    sameSite: 'lax'  // Restrict how cookies are sent with requests from external sites, helping to prevent CSRF attacks
  }
}));



const { signup, signin, post, response, searchPostSimilar } = require("./models/DatabaseController.js");

function checkLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    next();  // Continue to the next middleware or route handler
  } else {
    // Ensure there's a proper response or redirection if not logged in
    res.redirect('sign_in');
  }
}


app.get('/check-login', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Debugging middleware for POST /signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signin(email, password);
    if (result.statusCode === 200) {
      req.session.userId = email;
      req.session.save(err => {
        if (err) {
          console.error('Error saving session:', err);
          res.redirect('/sign_in');
        } else {
          res.redirect('/index');
        }
      });
    } else {
      req.flash('error', result.message);
      res.redirect('/sign_in');
    }
  } catch (error) {
    console.error('SignIn Error:', error);
    req.flash('error', 'An unexpected error occurred. Please try again.');
    res.redirect('/sign_in');
  }
});

app.post('/signup', async function (req, res) {
  const email = req.body.email;
  const name = req.body.firstName + " " + req.body.lastName;
  const password = req.body.password;
  const result = await signup(email, name, password);

  // Check the result to determine the redirect behavior
  if (result.statusCode === 200) {
    // Success: Redirect to the sign-in page with a success message
    const message = encodeURIComponent('Registration successful. Please sign in.');
    res.redirect(`sign_in?message=${message}`);
  } else {
    // Failure: Redirect back to the sign-up page with an error message
    const message = encodeURIComponent(result.message);
    res.redirect(`sign_up?error=${message}`);
  }
});

app.post('/createPost', checkLoggedIn, async (req, res) => {
  const message = req.body.message;
  try {
    const result = await post(message, req.session.userId);
    res.redirect('/post');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('An error occurred while creating the post.');
  }
});

app.post('/postResponse', upload.none(), checkLoggedIn, async (req, res) => {
  console.log("Content-Type:", req.headers['content-type']); // Log the Content-Type of the request
  console.log("Received post_id:", req.body.ID);
  console.log("Received answer:", req.body.answer);

  try {
    const result = await response(req.body.ID, req.body.answer, req.session.userId);
    res.json({ posts: result.posts });
  } catch (error) {
    console.error('Error posting response:', error);
    res.status(500).send('An error occurred while posting the response.');
  }
});

app.get('/searchPosts', async (req, res) => {
  const topic = req.query.topic;
  console.log("Search Topic Received:", topic); // Log the received topic

  try {
    const result = await searchPostSimilar(topic);
    console.log("Search Result:", JSON.stringify(result, null, 2)); // Log the detailed result in a readable format

    if (result.statusCode === 200) {
      console.log("Found Posts:", result.posts);
      // Send the posts as JSON
      res.json({ posts: result.posts });
    } else {
      console.log("No posts found or error:", result.message);
      res.status(result.statusCode).send(result.message);
    }
  } catch (error) {
    console.error("Error searching for posts:", error);
    res.status(500).send('An error occurred while searching for posts.');
  }
});

app.route("/")
  .get(async (req, res) => {
    res.redirect('/sign_in');
  });

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/sign_in', function (req, res) {
  // Check if the user is already logged in
  if (req.session.userId) {
    console.log('User already logged in, redirecting to index.');
    res.redirect('/index'); // Redirect to a page for logged-in users
  } else {
    res.sendFile(__dirname + '/dist/sign_in.html');
  }
});

app.get('/sign_up', function (req, res) {
  res.sendFile(__dirname + '/dist/sign_up.html');
});

app.get('/units', checkLoggedIn, function (req, res) {
  res.sendFile(__dirname + '/dist/units.html');
});

app.get('/post', checkLoggedIn, function (req, res) {
  res.sendFile(__dirname + '/dist/post.html');
});

app.get('/contact_us', checkLoggedIn, function (req, res) {
  res.sendFile(__dirname + '/dist/contact_us.html');
});

// Logout route improved with session regeneration
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Session Destruction Error:', err);
      return res.redirect('/index');
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.redirect('/sign_in');
  });
});

// Start the server
app.listen(5000, function () {
  console.log('Server is running on http://localhost:5000/index');
});
