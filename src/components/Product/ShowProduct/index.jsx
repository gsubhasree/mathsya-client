/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Timeline, Text, Container, Title,
  Center, Paper, Button, SimpleGrid, Modal, NumberInput, TextInput, Anchor
} from '@mantine/core';
import {
  IconShoppingCartDiscount,
  IconBuildingStore,
  IconArrowBigDownLines
} from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import PropTypes from 'prop-types';
import { useLoading } from '../../../hooks/useLoading';
import {
  bidInAuction, createAuction, getProductRequest, sellProduct, closeAuction
} from '../../../utils/requests';
import { useAuth } from '../../../hooks/useAuth';

function StartAuctionForm({ id }) {
  const { t } = useTranslation();
  const { request } = useLoading();
  const form = useForm({
    initialValues: {
      minPrice: 0
    },
    validate: {
      minPrice: (value) => {
        if (value <= 0) {
          return 'Min price must be greater than 0';
        }
        return null;
      }
    }
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      const response = await request(() => createAuction({ ...form.values, id }));
      if (response.status === 200) {
        showNotification({
          title: 'Success',
          message: 'Auction started successfully',
          color: 'teal',
          timeout: 5000
        });
        navigate('/home');
      } else {
        showNotification({
          title: 'Error',
          message: 'Error starting auction',
          color: 'red',
          timeout: 5000
        });
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Error starting auction',
        color: 'red',
        timeout: 5000
      });
    }
  };
  return (
    <form onSubmit={form.onSubmit(submit)}>
      <SimpleGrid columns={2} spacing="md">
        <NumberInput
          {...form.getInputProps('minPrice')}
          placeholder="0"
          label={t('min-price')}
          required
        />
      </SimpleGrid>
      <Center>
        <Button
          type="submit"
          variant="outline"
          color="red"
          mt={20}
        >
          {t('start-auction')}
        </Button>
      </Center>
    </form>
  );
}

StartAuctionForm.propTypes = {
  id: PropTypes.string.isRequired
};

