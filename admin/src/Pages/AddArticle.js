import React,{useState, useEffect} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath  from '../config/apiUrl'


const { Option } = Select;
const { TextArea } = Input



function AddArticle(props){

    

    const [articleId,setArticleId] = useState(0)  
    const [articleTitle,setArticleTitle] = useState('')  
    const [articleContent , setArticleContent] = useState('')  
    const [markdownContent, setMarkdownContent] = useState('preview') 
    const [introducemd,setIntroducemd] = useState()            
    const [introducehtml,setIntroducehtml] = useState('') 
    const [showDate,setShowDate] = useState()  
    const [updateDate,setUpdateDate] = useState() 
    const [typeInfo ,setTypeInfo] = useState([]) 
    const [selectedType,setSelectType] = useState('Type') 

    useEffect(()=>{
        getTypeInfo() 
       },[])

    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      }); 

    
    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }
 
    const changeIntroduce = (e)=>{
         setIntroducemd(e.target.value)
         let html=marked(e.target.value)
         setIntroducehtml(html)
     }

     const getTypeInfo =()=>{

        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(
           res=>{
               if(res.data.data=="没有登录"){
                 localStorage.removeItem('openId')
                 props.history.push('/')  
               }else{
                setTypeInfo(res.data.data)
               }

            }
            )
    }

    const selectTypeHandler =(value)=>{
        setSelectType(value)
    }


    const saveArticle = ()=>{
        if(!selectedType){
            message.error('choose type')
            return false
        }else if(!articleTitle){
            message.error('empty title')
            return false
        }else if(!articleContent){
            message.error('empty content')
            return false
        }else if(!introducemd){
            message.error('empty intro')
            return false
        }else if(!showDate){
            message.error('empty date')
            return false
        }
        message.success('succeed')

        let dataProps={}   
        dataProps.type_id = selectedType 
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduction =introducemd
        let datetext= showDate.replace('-','/') 
        dataProps.postTime =(new Date(datetext).getTime())/1000


        if(articleId==0){
            console.log('articleId=:'+articleId)
            dataProps.view_count =Math.ceil(Math.random()*100)+1000
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    console.log(res.data,"iiiiiiiiiinsert");
                    
                    setArticleId(res.data.insertId)
                    if(res.data.isScuccess){
                        message.success('added')
                    }else{
                        message.error('fail');
                    }

                }
            )
        }else{
            dataProps.id = articleId 
            axios({
                method:'post',
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{

                if(res.data.isScuccess){
                    message.success('saved')
                }else{
                    message.error('fail');
                }


                }
            )
        }
    }


    
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                        <Row gutter={10} >
                            <Col span={20}>
                            <Input 
                                value={articleTitle}
                                placeholder="Title" 
                                onChange={e=>{

                                setArticleTitle(e.target.value)
                                }}
                                size="large" />
                            </Col>
                            
                            <Col span={4}>
                                &nbsp;
                                <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                    {
                                        typeInfo.map((item,index)=>{
                                            return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                        })
                                    }


                                </Select>
                            </Col>
                        </Row>
                        <br/>
                        <Row gutter={10} >
                            <Col span={12}>
                                <TextArea
                                    value={articleContent} 
                                className="markdown-content" 
                                rows={35}  
                                onChange={changeContent} 
                                onPressEnter={changeContent}
                                placeholder="content"
                                />
                                
                            </Col>
                            <Col span={12}>
                                <div 
                                    className="show-html"
                                    dangerouslySetInnerHTML = {{__html:markdownContent}} >

                                </div>

                            </Col>
                        </Row>  

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                                <Button  size="large" className="publish">store</Button>&nbsp;
                                <Button type="primary" size="large" className="publish" onClick={saveArticle}>Publish</Button>
                                <br/>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea 
                                rows={4} 
                                value={introducemd}  
                                onChange={changeIntroduce} 
                                onPressEnter={changeIntroduce}
                                placeholder="introduction"
                            />
                            
                            <br/><br/>
                            <div 
                                className="introduce-html"
                                dangerouslySetInnerHTML = {{__html:'introduction：'+introducehtml}} >
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col span={12}>
                    <div className="date-select">
                        <DatePicker
                            onChange={(date,dateString)=>setShowDate(dateString)} 
                            placeholder="Publish date"
                            size="large"

                        />
                        </div>
                </Col>
            </Row>
            </div>
    )
}
export default AddArticle