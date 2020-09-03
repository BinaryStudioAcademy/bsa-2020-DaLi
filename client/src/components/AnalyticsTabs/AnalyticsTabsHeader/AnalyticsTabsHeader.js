import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';

const TabsHeader = ({ value, children, onChange }) => {
  return (
    <Tabs value={value} onChange={onChange}>
      {children}
    </Tabs>
  );
};

TabsHeader.propTypes = {
  value: PropTypes.number,
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export default TabsHeader;
