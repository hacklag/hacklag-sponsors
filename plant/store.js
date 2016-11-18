import { observable, computed } from 'utils';

export default observable({
  rotator: {
    partners: [],
    founders: [],
    sponsors: [],
    activePage: 0,
    @computed get totalPagesCount() {
      return this.sponsorsPagesCount + this.partnersPageCount + this.foundersPageCount;
    },

    @computed get sponsorsPagesCount() {
      const count = this.sponsors.length;
      const gridSponsorsCount = (count - 7) / 12;

      return count < 2 ? 1 :
             count < 4 ? 2 :
             count < 8 ? 3 :
             gridSponsorsCount % 1 === 0 ? (gridSponsorsCount + 3) : parseInt((gridSponsorsCount + 4), 10);
    },

    @computed get partnersPageCount() {
      const count = this.partners.length / 12;

      return count % 1 === 0 ? count : parseInt(count + 1, 10);
    },

    @computed get foundersPageCount() {
      const count = this.founders.length / 12;

      return count % 1 === 0 ? count : parseInt(count + 1, 10);
    },

    @computed get pages() {
      const divide = [
        { index: 0, end: 1 },
        { index: 1, end: 3 },
        { index: 3, end: 7 },
        { index: 8, end: 20 },
      ];
      let pages = [];

      for (let page = 0; page < this.sponsorsPagesCount; page++) {
        pages = pages.concat(
          [this.sponsors.slice(
            page < 4 ? divide[page].index : divide[page].end + (12 * (page - 4)),
            page < 4 ? divide[page].end : divide[page].end + (12 * (page - 4)) + 12,
          )]
        );
      }

      for (let page = 0; page < this.partnersPageCount; page++) {
        pages = pages.concat(
          [this.partners.slice((12 * page), (12 * page) + 12)]
        );
      }

      for (let page = 0; page < this.foundersPageCount; page++) {
        pages = pages.concat(
          [this.founders.slice((12 * page), (12 * page) + 12)]
        );
      }

      return pages;
    },
  },
});
