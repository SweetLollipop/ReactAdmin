import React , {Component} from 'react';
import { Redirect } from 'react-router';
import memoryUtils from '../../utils/memoryUtils';
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
            <div>
                Hello {user.username}
            </div>
        )
    }
}