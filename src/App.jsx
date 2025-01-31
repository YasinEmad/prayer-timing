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
            <Container
                maxWidth="2xl"
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingTop: '50px',
                }}
            >
                <Maincontent />
            </Container>
        </ThemeProvider>
    );
}

export default App;
