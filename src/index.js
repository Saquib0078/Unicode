const express = require("express");
const bodyParser = require('body-parser');
const mongoose  = require("mongoose");
const route = require("./Routes/route")
const app = express();
const cors=require('cors')

require('dotenv').config();


app.use(cors({ origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}).then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))



app.use('/', route);





app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});