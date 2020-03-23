const reveal = Array.from(document.getElementsByClassName('reveal'))[0];
const placeholders = Array.from(reveal.getElementsByClassName('reveal__placeholder'));
const layers = Array.from(reveal.getElementsByClassName('reveal__layer'));
window.addEventListener('scroll', handleScroll);
function handleScroll() {
    placeholders.forEach((placeholder, index) => {
        const image = Array.from(layers[index].getElementsByClassName('reveal__image'))[0];
        const rect = placeholder.getBoundingClientRect();
        const top = rect.top - rect.height;
        let offset = 0;
        if (top + rect.height <= 0) {
            offset = rect.height;
        }
        else if (top <= 0) {
            offset = top * -1;
        }
        setPosition(layers[index], offset);
        setPosition(image, Math.abs(offset - rect.height));
    });
}
function setPosition(element, position) {
    element.style.transform = `translate3d(0, ${position}px, 0)`;
}
//# sourceMappingURL=scripts.js.map