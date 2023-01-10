import React from 'react';
import {
  ThemeIcon,
  Text,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles
} from '@mantine/core';
import {
  IconWorld, IconFriends, IconFish, IconMapPin, IconLock, IconCloudRain
} from '@tabler/icons';
import PropTypes from 'prop-types';

export const FEATURES = [
  {
    icon: IconWorld,
    title: 'Improved supply chain management',
    description:
        'Tracks and manage their supply chains more efficiently, potentially reducing the risk of fraud or errors.'
  },
  {
    icon: IconCloudRain,
    title: 'Climate updates',
    description:
      'Sends information about important weather and climate information, which can help to plan fishing activities and stay safe on the water.'
  },
  {
    icon: IconMapPin,
    title: 'Geofencing',
    description:
        'Helps fishermen ensure that they are complying with coastal limits and other regulations.'
  },
  {
    icon: IconFish,
    title: 'Predict Fish variety',
    description:
        'Helps to find the variety of fish with physical properties by using Machine Learning Algorithms.'
  },
  {
    icon: IconFriends,
    title: 'Compatibility & Inclusivity',
    description:
        'Multi-language and multi-device support to account for the diversity in India.'
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
        'Hyperledger enables clients to record, share and synchronize transactions of files in their respective electronic ledgers.'
  }
];

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

Feature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: theme.spacing.xl * 4
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left'
    }
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left'
    }
  }
}));

export function FeaturesGrid() {
  const { classes, theme } = useStyles();
  const features = FEATURES.map((feature) => <Feature {...feature} key={feature.title} />);

  return (
    <Container className={classes.wrapper}>
      {/* <Title className={classes.title}>

        Integrate effortlessly with any technology stack
      </Title> */}

      {/* <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs.
          This happens when hunger drives it to try biting a Steel-type Pokémon.
        </Text>
      </Container> */}

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' }
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
