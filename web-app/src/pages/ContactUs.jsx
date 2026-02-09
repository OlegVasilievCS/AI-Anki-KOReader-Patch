import React from "react";
import { Container, Typography, Paper, Divider, Box, Link } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const Contact = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                {/* Header Section */}
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ConnectWithoutContactIcon fontSize="large" color="primary" />
                    Contact Me
                </Typography>

                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Feedback & Support
                </Typography>

                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    Contact me if you're experiencing any issues or have suggestions to improve the app.
                    I'm always open to discussing new features for the KOReader-Anki workflow!
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Contact Links Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>

                    {/* Email */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <EmailIcon color="primary" />
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                            <Link href="mailto:voleg239@gmail.com" underline="hover" sx={{ fontSize: '1.1rem' }}>
                                voleg239@gmail.com
                            </Link>
                        </Box>
                    </Box>

                    {/* GitHub */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <GitHubIcon color="primary" />
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">GitHub</Typography>
                            <Link href="https://github.com/OlegVasilievCS" target="_blank" rel="noopener" underline="hover" sx={{ fontSize: '1.1rem' }}>
                                github.com/OlegVasilievCS
                            </Link>
                        </Box>
                    </Box>

                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                    Built for language learners, by a language learner.
                </Typography>
            </Paper>
        </Container>
    );
};

export default Contact;