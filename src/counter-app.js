import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.max = 25;
    this.min = 0;
    this.count = 0;
    this.isMax = false
  }

  static get properties() {
    return {
      title: { type: String },
      max: { type: Number },
      min: { type: Number },
      count: { type: Number, reflect: true },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }

      :host([count="18"]) .countDisplay {
        color: var(--color-1-background);
      }
      
      :host([count="21"]) .countDisplay {
        color: var(--color-2-background);
      }
  
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }

      .countDisplay{
        color: purple;
        margin-left: 0px;
      }
      
      .add{
        border: 10px;
        margin-left: 22px;
      }
      .subtract{
        border: 10px;
        margin-left: 6px;
      }
      
      button{
        border-radius: 50%;
        width: 35px;
        font-size: 30px;
      }

      button:hover{
        background-color: grey;
      }

      button:focus{
        border-color: fuchsia
      }
      .container{
        display: flex;
      }
      .countDisplay{
        font-size: 100px;
      }

      .hightlight {
    background-color: lightgreen;
  }
    .isMax {
      color: white;
    }

    `];
  }

  render() {
    return html`
<div class="wrapper">
  <div>${this.title}</div>
  <slot></slot>
</div>
<div class="countDisplay">
  ${this.count}
  </div>

  <div class="container">
  <div class="subtract">
    <button title="Decrease" ?disabled="${this.min === this.count}" @click="${this.decrease}"> - </button>
  </div>
  <div class="add">
    <button title="Increase" ?disabled="${this.max === this.count}" @click="${this.increase}"> + </button>
  </div>
  </div>
`;
  }

  increase() {
    if (this.count == this.max) {

    }
    this.count += 1;
  }

  decrease() {
    this.count -= 1;
  }

  updated(changeProperties) {
    // if (changeProperties.has('count')) {
    //   const countDisplay = this.querySelector('.countDisplay');
    //   if (this.count == "18") {
    //     countDisplay.classList.add('highlight');
    //   } else {
    //     countDisplay.classList.remove('highlight');
    //   }
    // }
    if (this.count == this.max) {
      this.shadowRoot.querySelector(".countDisplay").classList.add("isMax")
      this.isMax = true
    } else {
      this.shadowRoot.querySelector(".countDisplay").classList.remove("isMax")
      this.isMax = false
    }
    console.log()
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}


globalThis.customElements.define(counterApp.tag, counterApp);