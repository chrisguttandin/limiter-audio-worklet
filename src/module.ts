import {
    IAudioWorkletNode,
    TAudioWorkletNodeConstructor,
    TContext,
    TNativeAudioWorkletNode,
    TNativeAudioWorkletNodeConstructor,
    TNativeContext
} from 'standardized-audio-context';
import { ILimiterAudioWorkletNode } from './interfaces';
import { TAnyLimiterAudioWorkletNodeOptions, TNativeLimiterAudioWorkletNode } from './types';
import { worklet } from './worklet/worklet';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

const blob = new Blob([worklet], { type: 'application/javascript; charset=utf-8' });

export const addLimiterAudioWorkletModule = async (addAudioWorkletModule: (url: string) => Promise<void>) => {
    const url = URL.createObjectURL(blob);

    try {
        await addAudioWorkletModule(url);
    } finally {
        URL.revokeObjectURL(url);
    }
};

export function createLimiterAudioWorkletNode<T extends TContext | TNativeContext>(
    audioWorkletNodeConstructor: T extends TContext ? TAudioWorkletNodeConstructor : TNativeAudioWorkletNodeConstructor,
    context: T,
    options: Partial<TAnyLimiterAudioWorkletNodeOptions<T>> = {}
): T extends TContext ? ILimiterAudioWorkletNode<T> : TNativeLimiterAudioWorkletNode {
    type TAnyAudioWorkletNode = T extends TContext ? IAudioWorkletNode<T> : TNativeAudioWorkletNode;
    type TAnyLimiterAudioWorkletNode = T extends TContext ? ILimiterAudioWorkletNode<T> : TNativeLimiterAudioWorkletNode;

    const { attack = 0 } = options;
    const audioWorkletNode: TAnyAudioWorkletNode = new (<any>audioWorkletNodeConstructor)(context, 'limiter-audio-worklet-processor', {
        ...options,
        channelCountMode: 'explicit',
        numberOfInputs: 1,
        numberOfOutputs: 1,
        pocessorOptions: {
            attack
        }
    });

    Object.defineProperties(audioWorkletNode, {
        port: {
            get(): TAnyLimiterAudioWorkletNode['port'] {
                throw new Error("The port of a LimiterAudioWorkletNode can't be accessed.");
            }
        }
    });

    return <TAnyLimiterAudioWorkletNode>audioWorkletNode;
}
