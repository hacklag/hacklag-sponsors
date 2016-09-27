import { observable, computed } from 'utils';

export default observable({
  sponsors: {
    items: [],
    activePage: 0,
    @computed get pagesCount() {
      return this.items.length ? Math.floor(Math.log2(this.items.length)) + 1 : 0;
    },
  },
});
