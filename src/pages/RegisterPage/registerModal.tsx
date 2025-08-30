
import { Modal, Button } from 'antd';
import { PromiseBook } from '@/constants';
import './index.css'


export default (props) => {
    const { agreementVisible, setAgreementVisible, } = props
    return (
        <Modal
            title="选手报名承诺书"
            open={agreementVisible}
            onCancel={() => setAgreementVisible(false)}
            footer={[
                <Button key="close" onClick={() => setAgreementVisible(false)}>
                    关闭
                </Button>
            ]}
            width={800}
        >
            <div className="max-h-96 overflow-y-auto text-sm leading-relaxed">
                {
                    PromiseBook?.map((item, index) => <div className='promiseBookItem' key={index}>
                        {item}
                    </div>)
                }
            </div>
        </Modal>
    )
}