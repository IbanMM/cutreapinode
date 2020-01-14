// contactController.js
// Import user model
User = require('./userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: users,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;

    User.countDocuments({ email: req.body.email }, function (err, count) {
    
        if( count == 0) {
            // encrypt the passwordbcrypt
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

                user.password = hash;

                user.save(function (err) {
                    // Check for validation error
                    if (err)
                        res.json(err);
                    else
                        res.json({
                            status: "success",
                            message: 'New user created!',
                            data: user
                        });
                });

            });

        } else {
            res.json({
                status: "duplicate",
                message: 'User already exists'
            });
        }

    });
};

// Handle view user info
exports.view = function (req, res) {
    User.find({email: req.query.email}, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Login success',
            data: user
        });
    });
};

// Handle user login
exports.login = function (req, res) {

    User.findOne({email: req.query.email}, function (err, user) {

        if(err)
            res.send(err);

        if(user!== null) {

            bcrypt.compare(req.query.password, user.password, function(err, result) {

                if(result) {

                    var userlogged = {
                        name: user.name,
                        email: user.email
                    }

                    res.json({
                        status: "success",
                        message: 'Login success',
                        data: userlogged
                    })

                } else {

                    res.json({
                        status: "error",
                        message: 'Incorrect password',
                    })

                }
                
            });

        } else {

            res.json({
                status: "error",
                message: 'Incorrect user',
            })

        }

    })
}

// Handle update user info
exports.update = function (req, res) {
    User.find({email: req.body.email}, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
        user.password = req.body.password;
        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        email: req.body.email
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};