import { FileTextOutlined } from '@ant-design/icons'
import { logout } from '../Apis/authApi'
import { FloatButton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LogoutBtn = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await logout()

    if (response != null && response.status == 200) {
      if (response.status == 200) {
        navigate('../../')
        toast.success('User logged out')
      } else return toast.error('something went wrong')
    } else {
      navigate('../../')
      toast.success('User logged out')
    }
  }
  return (
    <FloatButton
      icon={<FileTextOutlined />}
      description={<span style={{ fontSize: '20px' }}>Logout</span>}
      shape="square"
      style={{
        insetInlineEnd: 50,
        width: '250px',
        height: '70px',
      }}
      onClick={() => handleLogout()}
    />
  )
}
export default LogoutBtn
