import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const LinkBehavior = React.forwardRef((props, ref) => {
  // Desestructura los props para excluir 'button' y cualquier otro prop no deseado
  const { button, ...restProps } = props;

  // Solo pasa los props que deberían ir a un RouterLink
  return <RouterLink ref={ref} {...restProps} />;
});

export default LinkBehavior;