/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import * as React from 'react';
import { ProviderFinder, useProvider } from '../useProvider';
import { Optional } from '../utils/Optional';

/**
 * Type definition for EventTargetProviderFinder
 */
export type EventTargetProviderFinder<T extends EventTarget> = ProviderFinder<T>;

/**
 * Type definition for EventOptions
 */
export type EventOptions = boolean | AddEventListenerOptions;

/**
 * A hook for handling event-listening logic
 */
function useEventTarget(eventTarget: EventTarget, eventType: string, options?: EventOptions) {
  const [state, setState] = React.useState<Optional<Event>>(null);

  React.useEffect(() => {
    eventTarget.addEventListener(eventType, setState, options);

    return () => eventTarget.removeEventListener(eventType, setState);
  }, [ eventTarget, eventType, options ]);

  return state;
}

/**
 * A Provider hook which consumes the recently emitted Event value
 */
export function useEventTargetProvider<T extends EventTarget>
(of: EventTargetProviderFinder<T>, eventType: string, options?: EventOptions): Optional<Event> {
  const eventTarget = useProvider<EventTarget>(of);

  if (eventTarget) {
    return useEventTarget(eventTarget, eventType, options);
  }

  return null;
}
