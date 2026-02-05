import React from "react";
import { Container, Typography, Paper, Divider, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const Home = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                {/* Header Section */}
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AutoStoriesIcon fontSize="large" color="primary" />
                    KOReader to Anki
                </Typography>

                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Automated Language Learning Flow
                </Typography>

                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    A seamless bridge between reading on your mobile device or Kindle and building a high-quality Anki deck.
                    With one tap on your e-reader, this workflow extracts vocabulary and generates AI-powered context.
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Workflow Section */}
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    🔄 The Workflow
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><AutoStoriesIcon color="info" /></ListItemIcon>
                        <ListItemText primary="Selection" secondary="Highlight a word in KOReader on your e-reader." />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><SyncAltIcon color="info" /></ListItemIcon>
                        <ListItemText primary="Transmission" secondary="A custom Lua patch sends the data to the Flask backend." />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><PsychologyIcon color="info" /></ListItemIcon>
                        <ListItemText primary="AI Generation" secondary="Google Gemini creates natural sentences and translations." />
                    </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                {/* Tech Stack Section */}
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    🛠️ Technology Stack
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                    <Box>
                        <Typography variant="subtitle2" color="primary">Frontend</Typography>
                        <Typography variant="body2">Lua (KOReader Patch)</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="primary">Backend</Typography>
                        <Typography variant="body2">Python (Flask)</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="primary">AI & DB</Typography>
                        <Typography variant="body2">Google Gemini & Supabase</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="primary">Flashcards</Typography>
                        <Typography variant="body2">Anki + AnkiConnect</Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Home;