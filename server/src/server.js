const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.set('port', 4000);
app.use(express.json());
app.use(require('./routes/articles'));

app.listen(app.get('port'), () => {
    console.log('Server listening on port ', app.get('port'));
});