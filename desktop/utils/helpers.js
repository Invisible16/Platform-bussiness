import { isString, isArray, isNil, isEmpty } from 'lodash';
import crypto from 'crypto';

const algorithm = 'aes-128-ctr';

export function redirectOnServer({ res, url }) {
  res.writeHead(302, { Location: url });
  res.end();
}

export function checkPermission(allow, current) {
  if (isArray(current)) {
    const index = current.find(e => allow.includes(e));
    return isNil(index) ? false : true;
  } else if (isString(current)) {
    return allow.includes(current);
  } else {
    return false;
  }
}

export function encrypt(text, key) {
  let cipher = crypto.createCipher(algorithm, key);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function decrypt(text, key) {
  let decipher = crypto.createDecipher(algorithm, key);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
