import React, { PropTypes } from 'react';
import { connect, toJS } from 'utils'; // eslint-disable-line
import styles from './styles.scss';

const cn = require('classnames/bind').bind(styles);

const Rotator = ({
  store: { rotator: { activePage, pages, sponsorPagesCount, totalPagesCount } },
}) => (
  <div className={cn('View')}>
    <div className={cn('Pages')}>
      <h1 className={cn('Pages__title', {
        isVisible: totalPagesCount - 2 === activePage,
      })}>Partners</h1>
      <h1 className={cn('Pages__title', {
        isVisible: totalPagesCount - 1 === activePage,
      })}>Founders</h1>
      {pages.map((pageRotator, pageIndex) => (
        <div key={pageIndex} className={cn('Pages__item')}>
          <div
            className={cn('Rotator', {
              isPlatinum: pageIndex === 0 && (sponsorPagesCount - 1) >= pageIndex,
              isGold: pageIndex === 1 && (sponsorPagesCount - 1) >= pageIndex,
              isSilver: pageIndex === 2 && (sponsorPagesCount - 1) >= pageIndex,
              isBronze: pageIndex === 3 && (sponsorPagesCount - 1) >= pageIndex,
              isGrid: sponsorPagesCount <= pageIndex,
              isActive: activePage === pageIndex,
            })}
          >
            {pageRotator.map(renderSponsor)}
          </div>
        </div>
      ))}
    </div>
    <div className={cn('Info')}>
      Want your logo here? Shoot us email at <b>sponsorship@hacklag.org</b>
    </div>
  </div>
);

const renderSponsor = (sponsor) => (
  <div key={sponsor.name} className={cn('Rotator__item')}>
    <div className={cn('Rotator__item-logo-wrap')}>
      <img className={cn('Rotator__item-logo')} alt={sponsor.name} src={sponsor.logo.value} />
    </div>
    {sponsor.motto && (
      <p className={cn('Rotator__item-motto')}>{sponsor.motto}</p>
    )}
    {sponsor.description && (
      <p className={cn('Rotator__item-description')}>{sponsor.description}</p>
    )}
  </div>
);

Rotator.propTypes = {
  store: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
};

export default connect(Rotator);
