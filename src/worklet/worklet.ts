// This is the minified and stringified code of the limiter-audio-worklet-processor package.
export const worklet = `!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const n=Math.exp(-1/(0*sampleRate)),o=Math.exp(-1/(.5*sampleRate)),u=(e,t)=>{let r=t[127];for(let u=0;u<128;u+=1){const s=Math.abs(e[u]),l=r-s;r=r<s?s+n*l:s+o*l,t[u]=r}};class s extends AudioWorkletProcessor{constructor({channelCount:e,channelCountMode:t,numberOfInputs:r,numberOfOutputs:n,outputChannelCount:o}){if("explicit"!==t)throw new Error('The channelCountMode needs to be "explicit".');if(1!==r)throw new Error("The numberOfInputs must be 1.");if(1!==n)throw new Error("The numberOfOutputs must be 1.");if(void 0===o||e!==o[0])throw new Error("The channelCount must be the same as the outputChannelCount of the first output.");super(),this._envelopeBuffers=Array.from({length:e},()=>new Float32Array(128))}process([e],[t]){const r=e.length;for(let s=0;s<r;s+=1){const r=this._envelopeBuffers[s],l=e[s],a=t[s];a.set(l),u(l,r);for(let e=0;e<128;e+=1){const t=-2-(o=r[e],20*Math.log10(o)),u=(n=Math.min(0,t),Math.pow(10,n/20));a[e]*=u}}var n,o;return!0}}s.parameterDescriptors=[],registerProcessor("limiter-audio-worklet-processor",s)}]);`; // tslint:disable-line:max-line-length
