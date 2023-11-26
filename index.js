const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    console.log("Error occured while Database connection", err);
  })


const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String
});

// Hint: Create User Schema here
// const userSchema = ...

const Blog = new mongoose.model("Blog", blogSchema);

// Hint: Create User Model here
// const User = ...

app.get('/', (req, res) => {

  Blog.find({})
    .then((posts) => {
      res.render("index", { blogPosts: posts })
    })
    .catch((err) => {
      console.log("Error getting data", err);
      res.redirect("/");
    });
});


app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  const title = req.body.title;
  const image = req.body.imageUrl;
  const description = req.body.description;

  const newBlog = new Blog({
    imageURL: image,
    title: title,
    description: description,
  })

  newBlog.save()
    .then(() => {
      console.log("New Blog Posted");
    })
    .catch((err) => {
      console.log("Error posting New Blog");
    });

  res.redirect('/');
})

app.get('/post/:id', (req, res) => {

  // TODO: Task 1 to implement the dynamic routing with mongodb
  // Hint:

  // const reqID = req.params.id;
  // console.log(reqID);

  // Blog.findOne({ _id: reqID })
  //   .then((post) => {
  //      // Guess it    
  //   })
  //   .catch((err) => {
  //     console.log("Post Not Found");
  //     redirect to home page
  //   });
})


// Using Dynamic routing concept
// Hint: Send blog _id to be deleted in req.params from frontend delete button
app.get('/post/delete/:id', (req, res) => {

  // TODO: Task 2 to implement the delete operation with mongodb

  // const idToDelete = req.params.id;

  // Your Logic Here...
  // Search mongoDB method to find and delete document using ID
})


// TODO: Task 3 to implement login and sign up.

// signup routes
app.get("/signup", (req, res) => {
  // render signup page
});

app.post("/signup", (req, res) => {
  // Hint:
  // const newUser = new User({
  //   email: type here something...,
  //   password: type here something...,
  // });

  // newUser.save()
  //   .then(() => {
  //     console.log("New User Created");
  //   })
  //   .catch((err) => {
  //     console.log("Error Creating New User");
  //   });


  // redirect to login page
});

// login routes
app.get("/login", (req, res) => {
  // Hint
  // render login page
});

app.post("/login", (req, res) => {
  // Hint
  // const reqEmail = something...
  // const reqPassword = something...
  //
  // User.findOne({ email: reqEmail })
  //   .then((user) => {
  //     if (user.password == reqPassword) {
  //       // Guess it!
  //     } else {
  //       // Guess it!
  //     }
  //   })
  //   .catch((err) => {
  //       console.log("User Not Found");
  //       redirect to login page
  //   });
});


app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})


// port 3000 or deployment port provided by Render.com
const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log("Server Listening on port " + port);
});