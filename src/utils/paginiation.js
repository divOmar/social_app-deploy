


export const pagination =(page=1,limit=2)=>{
    if(page<0) page=1
    if(limit<0) limit=1
    const skip =(page-1)*limit
    return{skip,limit}
}