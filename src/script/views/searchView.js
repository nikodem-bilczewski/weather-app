class SearchView {
  _parentEl = document.querySelector(".search__form");
  _searchBtn = document.querySelector(".search__button");
  _search = document.querySelector(".search__bar");

  _removeOutline() {
    this._search.classList.remove("search__fail");
  }

  _toggleSearchBar() {
    this._search.classList.toggle("search__fail");
  }

  _addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _getQuery() {
    const query = this._search.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search__bar").value = "";
    this._search.blur();
  }
}

export default new SearchView();
