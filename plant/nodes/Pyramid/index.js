import React, { PropTypes } from 'react';
import { connect, toJS } from 'utils'; // eslint-disable-line
import styles from './styles.scss';

const cn = require('classnames/bind').bind(styles);

const Pyramid = ({
  store: { rotator: { pyramidActivePage, pyramidPages } },
}) => (
  <div className={cn('View')}>
    <div className={cn('Pages')}>
      <h1 className={cn('Pages__title', {
        isVisible: pyramidActivePage === 1,
      })}>Partners</h1>
      <h1 className={cn('Pages__title', {
        isVisible: pyramidActivePage === 2,
      })}>Founders</h1>

      {pyramidPages.map((pageRotator, pageIndex) => (
        <div key={pageIndex} className={cn('Pages__item')}>
          <div
            className={cn('Pages__content', {
              isSponsors: pageIndex === 0,
              isGrid: pageIndex > 0,
              isActive: pyramidActivePage === pageIndex,
            })}
          >
            {pageIndex > 0 ? pageRotator.map(renderGrid) : renderSponsors(pageRotator)}
          </div>
        </div>
      ))}
    </div>
    <div className={cn('Info')}>
      Want your logo here? Shoot us email at <b>sponsorship@hacklag.org</b>
    </div>
  </div>
);

const renderSponsors = (sponsors) => (
  <div className={cn('Sponsors')}>
    <div className={cn('Sponsors__item', 'isPlatinum')}>
      <div className={cn('Sponsors__item-content')}>
        <div className={cn('Sponsors__item-content-wrapper')}>
          <img
            className={cn('Sponsors__item-logo')}
            alt={sponsors[0] && sponsors[0].name}
            src={sponsors[0] && sponsors[0].logo.value}
          />
          {sponsors[0] && (
            <p className={cn('Sponsors__item-motto', {
              isVisible: sponsors[0].motto,
            })}>
              {sponsors[0].motto}
            </p>
          )}
          {sponsors[0] && (
            <p className={cn('Sponsors__item-description', {
              isVisible: sponsors[0].description,
            })}>
              {sponsors[0].description}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className={cn('Sponsors__item', 'isGold')}>
    {
      Array.from(Array(2).keys()).map((index) => (
        <div key={index + 1} className={cn('Sponsors__item-content')}>
          <div className={cn('Sponsors__item-content-wrapper')}>
            <img
              className={cn('Sponsors__item-logo')}
              alt={sponsors[index + 1] && sponsors[index + 1].name}
              src={sponsors[index + 1] && sponsors[index + 1].logo.value}
            />
            {sponsors[index + 1] && (
              <p className={cn('Sponsors__item-motto', {
                isVisible: sponsors[index + 1].motto,
              })}>
                {sponsors[index + 1].motto}
              </p>
            )}
          </div>
        </div>
      ))
    }
    </div>
    <div className={cn('Sponsors__item', 'isSilver')}>
    {
      Array.from(Array(3).keys()).map((index) => (
        <div key={index + 3} className={cn('Sponsors__item-content')}>
          <div className={cn('Sponsors__item-content-wrapper')}>
            {sponsors[index + 3] &&
              <img
                className={cn('Sponsors__item-logo')}
                alt={sponsors[index + 3].name}
                src={sponsors[index + 3].logo.value}
              />
            }
          </div>
        </div>
      ))
    }
    </div>
    <div className={cn('Sponsors__item', 'isBronze')}>
    {
      Array.from(Array(4).keys()).map((index) => (
        <div key={index + 6} className={cn('Sponsors__item-content')}>
          <div className={cn('Sponsors__item-content-wrapper')}>
            {sponsors[index + 6] &&
              <img
                className={cn('Sponsors__item-logo')}
                alt={sponsors[index + 6].name}
                src={sponsors[index + 6].logo.value}
              />
            }
          </div>
        </div>
      ))
    }
    </div>
  </div>
);

const renderGrid = (partner) => (
  <div key={partner.name} className={cn('Grid__item')}>
    <div className={cn('Grid__item-logo-wrap')}>
      <img className={cn('Grid__item-logo')} alt={partner.name} src={partner.logo.value} />
    </div>
  </div>
);

Pyramid.propTypes = {
  store: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
};

export default connect(Pyramid);
