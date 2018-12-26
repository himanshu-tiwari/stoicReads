const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
const books = [
    { name : 'Fast Five', genre : 'action-adventure', id : 1},
    { name : 'Skeleton Key', genre : 'Spy', id : 2},
    { name : 'Percy Jackson and the Olympians', genre : 'Fantasy', id : 3}
];

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id : { type : GraphQLString },
        name : { type : GraphQLString },
        genre : { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : { id : { type : GraphQLString } },
            resolve(parent, args) {
                // code to get data from db/other source
                return _.find(books, { id : args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
})