const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express()
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// mongoose connect stuff see if i should use
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
// end
