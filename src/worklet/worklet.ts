// This is the minified and stringified code of the limiter-audio-worklet-processor package.
export const worklet = `(()=>{"use strict";class t{constructor(t){if(this._buffer=t,this._firstIndex=0,this._isEmpty=!0,this._lastIndex=0,0===this._buffer.length)throw new Error("The given buffer is too small.")}get size(){return this._isEmpty?0:this._lastIndex<this._firstIndex?this._buffer.length-this._firstIndex+this._lastIndex+1:this._lastIndex-this._firstIndex+1}first(){return this._throwIfEmpty(),this._buffer[this._firstIndex]}last(){return this._throwIfEmpty(),this._buffer[this._lastIndex]}pop(){this._throwIfEmpty(),this._firstIndex===this._lastIndex?this._isEmpty=!0:this._lastIndex=this._decrementIndex(this._lastIndex)}shift(){this._throwIfEmpty(),this._firstIndex===this._lastIndex?this._isEmpty=!0:this._firstIndex=this._incrementIndex(this._firstIndex)}unshift(t){if(this._isEmpty)this._buffer[this._firstIndex]=t,this._isEmpty=!1;else{const e=this._decrementIndex(this._firstIndex);if(e===this._lastIndex)throw new Error("Deque is full.");this._buffer[e]=t,this._firstIndex=e}}_decrementIndex(t){return 0===t?this._buffer.length-1:t-1}_incrementIndex(t){return(t+1)%this._buffer.length}_throwIfEmpty(){if(this._isEmpty)throw new Error("Deque is empty.")}}const e=(t,e,s)=>{const r=s+e.length;if(r<=t.length)return e.set(new Float32Array(t.buffer,t.byteOffset+s*e.BYTES_PER_ELEMENT,e.length)),r===t.length?0:r;const n=r-t.length,i=t.length-s;return e.set(new Float32Array(t.buffer,t.byteOffset+s*e.BYTES_PER_ELEMENT,i)),e.set(new Float32Array(t.buffer,t.byteOffset,n),i),n},s=(t,e,s)=>{const r=s+e.length;if(r<=t.length)return t.set(e,s),r===t.length?0:r;const n=r-t.length,i=t.length-s;return t.set(new Float32Array(e.buffer,e.byteOffset,i),s),t.set(new Float32Array(e.buffer,e.byteOffset+i*e.BYTES_PER_ELEMENT,n)),n},r=Math.exp(-1/(.5*sampleRate)),n=10**-.1,i=(t,e,s,n)=>{let i=t[127];for(let h=0;h<128;h+=1){const f=(s+h)%e.length,o=Math.abs(e[f]);let l,u;if(null!==n){for(;n.size>0&&o>=Math.abs(e[n.first()]);)n.shift();(0===n.size||o<Math.abs(e[n.first()]))&&n.unshift(f);const t=(s+h+128)%e.length;n.last()===t&&n.pop();const r=n.last();l=Math.abs(e[r]),u=r<f?f-r+1:f+e.length-r+1}else l=o,u=1;const a=i-l;i<l?i-=a/u:i=l+r*a,t[h]=i}};class h extends AudioWorkletProcessor{constructor({channelCount:e,channelCountMode:s,numberOfInputs:r,numberOfOutputs:n,outputChannelCount:i,processorOptions:h}){const f="object"==typeof h&&null!==h&&"attack"in h?h.attack:0;if("number"!=typeof f)throw new Error('The attack needs to be of type "number".');if(f<0)throw new Error("The attack can't be negative.");if("explicit"!==s)throw new Error('The channelCountMode needs to be "explicit".');if(1!==r)throw new Error("The numberOfInputs must be 1.");if(1!==n)throw new Error("The numberOfOutputs must be 1.");if(void 0===i||e!==i[0])throw new Error("The channelCount must be the same as the outputChannelCount of the first output.");super();const o=sampleRate*f,l=Math.round(o),u=l+128;this._constantMemoryDeques=0===l?null:Array.from({length:e},(()=>new t(new Uint16Array(l+1)))),this._delayBuffers=Array.from({length:e},(()=>new Float32Array(u))),this._envelopeBuffers=Array.from({length:e},(()=>new Float32Array(128))),this._writeOffset=0}process([t],[r]){const h=t.length,f=this._writeOffset;for(let o=0;o<h;o+=1){const h=null===this._constantMemoryDeques?null:this._constantMemoryDeques[o],l=this._delayBuffers[o],u=this._envelopeBuffers[o],a=t[o],_=r[o];this._writeOffset=s(l,a,f),i(u,l,f,h),e(l,_,this._writeOffset);for(let t=0;t<128;t+=1){const e=Math.min(1,n/u[t]);_[t]*=e}}return!0}}h.parameterDescriptors=[],registerProcessor("limiter-audio-worklet-processor",h)})();`; // tslint:disable-line:max-line-length
