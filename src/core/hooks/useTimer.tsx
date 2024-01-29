import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';

const useTimer = (count: number, auto?: boolean) => {
    const [timer, setTimer] = useState(count * 60 * 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer >= 1000) {
                setTimer(timer - 1000);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [timer]);

    return format(timer, 'mm:ss');
};

export default useTimer;
