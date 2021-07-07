/* eslint-disable no-console */
import chalk from 'chalk';
import debug from 'debug';
import http from 'http';
import { config } from 'dotenv';
import app from './server';
import Notif from './services/Notification';

config();

const log = debug('dev');

const { PORT } = process.env;

const port = PORT || 4000;
const server = http.createServer(app);
const Notification = new Notif(server);

Notification.start();

server.listen(port, () => {
  log(`Server is running on port ${chalk.yellow(port)}`);
  console.log(`Server is running on port ${chalk.yellow(port)}`);
});

export default { app, Notification };
