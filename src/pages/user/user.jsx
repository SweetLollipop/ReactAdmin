import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  message,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { formateDate } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import { PAGE_SIZE } from '../../utils/constants';
import { reqAddUser, reqDeleteUser, reqUsers } from '../../api';
import UserForm from './user-form.jsx';
/**
 * 用户管理路由
 */

export default class User extends Component {

    constructor(props){
        super(props);
        this.state={
            users: [], // 所有的用户列表
            roles: [], // 所有角色的列表
            isShow: false, //是否显示确认框
        }
    }

    formRef = React.createRef();

    innitColumns = () =>{
        this.columns = [
            {
              title: '用户名',
              dataIndex: 'username',
            },
            {
              title: '邮箱',
              dataIndex: 'email',
            },
            {
              title: '手机号',
              dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate,
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                // render: (role_id) => this.state.roles.find(role => role_id===role_id).name
                render: (role_id) => this.roleNames[role_id],
            },
            {
                title: '操作',
                render: (user) =>(
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    /*
    根据role的数组，生成包含所有角色名的对象（属性名用角色id值）
    */
    innitRoleNames = (roles) =>{
        const roelNames = roles.reduce((pre,role) => {
            pre[role._id] = role.name;
            return pre;
        },{})
        //保存roelNames
        this.roleNames = roelNames;
    }

    /*
    删除指定用户
    */
    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除 ${user.username} 吗？`,
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk: async () => {
                // console.log('OK');
                const result = await reqDeleteUser(user._id);
                if(result.status===0)
                message.success('删除用户成功！')
                this.getUsers();
            },
            onCancel() {
                // console.log('Cancel');
            }
        })
    }

    /*
    添加或更新用户
    */
    addOrUpdateUser = async() =>{
       this.setState({isShow: false});
       console.log("formData:",this.formRef.current.formRef.current.getFieldsValue());
       //1.收集输入数据
       const user = this.formRef.current.formRef.current.getFieldsValue();
       this.formRef.current.formRef.current.resetFields();
       //2.提交添加的请求
       const result = await reqAddUser(user);
       //3.更新列表显示
       if(result.status===0){
          message.success('添加用户');
          this.getUsers();
       }
    }
    
    /*
    获取所有用户列表
    */
    getUsers = async() => {
        const result = await reqUsers();
        if (result.status===0) {
           const {users, roles} = result.data;
           this.innitRoleNames(roles);
           this.setState({
               users,
               roles,
           }) 
        }
    }

    componentWillMount(){
        this.innitColumns();
    }

    componentDidMount(){
        this.getUsers();
    }

    render() {
        const {users, roles, isShow} = this.state
        const title = <Button
                        type='primary'
                        onClick={() => this.setState({isShow: true})}
                      >
                        创建用户
                      </Button>

        return (
            <Card title={title}>
                <Table
                  bordered
                  rowKey='_id'
                  dataSource={users}
                  columns={this.columns}
                  pagination={{defaultPageSize: PAGE_SIZE}}
                />
                <Modal
                  title="添加用户"
                  visible={isShow}
                  onOk={this.addOrUpdateUser}
                  onCancel={() => this.setState({isShow: false})}
                >
                    <UserForm ref={this.formRef} roles={roles}/>
                </Modal>
                
            </Card>
        );
    }
}