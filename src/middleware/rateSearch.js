const validateNumber = (number) => !Number.isInteger(number) || !(number >= 1 && number <= 5);

const rateSearch = (req, res, next) => {
  const queryItens = req.query;

  if (!queryItens.rate) {
    return next();
  }

  if (validateNumber(Number(queryItens.rate))) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

module.exports = rateSearch;