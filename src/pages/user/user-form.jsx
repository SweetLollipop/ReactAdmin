import React, {PureComponent} from 'react'; 
import {Form, Select, Input} from 'antd'; 
import PropTypes from 'prop-types';

const Item = Form.Item; 
const Option = Select.Option;

/*添加/修改用户的 Form 组件 */ 
class UserForm extends PureComponent { 

    constructor(props){
        super(props);
        this.state={
            
        }
    }
    formRef = React.createRef();

    static propTypes = { 
        // setForm: PropTypes.func.isRequired, 
        user: PropTypes.object, 
        roles: PropTypes.array, 
    }
    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            username: this.props.username,
            password: this.props.password,
            phone: this.props.phone,
            email: this.props.email,
            role_id: this.props.role_id,
        });
    }
   
    render() { 
        const formItemLayout ={
            labelCol: {span: 4},     //左侧label的宽度
            wrapperCol: {span: 15}, 
        }
        const {roles, user} = this.props;
        
        return (
            <Form {...formItemLayout} ref={this.formRef}> 
              {/* <Item label='所属分类'> 
                { 
                  getFieldDecorator('parentId', { 
                    initialValue: parentId 
                  })(
                    <Select> 
                      <Option key='0' value='0'>一级分类</Option> 
                      { 
                        categorys.map(c => <Option key={c._id} 
                        value={c._id}>{c.name}</Option>) 
                      } 
                    </Select> 
                    ) 
                } 
              </Item>  */}
              <Item label='用户名' 
                name='username'
                initialValue={user.username}
                rules= {[
                    { required: true, message: '用户名不能为空！' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                ]}
              >
                <Input placeholder='请输入用户名'/> 
              </Item>
              <Item label='密码'
                name='password'
                initialValue={user.password}
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
                                return Promise.reject(new Error('密码必须是英文、数字或下划线组成'));
                            }else{
                                return Promise.resolve();
                            }                                     
                            },
                        }),
                    ]}
              >
                <Input placeholder='请输入密码'/> 
              </Item>
              <Item label='手机号'
                name='phone'
                initialValue={user.phone}
                rules={[{require: true, pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号'}]}
              >
                <Input placeholder='请输入手机号'/> 
              </Item>
              <Item label='邮箱'
                name='email'
                initialValue={user.email}
                    rules={[{require: true, pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,message: '请输入正确的邮箱'}]} 
              >
                <Input placeholder='请输入邮箱'/> 
              </Item>
              <Item label='角色'
                name='role_id'
                initialValue={user.role_id}
              >
                    <Select placeholder="请选择角色">
                      <Option value='董事长'>董事长</Option>
                      <Option value='总经理'>总经理</Option>                     
                      <Option value='员工'>员工</Option>
                      <Option value='测试'>测试</Option>
                    </Select>
                    {/* <Select placeholder="请选择角色">
                      {
                        roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                      }
                    // </Select> */}
              </Item>        
            </Form>
        )
    }
}

export default UserForm;