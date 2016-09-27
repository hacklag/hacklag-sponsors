import React, { PropTypes } from 'react';
import { connect } from 'utils';
import { Match, Miss } from 'react-router';

import Sponsors from './Sponsors';
import NotFound from './NotFound';


const Routes = ({
  services: {
    sponsors: {
      fetch: fetchSponsors,
      listen: watchSponsors,
      rotateSponsors,
    },
  },
}) => {
  fetchSponsors();
  watchSponsors();
  rotateSponsors();

  return (
    <div>
      <Match pattern="/" exactly component={Sponsors} />
      <Miss component={NotFound} />
    </div>
  );
};

Routes.propTypes = {
  services: PropTypes.object.isRequired,
};

export default connect(Routes);
