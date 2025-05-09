export class DogCard extends HTMLElement {
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

	render() {
		this.shadow.innerHTML = `
      <style>
  .card {
    cursor: pointer;
    border-radius: 12px;
    background: rgba(32, 102, 208, 0.8);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }
img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}
  p {
    margin: 0;
    padding: 12px;
    font-size: 1.1em;
    font-family: 'Segoe UI', sans-serif;
    font-weight: 600;
    text-transform: capitalize;
    color: rgba(255, 255, 255, 0.8);
  }
</style>
      <div class="card">
        <img src="${this.img}" alt="${this.breed}" />
        <p>${this.breed}</p>
      </div>
    `;

		this.shadow.querySelector('.card')?.addEventListener('click', () => {
			this.dispatchEvent(
				new CustomEvent('dog-click', {
					detail: { breed: this.breed, img: this.img },
					bubbles: true,
					composed: true,
				})
			);
		});
	}
}

customElements.define('dog-card', DogCard);
