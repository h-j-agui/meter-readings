const express = require('express');
const app = express();
const models = require('./models/index');
const router = require('./routes');



app.set('view-engine', 'ejs');

app.use('/', router )


const port = 8080;


models.db.sync({
 force: false
})
.then(() =>{
    app.listen(port, () => {
        console.log(`Server was started on port ${port}`);
    });
})

