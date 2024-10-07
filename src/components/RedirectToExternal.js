import React, { useEffect } from 'react';

const RedirectToExternal = ({ url }) => {
  useEffect(() => {
    window.location.href = url;  // 执行重定向到外部 URL
  }, [url]);

  return null;  // 不需要渲染任何内容
};

export default RedirectToExternal;
