import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col ,Affix,Breadcrumb} from 'antd'
import { CalendarFilled, BookFilled, EyeFilled } from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import  servicePath  from '../config/apiUrl'


const Detail = (props) => {

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

    let html = marked(props.article_content) 

    return (
        <>
        <Head>
          <title>Blog Detailed Page</title>
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
              <div>
                <div className="bread-div">
                  <Breadcrumb>
                    <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
    
               <div>
                  <div className="detailed-title">
                  React video
                  </div>
    
                  <div className="list-icon center">
                    <span><CalendarFilled />2019-06-28</span>
                    <span><BookFilled />Video</span>
                    <span><EyeFilled />5498 persons</span>
                  </div>
    
                  <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}>
                        
                  </div>
    
               </div>
    
              </div>
          </Col>
    
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />

            <Affix offsetTop={5}>
                <div className="detailed-nav comm-box">
                    <div className="nav-title">Catalogue</div>
                    <MarkNav
                    className="article-menu"
                    source={html}

                    ordered={false}
                    />
                 </div>
            </Affix>
          </Col>
        </Row>
        <Footer/>
    
     </>
    )


}



Detailed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath.getArticleById+id).then(
      (res)=>{
        
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}





export default Detail