
module.exports                       = function(app, models) {
  var Transaction = models.Transaction;
  var mw          = require('../middleware');

  app.get("/transactions", mw.verifyToken, function (req, res) {

    Transaction.find({
      $or: [{ sender_id: req.decoded.id }, { receiver_id: req.decoded.id }]
    }).select("-receiver.profileid").exec(function (err, transactions) {

      if(err) throw err;

      return res.send(transactions);



    });
  });



  app.post("/transactions", mw.verifyToken, function(req, res){

    var amount       = req.body.amount;
    var sender       = req.decoded.id;
    var magnetid     = req.body.magnetid;
    var payment_type = req.body.paymentType;
    var timestamp    = req.body.timestamp;

    //check if all fields aren't missing
    if(!amount || !sender || !magnetid || !payment_type || !timestamp)
      return res.send({success: false, message: "fields missing"});

    //find sender pofile and check to see if he/she has sufficient funds
    models.Profile.find({
      where: {"id": sender}
    }).then(function (senderProfile) {





      //check if sender has sufficient funds to make transaction
      if(senderProfile.currency < amount) {
        //store record in database with errorcode 404


        //create failed Transaction for sender
        var newTransactionSender  = new Transaction({
          "sender_id": sender,
          "receiver": { "magnetid": magnetid },
          "transaction_amt": (amount * -1),
          "payment_type": payment_type,
          "timestamp": new Date(timestamp),
          "error_code": 404
        });

        //insert record and send back error message
        newTransactionSender.save(function (err) {
          if(err) throw err;
          return res.send({success: false, message: "Insufficient funds"});

        });

      }


      //user has sufficient funds now update the users currency
      senderProfile.update({
        "currency" : (Number(senderProfile.currency) - Number(amount)).toFixed(2)
      }).then(function () {
        console.log("Profile Currency updated");
      }).catch(function (err) {
        return res.send({success: false, message: err.message});
      });


      //Find the Receivers profile
      models.Profile.find({
        where: {"magnetid": magnetid}
      }).then(function (receiverProfile) {



        //update receivers currency with the newly added amount
        receiverProfile.update({
          "currency" : (Number(receiverProfile.currency) + Number(amount)).toFixed(2)
        }).then(function () {
          console.log("Profile Currency updated");
        }).catch(function (err) {
          return res.send({success: false, message: err.message});
        })





        //account found based on the magnetid provided, insert the two records using the profiles actual id
        //create 2 records one for the sender that will have a negative transaction.
        //and one for the receiver that will have a positive transaction.

        //create Transaction for sender
        var newTransactionSender     = new Transaction({
          "sender_id": sender,
          "receiver": {
            profileid: receiverProfile.id,
            magnetid : receiverProfile.magnetid,
            firstname: receiverProfile.firstname,
            lastname : receiverProfile.lastname
          },
          "transaction_amt": (amount * -1),
          "payment_type": payment_type,
          "timestamp": new Date(timestamp),
          "error_code": null
        });

        newTransactionSender.save(function (err) {
          //if any error occurs throw its
          if(err) throw err;

          var newTransactionReceiver = new Transaction({
            "sender": sender,
            "receiver": {
              profileid: receiverProfile.id,
              magnetid : receiverProfile.magnetid,
              firstname: receiverProfile.firstname,
              lastname : receiverProfile.lastname
            },
            "transaction_amt": amount,
            "payment_type": payment_type,
            "timestamp": new Date(timestamp),
            "error_code": null
          });

          newTransactionReceiver.save(function (err) {
            //if any error occurs throw its
            if(err) throw err;


            // TODO: PLUGIN NOTIFICATION STUFF HERE FIREBASE IMPLEMENTATION



            //send back a success message
            return res.send({success: true, message: "Transaction inserted"});
          });
        }) //end saving transactions function
      }); // end receiver profile . find block
    }); //end sender profile . find block
  });
};
