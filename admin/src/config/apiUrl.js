let ipUrl = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    getTypeInfo:ipUrl + 'getTypeInfo' ,  
    checkLogin:ipUrl + 'checkLogin' ,  
    addArticle:ipUrl + 'addArticle' ,
    updateArticle:ipUrl + 'updateArticle' ,
}

export default servicePath;