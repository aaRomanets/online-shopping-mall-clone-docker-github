import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

////модель пользователя в базе данных MongoDb
const userSchema = mongoose.Schema({
    //имя пользователя
    name: {
        type:String,
        maxlength:50
    },
    //электронная почта пользователя
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    //пароль пользователя
    password: {
        type: String,
        minglength: 5
    },
    //фамилия пользователя
    lastname: {
        type:String,
        maxlength: 50
    },
    //карта товаров, выбранных пользователем
    cart: {
        type: Array,
        default: []
    },
    //изображение по пользователю
    image: String
})

////функция сравнения паролей
userSchema.methods.comparePassword = function(plainPassword,cb){
    //пароль plainPassword сравниваем с паролем this.password
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        //результат сравнения паролей isMatch отправляем в роутер авторизации пользователя
        cb(null, isMatch)
    })
}

//функция формирования токена пользователя
userSchema.methods.generateToken = function(cb) {
    var user = this;
    //формируем токен по пакету jwt и в токен загружаем идентификатор авторизируемого пользователя user._id
    var token =  jwt.sign(user._id.toHexString(),'secret')
    //вводим сформированный токен в модель базы данных пользователя
    user.token = token;
    //записываем модель базы данных пользователя с сформированным токеном  в базу данных MongoDb
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

////функция нахождения данных по токену
userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    //находим идентификатор пользователя по токену token
    jwt.verify(token,'secret',function(err, decode)
    {
        //идентификатор decode найден, находим самого пользователя
        user.findOne({"_id":decode, "token":token}, function(err, user)
        {
            //пользователя не получилось найти
            if(err) return cb(err);
            //пользователя получилось найти
            cb(null, user);
        })
    })
}

//фиксируем модель пользователя в базе данных MongoDb
const User = mongoose.model('User', userSchema);
export default User; 