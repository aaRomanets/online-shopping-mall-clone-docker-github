import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routerUsers from "./routes/users.js";
import routerProduct from "./routes/product.js";

const app = express();
app.use(cors());

//подключаем базу данных MongoDb
import mongoose from "mongoose";

//подключаем базу данных Mongo DB
mongoose.connect(process.env.MONGODB_URI != undefined ? process.env.MONGODB_URI : "mongodb://127.0.0.1:27017" , {
  dbName: process.env.DB_NAME != undefined ? process.env.DB_NAME : "shop_clone",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Mongodb connected....');
})
.catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});  

//вводим преобразователь выходных данных в json-формат
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//включаем маршрутизаторы запросов
app.use('/api/users', routerUsers);
app.use('/api/product', routerProduct);

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//запускаем сервер
const port = process.env.PORT || 3022

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});