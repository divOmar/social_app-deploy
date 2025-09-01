import { graphql, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { imageType } from "./commonTypes.js";
import { userTypes } from "./user.types.js";



export const postTypes= new GraphQLObjectType({
    name:"postType",
    fields:{
        _id:{type:GraphQLID},
        descreption:{type:GraphQLString},
        ownerId:{type:userTypes},
        allowedComments:{type:GraphQLBoolean},
        tags:{type:new GraphQLList(GraphQLID)},
        createdAt:{type:GraphQLString},
        images:{type:imageType("imageType")}
    }
})