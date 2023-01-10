/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  createStyles, Text, Grid, Group, Container, Title, Paper
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useLoading } from '../../../hooks/useLoading';

const useStyles = createStyles((theme) => ({

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700
  },

  item: {
    position: 'relative',
    display: 'block',
    borderRadius: theme.radius.md,
    height: 90,
    width: '100%',
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    boxShadow: theme.shadows.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    '&:hover': {
      boxShadow: `${theme.shadows.xl} !important`,
      transform: 'scale(1.05)'
    }
  },

  auction: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.red[6],
    color: theme.white,
    padding: '0 5px',
    fontSize: 15,
    fontWeight: 700,
    borderRadius: '0 0 0 5px'
  }
}));

export function DisplayProducts({
  fetchRequest, name
}) {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { request, isLoading } = useLoading();
  const getAllProducts = async () => {
    try {
      const response = await request(fetchRequest);
      if (response.status === 200) {
        setData(response.data);
      } else {
        showNotification({
          color: 'red',
          title: 'Error while fetching data',
          message: response.data.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while fetching data',
        message: error.response.data
                  && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [fetchRequest]);

  const items = data.length
    ? (
      <Grid gutter="xl" grow mt="md" justify="center">
        {data.map((item) => (
          <Grid.Col
            key={item._id}
            md={6}
            lg={4}
          >
            <Paper
              variant="light"
              className={classes.item}
              onClick={() => navigate(`/show-product/${item.id}`)}
            >
              <Container py={10}>
                <Text
                  c="teal"
                  size="lg"
                >
                  {item.name}
                </Text>
                <Text
                  c="teal"
                  size="sm"
                >
                  {item.quantity}
                </Text>
                <Text className={classes.auction}>
                  {item.inAuction && t('in-auction')}
                </Text>
              </Container>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    ) : (
      !isLoading && (
        <Container my={50}>
          <Group position="center">
            <Title order={4}>{t('no-docs-available')}</Title>
          </Group>
        </Container>
      )
    );

  return (
    <Container my={50}>
      <Group position="center">
        <Title className={classes.title}>{t(name)}</Title>
      </Group>
      {items}
    </Container>
  );
}

DisplayProducts.propTypes = {
  fetchRequest: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
