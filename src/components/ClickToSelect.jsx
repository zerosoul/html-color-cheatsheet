import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Container = styled.div`
  position: relative;
  button {
    background: none;
    text-align: center;
    padding: .2rem .4rem;
    border: 1px solid #333;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 2px 3px 3px 0px #4a4848;
    &.no_border{
      border:none;
      box-shadow:none;
      padding:0;
    }
  }
  .tip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      color: #fff;
      padding: 0.4rem;
      font-size: 1rem;
      background: rgba(0, 0, 0, 0.8);
    }
  }
`;

export default class ClickToSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };
    this.timer = null;
  }

  copyHandler = () => {
    console.log(this.timer);

    clearTimeout(this.timer);
    this.setState({ copied: true });
    this.timer = setTimeout(() => {
      this.setState({ copied: false });
    }, 1500);
  };
  render() {
    const { fromBox = false } = this.props;
    return (
      <Container>
        <CopyToClipboard text={this.props.value} onCopy={this.copyHandler}>
          <button className={fromBox && 'no_border'}>{this.props.value}</button>
          {/* <input type="text" readOnly {...this.props} /> */}
        </CopyToClipboard>
        {this.state.copied && (
          <div className="tip">
            <div className="content">copied</div>{' '}
          </div>
        )}
      </Container>
    );
  }
}
