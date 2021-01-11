import React from 'react';

function ReadOnly({ data }) {
  const renderBlock = ({ type, data }, index) => {
    let content = '';
    switch (type) {
      case 'header':
        const element = `<h${data.level} class='ce-header'>${data.text}</h${data.level}>`;
        content = (
          <div
            style={{ height: 'fit-content' }}
            dangerouslySetInnerHTML={{ __html: element }}
          />
        );
        break;

      case 'list':
        content = (
          <ul className={`"cdx-block" "cdx-list" "cdx-list--${data.style}"`}>
            {data.items.map((item) => (
              <li class="cdx-list__item">{item}</li>
            ))}
          </ul>
        );
        break;
      case 'embed':
        content = (
          <div className="cdx-block embed-tool">
            <iframe
              title="frame1"
              className="embed-tool__content"
              style={{ width: 'fit-100%' }}
              height="320"
              frameborder="0"
              width="580"
              allowfullscreen
              src={data.embed}
            ></iframe>
            <div style={{ 'text-align': 'center', 'margin-top': '5px' }}>
              {data.caption}
            </div>
          </div>
        );
        break;
      case 'code':
        content = (
          <div class="cdx-block ce-code">
            <span style={{ 'text-align': 'right', 'margin-bottom': '5px' }}>
              {data.language}
            </span>
            <pre className="ce-code__textarea cdx-input prettyprint">
              <code className="lang-js">{data.code + ''}</code>
            </pre>
          </div>
        );
        break;
      case 'image':
        content = (
          <div className="cdx-block image-tool image-tool--filled">
            <div className="image-tool__image">
              <img
                className="image-tool__image-picture"
                src={data.file.url}
                alt={data.file.url}
              ></img>
              <span style={{ textAlign: 'right', marginBottom: '5px' }}>
                {data.caption}
              </span>
            </div>
          </div>
        );
        break;
      default:
        // content = <div className='ce-paragraph cdx-block'>{data.text}</div>;
        content = <div dangerouslySetInnerHTML={{ __html: data.text }} />;

        break;
    }
    return (
      <div key={index} className="ce-block">
        <div className="ce-block__content">{content}</div>
      </div>
    );
  };

  return data.blocks.map((block, index) => renderBlock(block, index));
}

export default ReadOnly;
