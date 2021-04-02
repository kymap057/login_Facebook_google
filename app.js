const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Database = require('./config/database');
const userRouter = require('./router/userRouter');

const app = express();
Database.sequelize.sync().then( async()=>{
  console.log('connect database success...!!');
}).catch((e)=>{
  console.log(e,'connect database fail  ...!')
});



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user',userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hoàng kỳ demo login google, facebook" });
});

app.listen(8001, () => {
  console.log(`Server is running on port 8001.`);
});