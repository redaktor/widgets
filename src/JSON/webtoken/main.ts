/**
 * redaktor/auth/jwt
 *
 * JSON Web Token encode and decode module for browsers and node.js
 *
 * Copyright (c) 2016 Sebastian Lasse, redaktor foundation
 * TODO FIXME - CLEAR LICENSE when alpha
 */
/* derives from */
/*
 * jwt-simple
 *
 * JSON Web Token encode and decode module for node.js
 *
 * Copyright(c) 2011 Kazuhito Hokamura
 * MIT Licensed
 */

/* TODO for jwt auth client : header: { 'Access-Control-Allow-Origin': '*' }
 * https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication
 */

/**
 * module dependencies
 */
import has from '@dojo/framework/has/main';
import { lang } from '../../dojo/core/main';
import { log } from '../../util/log';
import { base64UrlEncode, base64UrlDecode, escape, unescape } from '../../util/string/main';
import crypto, { hmacAlgorithm } from '../../crypto/main';
/**
 * support algorithm mapping JWT / redaktor.crypto
 */
const algorithmMap: any = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256' /* only node.js */
};
function getAlgos(method: string): any {
  const uMethod = method.toUpperCase();
  if (algorithmMap.hasOwnProperty(uMethod)) {
    return {method: algorithmMap[uMethod], alg: uMethod};
  } else {
    return hmacAlgorithm(method, true);
  }
}

class jwt {
  static version: string = '0.5.0';
  static debug: boolean = false;
  /**
   * Encode jwt
   *
   * @param {Object} payload
   * @param {String} key
   * @param {String} method
   * @param {Object} options
   * @return {String} token
   * @api public
   */
  static encode(payload: any, key: string, method: string = 'HS256', options: any = {}): string {
    // Check key and make header
    if (typeof key != 'string') {
      if (jwt.debug) { log('Encoding a JWT requires a "key" string.'); }
      return '';
    }
    const m = getAlgos(method);
    var header = { typ: 'JWT', alg: m.alg };
    if (options.header) { lang.mixin(header, options.header); }
    // create segments, all segments should be base64Url string
    var segments: string[] = [];
    segments.push(base64UrlEncode(JSON.stringify(header)));
    segments.push(base64UrlEncode(JSON.stringify(payload)));
    segments.push(this.sign(segments.join('.'), key, m.method));
    return segments.join('.');
  };
  /**
   * Decode jwt
   *
   * @param {Object} token
   * @param {String} key
   * @param {String} method
   * @param {Boolean} doVerify
   * @return {Object} payload
   * @api public
   */
  static decode(token: string, key: string, method: string = 'HS256', doVerify: boolean = true): any {
    // check token and segments
    if (!token) {
      if (jwt.debug) { log('No token supplied'); }
      return {};
    }
    const m = getAlgos(method);
    const segments = token.split('.');
    if (segments.length !== 3) {
      if (jwt.debug) { log('Not enough or too many segments'); }
      return {};
    }
    // all segment should be base64
    const s = {
      header: segments[0],
      payload: segments[1],
      signature: segments[2]
    }
    // base64 decode and parse JSON
    var header = JSON.parse(base64UrlDecode(s.header));
    var payload = JSON.parse(base64UrlDecode(s.payload));

    if (doVerify) {
      // Support for nbf and exp claims.
      if (jwt.validTime(payload.nbf) && Date.now() < payload.nbf) {
        if (jwt.debug) { log('Token not yet active'); }
        return {};
      }
      if (jwt.validTime(payload.exp) && Date.now() > payload.exp) {
        if (jwt.debug) { log('Token expired'); }
        return {};
      }

      // verify signature. `sign` will return base64 string.
      var signingInput = [s.header, s.payload].join('.');
      if ( !this.verify(signingInput, key, s.signature, m.method) ) {
        if (jwt.debug) { log('Signature verification failed'); }
        return {};
      }
    }
    return payload;
  };


  static sign(text: string, key: string, method: string = 'HS256'): string {
    var base64str: string = '';
    var signMethod = (method === 'RSA-SHA256') ? method : null;
    if (signMethod) {
      base64str = crypto.sign(text, key, signMethod);
    } else {
      base64str = crypto.hmac(text, key, method);
    }
    return escape(base64str);
  }
  static verify(text: string, key: string, signature: string, method: string = 'HS256'): boolean {
    var signMethod = (method === 'RSA-SHA256') ? method : null;
    if (signMethod) {
      if (!has('host-node')) {
        log({warning: 'Signature RS verification only available in node.js'});
        return false;
      }
      return crypto.verify(text, key, method, unescape(signature));
    } else {
      return (signature === this.sign(text, key, method));
    }
  }

  static header(token:string) {
    if (typeof token !== 'string') { return void 0; }
    const o = JSON.parse(base64UrlDecode(token.split('.')[0]));
    if (!o || typeof o !== 'object' || !o.alg || !o.typ) {
      return void 0;
    }
    return o;
  }
  static payload(token:string) {
    if (typeof token !== 'string') { return void 0; }
    return token.split('.')[1];
  }
  static alg(token: string) {
    const header = jwt.header(token);
    if (!header) { return void 0; }
    return header.alg;
  }
  static algLength(token: string) {
    const alg = jwt.alg(token);
    if (!alg || !algorithmMap[alg]) { return void 0; }
    return parseInt(alg.replace(/^(RS)|(HS)/, ''), 10);
  }
  static validTime(timeNr: number) {
    return (timeNr && !isNaN(timeNr) && typeof timeNr === 'number');
  }
}
export default jwt;
