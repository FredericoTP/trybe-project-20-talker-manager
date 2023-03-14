const fs = require('fs').promises;
const path = require('path');

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

async function allTalkers() {
  const file = await readTalkerFile();
  return file;
}

async function talkerById(id) {
  const file = await readTalkerFile();
  const talker = file.find((item) => item.id === id);
  return talker;
}

module.exports = {
  allTalkers,
  talkerById,
};