import React, { useState, useCallback } from 'react';
import { Modal, Button, message, List, Avatar, Spin } from 'antd';
import useStateNewest from '../../../hooks/useStateNewest';
import useCallbackRef from '../../../hooks/useCallbackRef';
import useAddCommentForm from './AddCommentForm';

import service from '../service';

const LIMIT = 5;

const use = () => {
  const [modalVisible, setModalVisible, modalVisibleRef] = useStateNewest(false);
  const [article, setArticle, articleRef] = useStateNewest({});
  const [loading, setLoading] = useState(false);
  
  // 数据从这里获取，再传给 CommentList 组件：
  const [listData, setListData , listDataRef] = useStateNewest([]);
  const [dataSource, setDataSource, dataSourceRef] = useStateNewest([]);
  const [endIndex, setEndIndex, endIndexRef] = useStateNewest(LIMIT);
  const [AddCommentForm] = useAddCommentForm({ article, onSuccess: (list) => {
    setListData(list);
    setDataSource(listDataRef.current.slice(0, endIndexRef.current));
  } });

  const onDelCommentInList = useCallback(async (comment) => {
    const res = await service.delComment({
      id: article.id,
      commentId: comment.id,
    })
    message.success('操作成功');
    setListData(res.result.list);

    setDataSource(listDataRef.current.slice(0, endIndexRef.current));
  }, [service.delComment, article, listDataRef.current, endIndexRef.current]);

  const onLoadMore = useCallbackRef(() => {
    setLoading(true)
    setEndIndex(endIndex + LIMIT);
    setDataSource(listData.slice(0, endIndexRef.current));
    setLoading(false)
  }, [endIndex, LIMIT, endIndexRef.current]);

  const fetchList = () => {
    return service.listComment({
      id: articleRef.current.id
    });
  };

  const show = useCallback(async (articleArg) => {
    setArticle(articleArg);
    const res = await fetchList();
    const { list } = res.result;
    setListData(list);
    setModalVisible(true);

    setEndIndex(LIMIT);
    setDataSource(listDataRef.current.slice(0, LIMIT));
  }, [fetchList, LIMIT, listDataRef.current]);

  const loadMore = React.useMemo(() => {
    return dataSource.length < listData.length
      ? (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          {loading ? <Spin /> : <Button onClick={onLoadMore}>加载更多</Button>}
        </div>
      ) : null;
  }, [dataSource, listData, loading, onLoadMore])

  const CommentList = React.memo(props => {
    const { loadMore, loading, dataSource, onDel } = props;
    return (
      <List
        loadMore={loadMore}
        loading={loading}
        dataSource={dataSource}
        renderItem={item => (
          <List.Item actions={[
            <Button type="danger" key="del"
              onClick={() => onDel(item)}
            >删除</Button>
          ]}>
            <List.Item.Meta
                avatar={<Avatar src="https://img9.doubanio.com/view/photo/s_ratio_poster/public/p513344864.webp" />}    
                title={item.commenter.username}
                description={item.commenter.email}
            />
            <div>{item.content}</div>
          </List.Item>
        )}
      />
    );
  });

  const onCancel = useCallback(() => setModalVisible(false), []);

  // 目标是要从use函数里面抽出来，这样能减少很多次这函数的执行?????????????
  // 即便是用了React.memo(也不行啊)
  // 用useMemo肯定不行啊，这个react组件不依赖props，反而去依赖闭包，即便用不到，肯定也是常渲染?????????
  const CommentModal = () => {
    const commentListProps = {
      loadMore, loading, dataSource
    };
    return (
      <Modal
        visible={modalVisibleRef.current}
        onCancel={onCancel}
        footer={[
          <Button key="ok" type="primary" onClick={onCancel}>
            确定
          </Button>
        ]}
      >
        <AddCommentForm></AddCommentForm>
        <CommentList onDel={onDelCommentInList} {...commentListProps}></CommentList>
      </Modal>
    )
  };

  return [
    CommentModal,
    show
  ];
};

export default use;
