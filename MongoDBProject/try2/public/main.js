/* globals fetch */
var update = document.getElementById('update')
var del = document.getElementById('delete')
var passportDel = document.getElementById('nameToDelete')

update.addEventListener('click', function () {
  fetch('flightDetails', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'passportNo': 'Darth Vader'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})

del.addEventListener('click', function () {
	window.alert(passportDel.value)	
  fetch('flightDetails', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'passportNo': passportDel.value
    })
  }).then(function (response) {
	  window.alert("delete")
    window.location.reload()
	
  })
})