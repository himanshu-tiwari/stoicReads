const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
const books = [
    { name : 'Mr Mercedes', genre : 'mystery', id : '1', authorId : '1' },
    { name : 'Skeleton Key', genre : 'Spy', id : '2', authorId : '2' },
    { name : 'Percy Jackson and The Lightning Thief', genre : 'Fantasy', id : '3', authorId : '3' },
    { name : 'Percy Jackson and The Sea of Monsters', genre : 'Fantasy', id : '4', authorId : '3' },
    { name : 'Percy Jackson and The Titan\'s Curse', genre : 'Fantasy', id : '5', authorId : '3' },
    { name : 'Russian Roulette', genre : 'Spy', id : '6', authorId : '2' }
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
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        age : { type: GraphQLInt },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId : parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQuery',
    fields : {
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            }
        },
        book : {
            type : BookType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id);
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        },
        author : {
            type : AuthorType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addBook : {
            type : BookType,
            args : {
                name : { type : GraphQLString },
                genre : { type : GraphQLString },
                authorId : { type : GraphQLID }
            },
            resolve(parent, args) {
                let book = Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });

                return book.save();
            }
        },
        addAuthor : {
            type : AuthorType,
            args : {
                name : { type : GraphQLString },
                age : { type : GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name : args.name,
                    age : args.age
                });
                
                return author.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});