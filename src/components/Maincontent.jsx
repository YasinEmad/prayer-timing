import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pray from './Prayer';
import moment from 'moment';

import usePrayerTimes from '../Hooks/usePrayerTimes';
import getNextPrayer from '../Utils/getNextPrayer'; // تأكد من المسار الصحيح

export default function Maincontent() {
    const [city, setCity] = useState("Cairo");
    const [currentDate, setCurrentDate] = useState(moment().format('LLL'));
    const [nextPrayer, setNextPrayer] = useState({ name: '', time: '' });
    const [timeRemaining, setTimeRemaining] = useState('');

    const { timings, loading, error } = usePrayerTimes(city);

    const cities = [
        { name: "Cairo", displayName: "القاهرة" },
        { name: "Alexandria", displayName: "الإسكندرية" },
        { name: "Sharqia", displayName: "الشرقية" },
        { name: "Giza", displayName: "الجيزة" },
        { name: "Aswan", displayName: "أسوان" },
        { name: "Port Said", displayName: "بور سعيد" },
        { name: "Monufia", displayName: "المنوفية" },
        { name: "Kafr El Sheikh", displayName: "كفر الشيخ" },
    ];

    useEffect(() => {
        if (timings) {
            const next = getNextPrayer(timings);
            setNextPrayer(next);
        }
    }, [timings]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(moment().format('LLL'));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (nextPrayer.time) {
                const now = moment();
                const diff = moment.duration(nextPrayer.time.diff(now));
                const formatted = `${diff.hours()}:${diff.minutes()}:${diff.seconds()}`;
                setTimeRemaining(formatted);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [nextPrayer]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div style={{ width: "100%" }}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                    <div style={{ marginRight: "20px" }}>
                        <h2 style={{ color: 'white' }}>متبقي حتى صلاة {nextPrayer.name}</h2>
                        <h2 style={{ color: '#00df9a' }}>{timeRemaining || 'جاري الحساب...'}</h2>
                    </div>
                </Grid>
                <Grid xs={12} sm={6}>
                    <div style={{ marginRight: "20px" }}>
                        <h2 style={{ color: 'white' }}>{currentDate}</h2>
                        <h2 style={{ color: 'white' }}>{city}</h2>
                    </div>
                </Grid>
            </Grid>
            <Divider style={{ marginTop: "20px", backgroundColor: '#444' }} />
            <Box display="flex" justifyContent="center" gap={4} style={{ marginTop: "50px" }}>
                {timings ? (
                    <>
                        <Pray name="الفجر" image="/image/prayimage.jpg" time={timings.Fajr} />
                        <Pray name="الظهر" image="/image/image.png" time={timings.Dhuhr} />
                        <Pray name="العصر" image="/image/ima.jpg" time={timings.Asr} />
                        <Pray name="المغرب" image="/image/imoooo.jpg" time={timings.Maghrib} />
                        <Pray name="العشاء" image="/image/istockphoto-1011940756-612x612.jpg" time={timings.Isha} />
                    </>
                ) : (
                    <p style={{ color: 'white' }}>Loading prayer timings...</p>
                )}
            </Box>
            <Divider style={{ marginTop: "20px", backgroundColor: '#444' }} />
            <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: "200px", marginTop: "20px" }}>
                    <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>Town</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={city}
                        label="Town"
                        onChange={handleCityChange}
                        style={{ color: 'white' }}
                    >
                        {cities.map((cityItem) => (
                            <MenuItem key={cityItem.name} value={cityItem.name}>
                                {cityItem.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}