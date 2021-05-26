import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Form,Input,Button,message,Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less';
import logo from '../../assets/images/logo.png';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {reqLogin} from '../../api';
// import { Redirect } from 'react-router';

const Item = Form.Item //不能写在import之前

/**
 * 登录的路由组件
 * 
 */
export default class Login extends Component{
    
    constructor(props){
        super(props);
        this.state={

        }
    }

    getFormData = (event) => {  
        //event.preventDefault();
        console.log("formData:",this.refs.loginInfoForm.getFieldValue());
    };

    //提交表单且数据验证成功后回调事件
    
    onFinish = async (values) => {
        //console.log('Received values of form: ', values);
        //const {username,password} = values;
        // reqLogin(username,password).then(response => {
        //     //console.log('请求成功了',response.data)
        //     const result = response.data //{status:0, data: user} {status:1, msg:'xxx'}
        //     if(result.status===0){//登录成功
        //         message.success('登录成功'); //提示登录成功
        //         this.props.history.replace('/'); //跳转到管理页面，且不需要回退到登录
        //     }else{//登录失败
        //         message.error(result.msg);//提示错误信息
        //     }
        // }).catch(error => {
        //     console.log('请求失败了',error)
        // })
        const {username,password} = values;
        //const response = await reqLogin(username,password);
        //const result = response.data //{status:0, data: user} {status:1, msg:'xxx'}
        const result = await reqLogin(username,password);
        if(result.status===0){//登录成功
            message.success('登录成功'); //提示登录成功

            //保存user
            const user = result.data
            memoryUtils.user = user; //保存在内存中☆
            storageUtils.saveUser(user) //保存到local中

            this.props.history.replace('/admin'); //跳转到管理页面，且不需要回退到登录
        }else{//登录失败
            message.error(result.msg);//提示错误信息
        }
    };

    //提交表单且数据验证失败后回调事件
    onFinishFailed = ({values, errorFields, outOfDate }) =>{
        console.log('Failed to receive form data: ', values, 'Failure field:', errorFields, 'outOfDate:', outOfDate);
    }

    

render(){
    //如果用户已经登录，自动跳转到管理界面
    const user = memoryUtils.user
    if(user && user._id){
        return<Redirect to = '/admin' />
    }
    return(
        <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="logo"/>
                <h1>Reac项目：后台管理系统</h1>
            </header>
            <section className='login-content'>
                <h2>用户登录</h2>
                <Form
                    ref="loginInfoForm"
                    name="normal_login"
                    className="login-form"
                    // initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '用户名不能为空！' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            ({
                                validator(rule, value) {
                                  if (!value) {
                                    return Promise.reject(new Error('密码不能为空'));
                                    //return Promise.resolve();
                                  }else if(value.length<4){
                                    return Promise.reject(new Error('密码长度不能小于4位'));
                                  }else if(value.length>12){
                                    return Promise.reject(new Error('密码长度不能大于12位'));
                                  }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                                    return Promise.reject(new Error('用户名必须是英文、数字或下划线组成'));
                                  }else{
                                    return Promise.resolve();
                                  }                                     
                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    {/* <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item> */}
            
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.getFormData}>
                            登录
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>

                </Form>
            </section>

        </div>
        
    )
}
}
