const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

// dummy data
const books = [
    { name : 'Mr Mercedes', genre : 'mystery', id : '1', authorId : '1' },
    { name : 'Skeleton Key', genre : 'Spy', id : '2', authorId : '2' },
    { name : 'Percy Jackson and the Olympians', genre : 'Fantasy', id : '3', authorId : '3' }
];

const authors = [
    { name : 'Stephen King', age : 71, id : '1' },
    { name : 'Anthony Horowitz', age : 63, id : '2' },
    { name : 'Rick Riordan', age : 54, id : '3' }
];


const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        genre : { type: GraphQLString },
        author : {
            type : AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, { id : parent.authorId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        age : { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args) {
                // code to get data from db/other source
                return _.find(books, { id : args.id });
            }
        },
        author : {
            type : AuthorType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id : args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
})