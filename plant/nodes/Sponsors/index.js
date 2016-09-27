import React, { PropTypes } from 'react';
import { connect, toJS } from 'utils'; // eslint-disable-line
import styles from './styles.scss';

const cn = require('classnames/bind').bind(styles);

const Sponsors = ({
  store: {
    sponsors: {
      items: sponsors,
      activePage,
      pagesCount,
    },
  },
}) => {
  const pages = Array.from(new Array(pagesCount),
    (x, page) => getPageSponsors(page, sponsors)
  );

  return (
    <div className={cn('View')}>
      <div className={cn('Pages')}>
        {pages.map((pageSponsors, pageIndex) => (
          <div key={pageIndex} className={cn('Pages__item')}>
            <div
              className={cn('Sponsors', {
                isPlatinum: pageIndex === 0,
                isGold: pageIndex === 1,
                isSilver: pageIndex === 2,
                isPrevious: (activePage - 1) % pagesCount === pageIndex || (pageIndex === pagesCount - 1 && activePage === 0),
                isActive: activePage === pageIndex,
              })}
            >
              {pageSponsors.map(renderSponsor)}
            </div>
          </div>
        ))}
      </div>
      <div className={cn('Info')}>
        Want your logo here? Shoot us email at <b>sponsorship@hacklag.org</b>
      </div>
    </div>
  );
};

const getPageSponsors = (page, sponsors) => {
  let index;
  let take;

  if (page === 0) { index = 0; take = 1; }
  if (page === 1) { index = 1; take = 3; }
  if (page === 2) { index = 3; take = 7; }
  if (page === 3) { index = 7; take = 15; }
  if (page > 3) { index = take + 1; take = index + 8; }

  return sponsors.slice(index, take);
};

const renderSponsor = (sponsor) => (
  <div key={sponsor.name} className={cn('Sponsors__item')}>
    <div className={cn('Sponsors__item-logo-wrap')}>
      <img className={cn('Sponsors__item-logo')} alt={sponsor.name} src={sponsor.logo.value} />
    </div>
    {sponsor.motto && (
      <p className={cn('Sponsors__item-motto')}>{sponsor.motto}</p>
    )}
    {sponsor.description && (
      <p className={cn('Sponsors__item-description')}>{sponsor.description}</p>
    )}
  </div>
);

Sponsors.propTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(Sponsors);
