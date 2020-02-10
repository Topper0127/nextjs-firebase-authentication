import IndexPage from '.';

describe('IndexPage', () => {
  const noSession = null;
  const session = 'session';

  it('renders when not authorized', () => {
    expect(IndexPage.isAuthorized(noSession)).toEqual(true);
  });

  it('renders when authorized', () => {
    expect(IndexPage.isAuthorized(session)).toEqual(true);
  });
});
