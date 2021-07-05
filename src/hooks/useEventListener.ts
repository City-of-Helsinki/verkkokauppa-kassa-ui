import {useEffect} from 'react';

export default function useEventListener(
    target: EventTarget,
    eventName: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
) {
    useEffect(() => {
        if (target) {
            target.addEventListener(eventName, listener, options);

            return () => {
                target.removeEventListener(eventName, listener, options);
            };
        }
    }, [listener, options, eventName, target]);
}