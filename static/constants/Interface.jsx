
const base = '/app';
const remoteUrl = {
    LOGIN: `${base}/user/login`,
    LOGOUT: `${base}/user/logout`,
};

Object.freeze(remoteUrl);

export {remoteUrl};
