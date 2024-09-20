import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, MenuItem, Grid, Typography, Box, CircularProgress } from '@mui/material';
// import { generateItinerary } from '../services/api';
import { fetchCountries, generateItinerary } from '../services/api';
import '../styles/Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        destination_country: '',
        budget: '',
        include_home_travel: 'No',
        state: '',
        district: '',
        number_of_people: '',
        travel_companions: '',
        trip_description: '',
        travel_style: 'Adventure',
        travel_mode: 'Bus',
        additional_key_points: ''
    });

    const [showStateDistrict, setShowStateDistrict] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const videoRef = useRef(null);
    const videoSources = [
        require('../assets/above_view.mp4'),
        require('../assets/greenland.mp4')
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        const videoElement = videoRef.current;
        const handleEnded = () => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
        };

        if (videoElement) {
            videoElement.src = videoSources[currentVideoIndex];
            videoElement.load();
            videoElement.play();

            videoElement.addEventListener('ended', handleEnded);

            return () => {
                videoElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentVideoIndex]);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const countryList = await fetchCountries();
                setCountries(countryList);
            } catch (error) {
                console.error("Failed to fetch countries", error);
            }
        };

        loadCountries();
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.onloadeddata = () => {
                videoElement.play();
            };
        }
    }, [currentVideoIndex]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'include_home_travel' && value === 'Yes') {
            setShowStateDistrict(true);
        } else if (name === 'include_home_travel' && value === 'No') {
            setShowStateDistrict(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await generateItinerary(formData);
            setLoading(false);
            setResponse(response.itinerary);
        } catch (error) {
            setLoading(false);
            console.error('Error generating itinerary:', error);
        }
    };

    return (
        <>
            <div className="video-background">
                <video ref={videoRef} muted loop />
            </div>

            <Box className="main-content">
                <Box className="form-container">
                    <Typography variant="h4" align="center" gutterBottom>
                        Plan Your Dream Trip
                    </Typography>

                    <form onSubmit={handleSubmit} className="form-content">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Country you want to visit"
                                    name="destination_country"
                                    value={formData.destination_country}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="">Select a Country</MenuItem>
                                    {countries.map((country, index) => (
                                        <MenuItem key={index} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Budget of the trip (in USD)"
                                    name="budget"
                                    type="number"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Include home to trip travel?"
                                    name="include_home_travel"
                                    value={formData.include_home_travel}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="No">No</MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                </TextField>
                            </Grid>

                            {showStateDistrict && (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            fullWidth
                                            required={showStateDistrict}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="District"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            fullWidth
                                            required={showStateDistrict}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={6}>
                                <TextField
                                    label="Number of people"
                                    name="number_of_people"
                                    type="number"
                                    value={formData.number_of_people}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Travel Companions"
                                    name="travel_companions"
                                    value={formData.travel_companions}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="Friends">Friends</MenuItem>
                                    <MenuItem value="Family">Family</MenuItem>
                                    <MenuItem value="Solo">Solo</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Trip Description"
                                    name="trip_description"
                                    multiline
                                    rows={3}
                                    value={formData.trip_description}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    placeholder="e.g., I want to visit the mountains in India..."
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Travel Style"
                                    name="travel_style"
                                    value={formData.travel_style}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="Adventure">Adventure</MenuItem>
                                    <MenuItem value="Religious">Religious</MenuItem>
                                    <MenuItem value="Scenery">Scenery</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Travel Mode"
                                    name="travel_mode"
                                    value={formData.travel_mode}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="Bus">Bus</MenuItem>
                                    <MenuItem value="Car">Car</MenuItem>
                                    <MenuItem value="Bike">Bike</MenuItem>
                                    <MenuItem value="Train">Train</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Additional Key Points"
                                    name="additional_key_points"
                                    multiline
                                    rows={2}
                                    value={formData.additional_key_points}
                                    onChange={handleChange}
                                    fullWidth
                                    placeholder="Any specific requests or preferences"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        sx={{ padding: '10px 30px' }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Itinerary'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>

                    {response && (
                        <Box mt={4} className="response-section">
                            <Typography variant="h5" gutterBottom>
                                Your Generated Itinerary:
                            </Typography>
                            <Typography variant="body1" component="div">
                                <pre>{response}</pre>
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Form;
