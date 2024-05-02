const mysql = require('mysql');



const connection = mysql.createConnection({

	host: '',
	user: '',
	password: '',
	database: ''
});


connection.connect((err) => {

	if (err){

		console.log("database err " + err);
	}
	else {

		console.log("Database connected successfully");
	}
});


module.exports = connection;
