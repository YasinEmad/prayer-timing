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
                borderRadius: 3, // Rounded corners
                boxShadow: 3, // Subtle shadow
                transition: 'transform 0.3s, box-shadow 0.3s', // Smooth hover effect
                '&:hover': {
                    transform: 'scale(1.05)', // Slightly enlarge on hover
                    boxShadow: 6, // Increase shadow on hover
                },
                overflow: 'hidden', // Ensure the image doesn't overflow
            }}
        >
            <CardMedia
                sx={{
                    height: 160, // Slightly taller image
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8))', // Stronger gradient overlay
                    },
                }}
                image={image}
                title={name}
            />
            <CardContent
                sx={{
                    textAlign: 'center', // Center-align content
                    padding: 3, // More padding for better spacing
                }}
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 'bold', // Bold font for emphasis
                        color: 'text.primary',
                        fontSize: '1.5rem', // Slightly larger font size
                        marginBottom: 2, // Add spacing
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 'medium', // Medium font weight for time
                        fontSize: '2.75rem', // Larger font size for time
                        marginTop: 1, // Add spacing
                        letterSpacing: '0.05em', // Slightly spaced letters
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