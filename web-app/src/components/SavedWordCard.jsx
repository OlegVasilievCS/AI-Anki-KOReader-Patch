import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonX from "./SendToAnkiButton.jsx";
import SendToAnkiButton from "./SendToAnkiButton.jsx";
import RemoveSentenceButton from "./RemoveSentenceButton.jsx";



export default function SavedWordCard({ dataFromDB }) {
    return (
        <Card sx={{ minWidth: 675 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'blue', fontSize: 18 }}>
                    {dataFromDB.trans_lang}
                </Typography>
                <Typography gutterBottom sx={{ color: 'green', fontSize: 18 }}>
                    <br />
                    {dataFromDB.target_lang}
                </Typography>
            </CardContent>
            <CardActions>
                <SendToAnkiButton dataFromDB={dataFromDB}/>
                <RemoveSentenceButton dataFromDB={dataFromDB}/>
            </CardActions>

        </Card>
    );
}