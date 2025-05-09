// src/components/dogPopup.ts

export class DogPopup extends HTMLElement {
	private shadow: ShadowRoot;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	static get observedAttributes() {
		return ['img', 'breed'];
	}

	attributeChangedCallback() {
		this.render();
	}

	get img() {
		return this.getAttribute('img') ?? '';
	}

	get breed() {
		return this.getAttribute('breed') ?? 'Unknown';
	}

	close() {
		this.remove(); // quita el componente del DOM
	}

	render() {
		this.shadow.innerHTML = `
     <style>
  .overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup {
    background: #fff;
    border-radius: 16px;
    padding: 25px;
    max-width: 90%;
    width: 360px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    text-align: center;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 15px;
    object-fit: cover;
  }

  h2 {
    margin: 0;
    margin-bottom: 10px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.4em;
    color: #333;
    text-transform: capitalize;
  }

  button {
    padding: 10px 20px;
    font-size: 1em;
    background: #ff5c5c;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  button:hover {
    background: #e04343;
  }
</style>
      <div class="overlay">
        <div class="popup">
          <h2>${this.breed}</h2>
          <img src="${this.img}" alt="${this.breed}">
          <br/>
          <button id="closeBtn">Cerrar</button>
        </div>
      </div>
    `;

		this.shadow.getElementById('closeBtn')?.addEventListener('click', () => this.close());
	}
}

customElements.define('dog-popup', DogPopup);
