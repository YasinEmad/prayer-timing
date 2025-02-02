    import { useState } from 'react';
    import { PrayerContext } from './PrayerContext';
    import PropTypes from 'prop-types';

    export const PrayerProvider = ({ children }) => {
    const [city, setCity] = useState('Cairo');
    const [timings, setTimings] = useState(null);

    return (
        <PrayerContext.Provider
        value={{
            city,
            setCity,
            timings,
            setTimings,
        }}
        >
        {children}
        </PrayerContext.Provider>
    );
    };

    PrayerProvider.propTypes = {
    children: PropTypes.node.isRequired,
    };