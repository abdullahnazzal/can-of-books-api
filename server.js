'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());

mongoose.connect('mongodb://localhost:27017/Book', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    email: String
});

const BookModel = mongoose.model('Book', BookSchema);

function seedDataCollection() {
    const book1 = new BookModel({
        title:'The Water Knife',
        description:'delivers a near-future thriller that casts new light on how we live today and what may be in store for us tomorrow.',
        email:'a.nazzal1995@gmail.com'
    })

    const book2 = new BookModel({
        title:'The Revenant',
        description:'The year is 1823, and the trappers of the Rocky Mountain Fur Company live a brutal frontier life.',
        email:'a.nazzal1995@gmail.com'
    })
    const book3 = new BookModel({
        title:'Here',
        description:'From one of the great comic innovators, the long-awaited fulfillment of a pioneering comic vision.',
        email:'a.nazzal1995@gmail.com'
    })
    book1.save();
    book2.save();
    book3.save();
}
// seedDataCollection(); // npm start
// localhost:3001/test

server.get('/test', testHandler);

function testHandler(req, res) {
    res.send('all good')
}

// localhost:3001/getBooks?userEmail=a.nazzal1995@gmail.com
server.get('/getBooks', getBooksHandler);

function getBooksHandler(req,res) {
    console.log('inside getCatsHandler func')
    let userEmail = req.query.userEmail;
    BookModel.find({email:userEmail},function(err,bookData){
        if(err) {
            console.log('error in getting the data')
        } else {
            console.log(bookData);
            res.send(bookData)
        }
    })
}


server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
