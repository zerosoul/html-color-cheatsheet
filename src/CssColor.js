import React, { Component } from 'react';
import styled from 'styled-components';
// import ColorInput from './components/convert.color/ColorInput';
import ClickToSelect from './components/ClickToSelect';
import SelectBox from './components/SelectBox';
import ColorPreview from './components/ColorPreview';
import Footer from './components/Footer';
import { media } from './utils/media';
import { hexToRgb, removeDuplicates } from './utils';
import COLORS from './colors.json';

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  padding: 0 0.5rem;
  @media ${media.desktop} {
    max-width: 90%;
  }
  .desc {
    line-height: 1.2;
    font-weight:800;
    font-size:1.4rem;
    margin-bottom:.8rem;
    strong {
      color: #faf0e6;
    }
  }
  table {
    font-size: 0.8rem;
    text-transform: uppercase;
    .hideInMobile {
      display: none;
    }
    @media ${media.tabletSmall} {
      .hideInMobile {
        display: table-cell;
      }
    }
    thead tr.head td {
      font-size: 1.2rem;
      font-weight: 600;
      color: #ffe4c4;
      text-transform: uppercase;
      text-align: center;
    }
    thead tr.colName td {
      font-size: 1rem;
      color: #ffebcd;
      text-align: left;
    }
    tbody {
      tr {
        td {
          text-align: left;
vertical-align:middle;
          button {
            text-transform: uppercase;
            letter-spacing: 0.06rem;
          }
        }
      }
    }
    td,th{
    border-bottom: 1px solid hsla(0,0%,0%,0.12);
    font-feature-settings: "tnum";
    -webkit-font-feature-settings: "tnum";
    padding-left: 1.06667rem;
    padding-right: 1.06667rem;
    padding-top: 0.8rem;
    padding-bottom: calc(0.8rem - 1px);
    }
  }
`;

export default class ColorCheatsheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [
        { name: 'mediumseagreen', hex: '#3cb371', seq: 91 },
        { name: 'mediumaquamarine', hex: '#66cdaa', seq: 87 },
        { name: 'lightcoral', hex: '#f08080', seq: 68 },
        { name: 'lightcyan', hex: '#e0ffff', seq: 69 },
        { name: 'indigo', hex: '#4b0082', seq: 60 },
      ],
      lockColors: [],
      get current() {
        return this.colors.slice(0, 1)[0];
      },
    };
  }
  handleColorClick = colorObj => {
    // console.log(colorObj);
    this.setState({
      current: colorObj,
    });
    const { colors } = this.state;
    colors.unshift(colorObj);
    const tmpColors = removeDuplicates(colors, 'name').slice(0, 5);
    // const tmpColors = colors.slice(0, 5);
    console.log(JSON.stringify(tmpColors));

    this.setState({ colors: tmpColors });
  };
  render() {
    return (
      <React.Fragment>
        <Container>
          <h2 className="desc">
            Modern browsers support 140+ named colors<br /> Use them in your HTML and CSS by{' '}
            <strong>NAME | HEX | RGB</strong>
          </h2>
          <SelectBox {...this.state} />
          <table>
            <thead>
              <tr className="head">
                <td colSpan="4">html color names</td>
              </tr>
              <tr className="colName">
                <td>Color</td>
                <td>Name</td>
                <td className="hideInMobile">Hex</td>
                <td className="hideInMobile">RGB</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(COLORS).map((name, idx) => (
                <tr key={name}>
                  <td>
                    <ColorPreview
                      color={{ name, hex: COLORS[name] }}
                      seq={idx + 1}
                      clickHandler={this.handleColorClick}
                    />
                  </td>
                  <td className="name" title={`color name: ${name}`}>
                    {name}
                  </td>
                  <td className="hex hideInMobile" title="click to copy!">
                    <ClickToSelect value={COLORS[name]} />
                  </td>
                  <td className="rgb hideInMobile" title="click to copy!">
                    <ClickToSelect value={`rgb(${hexToRgb(COLORS[name]).join(', ')})`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}
