const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hardik2002",
  database: "crud_contact",
});

dotenv.config({path : './config.env'});
const PORT = process.env.PORT;


if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get",(req ,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet ,(err,result)=>{
        res.send(result);
    });
});

app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove ="DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
          console.log(error);
        }
    });
  
  });
app.get("/api/get/:id",(req ,res)=>{
    const {id} =req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet , id,(err,result)=>{
      if(err){
        console.log(err);
      }
        res.send(result);
    });
});

app.put("/api/update/:id",(req ,res)=>{
  const {id} =req.params;
  const {name ,email,contact}=req.body;
  const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?,contact = ? WHERE id = ?";
  db.query(sqlUpdate ,[name, email, contact ,id],(err,result)=>{
    if(err){
      console.log(err);
    }
      res.send(result);
  });
});

app.post("/api/post",(req,res)=>{
  const {name, email, contact}=req.body;
  const sqlInsert ="INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
  db.query(sqlInsert,[name, email, contact],(error,result)=>{
      if(error){
        console.log(error);
      }
  });

});

    





app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO contact_db (name, email, contact) VALUES ('Xyz', 'xyz@gmail.com' ,021234)";
//   db.query(sqlInsert, (err, result) => {
//     console.log("Err", err);
//     console.log("Result", result);
//     res.send("Home page");
//   });
  
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
