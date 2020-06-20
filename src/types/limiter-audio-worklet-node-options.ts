import { IAudioWorkletNodeOptions } from 'standardized-audio-context';
import { TFixedOptions } from './fixed-options';

export type TLimiterAudioWorkletNodeOptions = Omit<IAudioWorkletNodeOptions, TFixedOptions> & {
    attack: number;
};
