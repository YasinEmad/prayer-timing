import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function Pray({ name, image, time }) {
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: 'background.paper', color: 'text.primary' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="h2" sx={{ color: 'text.secondary' }}>
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
