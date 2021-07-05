import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Switch,
  Box,
  Button,
} from '@material-ui/core';
import 'fontsource-roboto';
import './options.css';
import {
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';
import { fetchOpenWeatherData, getWeatherIcon } from '../utils/api';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');
  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState('saving');
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready');
      }, 1000);
    });
    getStoredOptions().then((options) => {
      if (options.homeCity === '') {
        return;
      }
      fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
        const temp = Math.round(data.main.temp);
        const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';
        chrome.action.setBadgeText({
          text: `${temp}${symbol}`,
        });
        chrome.action.setIcon({path: getWeatherIcon(data.weather[0].icon)})
      });
    });
  };

  const isFieldsDisabled = formState === 'saving';

  if (!options) {
    return null;
  }
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">
                Weather Extension Preferences
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a city name: "
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Auto toggle overlay on webpage load
              </Typography>
              <Switch
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={isFieldsDisabled}
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
              >
                {formState === 'ready' ? 'Save' : 'Saving'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
