var express = require('express');
var router = express.Router();
var Repairs = require('../controllers/repair')



router.get('/repairs', function(req, res, next) {
  let ano = req.query.ano;
  let marca = req.query.marca;
  //GET /repairs?ano=YYYY: devolve a lista das reparações realizadas durante o ano YYYY;
  if (ano) {
    Repairs.listrepairsbyano(ano)
      .then(data => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Erro na listagem das reparações realizadas durante o ano: ${err}`);
      });
  }
  //GET /repairs?marca=VRUM: devolve a lista das reparações realizadas em automóveis da marca VRUM;
  else if (marca) {
    Repairs.listrepairsbymarca(marca)
      .then(data => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Erro na listagem das reparações realizadas em automóveis da marca: ${err}`);
      });
  }
  //GET /repairs: devolve uma lista com todos os registos dos automóveis reparados;
  else {
    Repairs.listrepairs()
      .then(data => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Erro na listagem dos automóveis: ${err}`);
      });
  }
});

//GET /repairs/interv: devolve a lista de intervenções realizadas (lista de triplos sem repetições e ordenada por código: código, nome e descrição);
router.get('/repairs/interv', function(req, res, next) {
  Repairs.listinterv()
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro na mostragem das intervenções: ${err}`);
    });
});

//GET /repairs/matrículas: devolve a lista de matrículas (sem repetições e ordenada alfabeticamente);
router.get('/repairs/matrículas', function(req, res, next) {
  Repairs.listmatriculas()
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro na mostragem das matrículas: ${err}`);
    });
});

//GET /repairs/:id: devolve o registo com identificador id;
router.get('/repairs/:id', function(req, res, next) {
  Repairs.getrepairbyid(req.params.id)
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro na mostragem da repair: ${err}`);
    });
});

//POST /repairs: acrescenta um registo novo à BD;
router.post('/repairs', function(req, res, next) {
  Repairs.addrepair(req.body)
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao acrescentar uma repair nova à BD: ${err}`);
    });
});

//DELETE /repairs/:id: elimina da BD o registo com o identificador id.
router.delete('/repairs/:id', function(req, res, next) {
  Repairs.deleterepair(req.params.id)
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao eliminar uma repair da BD: ${err}`);
    });
});

module.exports = router;