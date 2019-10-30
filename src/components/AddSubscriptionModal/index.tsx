import './index.scss';

import { Button, Cascader, Form, Input, message, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { find, groupBy, last } from 'lodash-es';
import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setShowAddSubscriptionModal } from '../../store/modal/actions';
import { addCustomSubscription } from '../../store/setting/actions';
import { subscriptions } from '../../utils/subscriptions';

type ContentProps = FormComponentProps;

const AddSubscriptionContent: React.FC<ContentProps> = (props: ContentProps) => {
  const { getFieldDecorator, getFieldsValue, setFieldsValue, validateFields } = props.form;
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const loadingAddCustomSubcription = useSelector(
    (state: RootState) => state.loading.loadingAddCustomSubscription
  );
  const dispatch = useDispatch();
  const handleCancelModal = useCallback(() => {
    dispatch(setShowAddSubscriptionModal(false));
  }, [dispatch]);
  const handleSelectCategory = useCallback(
    (value: string) => {
      setFieldsValue({ channel: undefined });
      setSelectedCategory(value);
    },
    [setFieldsValue]
  );
  const groupedSubscriptions = useMemo(() => {
    return groupBy(subscriptions, 'category');
  }, []);
  const targetSubscription = useMemo(() => {
    return find(subscriptions, sub => sub.name === selectedCategory);
  }, [selectedCategory]);
  const channelCascaderData = useMemo(() => {
    const convertArrayToCascaderData = (arrayData: any[]) => {
      return arrayData.map(channelItem => {
        const label = channelItem[0];
        const value = channelItem[1];
        let children = channelItem[2];
        if (children && Array.isArray(children)) {
          children = convertArrayToCascaderData(children);
        } else {
          children = undefined;
        }
        return {
          label,
          value,
          children,
        };
      });
    };
    if (targetSubscription) {
      const { channel = [] } = targetSubscription;
      return convertArrayToCascaderData(channel);
    }
  }, [targetSubscription]);

  const channelIdData = useCallback(() => {
    const channel = getFieldsValue()['#CHANNEL#'] || [];
    const matchRet = ((channel[channel.length - 1] || '').match(/#([^#]+)#/g) || []).map(
      (original: string) => [original.slice(1, -1), original]
    );
    return matchRet;
  }, [getFieldsValue]);

  const DynamicFormComponents = useCallback(() => {
    if (selectedCategory === '自定义') {
      return (
        <Form.Item required label="订阅地址">
          {getFieldDecorator('route')(
            <Input
              autoCorrect="off"
              autoComplete="off"
              placeholder="输入合法的 RSSHub 路由地址，如 /bilibili/bangumi/media/9192"
            />
          )}
        </Form.Item>
      );
    } else {
      if (!targetSubscription) {
        return <div />;
      } else {
        return (
          <React.Fragment>
            {channelCascaderData && channelCascaderData.length > 0 && (
              <Form.Item required label="栏目">
                {getFieldDecorator('#CHANNEL#')(
                  <Cascader options={channelCascaderData} placeholder="请选择一个栏目" />
                )}
              </Form.Item>
            )}
            {channelIdData().length > 0 &&
              channelIdData().map((field: [string, string]) => (
                <Form.Item required label={field[0]} key={field[1]}>
                  {getFieldDecorator(field[1])(<Input placeholder={`请填写${field[0]}`} />)}
                </Form.Item>
              ))}
          </React.Fragment>
        );
      }
    }
  }, [channelCascaderData, channelIdData, getFieldDecorator, selectedCategory, targetSubscription]);
  const vaildAndGenerateSubscriptionLink = useCallback(() => {
    const NOT_FOUND = '$NOT_FOUND$';
    const helper = (url: string, source: string): string => {
      const formValues = getFieldsValue();
      if (source === '自定义') {
        return formValues['route'];
      } else {
        let link = url;
        const paramsExp = /#([^#]+)#/g;
        const matchRet = url.match(paramsExp) || [];
        if (matchRet.length === 0) {
          return link;
        }
        matchRet.forEach(paramsKey => {
          let paramsValue = formValues[paramsKey];
          if (paramsKey === '#CHANNEL#') {
            paramsValue = last(paramsValue || []);
          }
          link = link.replace(paramsKey, paramsValue || NOT_FOUND);
        });
        return helper(link, source);
      }
    };
    if (targetSubscription) {
      const { link, name: source } = targetSubscription;
      const name = getFieldsValue()['name'];
      const subscriptionLink = helper(link, source);
      const hasNotFound = subscriptionLink.includes(NOT_FOUND);
      return hasNotFound ? false : { link: subscriptionLink, name };
    } else {
      return false;
    }
  }, [getFieldsValue, targetSubscription]);
  const handleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      validateFields(errors => {
        if (!errors) {
          const formRet = vaildAndGenerateSubscriptionLink();
          if (formRet) {
            const { name, link } = formRet;
            dispatch(addCustomSubscription.request({ name, link }));
          } else {
            message.error('请检查表单是否填写完整');
          }
        }
      });
    },
    [dispatch, vaildAndGenerateSubscriptionLink, validateFields]
  );
  return (
    <div className="subscription-form-content">
      <Form onSubmit={handleSubmitForm}>
        <Form.Item required label="订阅名称">
          {getFieldDecorator('name')(
            <Input autoComplete="off" autoCorrect="off" placeholder="请输入订阅名称" />
          )}
        </Form.Item>
        <Form.Item required label="订阅源">
          <Select
            value={selectedCategory}
            onChange={handleSelectCategory}
            showSearch
            placeholder="请选择一个订阅源"
          >
            {Object.keys(groupedSubscriptions).map(category => (
              <Select.OptGroup key={category} label={category}>
                {groupedSubscriptions[category].map(sub => (
                  <Select.Option key={sub.name} value={sub.name}>
                    {sub.name}
                  </Select.Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
        </Form.Item>
        {<DynamicFormComponents />}
        <div className="form-footer">
          <Button htmlType="submit" type="primary" loading={loadingAddCustomSubcription}>
            提交
          </Button>
          <Button onClick={handleCancelModal}>取消</Button>
        </div>
      </Form>
    </div>
  );
};

const AddSubscriptionModal: React.FC = () => {
  const dispatch = useDispatch();
  const showAddSubscriptionModal = useSelector(
    (state: RootState) => state.modal.showAddSubscriptionModal
  );
  const handleCancelModal = useCallback(() => {
    dispatch(setShowAddSubscriptionModal(false));
  }, [dispatch]);

  const ContentWithForm = useMemo(() => {
    return Form.create<ContentProps>()(AddSubscriptionContent);
  }, []);

  return (
    <Modal
      title="添加订阅"
      className="add-subscription-modal"
      visible={showAddSubscriptionModal}
      onCancel={handleCancelModal}
      destroyOnClose={true}
      footer={null}
    >
      <ContentWithForm />
    </Modal>
  );
};

export default AddSubscriptionModal;
