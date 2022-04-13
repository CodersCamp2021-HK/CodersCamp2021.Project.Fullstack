import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  function LinkBehavior(props, ref) {
    const { href, ...other } = props;
    return <RouterLink ref={ref} to={href} {...other} />;
  },
);

export { LinkBehavior };
