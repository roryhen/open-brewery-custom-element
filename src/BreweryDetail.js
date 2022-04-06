import { html, css, LitElement } from 'lit';

export class BreweryDetail extends LitElement {
  static get styles() {
    return css`
      .title {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      city: { type: String },
      visited: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.name = '';
    this.type = '';
    this.city = '';
    this.visited = '';
  }

  _toggleVisitedStatus() {
    this.dispatchEvent(new CustomEvent('toggle-visited-status'));
  }

  render() {
    return html`<div class="title">
        <h3>${this.name}</h3>
        <div>
          <label for="visited">Visited</label>
          <input
            type="checkbox"
            id="visited"
            ?checked=${this.visited}
            @change=${this._toggleVisitedStatus}
          />
        </div>
      </div>
      <p>Type: ${this.type}</p>
      <p>City: ${this.city}</p>`;
  }
}
