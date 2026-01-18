import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function SavedWordCard({ data }) {
    return (
        <Card sx={{ minWidth: 675 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'blue', fontSize: 18 }}>
                    {data.trans_lang}
                </Typography>
                <Typography gutterBottom sx={{ color: 'green', fontSize: 18 }}>
                    <br />
                    {data.target_lang}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add Word</Button>
            </CardActions>

        </Card>
    );
}