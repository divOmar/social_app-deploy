import { graphql, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"






export const urlsImageType =(name)=>{
    return new GraphQLObjectType({
    name:name || 'urlsImageType',
    fields:{
        public_id:{type:GraphQLString},
        secure_url:{type:GraphQLString}
    }
})
}












export const imageType=(name)=>{
    return new GraphQLObjectType({
        name:name || "imageType",
        fields:{
            folderId:{type:GraphQLID},
            urls:{type:new GraphQLList(GraphQLString)}
        }
    })
}