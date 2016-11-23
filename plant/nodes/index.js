import React, { PropTypes } from 'react';
import { connect } from 'utils';
import { Match, Miss } from 'react-router';

import Rotator from './Rotator';
import NotFound from './NotFound';


const Routes = ({
  services: {
    rotator: { fetch, listen, rotate },
  },
}) => {
  fetch();
  listen();
  rotate();

  return (
    <div>
      <Match pattern="/" exactly component={Rotator} />
      <Miss component={NotFound} />
    </div>
  );
};

Routes.propTypes = {
  services: PropTypes.object.isRequired,
};

export default connect(Routes);
