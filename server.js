const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));


//  **** DB creation, connection and schema ***
mongoose.connect('mongodb://localhost/Authors', { useNewUrlParser: true });

var UserSchema = new mongoose.Schema({
    userName: { type: String },
}, { timestamps: true })
mongoose.model('User', UserSchema);
var User = mongoose.model('User')
// //  **** DB creation, connection and schema END ***

app.get('/tasks', function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            res.json({ message: "Error", error: err })
        }
        else {
            res.json({ user })
        }
    })
})

app.post('/new', function (req, res) {

    var user = new User({ userName: req.body.userName });
    user.save(function (err) {
        if (err) {
            for (var key in err.errors) {
                req.flash('quoteErr', err.errors[key].message);
                res.json({ message: "failed " });
            }
        } else {
            res.json({ message: "user created -server msg " });
        }
    })
})

app.post('/delete', function (req, res) {
    console.log(req.body)
    User.findById(req.body.id).then(user => console.log(user))
    User.deleteOne({ "_id": req.body.id }, function (err, user) {
        console.log(user)
        if (err) {
            res.json({ message: " deletion failed ", err:err });
        } else {
            res.json({ message: "User deleted" })
        }
    })
})
app.get('/find/:id', function (req, res) {
    User.findById({_id:req.params.id}, function (err, user) {
        if (err) {
            res.json({ message: "Error", error: err })
        }
        else {
            res.json({ user })
        }
    })
})

app.post('/update', function (req, res) {
console.log(req.body)
    User.findOneAndUpdate({ _id: req.body._id }, { $set: { userName: req.body.userName }}, function (err, user) {
        if (err) {
            res.json({ message: "failed" });
        } else {
            res.json({ message: "updated the user" })
        }
    })
})

app.all("*", (req, res, next) => { res.sendFile(path.resolve("./public/dist/public/index.html")) });

app.listen(8000, function () {
    console.log("listening to port 8000")
})