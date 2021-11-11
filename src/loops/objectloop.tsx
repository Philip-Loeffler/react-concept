import React from 'react';
import { Grid, Container, Typography, Box } from '@material-ui/core';
import { EventCard } from 'components/EventCard';
import communityEventData from 'assets/data/communityEventData.json';

import { useStyles, YearTypography } from './style';

export const CommunityEvents = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '30%' }}
      >
        <Grid container direction="column">
          <Box pt={10} />
          <Typography variant="h4">Upcoming events for the year.</Typography>
        </Grid>
      </Grid>
      <Box pt={10} />
      {communityEventData.map((event, i) => (
        <div key={i}>
          <div className={classes.eventContainer}>
            <div className={classes.dateColumn}>
              <Typography variant="h6">{event.month}</Typography>
              <YearTypography variant="h6">{event.year}</YearTypography>
            </div>
            <div
              className={
                event.events.length > 1 ? classes.eventRow : classes.singleEvent
              }
            >
              {event.events?.map((cardEvent, i) => (
                <EventCard
                  key={i}
                  title={cardEvent.title}
                  image={cardEvent.image}
                  description={cardEvent.description}
                  date={cardEvent.date}
                  location={cardEvent.location}
                ></EventCard>
              ))}
            </div>
          </div>
          <Box pt={3} />
          <div className={classes.divider}></div>
          <Box pt={6} />
        </div>
      ))}
    </Container>
  );
};

// this is the json for this loop
[
  {
    month: 'August',
    year: 2021,
    events: [
      {
        title: 'Ai4',
        image: '/src/assets/images/ai4.png',
        description:
          'Over three days, Ai4 2021 brings together business leaders and data practitioners to facilitate the adoption of artificial intelligence and machine learning technology. Join us at industry’s most impactful AI event.',
        date: 'August 17 to 19',
        location: 'Digital Event',
      },
    ],
  },
  {
    month: 'September',
    year: 2021,
    events: [
      {
        title: 'The AI Summet',
        image: '/src/assets/images/aiSummet.png',
        description:
          'The AI Summit London, co-located with The Quantum Computing Summit, is here to guide you through your journey of business transformation. Whether you are implementing or optimising your AI projects, we provide you unmitigated access to the information and tools that will help bring your business plans to life.',
        date: 'September 22 to 23',
        location: 'London UK',
      },
      {
        title: 'AI & Big Data Expo North America',
        image: '/src/assets/images/bigDataExpo.png',
        description:
          'This virtual technology event is for the ambitious enterprise technology professional, seeking to explore the latest innovations, implementations and strategies to drive businesses forward.',
        date: 'September 22 to 23',
        location: 'Santa Clara, Ca',
      },
    ],
  },
  {
    month: 'October',
    year: 2021,
    events: [
      {
        title: 'Sibos 2021',
        image: '/src/assets/images/sibos.png',
        description:
          'Sibos is the world’s premier financial services event organised by SWIFT. The annual conference and exhibition connects thousands of executives, decision makers and thought leaders from across the industry.',
        date: 'October 11 to 14',
        location: 'Singapore',
      },
      {
        title: 'The data science conference',
        image: '/src/assets/images/dataConference.png',
        description:
          'The Data Science Conference is a uniquely excellent conference. The organizers curate a great mix of topics.',
        date: 'October 14 to 15',
        location: 'Boston MA',
      },
    ],
  },
  {
    month: 'November',
    year: 2021,
    events: [
      {
        title: 'The AI Summet',
        image: '/src/assets/images/aiSummet3.png',
        description:
          'Engage with world leading organizations, hear from the brightest minds and get exclusive insights into pioneering AI projects from all corners of the industry.',
        date: 'November 3 to 4',
        location: 'Silicon Valley, CA',
      },
      {
        title: 'Open Data Science Conference West',
        image: '/src/assets/images/openData.png',
        description:
          'ODSC West will be more inclusive than ever — from in-person sessions to digital experiences available to everyone, from anywhere. Get ready for the first-ever hybrid ODSC.',
        date: 'November 14 to 15',
        location: 'San Fransico, CA',
      },
    ],
  },
  {
    month: 'December',
    year: 2021,
    events: [
      {
        title: 'The AI Summet',
        image: '/src/assets/images/aiSummet2.png',
        description:
          'Now in its sixth successful year, The AI Summit New York returns as the world’s foremost AI event for business with over 700 Fortune 1000 businesses in attendance.',
        date: 'December 8 to 9',
        location: 'New York, NY',
      },
    ],
  },
];