function BidForm({ id }) {
  const { t } = useTranslation();
  const { request } = useLoading();
  const form = useForm({
    initialValues: {
      bidAmount: 0,
      location: ''
    },
    validate: {
      bidAmount: (value) => {
        if (value <= 0) {
          return 'Bid must be greater than 0';
        }
        return null;
      },
      location: (value) => {
        if (value === '') {
          return 'Location is required';
        }
        return null;
      }
    }
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      const response = await request(() => bidInAuction({ ...form.values, id }));
      if (response.status === 200) {
        showNotification({
          title: 'Success',
          message: 'Bid placed successfully',
          color: 'teal',
          timeout: 5000
        });
        navigate('/home');
      } else {
        showNotification({
          title: 'Error',
          message: 'Error placing bid',
          color: 'red',
          timeout: 5000
        });
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Error placing bid',
        color: 'red',
        timeout: 5000
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <SimpleGrid columns={2} spacing="md">
        <NumberInput
          {...form.getInputProps('bidAmount')}
          placeholder="0"
          label={t('bid')}
          required
        />
        <TextInput
          {...form.getInputProps('location')}
          placeholder="Location"
          label={t('location')}
          required
        />
      </SimpleGrid>
      <Center>
        <Button
          type="submit"
          variant="outline"
          color="red"
          mt={20}
        >
          {t('bid')}
        </Button>
      </Center>
    </form>

  );
}

BidForm.propTypes = {
  id: PropTypes.string.isRequired
};

function SellForm({ id }) {
  const { t } = useTranslation();
  const { request } = useLoading();
  const form = useForm({
    initialValues: {
      cost: 0,
      location: ''
    },
    validate: {
      cost: (value) => {
        if (value <= 0) {
          return 'Cost must be greater than 0';
        }
        return null;
      },
      location: (value) => {
        if (value === '') {
          return 'Location is required';
        }
        return null;
      }
    }
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      const response = await request(() => sellProduct({ ...form.values, id }));
      if (response.status === 200) {
        showNotification({
          title: 'Success',
          message: 'Bid placed successfully',
          color: 'teal',
          timeout: 5000
        });

        navigate('/home');
      } else {
        showNotification({
          title: 'Error',
          message: 'Error selling product',
          color: 'red',
          timeout: 5000
        });
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Error selling product',
        color: 'red',
        timeout: 5000
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <SimpleGrid columns={2} spacing="md">
        <NumberInput
          {...form.getInputProps('cost')}
          placeholder="0"
          label={t('cost')}
          required
        />
        <TextInput
          {...form.getInputProps('location')}
          placeholder="Location"
          label={t('location')}
          required
        />
      </SimpleGrid>
      <Center>
        <Button
          type="submit"
          variant="outline"
          color="red"
          mt={20}
        >
          {t('sell-product')}
        </Button>
      </Center>
    </form>

  );
}

SellForm.propTypes = {
  id: PropTypes.string.isRequired
};

export function ShowProduct() {
  const { request } = useLoading();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const getProduct = async () => {
    try {
      const response = await request(() => getProductRequest(id));
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
    getProduct();
  }, []);

  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const { t } = useTranslation();

  const { user } = useAuth();

  const [buttonClicked, setButtonClicked] = useState('');

  const CloseAuction = async () => {
    try {
      const response = await request(() => closeAuction(data.id));
      if (response.status === 200) {
        showNotification({
          color: 'teal',
          title: 'Success',
          message: 'Auction closed successfully'
        });
        navigate('/home');
      } else {
        showNotification({
          color: 'red',
          title: 'Error',
          message: 'Error closing auction'
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Error closing auction'
      });
    }
  };

  return (
    <>
      <Container my={50}>
        <Center><Title order={3}>{t('product-details')}</Title></Center>
        <Paper p={50} m={20} sx={{ position: 'relative' }}>

          <Center>
            <Title order={1} size="lg" mt={10}>
              {data.name}
              (Quantity:
              {' '}
              {data.quantity}
              )
            </Title>
          </Center>
          <Center>
            <Title order={5} size="lg" mt={10}>
              {t('transaction-history')}
            </Title>
          </Center>
          <Text
            size="lg"
            mt={10}
            sx={(theme) => ({
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: theme.colors.red[6],
              color: theme.white,
              padding: '0 5px',
              fontSize: 15,
              fontWeight: 700,
              borderRadius: '0 0 0 5px'
            })}
          >
            {data.inAuction && t('in-auction') }
          </Text>
          <Timeline bulletSize={24} lineWidth={2} m={30}>
            {
              data.history && data.history.map((item, idx) => (
                <Timeline.Item
                  bullet={
                    idx !== data.history.length - 1 ? <IconArrowBigDownLines size={12} color="teal" />
                      : data.inAuction ? <IconBuildingStore size={12} color="blue" />
                        : <IconShoppingCartDiscount size={12} color="brown" />
                  }
                  key={item.owner && item.owner.email}
                  title={item.owner.email !== 'none' ? `Owned by ${item.owner.email}` : 'Sold'}
                  lineVariant="solid"
                >
                  <Text color="dimmed" size="sm">
                    {idx === 0 ? 'Created' : item.owner.email !== 'none' ? 'Located' : 'Sold'}
                    {' '}
                    at
                    {' '}
                    <b>{item.location}</b>
                    {' '}
                    for cost
                    {' '}
                    <b>{item.cost}</b>
                  </Text>
                  <Anchor href={`http://localhost:9999/?tab=transactions&transId=${item.txId}`} target="_blank" rel="noreferrer">
                    <Text color="dimmed" size="xs" style={{ wordBreak: 'break-all' }}>
                      {item.txId}
                    </Text>
                  </Anchor>
                  <Text size="xs" mt={4}>{item.time}</Text>
                </Timeline.Item>
              ))
            }
          </Timeline>
        </Paper>
        <Container>
          <Center>
            {data.owner && user.email === data.owner.email && data.inAuction && (
              <Button color="teal" variant="outline" size="lg" mt={10} onClick={() => CloseAuction()}>
                {t('close-auction')}
              </Button>
            )}
            {data.owner
              && user.email === data.owner.email && !data.inAuction && (
              <SimpleGrid cols={2}>
                <Button
                  color="teal"
                  variant="outline"
                  size="lg"
                  mt={10}
                  onClick={() => {
                    setButtonClicked('start-auction');
                    setOpened(true);
                  }}
                >
                  {t('start-auction')}
                </Button>
                <Button
                  color="yellow"
                  variant="outline"
                  size="lg"
                  mt={10}
                  onClick={() => {
                    setButtonClicked('sell-product');
                    setOpened(true);
                  }}
                >
                  {t('sell-product')}
                </Button>
              </SimpleGrid>
            )}
            { data.owner
              && user.email !== data.owner.email && data.inAuction && (
              <Button
                color="teal"
                variant="outline"
                size="lg"
                mt={10}
                onClick={() => {
                  setButtonClicked('bid');
                  setOpened(true);
                }}
              >
                {t('bid')}
              </Button>
            )}
          </Center>
        </Container>
      </Container>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={(
          <Center>
            <Title order={3}>
              {
                buttonClicked === 'start-auction' ? t('start-auction') : buttonClicked === 'sell-product' ? t('sell-product') : t('bid')
              }
            </Title>
          </Center>
        )}
      >
        { buttonClicked === 'start-auction' && <StartAuctionForm id={id} /> }
        { buttonClicked === 'sell-product' && <SellForm id={id} /> }
        { buttonClicked === 'bid' && <BidForm id={id} /> }
      </Modal>
    </>
  );
}
