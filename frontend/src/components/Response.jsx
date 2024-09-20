import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import '../styles/Response.css'; 

const Response = () => {
    const str = 
    `trip to India offers an exciting blend of adventure and nightlife, all within a budget of $100. Here's a concise, point-wise guide to help you make the most of your 4-day adventure
        ### Day 1: Arrival in Delhi
        *Transport* Use public buses from the airport to your accommodation.
        *Accommodation*: Opt for budget-friendly hostels or guesthouses, booking in advance for better rates.
        **Dinner: Savor local street food for an authentic culinary experience.
        *Nightlife*: Experience Delhi's nightlife in areas like Hauz Khas or Connaught Place; entry fees to clubs or bars may apply.
        ### Day 2: Delhi to Agra
        *Transport*: Depart early by bus to Agra, a 4-5 hour journey.
        *Accommodation*: Secure budget accommodation in Agra.
        *Sightseeing*: Visit UNESCO sites like Agra Fort and Fatehpur Sikri, with minimal entry fees and best explored during daylight.
        **Dining: Indulge in traditional Mughlai cuisine at local, affordable eateries.
        "Nightlife**: Enjoy a tranquil evening at local cafes or rooftop restaurants overlooking the Taj Mahal.
        ### Day 3: Agra to Jaipur
        **Transport Journey to Jaipur by bus, approximately 4-6 hours.
        *Accommodation*. Find affordable lodging options.
        *Attractions*: Explore City Palace, Amber Fort, and Jantar Mantar, with varied entry fees.
        "Cuisine: Delight in Rajasthani dishes at small, local restaurants.
        *Nightlife* Wander the local markets and bazaars for a vibrant evening atmosphere.
        ### Day 4: Return to Delhi
        *Transport*: Conclude your trip with a bus ride back to Delhi.
        ### Additional Tips:`;

    const [itinerary, setItinerary] = useState('');

    useEffect(() => {
        const savedItinerary = localStorage.getItem('itinerary');
        console.log("Raw itinerary from storage: ", savedItinerary); // Debug to see the actual format

        // Handle escaped newlines if they exist
        const formattedItinerary = savedItinerary
            ? savedItinerary.replace(/\\n/g, '\n')  // Handle possible escaped newlines
            : str;
            // ! : 'No itinerary available.';
            // * I believe we aren't formatting anything in here
        
        console.log("Formatted itinerary with actual newlines: ", formattedItinerary);
        setItinerary(formattedItinerary);
    }, []);

    // Split the itinerary string by newlines and map each line to a Typography component
    const formatItinerary = (itinerary) => {
        const lines = itinerary.split('\n');
        console.log("Lines after splitting: ", lines);  // Debugging
        return lines.map((line, index) => {
            if (line.trim() === '') {
                return <br key={index} />; // Add line breaks for empty lines
            } else if (line.startsWith('*')) {
                // Handle bullet points
                return (
                    <Typography key={index} variant="body1" component="li" gutterBottom>
                        {line.replace('* ', '')}
                    </Typography>
                );
            } else {
                // For regular lines
                return (
                    <Typography key={index} variant="body1" component="p" gutterBottom>
                        {line}
                    </Typography>
                );
            }
        });
    };

    return (
        <div className="response-container">
            <Typography variant="h4" component="h2" align="center" gutterBottom
                sx={{ fontFamily: 'fantasy', fontSize: '50px'  }}
            >
                Your Generated Travel Itinerary
            </Typography>

            <Card className="itinerary-card">
                <CardContent>
                    <Box mt={2}>
                        <ul>{formatItinerary(itinerary)}</ul>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default Response;