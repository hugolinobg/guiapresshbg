const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const connection = require("./database/database");

const RouterCategories = require("./categories/CategoriesController");
const RouterArticles = require("./articles/ArticlesController");
const RouterUsers = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

//View engine
app.set("view engine", "ejs");

//Sessions
app.use(
  session({
    secret: "#onil&oguh#",
    cookie: {
      maxAge: 3600000
    }
  })
);

//static
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Servidor conectado com sucesso!");
  })
  .catch(err => {
    console.log("Erro ao conectar no Servidor!" + err);
  });

app.use("/", RouterCategories);

app.use("/", RouterArticles);

app.use("/", RouterUsers);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", {
        articles: articles,
        categories: categories
      });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  })
    .then(article => {
      if (article != undefined) {
        Category.findAll().then(categories => {
          res.render("article", {
            article: article,
            categories: categories
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch(err => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;

  Category.findOne({
    where: {
      slug: slug
    },
    include: [{ model: Article }]
  })
    .then(category => {
      if (category != undefined) {
        Category.findAll().then(categories => {
          res.render("index", {
            articles: category.articles,
            categories: categories
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch(err => {
      res.redirect("/");
    });
});

/*
app.get("/admin/articles/new", (req, res) => {
  res.send("test articles new");
});
*/

app.listen(80, () => {
  console.log("Servidor esta Rodando!");
});
//npm install --save bcryptjs
//npm install --save sequelize
//npm install --save express
//npm install --save express-session
//npm install --save mysql2
//npm install --save body-parser
//npm install --save ejs
//npm install --save nodemon
//npm install --save slugify
