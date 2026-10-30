import playersRouter from './routes/routerPlayer'
import teamsRouter from './routes/routerTeam'

import express from 'express';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.use(playersRouter);
app.use(teamsRouter);

app.listen(3000, () => {
    console.log('API on http://localhost:3000')
});
