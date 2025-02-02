import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function Pray({ name, image, time }) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
                overflow: 'hidden',
            }}
        >
            <CardMedia
                sx={{
                    height: 160,
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8))',
                    },
                }}
                image={image}
                title={name}
            />
            <CardContent
                sx={{
                    textAlign: 'center',
                    padding: 3,
                }}
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        fontSize: '1.5rem',
                        marginBottom: 2,
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 'medium',
                        fontSize: '2.75rem',
                        marginTop: 1,
                        letterSpacing: '0.05em',
                    }}
                >
                    {time}
                </Typography>
            </CardContent>
        </Card>
    );
}

Pray.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};