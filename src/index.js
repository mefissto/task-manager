const express = require('express');
const morgan = require('morgan');
require('./db/mongoose');

const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/task.router');
const authRouter = require('./routes/auth.router');

const { errorHandler, errorInterceptor } = require('./helpers/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(authRouter);

// error handlers
app.use(errorInterceptor);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is on port ${port}`));
