const validateNumber = (number) => !Number.isInteger(number) || !(number >= 1 && number <= 5);

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate && rate !== 0) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (validateNumber(rate)) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

module.exports = rateValidation;