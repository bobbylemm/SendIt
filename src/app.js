import express from 'express';
import morgan from 'morgan';
import routes from '../routes/route';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api/v1/', routes);
// catching an error before passing it to the erro handler
app.use((req, res, next) => {
    let err = new Error('this page was not found');
    err.status = 404;
    next(err);
})
// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})
// this api is hosted here
// https://fathomless-spire-38172.herokuapp.com/api/v1/users

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
})

export default app;