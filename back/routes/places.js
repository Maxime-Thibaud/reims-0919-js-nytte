const express = require('express');
const router = express.Router();
const connection = require("../conf");

router.get('/', (request, response) => {
  connection.query('SELECT local_name,local_photo,local_description,local_phone,local_pj,local_logo FROM place INNER JOIN admin WHERE place.admin_id=admin.id', [request.params.id], (err, results) => {
   if (err) {
    response.status(500).send('Error retrieving places');
   } else {
    response.json(results);
   }
 });
})

router.get('/:id', (request, response) => {
  connection.query('SELECT local_name,local_photo,local_description,local_phone,local_pj,local_logo FROM place INNER JOIN admin WHERE place.admin_id=admin.id AND place.id = ?', [request.params.id], (err, results) => {
   if (err) {
    response.status(500).send('Error retrieving places');
   } else {
    response.json(results);
   }
 });
})

router.post('/', (request, response) => {
  const formData = request.body;
  connection.query('INSERT INTO place SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      response.status(500).send("Error saving a new place");
    } else {
      response.sendStatus(200);
    }
  });
});

router.put('/:id', (request, response) => {
  const idPlace = request.params.id;
  const formData = request.body;
    connection.query('UPDATE place SET ? WHERE id = ?', [formData, idPlace], err => {
    if (err) {
      console.log(err);
      response.status(500).send("Error editing the place");
    } else {
      response.sendStatus(200);
    }
  });
});

  module.exports = router