import {NextSeo} from 'next-seo';
import {useEffect, useState, useCallback} from 'react';
import {
  useMutation,
  useQuery,
  useApolloClient,
  useLazyQuery,
  ApolloError,
} from '@apollo/client';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {isAndroid} from 'react-device-detect';

import {FlexFormBody} from '../styles/shared';
import PageContainer from '../components/PageContainer';
import AddCardAccordion from '../components/AddCardAccordion';
import BodyContainer from '../components/BodyContainer';
import SpacerContainer from '../components/SpacerContainer';
import FormInput from '../components/FormInput';
import Gutter from '../components/Gutter';
import Submit from '../components/Submit';
import routes from '../routing/routes';
import * as gradients from '../styles/gradients';
import Navbar from '../components/Navbar';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import FieldHeader from '../components/FieldHeader';
import Header from '../components/Header';
import NotificationInline from '../components/NotificationInline';
import {FONT_SIZE} from '../components/FieldHeader/fieldHeader.enum';
import InfoWarning from '../components/InfoWarning';
import Checkbox from '../components/Checkbox';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import {GET_PAYMENT_METHODS} from '../graphql/queries/getPaymentMethods';
import {REGISTER_STORED_VALUE_CARD} from '../graphql/mutations/registerStoredValueCard';
import {GET_BRANDS_BY_CARD_NUMBER} from '../graphql/queries/getBrandsByCardNumber';
import {clearRegistrationForm} from '../redux/actions/registration';
import {IRootState} from '../redux/rootStateInterface';
import {PaymentMethod} from '../models/PaymentMethod';
import {BrandByCardNumber} from '../models/BrandByCardNumber';
import {CantaloupeMoreCardType} from '../models/enums/CantaloupeMoreCardType';
import useAppConfig from '../hooks/useAppConfig';

interface IField {
  type: string;
  name: string;
  placeholder: string;
  header?: string;
  errorMsg?: string;
  maxLength?: number;
  validate: (values: string) => boolean;
}

const fields: IField[] = [
  {
    type: 'text',
    name: 'cardNumber',
    placeholder: 'Enter More Card Number',
    header: 'More Card Number:',
    maxLength: 19,
    validate: (values: any) => values.cardNumber,
  },
  {
    type: 'text',
    name: 'securityCode',
    placeholder: 'Enter 4 Digit Code',
    header: 'Security Code:',
    maxLength: 4,
    validate: (values: any) => values.securityCode,
  },
];

const initialValues = {
  cardNumber: '',
  securityCode: '',
  makePrimary: true,
};

const AddMoreCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const client = useApolloClient();
  const user = useSelector((state: IRootState) => state.userReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {payrollDeductCardPrefix} = useAppConfig();
  const [hasPrimaryPrepaidCard, setHasPrimaryPrepaidCard] = useState(false);
  const [accordionDropDown, setAccordionDropDown] = useState(false);
  const [brandByCardNumber, setBrandByCardNumber] = useState<
    BrandByCardNumber[] | undefined
  >(undefined);

  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const triggerToast = (msg: string, id: string) => {
    toast.error(msg, {
      // prevent duplicates
      toastId: id,
    });
  };
  const [registerCard] = useMutation(REGISTER_STORED_VALUE_CARD, {
    context: {useApolloNetworkStatus: true},
    onCompleted: () => {
      router.push(routes.moreCardAdded.path);
    },
    onError: (err) => {
      err.graphQLErrors.forEach((e, i) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        triggerToast(e.message, `server_error_${i}`);
      });
      setIsSubmitting(false);
    },
  });

  const [getBrands] = useLazyQuery(GET_BRANDS_BY_CARD_NUMBER, {
    variables: {cardNumber: ''},
    onCompleted: async (data) => {
      // console.log(data);
      setBrandByCardNumber(data.getBrandsByCardNumber);
    },
    onError: async (err: any) => {
      err.graphQLErrors.forEach((e: any, i: number) => {
        toast.error(e.message, {
          toastId: `server_error_${i}`,
        });
      });
    },
  });

  const {data} = useQuery(GET_PAYMENT_METHODS, {
    fetchPolicy: 'network-only',
    onCompleted: async () => {
      setHasPrimaryPrepaidCard(
        data.getPaymentMethods.some(
          (pMethod: PaymentMethod) =>
            pMethod.cardType === CantaloupeMoreCardType.PREPAID_CARD &&
            pMethod.primary,
        ),
      );
    },
    onError: async (err: any) => {
      err.graphQLErrors.forEach((e: any, i: number) => {
        toast.error(e.message, {
          toastId: `server_error_${i}`,
        });
      });
    },
  });

  const handleOnChange = (values: any) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  useEffect(() => {
    // if we get here from the register user flow
    dispatch(clearRegistrationForm());
  }, [dispatch]);

  if (!allowAccess) {
    return null;
  }

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.cardNumber || values.cardNumber.length < 19) {
      errors.cardNumber = 'Please enter a valid card number.';
    }

    if (values.cardNumber.length === 19) {
      setAccordionDropDown(true);
      getBrands({
        variables: {
          cardNumber: values.cardNumber,
        },
      });
    }

    if (!values.securityCode || values.securityCode.length < 4) {
      errors.securityCode = 'Please enter a valid security code.';
    }

    return errors;
  };

  const isPayrollDeduct = (cardNumber: string) =>
    !!cardNumber.match(new RegExp(`^${payrollDeductCardPrefix}`));

  const onSubmit = (values: any) => {
    // setIsSubmitting(true);

    const {cardNumber, securityCode, makePrimary, brandId} = values;
    console.log(cardNumber, brandId);

    // registerCard({
    //   variables: {
    //     cardNumber: cardNumber.trim(),
    //     securityCode: securityCode.trim(),
    //     ...(!isPayrollDeduct(cardNumber) && {
    //       // makePrimary is true by default
    //       // checkbox displayed only if user has another primary card
    //       makePrimary,
    //       consumerId: user.consumerId,
    //     }),
    //   },
    // });
  };

  return (
    <>
      <NextSeo
        title="Add Card | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn showBackBtn noProfile noSignOut />
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnChange={false}
            onChange={handleOnChange}
            validate={validate}>
            {({
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              setFieldValue,
              setFieldError,
            }: any) => {
              const cardNumberValid = touched.cardNumber && !errors.cardNumber;
              const displayPrimaryCheckbox =
                cardNumberValid &&
                hasPrimaryPrepaidCard &&
                !isPayrollDeduct(values.cardNumber);

              return (
                <FlexFormBody onSubmit={handleSubmit} id="addMoreCard">
                  <BodyContainer alignTop verticalOffset="30">
                    <Header text="Add More Card" leftAlign reducedHeader />
                    {fields.map((field: IField) => (
                      <div key={field.name}>
                        {field.header && (
                          <FieldHeader
                            text={field.header}
                            leftAlign
                            fontSize={FONT_SIZE.MEDIUM}
                          />
                        )}
                        {errors[field.name] && touched[field.name] && (
                          <NotificationInline
                            msg={errors[field.name]}
                            margin="0 0 10px"
                          />
                        )}

                        <FormInput
                          type={field.type}
                          name={field.name}
                          value={values[field.name]}
                          setFieldValue={setFieldValue}
                          maxLength={field.maxLength}
                          onlyNumeric
                          placeholder={field.placeholder}
                          change={handleChange}
                          disabled={false}
                          blur={(e) => {
                            setFieldError(
                              field.name,
                              field.validate(values) ? null : field.errorMsg,
                            );
                            handleBlur(e);
                          }}
                          error={errors[field.name]}
                          hideFLoatingLabel
                        />
                      </div>
                    ))}
                    {displayPrimaryCheckbox && (
                      <SpacerContainer margin="0 0 20px 0">
                        <Checkbox
                          label="Set as Primary Card"
                          name="makePrimary"
                          checked={values.makePrimary}
                          change={handleChange}
                        />
                      </SpacerContainer>
                    )}
                    <InfoWarning
                      question
                      text="Don't Yet Have A More Card? Please Contact Your Program Administrator."
                    />
                    <SpacerContainer margin="20px 0 20px 0">
                      {accordionDropDown && (
                        <AddCardAccordion
                          setFieldValue={setFieldValue}
                          brands={brandByCardNumber}
                        />
                      )}
                    </SpacerContainer>
                  </BodyContainer>
                  {isAndroid ? (
                    <InfoWarning text="The ability to add a pass to your Google Pay wallet is coming soon" />
                  ) : null}

                  <FooterButtonAndLink>
                    <Submit text="Add More Card" disabled={isSubmitting} />
                  </FooterButtonAndLink>
                </FlexFormBody>
              );
            }}
          </Formik>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default AddMoreCard;
