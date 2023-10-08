if (
  !customElements.get('nw-cp') &&
  !(document.currentScript instanceof SVGScriptElement)
) {
  const src = document.currentScript
    ? new URL(document.currentScript.src)
    : { origin: 'https://nwcp.vercel.app' };
  const baseURL = `${src.origin}`;

  class NWCPEmbed extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'closed' });
      const charUrl = `${baseURL}/embed#${this.getAttribute('char')}`;

      const style = document.createElement('style');
      style.textContent = `
        iframe,
        :host {
          background-color:hsl(40, 27.3%, 17.3%);
          display:block;
          clear:both;
          aspect-ratio: 4/3;
          width:100%;
        }
      `;
      shadow.appendChild(style);

      const iframe = document.createElement('iframe');

      iframe.setAttribute('frameborder', '0');
      shadow.appendChild(iframe);

      const observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
          iframe.src = entry.isIntersecting ? charUrl : '';
        }
      });

      observer.observe(this);
    }
  }

  window.customElements.define('nw-cp', NWCPEmbed);
}
