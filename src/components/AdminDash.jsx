import { useEffect, useState } from 'react'
import { viewAllUsersApi } from '../Apis/usersApi'
import { Table, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import showDeleteConfirm from '../utils/ShowDeleteConfirm'
import UpdateUser from '../utils/UpdateUser'

import LogoutBtn from '../utils/LogoutBtn'
import { toast } from 'react-toastify'

const AdminDash = () => {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [openUpdate, setOpenUpdate] = useState(false)
  const [userDetails, setUserDetails] = useState({})

  const fetchUsers = async () => {
    const users = await viewAllUsersApi()
    if (users != null) {
      const usersWithKeys = users.map((user) => ({
        ...user,
        key: user.id,
      }))
      setUserList(usersWithKeys)
    } else {
      toast.error('Please login again')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    const res = await showDeleteConfirm(id, setUserList)
    console.log(res)
  }

  const handleUpdate = (record) => {
    setOpenUpdate(true)
    setUserDetails(record)
    console.log(userDetails)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'fname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record)}>Update {record.firstName}</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Table dataSource={userList} columns={columns} pagination={false} />
      {openUpdate ? (
        <UpdateUser
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          userDetails={userDetails}
          fetchUsers={fetchUsers}
        />
      ) : null}
      <LogoutBtn />
    </div>
  )
}

export default AdminDash
