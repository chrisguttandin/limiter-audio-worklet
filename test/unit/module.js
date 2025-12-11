import { AudioContext, AudioWorkletNode } from 'standardized-audio-context';
import { addLimiterAudioWorkletModule, createLimiterAudioWorkletNode } from '../../src/module';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { spy } from 'sinon';

describe('module', () => {
    describe('addLimiterAudioWorkletModule()', () => {
        it('should call the given function with an URL', () => {
            const addAudioWorkletModule = spy();

            addLimiterAudioWorkletModule(addAudioWorkletModule);

            expect(addAudioWorkletModule).to.have.been.calledOnce;

            const { args } = addAudioWorkletModule.getCall(0);

            expect(args).to.have.a.lengthOf(1);
            expect(args[0]).to.be.a('string');
            expect(args[0]).to.match(/^blob:/);
        });
    });

    describe('createLimiterAudioWorkletNode()', () => {
        const testCases = {
            'with a native AudioContext': {
                audioWorkletNodeConstructor: window.AudioWorkletNode,
                createAddAudioWorkletModule: (context) => (url) => context.audioWorklet.addModule(url),
                createContext: () => new window.AudioContext()
            },
            'with a standardized AudioContext': {
                audioWorkletNodeConstructor: AudioWorkletNode,
                createAddAudioWorkletModule: (context) => (url) => context.audioWorklet.addModule(url),
                createContext: () => new AudioContext()
            }
        };

        if (window.AudioWorkletNode === undefined) {
            delete testCases['with a native AudioContext'];
        }

        for (const [description, { audioWorkletNodeConstructor, createAddAudioWorkletModule, createContext }] of Object.entries(
            testCases
        )) {
            describe(`with the ${description}`, () => {
                let context;
                let limiterAudioWorkletNode;

                afterEach(() => {
                    if (context.close !== undefined) {
                        return context.close();
                    }
                });

                beforeEach(async () => {
                    context = createContext();

                    await addLimiterAudioWorkletModule(createAddAudioWorkletModule(context));

                    limiterAudioWorkletNode = createLimiterAudioWorkletNode(audioWorkletNodeConstructor, context);
                });

                it('should return an instance of the EventTarget interface', () => {
                    expect(limiterAudioWorkletNode.addEventListener).to.be.a('function');
                    expect(limiterAudioWorkletNode.dispatchEvent).to.be.a('function');
                    expect(limiterAudioWorkletNode.removeEventListener).to.be.a('function');
                });

                it('should return an instance of the AudioNode interface', () => {
                    expect(limiterAudioWorkletNode.channelCount).to.equal(2);
                    expect(limiterAudioWorkletNode.channelCountMode).to.equal('explicit');
                    expect(limiterAudioWorkletNode.channelInterpretation).to.equal('speakers');
                    expect(limiterAudioWorkletNode.connect).to.be.a('function');
                    expect(limiterAudioWorkletNode.context).to.be.an.instanceOf(context.constructor);
                    expect(limiterAudioWorkletNode.disconnect).to.be.a('function');
                    expect(limiterAudioWorkletNode.numberOfInputs).to.equal(1);
                    expect(limiterAudioWorkletNode.numberOfOutputs).to.equal(1);
                });

                it('should return an instance of the AudioWorkletNode interface', () => {
                    expect(limiterAudioWorkletNode.onprocessorerror).to.be.null;
                    expect(limiterAudioWorkletNode.parameters).not.to.be.undefined;
                });

                describe('port', () => {
                    it('should throw an error', () => {
                        expect(() => {
                            limiterAudioWorkletNode.port;
                        }).to.throw(Error, "The port of a LimiterAudioWorkletNode can't be accessed.");
                    });
                });
            });
        }
    });
});
