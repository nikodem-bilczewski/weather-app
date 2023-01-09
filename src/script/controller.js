import weatherView from "./views/weatherView.js";
import searchView from "./views/searchView.js";
import * as model from "./model.js";

export const controlRenderWeather = async function () {
  try {
    searchView._removeOutline();
    weatherView._renderSpinner();
    const query = searchView._getQuery();

    if (!query) throw new Error("No input");

    await model.fetchWeather(query);

    weatherView._render(model.state);
  } catch (err) {
    weatherView._renderError();
    searchView._toggleSearchBar();
  }
};

const init = function () {
  searchView._addHandlerSearch(controlRenderWeather);
};
init();
