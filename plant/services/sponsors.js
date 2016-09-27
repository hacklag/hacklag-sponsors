import { action, request } from 'utils';

const SPONSORS_URL = 'https://api.syncano.io/v1.1/instances/silent-rain-3110/endpoints/data/fetchsponsors/get/';

export default class Sponsors {
  constructor() {
    this.fetch = this.fetch.bind(this);
    this.listen = this.listen.bind(this);
    this.rotateSponsors = this.rotateSponsors.bind(this);
  }

  @action rotateSponsors = (time = 5000) => {
    setInterval(() => {
      const { activePage, pagesCount } = this.store.sponsors;

      this.store.sponsors.activePage = (activePage + 1) % pagesCount;
    }, time);
  }

  @action fetch = async () => {
    const { objects } = await request.get(SPONSORS_URL);

    this.store.sponsors.items = objects;
  }

  @action listen() {
    request.syncano.Channel
      .please()
      .poll({ name: 'sponsorschannel' })
      .on('message', () => this.fetch());
  }
}
