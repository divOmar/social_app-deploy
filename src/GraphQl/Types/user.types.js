import { GraphQLEnumType, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const GenderEnum = new GraphQLEnumType(
    {
        name:"genderEnum",
        values:{
            MALE:{value:"male"},
            FEMALE:{value:"female"}
        }
    }
)


export const userTypes =new GraphQLObjectType({
    name:"userType",
    fields:{
        _id:{type:GraphQLID},
        userName:{type:GraphQLString},
        phone:{type:GraphQLString},
        gender:{type:GenderEnum},
    }
})