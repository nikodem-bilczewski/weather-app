class WeatherView {
  _parentElement = document.querySelector("main");
  _errorMessage = "Invalid city, try again!";
  _data;

  _render(data) {
    if (!data) return;

    this._data = data;
    const cardMarkup = this.generateCardMarkup();
    const forecastMarkup = this.generateForecastMarkup(
      this._data.weather.daily
    );
    const markup = cardMarkup + forecastMarkup;

    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _renderError(message = this._errorMessage) {
    const markup = `
    <div class="container__error">
        <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="10em" width="10em" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5 0 .74-.33 1.39-.83 1.85l3.63 3.63c.98-1.86 1.7-3.8 1.7-5.48 0-3.87-3.13-7-7-7-1.98 0-3.76.83-5.04 2.15l3.19 3.19c.46-.52 1.11-.84 1.85-.84zm4.37 9.6l-4.63-4.63-.11-.11L3.27 3 2 4.27l3.18 3.18C5.07 7.95 5 8.47 5 9c0 5.25 7 13 7 13s1.67-1.85 3.38-4.35L18.73 21 20 19.73l-3.63-3.63z"></path></svg></span>
        <h2 class="error__message">${message}</h2>
      </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  _renderSpinner() {
    const markup = `
    <div class="container__loader">
      <span class="loader"></span>
    </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  createDate() {
    return new Date().toDateString();
  }

  generateCardMarkup() {
    return `
    <section class="card__container">
      <div class="card">
          <div class="weather">
            <p class="weather__date">${this.createDate()}</p>
            <h1 class="weather__city">${this._data.city}</h2>
            <h2 class="weather__temperature">${this._data.weather.current.temperature.toFixed(
              0
            )}° C</h1>
            <p class="weather__perceived">Perceived: ${this._data.weather.current.perceivedTemp.toFixed(
              0
            )}° C</p>
            
            
              <img src="https://openweathermap.org/img/wn/${
                this._data.weather.current.description.icon
              }.png" alt="" class="weather__icon" />
              <div class="weather__description">${
                this._data.weather.current.description.description
              }</div>
            
            <div class="weather__humidity">Humidity: ${
              this._data.weather.current.humidity
            }%</div>
            <div class="weather__wind">Wind speed: ${
              this._data.weather.current.wind
            } km/h</div>
          </div>
        </div>
      </section>
      `;
  }

  forecastDays(index) {
    const now = new Date().getTime();
    const daysFromNow = now + 1000 * 60 * 60 * 24 * (index + 1);
    const dateDaysFromNow = new Date(daysFromNow);
    const day = dateDaysFromNow.getDay();

    switch (day) {
      case 0:
        return "Sunday";
        break;
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
      case 6:
        return "Saturday";
        break;
    }
  }

  generateForecastMarkup(forecast) {
    let forecastMarkup = ``;

    forecast.forEach((el, i) => {
      forecastMarkup += `
        <div class="forecast">
            <p>${this.forecastDays(i)}</p>
            <div class="forecast__icon">
            <img src="https://openweathermap.org/img/wn/${
              el.weather[0].icon
            }.png" alt="" />
            </div>
            <p>${el.temp.night.toFixed(0)}° C | ${el.temp.day.toFixed(0)}° C</p>
        </div>
            `;
    });
    return `<section class="container__forecast">${forecastMarkup}</section>`;
  }
}

export default new WeatherView();
