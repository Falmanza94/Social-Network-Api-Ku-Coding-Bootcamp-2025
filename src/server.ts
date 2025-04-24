import express from 'express';
import db from './config/connection';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

db.once('open', () => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })

db.on('error', (err) =>{
    console.error('MongoDB connection error:', err);
});