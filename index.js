const database = require('./database');

async function execute() {
  try {
    const conn = await database.getConnection();

    let sql = 'INSERT INTO contatos(ctt_nome,ctt_sobrenome,ctt_email,ctt_telefone) VALUES (?,?,?,?)';

    let params = ['LUCAS', 'OLIVEIRA', 'lucas@xt.com', '18997345632'];

    //const [result] = await conn.execute(sql, params);

    //console.log(result);

    const [rows, fields] = await conn.query("SELECT * FROM `contatos`");

    console.log(rows);
  } catch (err) {
    console.error(err);
  } finally {
    await database.close();
  }
}

execute();
