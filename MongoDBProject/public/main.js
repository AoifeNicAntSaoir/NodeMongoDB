/* globals fetch */
var update = document.getElementById('update')
var del = document.getElementById('delete')
var passportDel = document.getElementById('nameToDelete')
var key
var valueF

update.addEventListener('click', function () {
	key = document.getElementById('keyField').value
	valueF = document.getElementById('valueField')
  fetch('flightDetails', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      key: valueF
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