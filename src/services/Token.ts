import IHuman from '@/interfaces/IHuman';
import ITokens from '@/interfaces/ITokens';

const TokenService = (() => {
  function _isAuth(): boolean {
    const token = _getAccessToken();
    return !(!token || token === 'undefined');
  }

  function _setToken(tokenObj: ITokens) {
    if (tokenObj.accessToken) {
      localStorage.setItem('access_token', tokenObj.accessToken);
    }
    if (tokenObj.refreshToken) {
      localStorage.setItem('refresh_token', tokenObj.refreshToken);
    }
  }

  function _getUserId() {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString).id;
    }
    return '';
  }

  function _getUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return;
  }

  function _getAccessToken() {
    return localStorage.getItem('access_token');
  }
  function _getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  function _clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  function _updateHuman(human: IHuman) {
    if (!_isAuth()) return;
    const user = TokenService.getUser();
    if (!user) return;
    user.human = human;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return {
    isAuth: _isAuth,
    setTokens: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    getUserId: _getUserId,
    clearTokens: _clearTokens,
    getUser: _getUser,
    updateHuman: _updateHuman,
  };
})();

export default TokenService;
