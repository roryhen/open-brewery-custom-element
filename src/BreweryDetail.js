import { html, css, LitElement } from 'lit';

export class BreweryDetail extends LitElement {
  static get styles() {
    return css`
      .title {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 1rem;
      }

      .title label {
        border: .1rem solid #ddd;
        padding: .5rem;
      }

      h3 {
        margin: 0;
      }
      
      ul {
        list-style-type: none;
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
        <div>
          <label>Visited
          <input
            type="checkbox"
            ?checked=${this.visited}
            @change=${this._toggleVisitedStatus}
          />
          </label>
        </div>
        <h3>${this.name}</h3>
      </div>
      <ul>
      <li>Type: ${this.type}</li>
      <li>City: ${this.city}</li>
      </ul>`;
  }
}
