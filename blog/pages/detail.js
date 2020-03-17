import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col ,Affix, Icon ,Breadcrumb  } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'

const Detail = () => {
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
                    <span><Icon type="calendar" /> 2019-06-28</span>
                    <span><Icon type="folder" /> Video</span>
                    <span><Icon type="fire" /> 5498 persons</span>
                  </div>
    
                  <div className="detailed-content" >
                        <ReactMarkdown 
                            source={markdown} 
                            escapeHtml={false}  
                        />
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
                    source={markdown}

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



Detail.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  
  const promise = new Promise((resolve)=>{

    axios('http://127.0.0.1:7001/default/getArticleById/'+id).then(
      (res)=>{
      
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}



let markdown='# P01:\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor ... \n\n' +
   '**hhh**\n\n' +
  '*iii*`\n\n' +
  '***bbbb***\n\n' +
  '~~ddd~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02: Hello World \n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'


export default Detail