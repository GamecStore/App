const User = require('../models/User');
const config = require('../config.json');

//const sgMail = require('@sendgrid/mail')
//sgMail.setApiKey(config.gridsend)

const bcrypt = require('bcrypt');
const { param } = require('../routes');
const saltRounds = 10;
const createUser = async (req, res) => {
    try {
        
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const user = new User(
                {
                    email: req.body.email,
                    gender: req.body.gender,
                    username: req.body.name,
                    password: hash,
                    // bcrypt: req.body.password.bcrypt,
                    dob: req.body.dob
                });
            user.save()
            .then(() => {
                // const msg = {
                //     to: user.email, // Change to your recipient
                //     from: 'gamecyt2@gmail.com', // Change to your verified sender
                //     subject: 'Sending with SendGrid is Fun',
                //     text: 'and easy to do anywhere, even with Node.js',
                //     html: '<strong>Welcome to gamec.store</strong>',
                // }
                // sgMail
                //     .send(msg)
                //     .then((response) => {
                //         console.log(response[0].statusCode)
                //         console.log(response[0].headers)
                //     })
                //     .catch((error) => {
                //         console.error(error)
                //     })

                res.send('User saved to database')
            })
                .catch(err => console.error(err));
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//trial 2
const login = async(req,res)=>{
//          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {     
//          const user = new User
//          {
//           userName:req.body.name;
//          password :hash 
//      console.log(username);     
//  }
//      });
const sentUser = req.body.name;
 const user = User.findOne({ username: sentUser })
 if(user.username === sentUser)
 {
console.log (user.username)
     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
     console.log(hashedPassword)
 bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
     if (err) throw err;
     if(isMatch){
        console.log('correct password!')
        res.send("YES")
     }
     callback(null, isMatch);
     console.log('incorrect password')
  });
  const username = req.params.username;
    
      if (req.body.name==username)
 {
 res.send  ('the login is working')
 }
 }
 else{
     res.send("WHAAt")
 }
     };

const editprofile = async(req,res)=>
{
    
}
//trial 2
// const login = async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

//       const user = await db.collection('users').findOne({ username: req.body.username });
//       if (user) {

//         const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
//         if (isPasswordMatch) {
//           res.send('Login successful');
//         } else {
//           res.send('Invalid credentials');
//         }
//       } else {
//         res.send('User not found');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).send('Internal server error');
//     }
//   };


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'User ID not found , Do you want to regester instead' });
    }
};

const updateUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        Object.assign(user, req.body);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.delete();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    login,
};
