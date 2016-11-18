import React, { PropTypes } from 'react';
import { connect, toJS } from 'utils'; // eslint-disable-line
import styles from './styles.scss';

const cn = require('classnames/bind').bind(styles);

const Rotator = ({
  store: { rotator: { activePage, pages, sponsorsPagesCount, partnersPageCount } },
}) => (
  <div className={cn('View')}>
    <div className={cn('Pages')}>
      <h1 className={cn('Pages__title', {
        isVisible: activePage > 0 && activePage < sponsorsPagesCount,
      })}>Sponsors</h1>
      <h1 className={cn('Pages__title', {
        isVisible: activePage >= sponsorsPagesCount && activePage < (partnersPageCount + sponsorsPagesCount),
      })}>Partners</h1>
      <h1 className={cn('Pages__title', {
        isVisible: activePage >= (partnersPageCount + sponsorsPagesCount),
      })}>Founders</h1>
      {pages.map((pageRotator, pageIndex) => (
        <div key={pageIndex} className={cn('Pages__item')}>
          <div
            className={cn('Pages__content', {
              isGrid: pageIndex > 0,
              isActive: activePage === pageIndex,
            })}
          >
            {pageIndex > 0 ? renderGrid(
              pageRotator,
              pageIndex === 1 && sponsorsPagesCount > 0 ? 2 :
              pageIndex === 2 && sponsorsPagesCount > 1 ? 4 : 12,
              ) :
              pageRotator.map(renderSponsor)}
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
  <div key={sponsor.name} className={cn('Sponsor__item')}>
    <div className={cn('Sponsor__item-logo-wrap')}>
      <img className={cn('Sponsor__item-logo')} alt={sponsor.name} src={sponsor.logo.value} />
    </div>
    {sponsor.motto && (
      <p className={cn('Sponsor__item-motto')}>{sponsor.motto}</p>
    )}
    {sponsor.description && (
      <p className={cn('Sponsor__item-description')}>{sponsor.description}</p>
    )}
  </div>
);

const renderGrid = (items, gridElements) => (
  Array.from(Array(gridElements).keys()).map((index) => (
    <div key={index}
      className={cn('Grid__item', {
        isSponsors: gridElements < 12,
        isGold: gridElements === 2,
        isSilver: gridElements === 4,
      })}
    >
      <div className={cn('Grid__item-logo-wrap')}>
      {items[index] &&
        <img className={cn('Grid__item-logo')} alt={items[index].name} src={items[index].logo.value} />
      }
      {items[index] && (
        <p className={cn('Grid__item-motto', { isVisible: items[index].motto })}>{items[index].motto}</p>
      )}
      </div>
    </div>
  ))
);

Rotator.propTypes = {
  store: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
};

export default connect(Rotator);
