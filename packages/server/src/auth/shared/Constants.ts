const EMAIL = Object.freeze({
  REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  MAX_LEN: 64,
});

const PASSWORD = Object.freeze({
  REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  MAX_LEN: 64,
});

const NIP = Object.freeze({
  REGEX: /^\d{10}$/,
  MAX_LEN: 10,
});

const PHONE_NUMBER = Object.freeze({
  REGEX: /^\+?\d{6,14}$/,
  MAX_LEN: 14,
});

export { EMAIL, NIP, PASSWORD, PHONE_NUMBER };
