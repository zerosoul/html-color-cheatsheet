import React from 'react';
import styled from 'styled-components';
import { hexToRgb, RgbToHsl } from '../utils';
import { media } from '../utils/media';
import { invertColor } from '../utils';
import ClickToSelect from './ClickToSelect';

const Container = styled.section`
  display: flex;
  background: #fff;
  position: -webkit-sticky;
  position: sticky;
  top: 0.2rem;
  z-index: 9999;
  height: 4rem;
  padding: 0.6rem;
  box-shadow: 0px 0px 8px #676363;
  .current {
    flex: 6;
    display: flex;
    align-items: center;
    .preview {
      flex: 1;
      width: 1rem;
      height: 2rem;
      padding: 0.2rem 0.4rem;
      background: ${props => props.currColor.hex};
      position: relative;
      &:before {
        content: '${props => props.currColor.seq}';
        position: absolute;
        font-size: 0.8rem;
        color: ${props => invertColor(props.currColor.hex, true)};
        line-height: 2.6;
        text-align: center;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }

    }
    dl {
      flex: 11;
      display: flex;
      text-transform: uppercase;
      justify-content: space-evenly;
      margin-bottom: 0;
      .item button{
        text-transform:uppercase;
        font-weight:bold;
      }
      .hideInMobile {
        display: none;
      }
      @media ${media.tabletWide} {
        .hideInMobile {
          display: block;
        }
      }
      dt {
        color: #999;
        font-size: 0.8rem;
      }
      dd {
        color: #000;
        margin-bottom: 0;
        font-weight: bold;
      }
    }
  }
  .colors {
    flex: 6;
    display: flex;
    background: #666;
  }
`;
const Selected = styled.div`
      position:relative;
      flex: 2;
      background:${props => props.currColor.hex};
      &:before {
        content: '${props => props.currColor.seq}';
        position: absolute;
        font-size: 0.8rem;
        color: ${props => invertColor(props.currColor.hex, true)};
        line-height: 3.4;
        text-align: center;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
`;
export default class SelectBox extends React.Component {
  render() {
    const { current, colors } = this.props;
    return (
      <Container currColor={current} id="selectBox">
        <div className="current">
          <div className="preview" />
          <dl>
            <div className="item">
              <dt>hex</dt>
              <dd>
                <ClickToSelect fromBox={true} value={current.hex} />
              </dd>
            </div>
            <div className="item">
              <dt className="hideInMobile">rgb</dt>
              <dd className="hideInMobile">
                <ClickToSelect fromBox={true} value={hexToRgb(current.hex).join(', ')} />
              </dd>
            </div>
            <div className="item">
              <dt className="hideInMobile">hsl</dt>
              <dd className="hideInMobile">
                <ClickToSelect fromBox={true} value={RgbToHsl(hexToRgb(current.hex)).join(', ')} />
              </dd>
            </div>
          </dl>
        </div>
        <div className="colors">
          {colors.map(color => (
            <Selected key={color.name} currColor={color} />
          ))}
        </div>
      </Container>
    );
  }
}
