const express = require("express")
const server = express()

//pegar o banco de dados
 const db = require("./database/db")

// Configurar pasta publica
server.use(express.static("public"))


//utilizando templante engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})


//configurar caminhos da aplicação
//página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" })
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search", (req, res) => {

  //PEGAR OS DADOS DO BANCO DE DADOS
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

    //mostrar a pagina html com os dados do banco de dados 
    return res.render("search-results.html", { places: rows, total: total })

  })

})



//ligar o servidor
server.listen(3001)