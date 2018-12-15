import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './Server/routes/route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, './../UI/')));
app.use('/UpI', express.static(path.resolve(__dirname, '../UI/')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../UpI/index.html')))

app.use('/api/v1/', routes);
// catching an error before passing it to the erro handler
app.use('*', (req, res, next) => {
  const err = new Error('sorry this page was not found');
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
  return next();
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

export default app;
