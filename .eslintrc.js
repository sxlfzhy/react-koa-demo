module.exports = {
  root: true,
  extends: ['babel', 'standard', 'standard-jsx'],
  parserOptions: {
    ecmaVersion: 7
  },
  rules: {
    'jsx-quotes': [2, 'prefer-double'],
    'no-throw-literal': 0,
    'max-len': ["error", 120]
  },
  globals: {
    QWebChannel: true,
    qt: true,
    WebSocket: true,
    location: true,
    localStorage: true,
    sessionStorage: true,
    _DEV_: true,
    _DEBUG_: true,
    _BI: true,
    history: true
  }
}
