import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { invertColor } from '../utils';

const Preview = styled.div`
  position: relative;
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  &:before {
    content: attr(data-seq);
    position: absolute;
    font-size: 0.8rem;
    color: ${props => invertColor(props.color.hex, true)};
    line-height: 2.6;
    text-align: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-shadow: 1px 1px 12px 0px #0000008c;
  }
`;
export default class ColorPreview extends PureComponent {
  render() {
    const { color, seq, clickHandler } = this.props;
    color.seq = seq;
    return (
      <Preview color={color} style={{ background: color.hex }} onClick={() => clickHandler(color)} data-seq={seq} />
    );
  }
}
