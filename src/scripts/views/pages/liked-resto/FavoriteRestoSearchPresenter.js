class FavoriteRestoSearchPresenter {
  constructor({ favoriteRestaurant }) {
    this._listenToSearchRequestByUser();
    this._favoriteRestaurant = favoriteRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchResto(event.target.value);
    });
  }

  async _searchResto(latestQuery) {
    this._latestQuery = latestQuery.trim();
    const foundresto = await this._favoriteRestaurant.searchResto(this.latestQuery);
    this._showFoundResto(foundresto);
  }

  _showFoundResto(restos) {
    const html = restos.reduce(
      (carry, resto) =>
        carry.concat(`
        <li class="resto">
          <span class="resto__title">${resto.title || '-'}</span>
        </li>
      `),
      ''
    );

    document.querySelector('.restos').innerHTML = html;

    document.getElementById('resto-search-container').dispatchEvent(new Event('restos:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}
export default FavoriteRestoSearchPresenter;
