// Require resource's model(s).
var User = require("../models/user");

var index = function(req, res, next){

  User.find({}, function(error, users){
    res.json({users: users});
  });
};

var show = function(req, res, next){
  User.findById(req.params.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.json({user: user});
  });
};

var create = function(req, res, next){
  var user = new User();
  user.name     = req.body.name;
  user.email    = req.body.email;
  user.password = req.body.password;

  user.save(function(err, user) {
    if (err) {
      if (err.code == 11000) {
        return res.json({ success: false,
                          message: "That email is taken"});
      } else
        return res.json(err);
    }

    res.json({ message: "User created", user: user})
  })
}

function me(req, res, next) {
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      next(err);
    });
};

module.exports = {
  index: index,
  show:  show,
  create: create,
  me: me
};
