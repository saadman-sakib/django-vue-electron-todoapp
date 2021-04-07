var register = (username, password) => {
	var requestOptions = {
	  method: 'POST',
	  headers: {"Content-Type": "application/json"},
	  body: JSON.stringify({"username":username, "password": password}),
	  redirect: 'follow'
	};

	fetch("http://localhost:8000/register/", requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}


var getAuthToken = (username, password) => {
	var requestOptions = {
	  method: 'POST',
	  headers: {"Content-Type": "application/json"},
	  body: JSON.stringify({"username":username,"password":password}),
	  redirect: 'follow'
	};

	fetch("http://localhost:8000/authtoken/", requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}


var fetchAllTasks = (token) => {
	var requestOptions = {
	  method: 'GET',
	  headers: {
	  	"Content-Type": "application/json",
		"Authorization": `Token ${token}`
	  },
	  redirect: 'follow'
	};

	fetch("http://localhost:8000/todos/", requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}


var fetchTask = (token, id) => {
	var requestOptions = {
	  method: 'GET',
	  headers: {
	  	"Content-Type": "application/json",
		"Authorization": `Token ${token}`
	  },
	  redirect: 'follow'
	};

	fetch(`http://localhost:8000/todos/${id}/`, requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}


var postTask = (token, title, time) {
	var requestOptions = {
	  method: 'POST',
	  headers: {
	  	"Content-Type": "application/json",
		"Authorization": `Token ${token}`
	  },
	  body: JSON.stringify({"title":title,"time":time}), //"2021-04-06T06:00:00Z",
	  redirect: 'follow'
	};

	fetch("http://localhost:8000/todos/", requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}


var deleteTask = (token, id) {
	var requestOptions = {
	  method: 'DELETE',
	  headers: {
	  	"Content-Type": "application/json",
		"Authorization": `Token ${token}`
	  },
	  redirect: 'follow'
	};

	fetch(`http://localhost:8000/todos/${id}/`, requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}


var updateTask = (token, id, title, time) {
	var requestOptions = {
	  method: 'POST',
	  headers: {
	  	"Content-Type": "application/json",
		"Authorization": `Token ${token}`
	  },
	  body: JSON.stringify({"title":title,"time":time}), //"2021-04-06T06:00:00Z",
	  redirect: 'follow'
	};

	fetch(`http://localhost:8000/todos/${id}/`, requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}