import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { handleUpdate } from '../Apis/usersApi'
import { toast } from 'react-toastify'

const UpdateUser = ({ openUpdate, setOpenUpdate, userDetails, fetchUsers }) => {
  const [firstName, setFirstName] = useState(userDetails.firstName)
  const [lastName, setLastName] = useState(userDetails.lastName)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = async (id, fname, lname) => {
    setConfirmLoading(true)

    try {
      const response = await handleUpdate(id, fname, lname)
      if (response != null) {
        fetchUsers()
        if (response.status == 200) {
          toast.success('User updated')
        } else if (response.status == 404) {
          toast.error('User not found')
        } else if (response.status == 401) {
          toast.error('Not authorized')
        } else {
          toast.error('something went wrong')
        }

        setOpenUpdate(false)
      } else {
        toast.error('Please login again')
      }
    } catch (error) {
      toast.error('something went wrong')
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  return (
    <div>
      <Modal
        title={userDetails.email}
        open={openUpdate}
        onOk={() => {
          handleOk(userDetails.id, firstName, lastName)
        }}
        confirmLoading={confirmLoading}
        onCancel={() => setOpenUpdate(false)}
      >
        <Form>
          <Form.Item label="First Name">
            <Input value={firstName} onChange={handleFirstNameChange} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input value={lastName} onChange={handleLastNameChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UpdateUser
