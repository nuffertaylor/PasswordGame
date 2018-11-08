var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userDB', { useNewUrlParser: true });

var userSchema = mongoose.Schema(
{
    username: String,
    password: String,
    hacked: Boolean,
    usersHacked: Number
});

var User = mongoose.model('User', userSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function()
{ //Lets us know when we're connected
    console.log('Connected');
});

/* GET home page. */
router.get('/', function(req, res, next)
{
    res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next)
{
    console.log("POST register route");
    console.log(req.body);
    User.find({ username: req.username },

        function(err, userList)
        { //Calls the find() method on your database
            if (err) return console.error(err); //If there's an error, print it out
            else
            {
                if (userList.length)
                {
                    console.log("username taken");
                    res.json("failure");
                }
                else
                {
                    var userJson = {
                        username: req.username,
                        password: req.password,
                        hacked: false,
                        usersHacked: 0
                    };
                    var newuser = new User(userJson);
                    newuser.save(function(err, post)
                    {
                        if (err) return console.error(err);
                        console.log(post);
                        res.json("success");
                    });
                }
            }

        });

});

router.post('/login', function(req, res, next)
{
    console.log("1");
    User.find({ username: req.username, password: req.password },

        function(err, userList)
        { //Calls the find() method on your database
            console.log("2");
            if (err) return console.error(err); //If there's an error, print it out
            else
            {
                console.log("3");
                if (userList.length)
                {
                    console.log("4");
                    if (userList[0].hacked == true)
                    {
                        console.log("5");
                        res.json("hacked");
                    }
                    else
                    {
                        console.log("6");
                        res.json("success");
                    }
                }
                else
                {
                    console.log("7");
                    res.json("failure");
                }
            }
        });
});

router.post('/tryHack', function(req, res, next)
{
    User.find({ username: req.username },

        function(err, userList)
        { //Calls the find() method on your database
            if (err) return console.error(err); //If there's an error, print it out
            else
            {
                if (userList.length)
                {
                    var tryPassword = req.password;
                    var rightPassword = userList[0].password;
                    console.log(tryPassword);
                    console.log(rightPassword);
                    if (tryPassword.length != rightPassword.length)
                    {
                        res.json(
                        {
                            status: "wrong length"
                        });
                    }
                    else
                    {
                        var right = 3;
                        var partial = 2;
                        var wrong = 1;

                        //game code


                        res.json(
                        {
                            status: "wrong",
                            right: right,
                            partial: partial,
                            wrong: wrong
                        });
                    }
                }
                else
                {
                    res.json("failed to find");
                }
            }

        });
});

module.exports = router;
