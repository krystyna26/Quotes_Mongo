// Require the Express Module/ Mongoose/ Body parser/ path/ static and views folders...
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes'); // name of db
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Create your Mongoose Schemas
var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
    created_at: Date,
   }, {timestamps: true })

mongoose.model('myQuote', QuoteSchema); // We are setting this Schema in our Models as 'myQuote'
var Quote = mongoose.model('myQuote') // We are retrieving this Schema from our Models, named 'myQuote', constructor

app.get('/', function(req, res) {
   
    res.render('index')
})

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var new_quote = new Quote({name: req.body.name, quote: req.body.quote, createdAt: req.body.createdAt});
    
    new_quote.save(function(err, result) {
        if(err) {
          console.log('something went wrong', err);
        } else {
          console.log('successfully added a quote by ninja!', result);
          res.redirect('/quotes');
        }
    })
})

app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quote){
        if (err) {
            console.log(err);
        } else {
            res.render('quotes', {quotes_from_templates: quote});
        }
        
    })
})


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})