function createDOMElement(tagName, attributes = {}) {
    const elemento = document.createElement(tagName);
    if (attributes.textContent) elemento.textContent = attributes.textContent;
    if (attributes.onClick) elemento.onclick = attributes.onClick;
    if (attributes.placeHolder) elemento.placeholder = attributes.placeHolder;
    return elemento;
}

function appendElementsContainer(elementoPai, container, elementos) {
    elementoPai.appendChild(container);
    elementos.forEach(elemento => container.appendChild(elemento));
}

function appendElements(elementoPai, elementos) {
    elementos.forEach(elemento => elementoPai.appendChild(elemento));
    return elementoPai;
}
