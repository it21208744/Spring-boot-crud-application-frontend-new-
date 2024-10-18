import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import { deleteUser } from '../Apis/usersApi'
import { toast } from 'react-toastify'

const { confirm } = Modal
const handleDelete = async (id, setUserList) => {
  try {
    const response = await deleteUser(id)
    if (response != null) {
      toast.success('user deleted')
      setUserList((prevList) => prevList.filter((user) => user.id !== id))
    } else {
      toast.error('Please login again')
    }
  } catch (error) {
    toast.error('Something went wrong')
  }
}

const showDeleteConfirm = (id, setUserList) => {
  confirm({
    title: `Do you want to delete this user with ID ${id}?`,
    icon: <ExclamationCircleFilled />,
    onOk() {
      handleDelete(id, setUserList)
        .then(() => {})
        .catch((e) => console.log(e))
    },
    onCancel() {},
  })
}

export default showDeleteConfirm
