import React from 'react';

import './style.scss';

const Image = props => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? 'contain' : 'cover',
      backgroundPosition: props.left ? 'left' : 'center'
    }}
  >
    {props.enableHover && (<div className="black-dim">REMOVE</div>)}
  </div>
);

export default Image;