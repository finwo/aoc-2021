import 'reflect-metadata';
import 'module-alias/register';

// Load db and config
import { http } from '@config';

// Basic dependencies
const cors       = require('cors');
const express    = require('express');
const morgan     = require('morgan');

// Bootstrap container before loading controllers
import { Container } from 'typedi';
const app = express();
app.use(morgan('tiny'));
app.use(cors());
Container.set('router', app);
Container.set('db', {});

// Load app into container
import { AppModule } from './app';
Container.get(AppModule);

// Start listening
app.listen(http.port, '0.0.0.0', err => {
  if (err) throw err;
  console.log(`Listening on 0.0.0.0:${http.port}`);
})
