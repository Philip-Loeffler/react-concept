import React from 'react';
import { CardContent, CardActionArea } from '@material-ui/core';
import {
  Star,
  Memory,
  Settings,
  Explore,
  LocalLibrary,
  EmojiPeople,
  FindInPage,
  People,
} from '@material-ui/icons/';

import {
  Card,
  CardMedia,
  Title,
  Footer,
  CardActions,
  useStyles,
  BoldTypography,
} from './style';

interface LandingCardProps {
  title: string;
  image: string;
  icon: string;
  subIcon: string;
  iconText: string;
  subIconText: string;
  hasIcons: boolean;
}

export const LandingCard: React.FC<LandingCardProps> = ({
  title,
  image,
  icon,
  subIcon,
  iconText,
  subIconText,
  hasIcons,
}) => {
  const classes = useStyles();

  const handlePrimaryIcon = (icon: any) => {
    switch (icon) {
      case 'settings':
        return <Settings />;
      case 'library':
        return <LocalLibrary />;
      case 'find':
        return <FindInPage />;
      case 'people':
        return <People />;
      default:
    }
  };

  const handleSubIcon = (subIcon: any) => {
    switch (subIcon) {
      case 'star':
        return <Star />;
      case 'person':
        return <EmojiPeople />;
      case 'explore':
        return <Explore />;
      case 'memory':
        return <Memory />;
      default:
    }
  };

  //this same concept can be used to defining dynamic colors
  const handleChipColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low Risk':
        return classes.lowRisk;
      case 'Medium Risk':
        return classes.mediumRisk;
      case 'High Risk':
        return classes.highRisk;
      default:
    }
    // here is what it would look like in the jsx
    <Chip label="Low Risk" className={handleChipColor('Low Risk')}></Chip>;
  };

  // can use these switch statements to handle returning different icons.
  // also remember, that when you define a parameter here, you are passing the argument into the jsx

  return (
    <Card elevation={0}>
      <CardMedia image={image}>
        <div className={classes.cardContainer}>
          <CardActionArea>
            <CardContent>
              <Title variant="h4">{title}</Title>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Footer variant="body2">
              {hasIcons && (
                <div className={classes.iconRow}>
                  {handlePrimaryIcon(icon)}
                  <BoldTypography
                    className={classes.iconMargin}
                    variant="body1"
                  >
                    {iconText}
                  </BoldTypography>
                </div>
              )}
              {hasIcons && (
                <div className={classes.iconRow}>
                  {handleSubIcon(subIcon)}
                  <BoldTypography
                    className={classes.iconMargin}
                    variant="body1"
                  >
                    {subIconText}
                  </BoldTypography>
                </div>
              )}
            </Footer>
          </CardActions>
        </div>
      </CardMedia>
    </Card>
  );
};
