const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');

const { db } = config;

const app = express();

// allow cross-orign requests
app.use(cors());

// connect to mlab db
mongoose.connect('mongodb://'+ db.username + ':'+ db.password + '@'+ db.name, { useNewUrlParser : true });
mongoose.connection.once('open', () => {
    console.log('connected to db!');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}));

app.listen(4000, () => {
    console.log("Now listening for requests on port 4000!")
});