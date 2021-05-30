/**
 * 要求：能根据接口文档定义几口请求
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import ajax from './ajax';

const BASE = '';

//登录
// export function reqLogin(username, password) {
//     ajax('/login', {username, password}, "POST")
// }
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, "POST");

//获取所有用户列表
export const reqUsers = () => ajax(BASE + '/manage/user/list');

//删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {userId}, 'POST');


//添加或修改用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST');