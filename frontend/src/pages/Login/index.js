import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, CircularProgress } from '@material-ui/core';

import api from '../../services/api';

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const { status } = await api.post('sessions', { email, password });

        setLoading(false);

        if (status === 200) {
            setEmail('');
            setPassword('');
            history.push('/');
        }
    }

    if (isLoading) {
        return (
            <Grid container justify='center' alignItems='center' style={{ height: '100%' }}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <Grid container justify='center' alignItems='center' style={{ height: '100%' }}>
            <Paper
                style={{
                    width: 400,
                    height: 300,
                    padding: 30,
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography align='center' variant='h5' component='h1'>Login</Typography>

                    <Grid item xs style={{ marginTop: 20 }}>
                        <TextField
                            fullWidth
                            value={email || ''}
                            onChange={e => setEmail(e.target.value)}
                            variant='outlined'
                            label='Email'
                            placeholder='Digite seu email'
                            type='email'
                            name='email'
                        />
                    </Grid>

                    <Grid item xs style={{ marginTop: 20 }}>
                        <TextField
                            fullWidth
                            value={password || ''}
                            onChange={e => setPassword(e.target.value)}
                            variant='outlined'
                            label='Senha'
                            placeholder='Digite sua senha'
                            type='password'
                            name='password'
                        />
                    </Grid>

                    <Grid
                        container
                        justify="space-around"
                        style={{ marginTop: 30 }}
                    >
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => history.push('/')}
                        >
                            Voltar
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Entrar
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
}
