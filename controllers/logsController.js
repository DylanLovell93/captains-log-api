//create router
const logs = require('express').Router();

//import data module
const logsData = require('../models/log');

//query handlers
const {
  handleOrder,
  handleMistakes,
  handleCrisis,
} = require('../helpers/logQuery');

logs.get('/', (req, res) => {
  const { order, mistakes, lastCrisis } = req.query;
  console.log('Successfully connected to "/logs"');
  let tempData = logsData;
  switch (true) {
    case order !== undefined:
      tempData = handleOrder(order, tempData);
    case mistakes !== undefined:
      tempData = handleMistakes(mistakes, tempData);
    case lastCrisis !== undefined:
      tempData = handleCrisis(lastCrisis, tempData);
  }
  res.json(tempData);
});

logs.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Currently showing a specific log (${id})`);
  logsData[id] ? res.json(logsData[id]) : res.redirect('/');
});

logs.post('/', (req, res) => {
  console.log('POST request to "/"');
  logsData.push(req.body);
  res.status(303).json(logsData);
});

//export logs for us in app
module.exports = logs;