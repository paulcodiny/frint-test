import _ from 'lodash';

import { expect } from 'chai';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import { createComponent, mapToProps } from 'frint';
import createComponentStub from '../src/createComponentStub';

describe("createComponentStub", function() {
  const TestComponent = createComponent({
    render() {
      return <button onClick={this.props.handleButtonClicked} />;
    }
  });

  const FakeComponent = mapToProps({
    dispatch: {
      handleButtonClicked: _.noop,
    },
  })(TestComponent);

  let ComponentStub;
  let handleButtonClicked;

  before(() => {
    this.cleanup = require('jsdom-global');
    handleButtonClicked = stub();
    ComponentStub = createComponentStub(FakeComponent, {
      dispatch: {
        handleButtonClicked
      }
    });
  });

  after(() => this.cleanup());

  it("should be able to stub dispatch to action", () => {
    const wrapper = mount(<ComponentStub />);
    wrapper.find('button').simulate('click');
    expect(handleButtonClicked).to.have.been.calledOnce();
  });
});