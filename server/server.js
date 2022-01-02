const express = require("express");

const cors = require("cors");

const db = require('./db');

const pool = require("./db");

const app = express();

//middleware
app.use(cors())
app.use(express.json());


//Routes

//Create tableA
app.post("/tableA", async (req,res) => {
    try {
        const {name,location,price } = req.body;
        const newtableA = await pool.query("INSERT INTO tableA (name, location, price ) VALUES($1, $2, $3) RETURNING * ",
        [name , location, price]);
        res.json(newtableA.rows[0]);
    } catch (err) {
        console.error(err.message)
        
    }
})

//Get all of tableA
app.get("/tableA", async (req,res) => {
    try {
        
        //const alltableA = await pool.query("SELECT * FROM tableA ");
        const alltableA = await pool.query("select * from tableA left join (select tableaid, COUNT(*), TRUNC(AVG(rating),1) as average_rating from tableB group by tableaid) tableB on tableA.id = tableB.tableaid;");

        res.json(alltableA.rows);
    } catch (err) {
        console.error(err.message)
        
    }
})

//Get a Specific Restaurant
app.get("/tableA/:id", async (req,res) => {
    try {
        const {id} = req.params;
        //const tableA = await pool.query("SELECT * FROM tableA WHERE id = $1 ",[id]);
        const tableA = await pool.query("select * from tableA left join (select tableaid, COUNT(*), TRUNC(AVG(rating),1) as average_rating from tableB group by tableaid) tableB on tableA.id = tableB.tableaid where id = $1",[id]);
        res.json(tableA.rows[0]); 
    } catch (err) {
        console.error(err.message)
        
    }

})

//Select Reviews
app.get("/tableB/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const tableB = await pool.query("SELECT * FROM tableB WHERE tableaid = $1",[id]);
        res.json(tableB.rows);  

    } catch (err) {
        console.error(err.message)
        
    }

})

// Get All Reviews related to a Resturant

app.get("/tableB/:id/review", async (req, res) => {
    try {
        const {id} = req.params;
        const tableB = await pool.query("SELECT * FROM tableB WHERE id = $1", [id]);
        res.json(tableB.rows[0]);
        
    } catch (err) {
        console.error(err.message)
    }
})

//Update tableA
app.put("/tableA/:id", async (req,res) => {
    try {
        const {id} = req.params;

        const {name,location,price } = req.body;
        const UpdatetableA = await pool.query("UPDATE tableA SET name = $1, location = $2, price = $3 WHERE id = $4",
        [name,location,price,id]);
        
        res.json("The List was Updated");

        
    } catch (err) {
        console.error(err.message)
        
    }

})

//Delete tableA
app.delete("/tableA/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deletetableA = await pool.query("DELETE FROM tableA WHERE id = $1 ",[id]);
        res.json("tableA was deleted");  
    } catch (err) {
        console.error(err.message)
        
    }

})

//Delete Reviews Related to a Restaurant
app.delete("/tableB/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deletetableB = await pool.query("DELETE FROM tableB WHERE tableaid = $1 ",[id]);
        res.json("tableA was deleted");  
    } catch (err) {
        console.error(err.message)
        
    }

})

// Create Reviews Based on there Tables
app.post("/tableB/:id/review", async (req,res) => {
    try {
        const {name, review , rating } = req.body;
        const {id} = req.params;
  
        const newtableB = await pool.query("INSERT INTO tableB (tableaid, name, review , rating) values ($1, $2, $3, $4) RETURNING * ",
        [id, name, review , rating]);
  
        res.json(newtableB.rows[0]);
  
    } catch (err) {
        
        console.error(err.message)
     
    }
})


app.listen(5000, () => {
    console.log("server is up and listening on port 5000");
})