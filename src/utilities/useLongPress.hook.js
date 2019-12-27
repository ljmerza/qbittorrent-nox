import { useState, useEffect } from 'react';

/**
 * 
 * @param {Function} callback event callback
 * @param {Number} ms time in ms to wait for long press activation
 * 
 * Example:
 * 
 *  function MyComponent(props) {
 *    const backspaceLongPress = useLongPress(props.longPressBackspaceCallback, 500);
 *
 *    return (
 *      <Page>
 *        <Button {...backspaceLongPress}>
 *          Click me
 *        </Button>
 *      </Page>
 *    );
 *  };
 */
export default function useLongPress(callback = () => { }, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        let timerId;

        if (startLongPress.start) timerId = setTimeout(() => callback(startLongPress.event), ms);
        else clearTimeout(timerId);

        return () => clearTimeout(timerId);
    }, [startLongPress, callback, ms]);

    return {
        onMouseDown: event => setStartLongPress({start: true, event }),
        onMouseUp: event => setStartLongPress({start: false, event }),
        onMouseLeave: event => setStartLongPress({start: false, event }),
        onTouchStart: event => setStartLongPress({start: true, event }),
        onTouchEnd: event => setStartLongPress({start: false, event }),
    };
}

