const express = require('express');
const connection = require('./settings');
const path = require('path');

const port = 3000;


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) =>{

	let query = 'SELECT * FROM todo';

	connection.query(query, (err, results, fields) => {

		if (err){

			console.log(err);
		}
		else {

			console.log(results);
			
			res.render('home', {data: results});
		}
	})

	


});


app.post('/', (req, res) => {

	let todo = req.body.todo;

	let query = 'INSERT INTO todo (todo) VALUES (?)';

	connection.query(query, [todo], (err, results, fields) =>{

		if (err){

			console.log(err);
		}
		else {

			console.log(results.affectedRows);

		}
	});

	res.redirect('/');
});



app.get('/update/:id', (req, res) => {

	let id = req.params.id;

	let query = "SELECT todo FROM todo WHERE todo_id =?"

	connection.query(query, [id], (err, results, fields) => {

		if (err){

			console.log(err);
		}
		else {

			console.log(results);
			res.render("update", {data: results})
		}
	})

	
});

app.post('/update/:id', (req, res) => {

	let id = req.params.id;

	let todo = req.body.todo;

	let query = "UPDATE todo SET todo = ? WHERE todo_id = ?";

	connection.query(query, [todo, id], (err, results, fields) => {

		if (err){

			console.log(err)
		}
		else {

			console.log(results);
			res.redirect('/');
		}
	})
})


app.get('/delete/:id', (req, res) => {

	let id = req.params.id;

	let query = "DELETE FROM todo WHERE todo_id = ?";

	connection.query(query, [id], (err, results, fields) => {

		if (err){

			console.log(err);
		}
		else {

			console.log(results);
			res.redirect('/');
		}
	})
})





app.listen(port, () => {

	console.log("Server is running on port 3000");
})