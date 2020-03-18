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
    
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                        <Row gutter={10} >
                            <Col span={20}>
                                <Input 
                                    placeholder="Title" 
                                    size="large" />
                            </Col>
                            
                            <Col span={4}>
                                &nbsp;
                                <Select defaultValue={selectedType} size="large" >
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
                                <Button type="primary" size="large" className="publish">Publish</Button>
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
                            placeholder="Publish Date"
                            size="large"  
                        />
                    </div>
                </Col>
            </Row>
            </div>
    )
}
export default AddArticle