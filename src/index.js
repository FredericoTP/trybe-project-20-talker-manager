const express = require('express');
const { allTalkers, talkerById, randomToken } = require('./talker');
const loginValidation = require('./middleware/loginValidation');
const emailValidation = require('./middleware/emailValidation');
const passwordValidation = require('./middleware/passwordValidation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await allTalkers();

  if (!!talkers && talkers.length === 0) {
    return res.status(200).json([]);
  }

  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerById(Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.post('/login',
  loginValidation,
  emailValidation,
  passwordValidation,
  (req, res) => {
    const token = randomToken();

    return res.status(200).json({ token });
  });