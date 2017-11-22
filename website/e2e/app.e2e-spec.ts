import {MainPage} from './app.po';

/** Test Header Component **/

describe('website Header', () => {
  let home: MainPage;

  // Render homepage before executing tests
  beforeEach(() => {
    home = new MainPage();
  });

  // Expect header to by rendered with the correct content.
  it('should display Blockbuster in header', () => {
    home.navigateTo();
    expect(home.getHeaderTitle()).toEqual('Blockbuster');
  });

  // Expect icon to be account circle
  it('should display an account circle', () => {
    expect(home.getHeaderIcon()).toEqual('account_circle');
  });

  // Expect user not to be logged in, and therefore "Sign-In" should be displayed
  it('should display sign-in if not logged in', () => {
    expect(home.getUsernameStatus()).toEqual('Sign-In');
  });

  // Expect user to be able to see the wordcloud text
  it('should display wordcloud', () => {
    expect(home.getCloudText()).toEqual('Wordcloud');
  });

  // Expect user to be able to see the cloud
  it('should display wordIcon', () => {
    expect(home.getCloudIcon()).toEqual('cloud');
  });
});

/** End Test Header Component **/
