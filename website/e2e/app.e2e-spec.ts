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


/** Test Home **/
describe('website home', () => {
  let home: MainPage;

  // Render homepage before executing tests
  beforeEach(() => {
    home = new MainPage();
  });

  // Expect toggleGridButton to work
  it('should toggle gridview', () => {
    home.getToggleGridButton().click();
    home.getToggledGrid().then(data => {
      expect(data).toBe(true);
    });
    home.getToggleGridButton().click();
    home.getToggledGrid().then(data => {
      expect(data).toBe(false);
    });
  });

  // Expect toggleFilterButton to show filters
  it('should toggle/show filters', () => {
    home.getToggledFilters().then(data => {
      expect(data).toBe(false);
    });
    home.getToggleFilterButton().click();
    home.getToggledFilters().then(data => {
      expect(data).toBe(true);
    });
  });

  // Expect selectSearch button to show options
  it('should open selectSearch with searchoptions', () => {
    home.getSelectSearch().click();
    expect(home.SelectSearchOption('mat-option-0')).toBeTruthy();
    home.chooseSearchOptionDirector().click();
    expect(home.getCurrentSearchOption()).toEqual('Director');
  });

  // Expect homepage to load wordcloud on click, and find cloudtitle.
  it('should navigate to wordcloud', () => {
    home.getCloudButton().click();
    expect(home.getCloudTitle())
      .toEqual('Moviegenres in our database; the bigger they are, the more we got! cloud');
  });

  // Expect to return to home after visiting wordcloud
  it('should navigate back to homepage by titlebutton', () => {
    home.getHomeLink().click();
    expect(home.getHeaderTitle()).toBeTruthy();
  });
});
/** End Test Home **/
