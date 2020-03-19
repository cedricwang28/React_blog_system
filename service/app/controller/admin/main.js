
'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
      
        this.ctx.body='hi api'
    }

    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"
  
        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            
            let openId=new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            this.ctx.body={'data':'login succeed','openId':openId}
  
        }else{
            this.ctx.body={data:'failed'}
        } 
    }

    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body={data:resType}
    }


    async addArticle(){

        let tmpArticle= this.ctx.request.body
        // tmpArticle.
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
    
        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }

    async updateArticle(){
        let tmpArticle= this.ctx.request.body
    
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess)
        this.ctx.body={
            isScuccess:updateSuccess
        }
    } 

    async getArticleList(){

        let sql = 'SELECT article.id as id,'+
                    'article.title as title,'+
                    'article.introduction as introduction,'+
                    "FROM_UNIXTIME(article.postTime,'%Y-%m-%d' ) as postTime,"+
                    'type.typeName as typeName '+
                    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                    'ORDER BY article.id DESC '
    
            const resList = await this.app.mysql.query(sql)
            this.ctx.body={list:resList}
    
    }

}

module.exports = MainController