import React,{useState} from 'react'
import '../public/style/pages/main.css'
import Head from 'next/head'
import {Button} from 'antd'
import Header from '../components/Header'
import {Row, Col , List ,Icon} from 'antd'
import Link from 'next/link'
import '../public/style/pages/index.css'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'


const Home = (list) =>{

  console.log(list)
  
  const [ mylist , setMylist ] = useState( list.data);
 
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>

              <List
                header={<div>Latest Blogs</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>

                    <div className="list-title">
                      <Link href={{pathname:'/detail',query:{id:item.id}}}>
                        <a>{item.title}</a>
                      </Link>
                    </div>

                    <div className="list-icon">
                      <span><Icon type="calendar" /> {item.postTime}</span>
                      <span><Icon type="folder" /> {item.typeName}</span>
                      <span><Icon type="fire" /> {item.view_count} views</span>
                    </div>
                    <div className="list-context">{item.introduction}</div>  
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer/>

   </>
  )

} 



Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home