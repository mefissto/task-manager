const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./db/mongoose');

const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/task.router');
const authRouter = require('./routes/auth.router');

const { errorHandler, errorInterceptor } = require('./helpers/error.handler');

const app = express();
const port = process.env.PORT;

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// use cors package instead of following custom middleware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );

//   if (req.method === 'OPTIONS') {
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     return res.status(200).send();
//   }

//   next();
// });

// router handlers
app.use(userRouter);
app.use(taskRouter);
app.use(authRouter);

// error handlers
app.use(errorInterceptor);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is on port ${port}`));
