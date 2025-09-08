import { Drawer } from 'antd';
import RegisterPage from '@/pages/RegisterPage'
const PrejectDetailModal = ({ open, onClose, projectId }) => {
    return <Drawer
        open={open}
        title='编辑项目详情'
        onClose={onClose}
        width={'900px'}
        destroyOnHidden
    >
        <RegisterPage
            onClose={onClose}
            projectId={projectId}
        />
    </Drawer>
}

export default PrejectDetailModal;