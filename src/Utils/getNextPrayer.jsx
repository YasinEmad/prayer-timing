import moment from 'moment';

const getNextPrayer = (timings) => {
    const now = moment();
    const prayers = [
        { name: 'الفجر', time: moment(timings.Fajr, 'HH:mm') },
        { name: 'الظهر', time: moment(timings.Dhuhr, 'HH:mm') },
        { name: 'العصر', time: moment(timings.Asr, 'HH:mm') },
        { name: 'المغرب', time: moment(timings.Maghrib, 'HH:mm') },
        { name: 'العشاء', time: moment(timings.Isha, 'HH:mm') },
    ];

    const nextPrayer = prayers.find((prayer) => prayer.time.isAfter(now)) || prayers[0];
    return nextPrayer;
};

export default getNextPrayer;