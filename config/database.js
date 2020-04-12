const mongoose = require('mongoose');
// ini local
// const mongoDB = 'mongodb://localhost/Fist_App';
// ini online
const mongoDB = 'mongodb+srv://FirstApp:1q2w3e4r5t@firstapp-nucpv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(
    mongoDB,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
).then(()=>console.log('Mongodb connected'));

// mongoose.connect(process.env.mongoDB, {
// useUnifiedTopology: true,
// useNewUrlParser: true,
// })
// .then(() => console.log('DB Connected!'))
// .catch(err => {
// console.log(DB Connection Error: ${err.message});
// });
// mongoose.connect(mongoDB, { useFindAndModify: false });
mongoose.Promise = global.Promise;
module.exports = mongoose;