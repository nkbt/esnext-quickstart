import Content from '../../src/app/Content';
import createComponent from '../utils/createComponent';


describe('Content', () => {
  it('Should render greetings', () => {
    const content = createComponent(Content).out;
    const h1 = content.props.children;

    expect(content).toBeEl();
    expect(content.type).toEqual('section');

    expect(h1).toBeEl();
    expect(h1.type).toEqual('h1');
    expect(h1.props.children).toMatch('Hello');
  });
});
