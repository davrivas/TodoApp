import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import i18n from 'i18n-js';
import { Box, FormControl, Icon, Input, Stack } from 'native-base';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormButtons } from '../../components/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';


const validations = {
  text: Yup.string().required('AbpAccount::ThisFieldIsRequired.')
}

function CreateUpdateItemForm({ editingItem = {}, submit, remove }) {
  const itemTextRef = useRef();

  const onSubmit = values => {
    submit({
      ...editingItem,
      ...values,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validations,
    }),
    initialValues: {
      ...editingItem,
    },
    onSubmit,
  });

  return (
    <>
      <Box w={{ base: '100%' }} px="3">
        <FormControl isRequired my="2">
          <Stack mx="4">
            <FormControl.Label>Text</FormControl.Label>
            <Input
              ref={itemTextRef}
              onChangeText={formik.handleChange('text')}
              onBlur={formik.handleBlur('text')}
              value={formik.values.text}
              autoCapitalize="none"
              returnKeyType="default"
            />
            <ValidationMessage>{formik.errors.text}</ValidationMessage>
          </Stack>
        </FormControl>
      </Box>
      <FormButtons
        submit={formik.handleSubmit}
        remove={remove}
        removeMessage={
        //   i18n.t('AbpTenantManagement::TenantDeletionConfirmationMessage', {
        //   0: editingTenant.name,
        // })
        'Do you want to remove this item?'
      }
        isSubmitDisabled={!formik.isValid}
        isShowRemove={!!editingItem.id}
      />
    </>
  )
}

CreateUpdateItemForm.propTypes = {
  editingTenant: PropTypes.object,
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CreateUpdateItemForm;