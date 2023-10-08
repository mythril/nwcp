if (
  !customElements.get('nw-cp') &&
  !(document.currentScript instanceof SVGScriptElement)
) {
  const src = document.currentScript
    ? new URL(document.currentScript.src)
    : { origin: 'https://nwcp.vercel.app' };
  const baseURL = `${src.origin}`;

  class NWCPEmbed extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'closed' });
      const charUrl = `${baseURL}/embed#${this.getAttribute('char')}`;
      const rawWidth = this.hasAttribute('width')
        ? this.getAttribute('width')
        : '#';
      const parsedWidth = parseInt(rawWidth.trim(), 10);
      const widthIsNumeric = !isNaN(parsedWidth);
      const width = widthIsNumeric ? `${parsedWidth}px` : '100%';

      const style = document.createElement('style');
      style.textContent = `
        iframe,
        :host {
          border:0;
          background-color:hsl(40, 27.3%, 17.3%);
          display:block;
          clear:both;
          aspect-ratio: 4/3;
          width:${width};
        }
      `;
      shadow.appendChild(style);

      const iframe = document.createElement('iframe');

      iframe.setAttribute('scrolling', 'no');
      shadow.appendChild(iframe);

      const observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
          iframe.src = entry.isIntersecting ? charUrl : '';
        }
      });

      observer.observe(this);
      fetch(charUrl, { cache: 'default' });
    }
  }

  window.customElements.define('nw-cp', NWCPEmbed);
}
