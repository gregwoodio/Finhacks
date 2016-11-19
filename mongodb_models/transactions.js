// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//the collection definition
var transactionSchema = new Schema({
  sender_id      : Number,
  receiver_id    : Number,
  transaction_amt: Number,
  payment_type   : String,
  timestamp      : Date,
  error_code     : Number
});


//create the mongoose model
var Transaction = mongoose.model('Transaction', transactionSchema);


module.exports  = Transaction;
