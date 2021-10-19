const { Pool, Client } = require("pg");

const pool = new Pool({
    user: "panos",
    host: "localhost",
    database: "blog",
    password: "5%*MhAk@74!",
    port: "5432"
  });

  pool.query(
    'INSERT INTO posts(id,title,main_text,author,post_date) VALUES(0,"title","title","john","10/7/21")',
    (err, res) => {
      console.log(err, res);
      pool.end();
    }
  );
  //CREATE USER panos  WITH ENCRYPTED PASSWORD '5%*MhAk@74!';
