export default interface AuthorizedAppAction {
  getAccessTokenSilently: () => Promise<string>;
}
