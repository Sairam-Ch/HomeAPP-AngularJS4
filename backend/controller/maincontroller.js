 var UserProfileModel = require('../models/usermodel.js');
 var loginModel = UserProfileModel.loginschema;
 var userModel = UserProfileModel.userschema;
 /*
 module.exports = {
     login: function(req, res) {
         console.log(req.body,"backend console");
         var emailId = req.body.email;
         var password = req.body.password;
         loginModel.findOne({ email: emailId }, function(err, user) {
             if (err) {
                 return res.json({ 'success': false, 'message': 'Some Error' });
             }
             if (!user) {
                 return res.json({ 'success': false, 'message': 'User Not Found' });
             }
             user.comparePassword(password, function(err, isMatch) {
                 if (err) return res.json({ 'success': false, 'message': 'Password Incorrect' });
                 if(isMatch){
                 	 return res.json({ 'success': true, 'message': 'User found', user });
                 }
             });

         })
     },
     register: function(req, res) {
         var emailId = req.body.email;
         var firstname = req.body.firstName;
         var lastname = req.body.lastName;
         var password = req.body.password;
        console.log(req.body);
         var userdeatil = new userModel({
             email: emailId,
             firstName: firstname,
             lastName: lastname,
             password: password
         });

         userdeatil.save(function(err, user) {
             if (err) {
                 console.log(err);
                 return res.json({ 'success': false, 'message': 'Some Error' });
             }
             return res.json({ 'success': true, 'message': 'User Saved successfully', user });
         });

     },

 }
 */
