import ReactDOM from 'react-dom/client';
import App from './App';
import { PrayerProvider } from './context/PrayerProvider'; // Correct path

ReactDOM.createRoot(document.getElementById('root')).render(
  <PrayerProvider>
    <App />
  </PrayerProvider>
);