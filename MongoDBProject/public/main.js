/* globals fetch */
var update = document.getElementById('update')
var newUp
var fieldToUpdate = document.getElementById('oldNo')
var fieldUpdatedTo = document.getElementById('newNo')
var del = document.getElementById('delete')
var passportDel = document.getElementById('nameToDelete')


update.addEventListener('click', function () {
	fieldToUpdate = document.getElementById('oldNo').value
	fieldUpdatedTo = document.getElementById('newNo').value
	alert(fieldToUpdate)
	alert(fieldUpdatedTo)
  fetch('flightDetails', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'passportNo': fieldUpdatedTo
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
	window.location.reload()
  })
})

del.addEventListener('click', function () {

  fetch('flightDetails', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'passportNo': passportDel.value
    })
  }).then(function (response) {
	  window.alert("Deleted passport number: " + passportDel.value)
    window.location.reload()
	
  })
})