/* eslint-disable no-return-assign */
import express from 'express';
import 'express-async-errors';
import middlewares from '../../middlewares';
import helpers from '../../helpers';

// const userRepository = new dbRepository(models.User);
const { successStat, uploadImage } = helpers;

const { usession } = middlewares;

const uploadRoutes = express();

uploadRoutes.post('/', usession.can(''), async (req, res) => {
  const { data, title } = req.body;

  const fileName = `https://utiva-app.s3.amazonaws.com/media/${title}`;

  const image = await uploadImage(data, `media/${fileName}`);

  console.log(image);

  return successStat(res, 200, 'url', image.Location);
});

export default uploadRoutes;
