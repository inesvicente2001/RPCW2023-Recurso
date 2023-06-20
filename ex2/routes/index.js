var express = require('express');
var router = express.Router();
const axios = require("axios");


router.get('/', function(req, res, next) {
    let d = new Date().toISOString().substring(0, 16);
    axios
      .get("http://localhost:16016/repairs")
      .then((ans) => {
        res.render("index", { rlist: ans.data, d: d });
      })
      .catch((err) => {
        res.render("error", { error: err });
        console.log("Erro na obtenção da lista de contratos: " + err);
      });
});

router.get('/:marca', function(req, res, next) {
  let d = new Date().toISOString().substring(0, 16);
  axios
    .get(`http://localhost:16016/repairs?marca=${req.params.marca}`)
    .then((ans) => {
      res.render("pagmarca", { rlist: ans.data, d: d , m: req.params.marca});
    })
    .catch((err) => {
      res.render("error", { error: err });
      console.log("Erro na obtenção do contrato: " + err);
    });
});

router.get('/:id', function(req, res, next) {
  let d = new Date().toISOString().substring(0, 16);
  axios
    .get(`http://localhost:16016/repairs/${req.params.id}`)
    .then((ans) => {
      res.render("pagid", { r: ans.data, d: d });
    })
    .catch((err) => {
      res.render("error", { error: err });
      console.log("Erro na obtenção do contrato: " + err);
    });
});

module.exports = router;