const express = require('express');
const { allTalkers,
  talkerById,
  randomToken,
  addTalker,
  readTalkerFile,
  updateTalker } = require('./talker');
const loginValidation = require('./middleware/loginValidation');
const emailValidation = require('./middleware/emailValidation');
const passwordValidation = require('./middleware/passwordValidation');
const authorizationValidation = require('./middleware/authorizationValidation');
const nameValidation = require('./middleware/nameValidation');
const ageValidation = require('./middleware/ageValidation');
const talkValidation = require('./middleware/talkValidation');
const watchedAtValidation = require('./middleware/watchedAtValidation');
const rateValidation = require('./middleware/rateValidation');

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

app.post('/talker',
  authorizationValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const talker = req.body;

    const file = await readTalkerFile();
    const lastFile = file[file.length - 1];
    const newTalker = { id: lastFile.id + 1, ...talker };

    await addTalker(newTalker);

    return res.status(201).json(newTalker);
  });

app.put('/talker/:id',
  authorizationValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const { id } = req.params;
    const talker = req.body;

    const updatedTalker = await updateTalker(talker, Number(id));

    if (!updatedTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(updatedTalker);
  });