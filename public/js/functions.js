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

deleteEvent = (id) => {
   fetch('/events/'+ id, {
   method: 'DELETE',
   credentials: 'include'
 }).then((response) => {
   if(response.ok) {
     location.reload(true);
  }
 })
 .catch(error => console.error('Error:', error))
};
