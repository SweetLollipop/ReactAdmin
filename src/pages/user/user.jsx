import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
} from 'antd';
import { formateDate } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import { PAGE_SIZE } from '../../utils/constants';
/**
 * 用户管理路由
 */

export default class User extends Component {
    state = {  
        users: [], // 所有的用户列表
        isShow: false, //是否显示确认框
    }

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
              title: '电话',
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
            },
            {
                title: '操作',
                render: (user) =>(
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    /*
    添加或更新用户
    */
   addOrUpdateUser = () =>{
       
   }
    componentWillMount(){
        this.innitColumns()
    }
    render() {
        const {users, isShow} = this.state
        const title = <Button type='primary'>创建用户</Button>

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
                    <div>添加/更新界面</div>
                </Modal>
                
            </Card>
        );
    }
}