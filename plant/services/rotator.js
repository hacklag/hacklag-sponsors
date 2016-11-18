import { action, request } from 'utils';

const PARTNERS_URL = 'https://api.syncano.io/v1.1/instances/silent-rain-3110/endpoints/data/fetchpartners/get/';

export default class Rotator {
  constructor() {
    this.fetch = this.fetch.bind(this);
    this.listen = this.listen.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  @action rotate = (time = 2000) => {
    setInterval(() => {
      const { activePage, totalPagesCount } = this.store.rotator;

      this.store.rotator.activePage = (activePage + 1) % totalPagesCount;
    }, time);
  }

  @action pyramidRotate = (time = 5000) => {
    setInterval(() => {
      const { pyramidActivePage, partnersPageCount, foundersPageCount } = this.store.rotator;
      const totalPagesCount = partnersPageCount + foundersPageCount + 1;

      this.store.rotator.pyramidActivePage = (pyramidActivePage + 1) % totalPagesCount;
    }, time);
  }

  @action fetch = async () => {
    const { objects } = await request.get(PARTNERS_URL);

    this.store.rotator.sponsors = objects.filter(item => item.type.includes('sponsor'));
    this.store.rotator.founders = objects.filter(item => item.type.includes('founder'));
    this.store.rotator.partners = objects.filter(item => item.type.includes('partner'));
  }

  @action listen() {
    request.syncano.Channel
      .please()
      .poll({ name: 'partners' })
      .on('message', () => this.fetch());
  }
}
