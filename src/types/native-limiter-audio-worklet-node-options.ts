import { TNativeAudioWorkletNodeOptions } from 'standardized-audio-context';
import { TFixedOptions } from './fixed-options';

export type TNativeLimiterAudioWorkletNodeOptions = Omit<TNativeAudioWorkletNodeOptions, TFixedOptions> & {

    attack: number;

};
