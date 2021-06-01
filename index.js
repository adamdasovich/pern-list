const express = require('express');
const cors = require('cors');
const pool = require('./db')

const app = express();

// middleware
app.use(cors());  // using cors allows us to access resources across different origins
app.use(express.json()) // this middleware is required to access the req.body info

//ROUTES
// create a todo
app.post('/todos', async (req, res) => {
    try {
       const { description } = req.body
       const newTodo = await pool.query(
        'INSERT INTO todo (description) VALUES ($1) RETURNING *',
        [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
       console.error(err.message) 
    }
})

   // get all todos

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo') // we did not need the RETURNING * because SELECT naturally does that for us
            res.json(allTodos.rows)
    } catch (error) {
        console.error(err.message)
    }
});

// get a specific todo
app.get('/todos/:id', async (req, res) => {
   try {
        const { id } = req.params
        const foundTodo = await pool.query(
        'SELECT * FROM todo WHERE todo_id = $1', 
        [id]
        );
    res.json(foundTodo.rows[0])
   } catch (error) {
       console.error(err.message)
   }
})

// update a todo

app.put('/todos/:id', async (req, res) => {
    try {
       const { id } = req.params
       const { description } = req.body
       const updateTodo = await pool.query(
           'UPDATE todo SET description = $1 WHERE todo_id = $2', 
            [description, id])
        res.json('the todo was updated') 
    } catch (error) {
        console.error(err.message)
    }
})

 
// delete a todo

app.delete('/todos/:id', async (req, res) => {
    try {
       const { id } = req.params
       const deleteTodo = await pool.query(
           'DELETE FROM todo WHERE todo_id = $1', 
           [id]
           );
        res.json('todo was deleted') 
    } catch (error) {
        console.error(err.message)
    }
})








app.listen(5000, () => {
    console.log(`the server is listening on port 5000`)
})