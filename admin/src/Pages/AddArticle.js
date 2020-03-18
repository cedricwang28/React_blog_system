import React,{useState} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker } from 'antd'

const { Option } = Select;
const { TextArea } = Input



function AddArticle(){
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
                                <Select defaultValue="Sign Up" size="large">
                                    <Option value="Sign Up">Video</Option>
                                </Select>
                            </Col>
                        </Row>
                        <br/>
                        <Row gutter={10} >
                            <Col span={12}>
                                <TextArea 
                                    className="markdown-content" 
                                    rows={35}  
                                    placeholder="content"
                                    />
                            </Col>
                            <Col span={12}>
                                <div 
                                    className="show-html">

                                </div>

                            </Col>
                        </Row>  

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                                <Button  size="large">store</Button>&nbsp;
                                <Button type="primary" size="large">Publish</Button>
                                <br/>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea 
                                rows={4} 
                                placeholder="Introduction"
                            />
                            <br/><br/>
                            <div  className="introduce-html"></div>
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