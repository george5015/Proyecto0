registerUser = () => {
   fetch('/users/register', {
   method: 'POST',
   headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
   body: JSON.stringify({
     name: document.getElementById('name').value,
     username: document.getElementById('username').value,
     password: document.getElementById('password').value
   })
 })
 .then(response => response.json())
 .catch(error => console.error('Error:', error))
 .then(response => console.log('Success:', response))
};

loginUser = () => {
  console.log("username", document.getElementById('username').value)

  var obj = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }

  console.log("obj", obj)
   fetch('/users/login', {
   method: 'POST',
   headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     username: document.getElementById('username').value,
     password: document.getElementById('password').value
   })
   }
 )
 .then(response => response.json())
 .catch(error => console.error('Error:', error))
 .then(response => console.log('Success:', response))
};
