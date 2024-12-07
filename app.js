import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

import exphbs from 'express-handlebars';

const staticDir = express.static('public');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', staticDir);

configRoutes(app);
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});