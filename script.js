document.addEventListener('DOMContentLoaded', () => {
    const leftPanel = document.getElementById("left-panel");
    const mainContainer = document.getElementById("main-container");
    const colorPicker = document.getElementById("color-picker");

    let selectedSvg = null;

    leftPanel.addEventListener("dragstart", (event) => {
        if (event.target.classList.contains('box')) {
            event.dataTransfer.setData('text/html', event.target.outerHTML);
        }
    });

    mainContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    mainContainer.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/html');
        const wrapper = document.createElement('div');

        wrapper.classList.add("box");
        wrapper.innerHTML = data;
        mainContainer.appendChild(wrapper);

        const newSvg = wrapper.querySelector('svg');
        newSvg.addEventListener('click', () => {
            if (selectedSvg) {
                selectedSvg.classList.remove('selected');
            }
            selectedSvg = newSvg;
            selectedSvg.classList.add('selected');
        });
    });

    colorPicker.addEventListener('input', (event) => {
        if (selectedSvg) {
            selectedSvg.querySelectorAll('*').forEach((child) => {
                child.style.fill = event.target.value;
            });
        }
    });
});
