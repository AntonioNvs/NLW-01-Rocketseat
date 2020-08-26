const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// utiliza o objeto do banco de dados para nossas operações

// db.serialize(() => {
//   // criar tabela com comando SQL
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)
  
//   // inserir dados
//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);
//   `

//   const values = [
//     /* "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//     "Colectoria",
//     "Guilherme Gemballa, Jardim América",
//     "Número 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos Eletrônicos, Lâmpadas"
//   ]

//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err)
//     } */
//     console.log("Cadastrado com sucesso")
//     console.log(this)
//   }

//   db.run(query, values, afterInsertData)
// })

module.exports = db