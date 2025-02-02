// src/App.jsx
import './App.css';
import Maincontent from './components/Maincontent';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { PrayerProvider } from './context/PrayerProvider';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00df9a',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
});

function App() {
    return (
        <PrayerProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div className="background-container" />
                <Container maxWidth="2xl" className="app-container">
                    <div className="app-overlay" />
                    <div className="app-content">
                        <Maincontent />
                    </div>
                </Container>
            </ThemeProvider>
        </PrayerProvider>
    );
}

export default App;
