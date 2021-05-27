import React, {Component} from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { withRouter } from 'react-router-dom';
import './index.less';
/**
 * 头部组件
 */
 
class Header extends Component {
    state = {  }
    logout=(e)=>{
        //显示确认框
        e.preventDefault();
        Modal.confirm({
            title: '您要确定退出吗?',
            icon: <ExclamationCircleOutlined />,
            content: '请确认',
            onOk:() => {
              console.log('OK');
              //删除保存的user数据
              storageUtils.removeUser();
              memoryUtils.user={};
              //跳转到login
              this.props.history.replace('/login');
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，admin</span>
                    <a href="" onClick={this.logout}>退出</a>                   
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2021-05-27 23:23</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Header);