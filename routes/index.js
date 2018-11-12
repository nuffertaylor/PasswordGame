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
    console.log(req.body.username);
    User.find({ username: req.body.username },

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
                    console.log(req.body.username);

                    var userJson = {
                        username: req.body.username,
                        password: req.body.password,
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
    User.find({ username: req.body.username, password: req.body.password },

        function(err, userList)
        { //Calls the find() method on your database
            if (err) return console.error(err); //If there's an error, print it out
            else
            {
                if (userList.length)
                {

                    if (userList[0].hacked == true)
                    {
                        res.json("hacked");
                    }
                    else
                    {
                        res.json("success");
                    }

                }
                else
                {
                    res.json("failure");
                }
            }
        });
});

router.post('/tryHack', function(req, res, next)
{
    User.find({ username: req.body.username },
        function(err, userList)
        { //Calls the find() method on your database
            if (err) return console.error(err); //If there's an error, print it out
            else
            {
                if (userList.length)
                {
                    var tryPassword = req.body.password;
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
                    else if (tryPassword == rightPassword)
                    {
                        User.updateOne({ username: req.body.username }, { $set: { hacked: true } }, function(err)
                        {
                            if (err) return console.error(err); //If there's an error, print it out
                            else
                            {
                                res.json(
                                {
                                    status: "success"
                                });
                            }
                        });
                    }
                    else
                    {
                        var right = 0;
                        var partial = 0;
                        var wrong = rightPassword.length;

                        //game code
                        
                        for (var i = 0; i < rightPassword.length; i++)
                        {
                            if (rightPassword.charAt(i) == tryPassword.charAt(i))
                            {
                                tryPassword = tryPassword.slice(0, i) + tryPassword.slice(i + 1);
                                rightPassword = rightPassword.slice(0, i) + rightPassword.slice(i + 1);
                                right++;
                                wrong--;
                                i--;
                            }
                        }
                        
                        console.log(tryPassword);
                        console.log(rightPassword);
                        
                        for (var i = 0; i < tryPassword.length; i++)
                        {
                            var myChar = tryPassword.charAt(i);
                            var index = rightPassword.search(myChar);
                            console.log(index);
                            if (index > -1)
                            {
                                tryPassword = tryPassword.slice(0, i) + tryPassword.slice(i + 1);
                                rightPassword = rightPassword.slice(0, index) + rightPassword.slice(index + 1);
                                partial++;
                                wrong--;
                                i--;
                            }
                        }

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

router.post('/passLength', function(req, res, next)
{
    User.find({ username: req.body.username }, function(err, userList)
    {
        if (err) { console.log("failure"); }
        var actualpass = userList[0].password;
        var passLength = actualpass.length;
        res.json(passLength);
    });
});

//returns a list of only usernames
router.get('/userList', function(req, res, next)
{
    User.find({}, function(err, userList)
    {
        var allUsers = [];
        for (var i = 0; i < userList.length; i++)
        {
            allUsers.push(userList[i].username);
        }
        res.json(allUsers);
    });
});

module.exports = router;
