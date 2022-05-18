const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId === parent.id);
            }
        }
    })
});
const LoginType = new GraphQLObjectType({
    name: 'login',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     description: 'Root Query',
//     fields: {
//         book: {
//             type: BookType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 return books.find(book => book.id === args.id);
//             }
//         },
//         author: {
//             type: AuthorType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 return authors.find(author => author.id === args.id );
//             }
//         },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args) {
//                 return books;
//             }
//         },
//         authors: {
//             type: new GraphQLList(AuthorType),
//             resolve(parent, args) {
//                 return authors;
//             }
//         }
//     }
// });
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      // Fields here will be the query for frontends
      //We are defining a 'car' query which can take (car ID ) to search in DB.
      user: {
        type: LoginType, //Defining model for car Query
        args: { id: { type: GraphQLID } },  //args field to extract argument came with car query, e.g : Id of the car object to extract its details.
        resolve(parent, args) {
          //code to get value  from DB
        } //resolve function
      } //car query ends here
    } //fields end here
  });
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors", authors);
                return author;
            }
        },
        login: {
            type: LoginType,
            args: {
                email: { type: GraphQLID },
                password: { type: GraphQLID },
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors", authors);
                return author;
            }
        },

    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;