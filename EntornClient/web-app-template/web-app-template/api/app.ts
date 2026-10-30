import playersRouter from './routes/jugador'
import teamsRouter from './routes/team'

import express from 'express';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.use('/api/facturas', playersRouter);

app.use('/api/lineas', teamsRouter);

app.listen(3000, () => {
    console.log('API on http://localhost:3000')
});



