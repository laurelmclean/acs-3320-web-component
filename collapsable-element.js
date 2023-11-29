class CollapsableElement extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._text = this.getAttribute('button-text') || 'Default Button Text'; // Default text if not provided

        this._container = document.createElement('div');
        this._shadowRoot.appendChild(this._container);

        this._leftButton = document.createElement('button');
        this._container.appendChild(this._leftButton);
        this._leftButton.textContent = this._text;
        this._leftButton.style.backgroundColor = '#eee';
        this._leftButton.style.color = '#444';
        this._leftButton.style.cursor = 'pointer';
        this._leftButton.style.padding = '18px';
        this._leftButton.style.width = '100%';
        this._leftButton.style.textAlign = 'left';
        this._leftButton.style.border = 'none';
        this._leftButton.style.outline = 'none';
        this._leftButton.style.transition = '0.4s';

        // Styles for .active and .accordion:hover
        this._leftButton.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#ccc';
        });
        this._leftButton.addEventListener('mouseout', function () {
            this.style.backgroundColor = '';
        });

        // Styles for .accordion:after
        const plusSign = '\u02795'; // Unicode character for "plus" sign (+)
        const afterElement = document.createElement('span');
        afterElement.textContent = plusSign;
        afterElement.style.fontSize = '13px';
        afterElement.style.color = '#777';
        afterElement.style.float = 'right';
        afterElement.style.marginLeft = '5px';
        this._leftButton.appendChild(afterElement);

        // Styles for .active:after
        const minusSign = '\u2796'; // Unicode character for "minus" sign (-)
        this._leftButton.addEventListener('click', () => {
            const panel = this._container.querySelector('.panel');

            if (this._leftButton.classList.contains('active')) {
                this._leftButton.classList.remove('active');
                afterElement.textContent = plusSign;
                panel.style.maxHeight = '0';
            } else {
                this._leftButton.classList.add('active');
                afterElement.textContent = minusSign;
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });

        // Create panel content
        const panel = document.createElement('div');
        panel.classList.add('panel');
        panel.style.padding = '0 18px';
        panel.style.backgroundColor = 'white';
        panel.style.maxHeight = '0';
        panel.style.overflow = 'hidden';
        panel.style.transition = 'max-height 0.2s ease-out';
        this._container.appendChild(panel);

        const paragraphContent = this.getAttribute('panel-content') || 'Default Panel Content'; // Default content if not provided
        const paragraph = document.createElement('p');
        paragraph.textContent = paragraphContent;
        panel.appendChild(paragraph);
    }
}

customElements.define('collapsable-element', CollapsableElement);
