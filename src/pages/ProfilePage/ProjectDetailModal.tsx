import { Drawer } from 'antd';

const PrejectDetailModal = ({ open, onClose, detailInfo }) => {
    console.log(detailInfo, 'detailInfo');
    const { trackJson } = detailInfo
    return <Drawer
        open={open}
        title='参赛项目详情'
        onClose={onClose}
    >
        我是参赛项目详情
    </Drawer>
}

export default PrejectDetailModal;