import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
} from 'antd';
import { formateDate } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

/**
 * 用户管理路由
 */

export default class User extends Component {
    state = {  
        users: [], // 所有的用户列表
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
                        <Link>修改</Link>
                        <Link>删除</Link>
                    </span>
                )
            },
        ]
    }

    componentWillMount(){
        this.innitColumns()
    }
    render() {
        const {users} = this.state
        const title = <Button type='primary'>创建用户</Button>

        return (
            <Card title={title}>
                <Table
                  bordered
                  rowKey='_id'
                  dataSource={users}
                  columns={this.columns}
                >

                </Table>
            </Card>
        );
    }
}