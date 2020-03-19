import { TAnyContext, TContext } from 'standardized-audio-context';
import { TLimiterAudioWorkletNodeOptions } from './limiter-audio-worklet-node-options';
import { TNativeLimiterAudioWorkletNodeOptions } from './native-limiter-audio-worklet-node-options';

export type TAnyLimiterAudioWorkletNodeOptions<T extends TAnyContext> = T extends TContext
    ? TLimiterAudioWorkletNodeOptions
    : TNativeLimiterAudioWorkletNodeOptions;
