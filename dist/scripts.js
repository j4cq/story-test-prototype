var CssClasses;
(function (CssClasses) {
    CssClasses["Layer"] = "reveal__layer";
    CssClasses["Image"] = "reveal__layer__image";
    CssClasses["Placeholder"] = "reveal__placeholder";
})(CssClasses || (CssClasses = {}));
class Reveal {
    constructor(wrapper) {
        this.placeholders = [];
        this.wrapper = wrapper;
        this.setupReveal();
        window.addEventListener('scroll', () => window.requestAnimationFrame(this.handleScroll.bind(this)));
    }
    setupReveal() {
        this.layers = Array.from(this.wrapper.getElementsByClassName(CssClasses.Layer));
        let placeholder;
        for (let i = 0; i < this.layers.length; i++) {
            placeholder = document.createElement('div');
            placeholder.classList.add(CssClasses.Placeholder);
            this.wrapper.append(placeholder);
            this.placeholders.push(placeholder);
        }
    }
    ;
    handleScroll() {
        this.placeholders.forEach((placeholder, index) => {
            const layer = this.layers[index];
            const image = layer.getElementsByClassName(CssClasses.Image)[0];
            const rect = placeholder.getBoundingClientRect();
            const top = rect.top - rect.height;
            let offset = 0;
            if (top + rect.height <= 0) {
                offset = rect.height;
            }
            else if (top <= 0) {
                offset = top * -1;
            }
            this.setPosition(layer, offset);
            this.setPosition(image, Math.abs(offset - rect.height));
        });
    }
    setPosition(element, position) {
        element.style.transform = `translate3d(0, ${position}px, 0)`;
    }
}
new Reveal(document.getElementById('your-reveal-section'));
//# sourceMappingURL=scripts.js.map