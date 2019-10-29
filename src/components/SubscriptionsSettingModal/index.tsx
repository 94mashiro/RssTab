import './index.scss';

import { Button, Checkbox, Col, message, Modal, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { groupBy } from 'lodash-es';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setShowSubscriptionsSettingModal } from '../../store/modal/actions';
import { setEnabledSubscriptions } from '../../store/subscription/actions';

const SubscriptionsSettingContent: React.FC = () => {
  const dispatch = useDispatch();
  const rssEndpoints = useSelector((state: RootState) => state.constant.rssEndpoints);
  const enabledSubscriptions = useSelector(
    (state: RootState) => state.subscription.enabledSubscriptions
  );
  const [selectedSubscriptions, setSelectedSubscriptions] = useState(enabledSubscriptions);
  const groupedEndpoints = useMemo(() => {
    return groupBy(rssEndpoints, item => item.category);
  }, [rssEndpoints]);
  const handleChangeSelectedSubscriptions = useCallback((checked: CheckboxValueType[]) => {
    setSelectedSubscriptions(checked as string[]);
  }, []);
  const handleCancelModal = useCallback(() => {
    dispatch(setShowSubscriptionsSettingModal(false));
  }, []);
  const handleSaveSettings = useCallback(() => {
    if (selectedSubscriptions.length === 0) {
      message.warn('请至少选择一个频道进行订阅');
      return;
    }
    dispatch(setEnabledSubscriptions(selectedSubscriptions));
    dispatch(setShowSubscriptionsSettingModal(false));
  }, [setEnabledSubscriptions, selectedSubscriptions]);
  return (
    <React.Fragment>
      <div className="modal-content">
        <Checkbox.Group
          style={{ width: '100%' }}
          value={selectedSubscriptions}
          onChange={handleChangeSelectedSubscriptions}
        >
          {Object.keys(groupedEndpoints).map(key => (
            <div className="category" key={key}>
              <span className="label">{key}</span>
              <Row>
                {groupedEndpoints[key].map(endpoint => (
                  <Col span={8} key={endpoint.link}>
                    <Checkbox value={endpoint.link}>{endpoint.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Checkbox.Group>
      </div>
      <div className="modal-footer">
        <Button type="primary" onClick={handleSaveSettings}>
          保存
        </Button>
        <Button onClick={handleCancelModal}>取消</Button>
      </div>
    </React.Fragment>
  );
};

const SubscriptionsSettingModal: React.FC = () => {
  const visible = useSelector((state: RootState) => state.modal.showSubscriptionsSettingModal);
  const dispatch = useDispatch();
  const handleCancelModal = useCallback(() => {
    dispatch(setShowSubscriptionsSettingModal(false));
  }, []);
  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      onCancel={handleCancelModal}
      title="订阅管理"
      className="subscriptions-modal"
      footer={null}
    >
      <SubscriptionsSettingContent />
    </Modal>
  );
};

export default SubscriptionsSettingModal;
