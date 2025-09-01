import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { postsFields } from "./Fields/posts.fields.js";





export const mainSchema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:"MainQuerySchema",
        fields:{
           ...postsFields.Query
        }
    }),
     mutation:new GraphQLObjectType({
        name:"mutaionSchema",
        fields:{
            ...postsFields.Mutation
        }
     })
    // subscription
})