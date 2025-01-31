import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pray from './Prayer';
import axios from 'axios';
import moment from 'moment';

export default function Maincontent() {
    const [timing, setTiming] = useState(null);
    const [city, setCity] = useState("Cairo"); // المدينة الافتراضية
    const [currentDate, setCurrentDate] = useState(moment().format('LLL')); // الوقت الحالي
    const [nextPrayer, setNextPrayer] = useState({ name: '', time: '' }); // الصلاة القادمة
    const [timeRemaining, setTimeRemaining] = useState(''); // الوقت المتبقي

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

    // دالة لحساب الصلاة القادمة
    function getNextPrayer(timings) {
        const now = moment();
        const prayers = [
            { name: 'الفجر', time: moment(timings.Fajr, 'HH:mm') },
            { name: 'الظهر', time: moment(timings.Dhuhr, 'HH:mm') },
            { name: 'العصر', time: moment(timings.Asr, 'HH:mm') },
            { name: 'المغرب', time: moment(timings.Maghrib, 'HH:mm') },
            { name: 'العشاء', time: moment(timings.Isha, 'HH:mm') },
        ];

        // إيجاد الصلاة القادمة
        const upcoming = prayers.find(prayer => prayer.time.isAfter(now)) || prayers[0];
        return {
            name: upcoming.name,
            time: upcoming.time,
        };
    }

    // جلب توقيت الصلاة
    useEffect(() => {
        async function fetchTiming() {
            try {
                const response = await axios.get(
                    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=2`
                );
                const timings = response.data.data.timings;
                setTiming(timings);

                const next = getNextPrayer(timings);
                setNextPrayer(next);
            } catch (error) {
                console.error("Error fetching prayer timings:", error);
            }
        }
        fetchTiming();
    }, [city]);

    // تحديث التاريخ والوقت الحالي كل ثانية
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(moment().format('LLL'));
        }, 1000);

        return () => clearInterval(timer); // تنظيف المؤقت عند إلغاء المكون
    }, []);

    // تحديث العد التنازلي
    useEffect(() => {
        const timer = setInterval(() => {
            if (nextPrayer.time) {
                const now = moment();
                const diff = moment.duration(nextPrayer.time.diff(now));
                const formatted = `${diff.hours()}:${diff.minutes()}:${diff.seconds()}`;
                setTimeRemaining(formatted);
            }
        }, 1000);

        return () => clearInterval(timer); // تنظيف المؤقت عند إلغاء المكون
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
                        <h2 style={{ color: 'white' }}>{currentDate}</h2> {/* الوقت الديناميكي */}
                        <h2 style={{ color: 'white' }}>{city}</h2>
                    </div>
                </Grid>
                
            </Grid>
            <Divider style={{ marginTop: "20px", backgroundColor: '#444' }} />
            <Box display="flex" justifyContent="center" gap={4} style={{ marginTop: "50px" }}>
                {timing ? (
                    <>
                        <Pray name="الفجر" image="/image/prayimage.jpg" time={timing.Fajr} />
                        <Pray name="الظهر" image="/image/image.png" time={timing.Dhuhr} />
                        <Pray name="العصر" image="/image/ima.jpg" time={timing.Asr} />
                        <Pray name="المغرب" image="/image/imoooo.jpg" time={timing.Maghrib} />
                        <Pray name="العشاء" image="/image/istockphoto-1011940756-612x612.jpg" time={timing.Isha} />
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
