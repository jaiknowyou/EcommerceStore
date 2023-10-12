const express = require('express')
const app = express()
let route = require('./Routes/routes')

app.get('/ping', function (req, res) {
    return res.send('PONGING');
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', routes )

app.listen(PORT, function () {
    console.log('Listening on ' + PORT);
});