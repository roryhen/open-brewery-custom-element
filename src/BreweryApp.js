import { html, css, LitElement } from 'lit';

export class BreweryApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--brewery-app-text-color, #000);
        font-family: system-ui, sans-serif;
      }

      .fade-in {
        opacity: 0;
        animation: fadeIn 1s forwards;
      }

      .fade-out {
        opacity: 1;
        animation: fadeOut 1s forwards;
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        to {
          opacity: 0;
        }
      }
    `;
  }

  static get properties() {
    return {
      _apiUrl: { type: String, state: true },
      _breweries: { type: Array, state: true },
      _loading: { type: Boolean, state: true },
      _fadeComplete: { type: Boolean, state: true },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this._apiUrl = 'https://api.openbrewerydb.org/breweries';
    this._breweries = undefined;
    this._loading = true;
    this._fadeComplete = false;
    this.title = 'Brewery App';
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this._breweries) {
      this._fetchBreweries();
    }
  }

  async _fetchBreweries() {
    this._loading = true;
    const response = await fetch(this._apiUrl);
    const jsonResponse = await response.json();
    this._breweries = jsonResponse;
    this._loading = false;
  }

  _toggleVisitedStatus(breweryToUpdate) {
    this._breweries = this._breweries.map(brewery => {
      if (brewery === breweryToUpdate) {
        return { ...brewery, visited: !brewery.visted };
      }
      return brewery;
    });
    this.requestUpdate();
  }

  _onAnimationComplete() {
    this._fadeComplete = true;
  }

  render() {
    if (!this._fadeComplete) {
      return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        @animationend="${this._onAnimationComplete}"
        class="${this._loading ? '' : 'fade-out'}"
        style="margin: auto; display: block;"
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke-width="8"
          stroke="#85a2b6"
          stroke-dasharray="50.26548245743669 50.26548245743669"
          fill="none"
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </svg>`;
    }

    const totalVisited = this._breweries.filter(b => b.visited).length;
    const totalNotVisited = this._breweries.length - totalVisited;

    return html` <h1>${this.title}</h1>
      <p>Total Visited: ${totalVisited}</p>
      <p>Total to go: ${totalNotVisited}</p>
      <ul class="fade-in">
        ${this._breweries.map(
          brewery => html`<li>
            <brewery-detail
              .name=${brewery.name}
              .type=${brewery.brewery_type}
              .city=${brewery.city}
              .visited=${brewery.visited}
              @toggle-visited-status=${() => this._toggleVisitedStatus(brewery)}
            >
            </brewery-detail>
          </li>`
        )}
      </ul>`;
  }
}
