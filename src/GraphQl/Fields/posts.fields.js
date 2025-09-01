import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { addPostsResolver, listAllPostsResolver } from "../Resolvers/post.resolver.js";
import { postTypes } from "../Types/post.types.js";








export const postsFields ={
    Query:{
         listPosts:{
                        type:new GraphQLList(postTypes),
                        resolve: listAllPostsResolver
                    },
        
    },
    Mutation:{
        addPosts:{
            type:GraphQLString,
            args:{
                accesstoken:{type:new GraphQLNonNull(GraphQLString)},
                title:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve:(__,args)=> addPostsResolver(args)
        }
    }
}