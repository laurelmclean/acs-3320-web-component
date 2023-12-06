class CollapsibleElement extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._text = this.getAttribute('button-text') || 'New Section'; 
        this._buttonColor = this.getAttribute('button-color') || '#FFBE7B'; 
        this._hoverColor = this.getAttribute('hover-color') || '#FFA351';

        this._container = document.createElement('div');
        this._shadowRoot.appendChild(this._container);

        this._elementButton = document.createElement('button');
        this._container.appendChild(this._elementButton);
        this._elementButton.textContent = this._text;
        this._elementButton.style.backgroundColor = this._buttonColor;
        this._elementButton.style.fontSize = '20px';
        this._elementButton.style.color = '#444';
        this._elementButton.style.cursor = 'pointer';
        this._elementButton.style.padding = '18px';
        this._elementButton.style.width = '100%';
        this._elementButton.style.textAlign = 'left';
        this._elementButton.style.border = 'none';
        this._elementButton.style.outline = 'none';
        this._elementButton.style.transition = '0.4s';

        // Styles for .active and .accordion:hover
        this._elementButton.addEventListener('mouseover', () => {
            this._elementButton.style.backgroundColor = this._hoverColor;
        });
        this._elementButton.addEventListener('mouseout', () => {
            this._elementButton.style.backgroundColor = this._buttonColor;
        });

        // Styles for .accordion:after
        const plusSign = this.getAttribute('collapsed-emoji') || '➕';
        const afterElement = document.createElement('span');
        afterElement.textContent = plusSign;
        afterElement.style.fontSize = '13px';
        afterElement.style.color = '#777';
        afterElement.style.float = 'right';
        afterElement.style.marginLeft = '5px';
        this._elementButton.appendChild(afterElement);

        // Styles for .active:after
        const minusSign = this.getAttribute('expanded-emoji') || '➖';
        this._elementButton.addEventListener('click', () => {
            const panel = this._container.querySelector('.panel');

            if (this._elementButton.classList.contains('active')) {
                this._elementButton.classList.remove('active');
                afterElement.textContent = plusSign;
                panel.style.maxHeight = '0';
            } else {
                this._elementButton.classList.add('active');
                afterElement.textContent = minusSign;
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });

        // Create panel content
        const panel = document.createElement('div');
        panel.classList.add('panel');
        panel.style.padding = '0 18px';
        panel.style.backgroundColor = '#FCF6F5';
        panel.style.maxHeight = '0';
        panel.style.overflow = 'hidden';
        panel.style.transition = 'max-height 0.2s ease-out';
        panel.style.fontSize = '20px';
        panel.style.color = '#444';
        this._container.appendChild(panel);

        const paragraphContent = this.getAttribute('panel-content') || 'Default Paragraph Content';
        const paragraph = document.createElement('p');
        paragraph.textContent = paragraphContent;
        panel.appendChild(paragraph);
    }
}

customElements.define('collapsible-element', CollapsibleElement);
