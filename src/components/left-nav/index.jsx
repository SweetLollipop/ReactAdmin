import React, {Component} from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  ShoppingOutlined,
//   AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ProfileOutlined,
  GiftOutlined,
//   DesktopOutlined,
//   ContainerOutlined,
//   MailOutlined,
  UserOutlined,
  IdcardOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
export default class LeftNav extends Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            
            <div to='/admin' className="left-nav">
                <Link to='/admin' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>尚硅谷后台</h1>
                </Link>
                <div style={{ width: 200 }}>
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            首页
                        </Menu.Item>
                        {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ContainerOutlined />}>
                            Option 3
                        </Menu.Item> */}
                        <SubMenu key="sub1" icon={<ShoppingOutlined />} title="商品">
                            <Menu.Item key="5" icon={<ProfileOutlined />}>品类管理</Menu.Item>
                            <Menu.Item key="6" icon={<GiftOutlined />}>商品管理</Menu.Item>
                            {/* <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item> */}
                        </SubMenu>                       
                        {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu> */}
                        <Menu.Item key="13" icon={<UserOutlined />}>
                            用户管理
                        </Menu.Item>
                        <Menu.Item key="14" icon={<IdcardOutlined />}>
                            角色管理
                        </Menu.Item>
                        <SubMenu key="sub4" icon={<AreaChartOutlined />} title="图形图表">
                            <Menu.Item key="15" icon={<BarChartOutlined />}>柱形图</Menu.Item>
                            <Menu.Item key="16" icon={<LineChartOutlined />}>折线图</Menu.Item>
                            <Menu.Item key="17" icon={<PieChartOutlined />}>饼状图</Menu.Item>
                        </SubMenu>         
                    </Menu>
                </div>
            </div>

            
            
        );
    }
}