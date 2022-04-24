import { html } from 'lit';
import View from './view';

export default class App extends View {
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

  render(){
    return html `<div className='container'>
    <order-header></order-header>
    </div>`
  }

  changeMessage(event){
    this.message = 'hello world'
  }

}