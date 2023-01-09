import React from 'react';
import {
  Button,
  Center,
  Container,
  createStyles, NumberInput, TextInput, Title
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useLoading } from '../../../hooks/useLoading';
import { createProduct } from '../../../utils/requests';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    margin: '20px'
  },

  input: {
    height: 'auto',
    paddingTop: 18
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1
  }
}));

export function CreateProduct() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const { request } = useLoading();

  const form = useForm({
    initialValues: {
      name: '',
      cost: 0,
      location: '',
      quantity: 0
    },

    validate: {
      cost: (value) => {
        if (value <= 0) {
          return 'Cost must be greater than 0';
        }
        return null;
      },
      quantity: (value) => {
        if (value <= 0) {
          return 'Quantity must be greater than 0';
        }
        return null;
      },
      name: (value) => {
        if (value.length <= 0) {
          return 'Name must be filled';
        }
        return null;
      },
      location: (value) => {
        if (value.length <= 0) {
          return 'Location must be filled';
        }
        return null;
      }
    }
  });

  const submit = async () => {
    try {
      const response = await request(() => createProduct(form.values));
      if (response.status === 201) {
        form.reset();
        showNotification({
          color: 'green',
          type: 'success',
          title: 'Product created'
        });
      } else {
        showNotification({
          color: 'red',
          type: 'error',
          title: 'Product creation failed',
          message: response.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        type: 'error',
        title: 'Product creation failed',
        message: error.message
      });
    }
  };

  return (
    <Container my={20}>
      <Center>
        <Title>
          {t('create-new-product')}
        </Title>
      </Center>
      <form onSubmit={form.onSubmit(submit)}>
        <TextInput label="Name of the Product" placeholder="Nethili" classNames={classes} {...form.getInputProps('name')} withAsterisk />
        <NumberInput label="Quantity" placeholder="100" classNames={classes} {...form.getInputProps('quantity')} withAsterisk />
        <TextInput label="Location" placeholder="Chennai" classNames={classes} {...form.getInputProps('location')} withAsterisk />
        <NumberInput label="Price" placeholder="100" classNames={classes} step={0.01} {...form.getInputProps('cost')} withAsterisk />
        <Center>
          <Button type="submit">
            {t('create')}
          </Button>
        </Center>
      </form>
    </Container>
  );
}
