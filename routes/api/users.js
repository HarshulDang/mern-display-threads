const express =  require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load input validation
const validateRegisterInput = require('../../models/validation/register');
const validateLoginInput = require("../../models/validation/login");

//Load user model
const User = require("../../models/User");
const Insert = require("../../models/insertThread");

//register api
router.post("/register", (req,res) => {
	//Form Validation
	console.log('Hit successful');
	console.log(req.body);
	const { errors, isValid } = validateRegisterInput(req.body);

	//Check Validation
	// if(!isValid) {
	// 	return res.status(400).json(errors);
	// }

	User.findOne({ email: req.body.email }).then(user => {
		console.log(user);
		if(user) {
			return res.status(400).json({ email: "Email already exists" });
		}
		else{

			const newUser = new User();

			newUser.name = req.body.name;
			newUser.email = req.body.email;
			newUser.password = req.body.password;
		

		//Hash Passwords before saving in database
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if(err) throw err;
				else {
					newUser.password = hash;
					newUser.save().then(user => {
						res.status(200).json(user);
					}).catch(err => console.log(err));
				}
				
			});
		});

		}

		
	});
});

//login api
router.post("/login", (req,res) => {
	//Form Validation
	const { errors, isValid } = validateLoginInput(req.body);

	//Check Validation
	if(!isValid) {
		return res.status(400).status(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	//Find user by email
	User.findOne({ email }).then(user => {
		//Check if user exists
		if(!user) {
			return res.status(400).json({ emailnotfound: "Email not Found"});
		}else{
			bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				//User Matched
				//Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name
				};

				//Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res
						.status(200)
						.json({
							success: true,
							token: "Bearer" + token
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({passwordincorrect: "Password incorrect" });
			}
		});

		}
	});
});

//insert thread
router.route('/insert')
.post(function(req,res) {
  
 var insert = new Insert();

  insert.title = req.body.title;
  insert.description = req.body.description;
  insert.tags = req.body.tags;
  insert.date = req.body.date;
  insert.postedBy = req.body.postedBy;
  console.log(insert)
insert.save(function(err) {
      if (err){
      	console.log(err);
        res 
			.status(400)
			.json({err: err})

    	}else{
      		res
      			.status(200)
				.json({insert, message: 'Thread Added Successfully'});
    	} 
   
  });
})

//get all data
router.get('/getAll',function(req, res) {
 var title = req.query.title;
 //var description = req.query.description;

 Insert.find(title, (err, list) => {
        if(err) {
            console.log(err);
            res.send('error');
        } else {
            console.log(list);
            res.send(list);
        }
 });
 
});

module.exports = router;

