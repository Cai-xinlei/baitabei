
import { Modal, Button, Checkbox, Form, Typography } from 'antd';
import { PromiseBook } from '@/constants';
const { Title, Paragraph } = Typography;

import './index.css'

export default (props) => {
    const { agreementVisible, setAgreementVisible, setAgreeCheck } = props
    return (
        <Modal
            title="参赛承诺书"
            open={agreementVisible}
            onCancel={() => setAgreementVisible(false)}
            width={800}
            footer={false}
        >
            <div className="max-h-96 overflow-y-auto text-sm leading-relaxed">
                <Title level={5}>致：2025第四届“白塔杯”文化创意大赛组委会</Title>
                {
                    PromiseBook?.map((item, index) => <div className='promiseBookItem' key={index}>
                        <Paragraph>
                            {item}
                        </Paragraph>
                    </div>)
                }
            </div>
            <div className='agreementContainerBtn'>
                <div style={{ margin: '16px 0px' }}>
                    <Checkbox onChange={(e) => {
                        if (e.target.checked) {
                            setAgreeCheck(true)
                        }
                    }}>
                        我已阅读并同意<a style={{ color: "#0070dc" }} type='link'>《参赛承诺书》</a>
                    </Checkbox>
                </div>
                <Button
                    type='primary'
                    onClick={() => setAgreementVisible(false)}
                    style={{ width: '260px' }}
                >
                    立即报名
                </Button>
            </div>
        </Modal>
    )
}