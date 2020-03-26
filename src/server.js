const express = require('express');
const router = require('./router');

const app = express();
let port = process.env.PORT || 3000;

router(app);

app.listen(port, () => console.log(`API Served off port: ${port}`));