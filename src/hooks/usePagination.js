/**
 * @file 可以考虑把table的 pagination props给封进来。
 * 理论参考：https://juejin.im/post/5ca5ad46e51d4550f6668465#heading-6
 */
import { useState, useEffect } from 'react';

// TODO: 手动加入防抖，以规避重复数据的获取。场景比如快速点击同一个页码时，触发了多次数据获取。
const usePagination = (fetchApi, searchQuery = {}) => {
  const [pager, setPager] = useState({ currentPage: 1, pageSize: 5 });
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState([]);

  // 监听的是 pager 对象，方便在参数不变的时候仍能触发监听回调。
  useEffect(() => {
    setIsError(false);
    // fetchApi在usePagination初始化的时候就定死了：fetchApi请求的接口的切换应该放在service层内部实现。
    fetchApi({
      ...searchQuery,
      ...pager
    }).then(res => {
      const { list, total } = res.result;
      setList(list);
      setTotal(total);
    })
    .catch(() => setIsError(true));
  }, [pager]);
  
  const { currentPage, pageSize } = pager;
  const refreshPage = (pagerArg) => {
    if (pagerArg) {
      setPager({ ...pagerArg });
    } else {
      setPager({ ...pager });
    }
  }
  const changePageSize = (arg1) => {
    let newPageSize;
    if (typeof arg1 === 'function') {
      newPageSize = arg1(pageSize);
    } else {
      newPageSize = arg1;
    }
    setPager({ currentPage: 1, pageSize: newPageSize });
  }
  const changePage = (arg1) => {
    let newCurrentPage;
    if (typeof arg1 === 'function') {
      newCurrentPage = arg1(currentPage);
    } else {
      newCurrentPage = arg1;
    }
    setPager({ pageSize, currentPage: newCurrentPage });
  }
  // 用antd的时候用不着：
  // const prevPage = () => setPager({ pageSize, currentPage: currentPage - 1 });
  // const nextPage = () => setPager({ pageSize, currentPage: currentPage + 1 });
  
	return {
    list,
    pager,
    total,
    emit: { refreshPage, changePageSize, changePage },
    isError
  }
};

export default usePagination;
