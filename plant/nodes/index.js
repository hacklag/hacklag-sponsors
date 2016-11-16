import React, { PropTypes } from 'react';
import { connect } from 'utils';
import { Match, Miss } from 'react-router';

import Rotator from './Rotator';
import Pyramid from './Pyramid';
import NotFound from './NotFound';


const Routes = ({
  services: {
    rotator: { fetch, listen, rotate, pyramidRotate },
  },
}) => {
  fetch();
  listen();
  rotate();
  pyramidRotate();

  return (
    <div>
      <Match pattern="/" exactly component={Rotator} />
      <Match pattern="/pyramid" exactly component={Pyramid} />
      <Miss component={NotFound} />
    </div>
  );
};

Routes.propTypes = {
  services: PropTypes.object.isRequired,
};

export default connect(Routes);
