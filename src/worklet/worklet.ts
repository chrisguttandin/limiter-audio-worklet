// This is the minified and stringified code of the limiter-audio-worklet-processor package.
export const worklet = `!function(t){var e={};function r(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);class n{constructor(t){if(this._buffer=t,this._firstIndex=0,this._isEmpty=!0,this._lastIndex=0,0===this._buffer.length)throw new Error("The given buffer is too small.")}get size(){return this._isEmpty?0:this._lastIndex<this._firstIndex?this._buffer.length-this._firstIndex+this._lastIndex+1:this._lastIndex-this._firstIndex+1}first(){return this._throwIfEmpty(),this._buffer[this._firstIndex]}last(){return this._throwIfEmpty(),this._buffer[this._lastIndex]}pop(){this._throwIfEmpty(),this._firstIndex===this._lastIndex?this._isEmpty=!0:this._lastIndex=this._decrementIndex(this._lastIndex)}shift(){this._throwIfEmpty(),this._firstIndex===this._lastIndex?this._isEmpty=!0:this._firstIndex=this._incrementIndex(this._firstIndex)}unshift(t){if(this._isEmpty)this._buffer[this._firstIndex]=t,this._isEmpty=!1;else{const e=this._decrementIndex(this._firstIndex);if(e===this._lastIndex)throw new Error("Deque is full.");this._buffer[e]=t,this._firstIndex=e}}_decrementIndex(t){return 0===t?this._buffer.length-1:t-1}_incrementIndex(t){return(t+1)%this._buffer.length}_throwIfEmpty(){if(this._isEmpty)throw new Error("Deque is empty.")}}const s=(t,e,r)=>{const n=r+e.length;if(n<=t.length)return e.set(new Float32Array(t.buffer,t.byteOffset+r*e.BYTES_PER_ELEMENT,e.length)),n===t.length?0:n;const s=n-t.length,i=t.length-r;return e.set(new Float32Array(t.buffer,t.byteOffset+r*e.BYTES_PER_ELEMENT,i)),e.set(new Float32Array(t.buffer,t.byteOffset,s),i),s},i=(t,e,r)=>{const n=r+e.length;if(n<=t.length)return t.set(e,r),n===t.length?0:n;const s=n-t.length,i=t.length-r;return t.set(new Float32Array(e.buffer,e.byteOffset,i),r),t.set(new Float32Array(e.buffer,e.byteOffset+i*e.BYTES_PER_ELEMENT,s)),s},o=Math.exp(-1/(.5*sampleRate)),f=(t,e,r,n)=>{let s=t[127];for(let i=0;i<128;i+=1){const f=(r+i)%e.length,h=Math.abs(e[f]);let u,l;if(null!==n){for(;n.size>0&&h>=Math.abs(e[n.first()]);)n.shift();(0===n.size||h<Math.abs(e[n.first()]))&&n.unshift(f);const t=(r+i+128)%e.length;n.last()===t&&n.pop();const s=n.last();u=Math.abs(e[s]),l=s<f?f-s+1:f+e.length-s+1}else u=h,l=1;const a=s-u;s<u?s-=a/l:s=u+o*a,t[i]=s}};class h extends AudioWorkletProcessor{constructor({channelCount:t,channelCountMode:e,numberOfInputs:r,numberOfOutputs:s,outputChannelCount:i,processorOptions:o}){const f="object"==typeof o&&null!==o&&"attack"in o?o.attack:0;if("number"!=typeof f)throw new Error('The attack needs to be of type "number".');if(f<0)throw new Error("The attack can't be negative.");if("explicit"!==e)throw new Error('The channelCountMode needs to be "explicit".');if(1!==r)throw new Error("The numberOfInputs must be 1.");if(1!==s)throw new Error("The numberOfOutputs must be 1.");if(void 0===i||t!==i[0])throw new Error("The channelCount must be the same as the outputChannelCount of the first output.");super();const h=sampleRate*f,u=Math.round(h),l=u+128;this._constantMemoryDeques=0===u?null:Array.from({length:t},(()=>new n(new Uint16Array(u+1)))),this._delayBuffers=Array.from({length:t},(()=>new Float32Array(l))),this._envelopeBuffers=Array.from({length:t},(()=>new Float32Array(128))),this._writeOffset=0}process([t],[e]){const r=t.length,n=this._writeOffset;for(let o=0;o<r;o+=1){const r=null===this._constantMemoryDeques?null:this._constantMemoryDeques[o],h=this._delayBuffers[o],u=this._envelopeBuffers[o],l=t[o],a=e[o];this._writeOffset=i(h,l,n),f(u,h,n,r),s(h,a,this._writeOffset);for(let t=0;t<128;t+=1){const e=Math.min(1,.7943282347242815/u[t]);a[t]*=e}}return!0}}h.parameterDescriptors=[],registerProcessor("limiter-audio-worklet-processor",h)}]);`; // tslint:disable-line:max-line-length
