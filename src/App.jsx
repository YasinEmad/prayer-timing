import './App.css';
import Maincontent from './component/Maincontent';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

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
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="background-container" />
            <Container maxWidth="2xl" className="app-container">
                {/* Overlay to ensure readability */}
                <div className="app-overlay" />
                {/* Main content */}
                <div className="app-content">
                    <Maincontent />
                </div>
            </Container>
        </ThemeProvider>
    );
}


export default App;