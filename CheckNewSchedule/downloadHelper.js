const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getResponse = async (url, responseType) => {
  let response;

  if (!responseType) {
    responseType = 'text';
  }
  response = await axios.get(url, { responseType: responseType });
  return response;
};

const getText = async (url) => {
  try {
    const response = await getResponse(url);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
};

const fileFile = async (remoteFile) => {
  const url = remoteFile;
  const localFile = path.basename(url);
  const writer = fs.createWriteStream(localFile)

  const response = await getResponse(url, 'stream')

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

module.exports = { getFile, getText };