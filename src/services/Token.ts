const TokenService = (() => {
  function _isAuth(): boolean {
    // return !(!token || token === 'undefined');
    return true;
  }

  function _clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  return {
    isAuth: _isAuth,
    clearTokens: _clearTokens,
  };
})();

export default TokenService;
