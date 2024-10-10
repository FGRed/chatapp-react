import React, { useEffect, useRef } from 'react';
import SockJSClient from 'react-stomp';

const SockJSWrapper = React.forwardRef((props, ref) => {
    const sockJSRef = useRef(null);

    useEffect(() => {
        sockJSRef.current = new SockJSClient('/api/wss');

        return () => {
            sockJSRef.current.deactivate();
        };
    }, []);

    if (ref) {
        ref.current = sockJSRef.current;
    }

    return <SockJSClient topics={['/topic/message']} {...props}></SockJSClient>;
});

export default SockJSWrapper;
