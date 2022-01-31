import {
  Modal, Form, InputNumber,
} from 'antd';
import PropTypes from 'prop-types';

export default function PredictModal({
  visible, onCreate, toggleShowAddPredictModal, confirmLoading, match,
}) {
  const myBet = match.bets.find((bet) => bet.myBet);
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Зберегти прогноз"
      okText="Зберегти"
      onCancel={toggleShowAddPredictModal}
      cancelText="Закрити"
      confirmLoading={confirmLoading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          });
      }}
    >
      <Form
        form={form}
        layout="inline"
        name="form_in_modal"
        initialValues={
          myBet ? { home: myBet.homeBet, away: myBet.awayBet } : {}
        }
        requiredMark={false}
        colon={false}
      >
        <Form.Item
          className="form-item"
          label={match.homeTeam.name}
          name="home"
          rules={[{ required: true, message: 'Заповніть' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <div className="form-item-separator">-</div>
        <Form.Item
          className="form-item"
          label={match.awayTeam.name}
          name="away"
          rules={[{ required: true, message: 'Заповніть' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

PredictModal.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  confirmLoading: PropTypes.bool,
  toggleShowAddPredictModal: PropTypes.func,
  match: PropTypes.object,
};
