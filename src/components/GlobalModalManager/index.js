import React, { useCallback, useContext, useState, useMemo } from 'react';

export const Context = React.createContext({
  // 如果不用React Hooks实现传递的时候，要靠Context API来传递：
  render: () => {
    throw new Error('useGlobalModalManager的组件必须在 GlobalModalManager 下级');
  },
})

// TODO: React.Memo ??
const GlobalModalManager = propsArgOfManager => {
  // 不知道为什么，自定义组件传进来一定要用对象的属性来保存，不然React.createElement不了：
  // const [Comp, setComp] = useState(undefined)
  const [Comp, setComp] = useState({})
  const [props, setProps] = useState({})
  const [visible, setVisible] = useState(false);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const render = useCallback((CompArg, propsArg = {}) => {
    setComp({
      current: CompArg
    });
    setProps(propsArg);
    setVisible(true);
  }, []);

  const value = useMemo(() => ({ render }), []);
  return (
    <Context.Provider value={ value }>
      { propsArgOfManager.children }
      <div className="global-modal-manager">
        {(Comp && Comp.current) &&
          React.createElement(Comp.current, {
            ...props,
            visible,
            onHide: hide
          })
        }
      </div>
    </Context.Provider>
  )
}

export function useGlobalModalManager() {
  const renderer = useContext(Context);

  return [
    useCallback((ModalComp, props) => {
      renderer.render(ModalComp, props);
    }, [])
  ]
}

export default GlobalModalManager;
