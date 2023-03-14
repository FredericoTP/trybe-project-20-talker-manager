const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const talkerPath = path.resolve(__dirname, './talker.json');

async function readTalkerFile() {
  try {
    const response = await fs.readFile(talkerPath, 'utf-8');
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function writeTalkerFile(talker) {
  try {
    await fs.writeFile(talkerPath, talker);
  } catch (error) {
    console.log(error.message);
  }
}

async function allTalkers() {
  const file = await readTalkerFile();
  return file;
}

async function talkerById(id) {
  const file = await readTalkerFile();
  const talker = file.find((item) => item.id === id);
  return talker;
}

function randomToken() {
  const token = crypto.randomBytes(8).toString('hex');

  return token;
}

async function addTalker(talker) {
  const file = await readTalkerFile();

  file.push(talker);
  await writeTalkerFile(JSON.stringify(file));
}

async function updateTalker(object, id) {
  const { name, age, talk } = object;
  const file = await readTalkerFile();
  const findTalker = file.find((item) => item.id === id);

  if (!findTalker) return undefined;

  findTalker.name = name;
  findTalker.age = age;
  findTalker.talk = talk;

  await writeTalkerFile(JSON.stringify(file));

  return findTalker;
}

async function deleteTalker(id) {
  const file = await readTalkerFile();
  const filterFile = file.filter((item) => item.id !== id);

  await writeTalkerFile(JSON.stringify(filterFile));
}

async function findTalkerByQuery(query) {
  const file = await readTalkerFile();

  console.log(query);

  const filteredTalkers = file.filter((item) => item.name.includes(query.q))
    .filter((item) => item.talk.rate.toString().includes(query.rate))
    .filter((item) => item.talk.watchedAt.includes(query.date));

  return filteredTalkers;
}

async function updateRateTalker(rate, id) {
  const file = await readTalkerFile();
  const findTalker = file.find((item) => item.id === id);

  if (!findTalker) return undefined;

  findTalker.talk.rate = rate;

  await writeTalkerFile(JSON.stringify(file));

  return findTalker;
}

module.exports = {
  readTalkerFile,
  allTalkers,
  talkerById,
  randomToken,
  addTalker,
  updateTalker,
  deleteTalker,
  findTalkerByQuery,
  updateRateTalker,
};