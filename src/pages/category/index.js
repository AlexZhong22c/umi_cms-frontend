import React, { useState } from 'react';
import { Row, Col, Table, Button, Input, message, Popconfirm, Modal } from 'antd';
import service from './service';
import usePagination from '../../hooks/usePagination';
import useAddUpdateModal from './business/AddUpdateModal';
import dayjs from 'dayjs';

export default function Category() {
  /**
   * 查询表单：(做完另外一个后台页面再考虑封装)
   */
  const [searchQuery, setSearchQuery] = useState({});
  const initSearchForm = () => ({
    name: ''
  });
  const [searchForm, setSearchForm] = useState(initSearchForm());
  function loadSearchForm() {
    const fields = [];
    for (const key of Object.keys(searchForm)) {
      const item = searchForm[key];
      if (item !== '' && item !== undefined) {
        fields.push({ [key]: item });
      }
    }
    setSearchQuery({
      fields
    })
    changePage(1)
  }
  function onResetSearchForm() {
    setSearchForm(initSearchForm());
    setSearchQuery({});
    changePage(1);
  }

  /**
   * 表格分页：
   */
  const {
    pager,
    total,
    list,
    emit: { refreshPage, changePageSize, changePage }
  } = usePagination(service.page, searchQuery);

  /**
   * 这两个通过接口(或者单元测试断言)而不是hooks来实现封装????????????
   */
  // 在本例中实际上就是id:
  const [selectedIds, setSelectedIds] = useState([]);
  function batchDel() {
    const ids = selectedIds;
    if (!ids.length) {
      return message.warning('请先选择一项数据再进行操作');
    }

    Modal.confirm({
      content: `确定要删除共计${ids.length}项?`,
      maskClosable: true,
      onOk: async () => {
        await service.batchDel({ids})
        changePage(1);
        message.success('操作成功');
        setSelectedIds([]);
      }
    });
  }
  async function delItem(id) {
    await service.del({ id })
    changePage(1);
    message.success('操作成功');
    setSelectedIds(selectedIds.filter(item => {
      return item !== id;
    }));
  }

  /**
   * table系
   */
  const columns = [
    {
      title: '名称',
      // width: 100,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '创建时间',
      // width: 100,
      dataIndex: 'createtime',
      render: (text, record, index) => {
        return (
          <div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'updatetime',
      render: (text, record, index) => {
        return (
          <Button.Group>
            <Button type='primary' onClick={() => onShowModal(record)}>编辑</Button>
            <Popconfirm title="确认删除?" onConfirm={() => delItem(record.id)}>
              <Button style={{ marginLeft: 10 }} type='danger'>删除</Button>
            </Popconfirm>
          </Button.Group>
        )
      }
    }
  ];

  const [AddUpdateModal, { onShowModal }] = useAddUpdateModal({
    changePage,
    refreshPage
  });
  return (
    <>
      {/* 查询表单区域的样式，先做这样简化设计： */}
      <Row style={{ marginBottom: 8 }}>
      <Col span={6}>
          <Input.Search
            value={searchForm.name}
            onChange={(e) => {setSearchForm({ ...searchForm, name: e.target.value })}}
            enterButton
            placeholder="请输入分类名称"
            onSearch={() => loadSearchForm()}
          />
        </Col>
        <Col span={6}>
        <Button onClick={() => onResetSearchForm()} style={{ marginLeft: 16 }}>重置</Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
        <Button.Group>
            <Button type="primary" onClick={() => onShowModal()}>新建分类</Button>
            <Button
              style={{ marginLeft: 16 }}
              type="danger"
              onClick={() => batchDel()}
            >删除所选分类</Button>
          </Button.Group>
        </Col>
      </Row>

      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={list}
        bordered
        rowSelection={{
          selectedRowKeys: selectedIds,
          onChange: (ids) => {
            setSelectedIds(ids);
          }
      }}
        pagination={{
          current: pager.currentPage,
          pageSize: pager.pageSize,
          total: total,
          showTotal: (total) => `总计${total}条`,
          showQuickJumper: true,
          onChange: changePage,
          showSizeChanger: true,
          onShowSizeChange: (current, size) => changePageSize(size),
          pageSizeOptions: ['5', '10', '20', '50', '100']
        }}
      />

      <AddUpdateModal />
    </>
  );
}
