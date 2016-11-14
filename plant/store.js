import { observable, computed } from 'utils';

export default observable({
  rotator: {
    partners: [],
    founders: [],
    sponsors: [],
    activePage: 0,
    pyramidActivePage: 0,
    @computed get totalPagesCount() {
      const partnerPagesCount = this.partners.length ? 1 : 0;
      const founderPagesCount = this.founders.length ? 1 : 0;

      return this.sponsorPagesCount + partnerPagesCount + founderPagesCount;
    },
    @computed get sponsorPagesCount() {
      const count = this.sponsors.length;

      return count < 2 ? 1 :
             count < 4 ? 2 :
             count < 8 ? 3 : 4;
    },
    @computed get pages() {
      let pages = [];

      const divide = [
        { index: 0, end: 1 },
        { index: 1, end: 3 },
        { index: 3, end: 7 },
        { index: 7, end: 21 },
      ];

      for (let page = 0; page < this.sponsorPagesCount; page++) {
        pages = pages.concat(
          [this.sponsors.slice(divide[page].index, divide[page].end)]
        );
      }

      pages = this.partners.length ? pages.concat([this.partners.slice(0, 14)]) : pages;
      pages = this.founders.length ? pages.concat([this.founders.slice(0, 14)]) : pages;

      return pages;
    },

    @computed get pyramidPages() {
      let pages = [];

      pages = this.sponsors.length ? pages.concat([this.sponsors.slice(0, 9)]) : pages;
      pages = this.partners.length ? pages.concat([this.partners.slice(0, 14)]) : pages;
      pages = this.founders.length ? pages.concat([this.founders.slice(0, 14)]) : pages;

      return pages;
    },
  },
});
