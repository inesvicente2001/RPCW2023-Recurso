var Repair = require('../models/repair')


// GET /repairs: devolve uma lista com todos os registos dos automóveis reparados;
module.exports.listrepairs = () => {
    return Repair
        .find()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
}


// GET /repairs/:id: devolve o registo com identificador id;
module.exports.getrepairbyid = (id) => {
    return Repair
        .findOne({id : id})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
}


// GET /repairs?ano=YYYY: devolve a lista das reparações realizadas durante o ano YYYY;
module.exports.listrepairsbyano = (ano) => {
    return Repair
        .find({data: { $regex: `^${ano}-\\d{2}-\\d{2}` }})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
}

// GET /repairs?marca=VRUM: devolve a lista das reparações realizadas em automóveis da marca VRUM;
module.exports.listrepairsbymarca = (marca) => {
    return Repair
        .find({"viatura.marca": marca})
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
}


// GET /repairs/matrículas: devolve a lista de matrículas (sem repetições e ordenada alfabeticamente);
module.exports.listmatriculas = () => {
    return Repair
        .distinct("viatura.matricula")
        .sort()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
}

// GET /repairs/interv: devolve a lista de intervenções realizadas (lista de triplos sem repetições e ordenada por código: código, nome e descrição);


// POST /repairs: acrescenta um registo novo à BD;
module.exports.addrepair = (repair) => {
    return new Repair({
        nome: repair.nome,
        nif: repair.nif,
        data: repair.data,
        viatura: repair.viatura,
        nr_intervencoes: repair.nr_intervencoes,
        intervencoes: repair.intervencoes,
        id : repair.id,
    }).save();
};


// DELETE /repairs/:id: elimina da BD o registo com o identificador id.
module.exports.deleterepair = (id) => {
    return Repair
    .findOneAndDelete({id: id})
}