
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePrayerTimes = (city) => {
    const [timings, setTimings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimings = async () => {
            try {
                const response = await axios.get(
                    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=2`
                );
                setTimings(response.data.data.timings);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTimings();
    }, [city]);

    return { timings, loading, error };
};

export default usePrayerTimes;