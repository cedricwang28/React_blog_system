import React, {useState,useEffect} from 'react'
import '../public/style/components/header.css'
import {Row,Col,Menu,Icon} from 'antd'
import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'


const Header = ()=>(
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">Cedric Blog</span>
                <span className="header-txt">Web Development Technical Blog </span>
            </Col>
            <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                       
                            Home
                    </Menu.Item>
                    <Menu.Item key="video">
                        
                            Video
                    </Menu.Item>
                    <Menu.Item key="life">
                   
                            Life
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header