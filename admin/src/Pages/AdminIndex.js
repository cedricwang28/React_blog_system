import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import '../static/css/AdminIndex.css'
import { UserAddOutlined, CompassOutlined } from '@ant-design/icons';
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props){

  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };


  const handleClickArticle = e =>{
    console.log(e.item.props)
    if(e.key=='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }

  }


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <UserAddOutlined />
              <span>Workbench</span>
            </Menu.Item>
            <Menu.Item key="2">
              <UserAddOutlined />
              <span>Add Article</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              onClick={handleClickArticle}
              title={
                <span>
                  <UserAddOutlined />
                  <span>Article Management</span>
                </span>
              }
            >
              <Menu.Item key="addArticle">Add Article</Menu.Item>
              <Menu.Item key="articleList">Article List</Menu.Item>

            </SubMenu>

            <Menu.Item key="9">
              <UserAddOutlined />
              <span>Comments</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Backend Management</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> 
                <div>
                <Route path="/index/" exact  component={AddArticle} />
                <Route path="/index/add/" exact   component={AddArticle} />
                <Route path="/index/add/:id"  exact   component={AddArticle} />
                <Route path="/index/list/"   component={ArticleList} />
                </div>
            </div>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Workbench</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>cedricwang.com</Footer>
        </Layout>
      </Layout>
    )

}

export default AdminIndex