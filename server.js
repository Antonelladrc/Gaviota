const express = require("express")
const mysql2 = require("mysql2")
const cors = require("cors")

const app = express()
app.use(cors())

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "seagull"
})

app.get("/", (req, res) =>{
    return res.json("este es el backend");
})

app.get("/users", (req, res) =>{
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(3306, () =>{
    console.log("listening");
})
