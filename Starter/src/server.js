const express = require('express');
const nunjucks = require('nunjucks')

const db = require("./database/db")

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
})

server.get("", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
  const query = `
         INSERT INTO places (
           image,
           name,
           address,
           address2,
           state,
           city,
           items
         ) VALUES (?, ?, ?, ?, ?, ?, ?);
       `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no cadastro")
    }
    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {
  const search = req.query.search
  let query = ""
  if(search == "") {
    query = `SELECT * FROM places`
  }
  else {
    query = `SELECT * FROM places WHERE city LIKE '%${search}%'`
  }

  db.all(query , function(err, rows) {
    if(err) {
      return console.log(err)
    }

    const total = rows.length

    return res.render("search-results.html", { places: rows, total, })
  })
  
})

server.listen(3333)