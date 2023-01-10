import React from 'react';
import {
  Button,
  Center,
  Container,
  createStyles, NumberInput, Select, Title
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { predictFishRequest } from '../../utils/requests';

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

export default function PredictFishPage() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const { request } = useLoading();

  const form = useForm({
    initialValues: {
      weight: '',
      length1: '',
      length2: '',
      length3: '',
      width: '',
      height: ''
    },

    validate: {
      weight: (value) => {
        if (value <= 0) {
          return 'weight must be greater than 0';
        }
        return null;
      }
    }
  });

  const submit = async () => {
    try {
      const response = await request(() => predictFishRequest(form.values));
      if (response.status === 201) {
        form.reset();
        showNotification({
          color: 'green',
          type: 'success',
          title: 'Predicted fish successfully',
          message: response.message
        });
      } else {
        showNotification({
          color: 'red',
          type: 'error',
          title: 'Fish Prediction failed',
          message: response.message
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        type: 'error',
        title: 'Fish Prediction failed',
        message: error.message
      });
    }
  };

  return (
    <Container my={20}>
      <Center>
        <Title>
          {t('predict-fish-type')}
        </Title>
      </Center>
      <form onSubmit={form.onSubmit(submit)}>
        <NumberInput label="weight" placeholder="10" classNames={classes} {...form.getInputProps('weight')} withAsterisk />
        <NumberInput label="length1" placeholder="10" classNames={classes} {...form.getInputProps('length1')} withAsterisk />
        <NumberInput label="length2" placeholder="10" classNames={classes} {...form.getInputProps('length2')} withAsterisk />
        <NumberInput label="length3" placeholder="10" classNames={classes} {...form.getInputProps('length3')} withAsterisk />
        <NumberInput label="width" placeholder="10" classNames={classes} {...form.getInputProps('width')} withAsterisk />
        <NumberInput label="height" placeholder="10" classNames={classes} {...form.getInputProps('height')} withAsterisk />
        <Select
          label="Select Model"
          placeholder="Pick one"
          data={[
            { value: 'LogisticRegression', label: 'Logistic Regression' },
            { value: 'decisiontree', label: 'Decision Tree' },
            { value: 'KNN', label: 'K-Nearest Neighbour' },
            { value: 'SVM', label: 'SVM' },
            { value: 'RandomForest', label: 'Random Forest' }
          ]}
        />
        <br />
        <Center>
          <Button type="submit">
            {t('predict')}
          </Button>
        </Center>
      </form>
    </Container>
  );
}
