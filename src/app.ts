import 'dotenv/config'
import server from './server';
import 'reflect-metadata';
import Debug from "debug";
const debug = Debug("backend:app");

const port = parseInt(process.env.PORT || '8000');

const starter = new server().start(port)
  .then(port => debug(`Running on port ${port}`))
  .catch(error => {
    debug(error)
  });

export default starter;