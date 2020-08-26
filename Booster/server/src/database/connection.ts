import knex from 'knex'
import path from 'path'

/* Utilizando o PATH para chegar a pasta
certa, padronizando o caminho para qualquer
Sistema Operacional */

/* Criando uma conexão com o banco, colocando
o nome do cliente e suas conexões */
const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,

})

export default connection

// Migrations = Histórico de banco de dados