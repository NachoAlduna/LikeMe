const pool = require("./dbConfig");

const conectarDB = async () => {
    try {
        const res = await pool.query(`SELECT NOW()`);
        console.log("Conexion exitosa, fecha y hora actuales:", res.rows[0]);
    } catch (error) {
        console.error("Error al conectar a la Base de datos", error);
    }
}
//Llamar a la funcion de conectarDB
conectarDB();
// const guardarPost = async (post) => {
//   const values = Object.values(post);
//   const consulta = {
//     text: "INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0)",
//     values,
//   };
//   const result = await pool.query(consulta);
//   return result;
// };
const guardarPost = async (titulo, img, descripcion, likes) => {
  const consulta = {
    text: "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, $4)",
    values: titulo, img, descripcion, likes,
  };
  const result = await pool.query(consulta);
  return result;
};
const getPosts = async () => {
  const result = await pool.query(
    `SELECT * FROM posts`
  );
  return result.rows;
};

const like = async (id) => {
  const result = await pool.query(`UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *`, [id]);
  return result.rows;
};
const updateLikes = async (id) => {
  const updatedPost = await like(id);
  return updatedPost;
};
module.exports = { guardarPost, getPosts, like, updateLikes};
