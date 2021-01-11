import { embedlink } from '../../../helpers';
import './style.css';

class Html {
  constructor({ data }) {
    this.data = data;
    this.wrapper = undefined;
    this.link = '';
  }

  static get toolbox() {
    return {
      title: 'html',
      icon: '<p>Ht</p>',
    };
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }

  render() {
    this.wrapper = document.createElement('div');
    const input = document.createElement('input');

    this.wrapper.classList.add('raw-html');
    this.wrapper.appendChild(input);

    input.placeholder = 'Paste an embed URL...';
    input.value = this.data && this.data.url ? this.data.url : '';

    input.addEventListener('paste', (event) => {
      this._addHtml(event.clipboardData.getData('text'));
    });

    if (input.value) {
      this._addHtml(input.value);
    }

    return this.wrapper;
  }

  _addHtml(embed) {
    const div = document.createElement('div');
    div.textContent = embed;
    this.link = embed;

    if (embed.includes('iframe')) {
      const newDiv = document.createElement('div');
      newDiv.innerHTML = embed;
      div.appendChild(newDiv);
    } else {
      const x = embedlink(div, false);
      x.render();
    }

    this.wrapper.innerHTML = '';
    this.wrapper.appendChild(div);
  }

  save(blockContent) {
    return {
      url: this.link,
    };
  }
}

export default Html;
