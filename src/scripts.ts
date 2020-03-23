enum CssClasses {
  Layer = 'reveal__layer',
  Image = 'reveal__layer__image',
  Placeholder = 'reveal__placeholder'
}

class Reveal {
  wrapper: Element;
  layers: Element[];
  placeholders: Element[] = [];

  constructor(wrapper: Element) {
    this.wrapper = wrapper;
    this.setupReveal();
    window.addEventListener('scroll', () => window.requestAnimationFrame(this.handleScroll.bind(this)));
  }

  setupReveal(): void {
    this.layers = Array.from(this.wrapper.getElementsByClassName(CssClasses.Layer));

    let placeholder: Element;
    for (let i = 0; i < this.layers.length; i++) {
      placeholder = document.createElement('div');
      placeholder.classList.add(CssClasses.Placeholder);
      this.wrapper.append(placeholder);
      this.placeholders.push(placeholder);
    }
  };

  handleScroll(): void {
    this.placeholders.forEach((placeholder: Element, index: number) => {
      const layer: Element = this.layers[index];
      const image: Element = layer.getElementsByClassName(CssClasses.Image)[0];
      const rect: DOMRect = placeholder.getBoundingClientRect();
      const top: number = rect.top - rect.height;
      let offset: number = 0;

      if (top + rect.height <= 0) {
        offset = rect.height;
      } else if (top <= 0) {
        offset = top * -1;
      }

      this.setPosition(layer, offset);
      this.setPosition(image, Math.abs(offset - rect.height));
    });
  }

  setPosition(element: Element, position: number): void {
    (element as HTMLElement).style.transform = `translate3d(0, ${position}px, 0)`;
  }
}

new Reveal(document.getElementById('your-reveal-section'));
