import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../brewery-app.js';

describe('BreweryApp', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture(html`<brewery-app></brewery-app>`);

    expect(el.title).to.equal('Brewery App');
  });

  it('can override the title via attribute', async () => {
    const el = await fixture(html`<brewery-app title="attribute title"></brewery-app>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<brewery-app></brewery-app>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
