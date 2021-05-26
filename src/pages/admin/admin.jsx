import React , {Component} from 'react';
import { Redirect } from 'react-router';
import memoryUtils from '../../utils/memoryUtils';

import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;
/**
 * 后台管理的路由组件
 */
export default class Admin extends Component {

    render(){

        const user = memoryUtils.user;
        if(!user || !user._id){ //如果内存中没有存储user -->当前没有登录
            return <Redirect to='/login'/> //自动跳转到登录（在render()中）
        }
        return(
            <Layout style={{height: "100%"}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor: "white"}}>Content</Content>
                    <Footer style={{textAlign: 'center',color: "black"}}>推荐使用谷歌浏览器，可以获得更佳的操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}