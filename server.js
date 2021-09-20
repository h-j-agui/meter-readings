const express = require('express');
const app = express();
const models = require('./models/index');
const router = require('./routes');
const usePassport = require('./passport-config');
const admin = require('./adminRoutes');

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', router )
app.use('/admin', admin)







const port = 8080;





models.db.sync({
 force: false
})
.then(() =>{
    app.listen(port, () => {
        console.log(`Server was started on port ${port}`);
    });
})

