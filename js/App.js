import { html, LitElement } from 'lit';



export default class App extends LitElement {
  constructor(){
    super();
  }

  static get properties() {
    return {
      message: {
        type: String
      }
    }
  }


  createRenderRoot() {
    return this;
  }

  render(){
    return html `<div className='container'>
    </div>`
  }

  changeMessage(event){
    this.message = 'hello world'
  }

}