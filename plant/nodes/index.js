import React, { PropTypes } from 'react';
import { connect } from 'utils';
import { Match, Miss } from 'react-router';

import Pyramid from './Pyramid';
import NotFound from './NotFound';


const Routes = ({
  services: {
    rotator: { fetch, listen, pyramidRotate },
  },
}) => {
  fetch();
  listen();
  pyramidRotate();

  return (
    <div>
      <Match pattern="/" exactly component={Pyramid} />
      <Miss component={NotFound} />
    </div>
  );
};

Routes.propTypes = {
  services: PropTypes.object.isRequired,
};

export default connect(Routes);
