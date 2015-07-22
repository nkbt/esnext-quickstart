import Header from '../../src/app/Header';
import createComponent from '../utils/createComponent';


describe('Header', () => {
  it('Should render greetings', () => {
    const header = createComponent(Header).out;
    const a = header.props.children;

    expect(header).toBeEl();
    expect(header.type).toEqual('header');

    expect(a).toBeEl();
    expect(a.type).toEqual('a');
    expect(a.props.children).toMatch('Logo');
  });
});
