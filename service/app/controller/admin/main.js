
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

}

module.exports = MainController