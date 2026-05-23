import SecondCountdown from '@components/core/countdown/SecondCountdown';
import OTPInput from '@components/core/fields/otp/otp';
import HeadingWithCta from '@components/core/hr/HeadingWithCta';
import BackButton from '@components/core/‌Buttons/BackButton';
import Button from '@components/core/‌Buttons/Button';
import { authApi } from '@constants/ApiPath';
import { cm } from '@helper/clsx';
import RequestHandler from '@services/RequestHandler';
import { Link } from 'react-router';
import type React from 'react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
type FormOtpProps = {
  nextStep: string;
  uniqueKey: string;
  handleSetCurrentForm: (currentForm: string) => void;
  handleSetNextStep: (nextStep: string) => void;
};
type Inputs = {
  otp: string;
};
const FormOtp: React.FC<FormOtpProps> = ({
  handleSetCurrentForm,
  handleSetNextStep,
  nextStep,
  uniqueKey,
}) => {
  const [otp, setOtp] = useState('');
  const [finishedCounter, setFinishedCounter] = useState(false);
  const [resendOtpAlert, setResendOtpAlert] = useState<string>('hide');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleOtpChange = (newOtp: string): void => {
    setOtp(newOtp);
  };
  const handleSetFinishedCounter = (finishedCounter: boolean): void => {
    setFinishedCounter(finishedCounter);
  };
  const handleResendOtp = (): void => {
    setFinishedCounter(false);
    setResendOtpAlert('show');
    setTimeout(() => {
      setResendOtpAlert('hide');
      setFinishedCounter(false);
    }, 3000);
    console.log(resendOtpAlert, finishedCounter);
  };
  const handleBack = (): void => {
    handleSetCurrentForm('form-auth-step-one');
    handleSetNextStep('');
  };
  const handleGoToChangePassForm = (): void => {
    handleSetCurrentForm('form-change-password');
  };
  const onSubmit: SubmitHandler<Inputs> = async () => {
    const payload: {
      unique_key: string;
      password: string;
      auth_type: string;
    } = { unique_key: uniqueKey, password: otp, auth_type: 'otp' };
    await handleCheckOtp(payload);
  };
  const handleCheckOtp = async (payload: {
    unique_key: string;
    password: string;
    auth_type: string;
  }): Promise<void> => {
    const respponse = await RequestHandler.post(authApi.AUTH, payload);
    if (respponse.status) {
      console.log(respponse);
    } else {
      console.log(respponse);
    }
  };
  return (
    <form
      className="form flex flex-col gap-base-xs lg:gap-base-sm"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
        <HeadingWithCta title="کد فعال‌سازی" />
        <BackButton handlClick={handleBack} />
      </div>
      <span className="subtitle t text-base-50  mb-base-md">
        لطفا کد فعال سازی برای {uniqueKey} را وارد نمایید{' '}
      </span>
      <div className="content flex flex-col gap-base-sm">
        <OTPInput
          numInputs={4}
          inputType="text"
          classNameField="w-full"
          onChange={handleOtpChange}
        />
        {nextStep === 'continue' ? (
          <Button
            variant="primary"
            size="lg"
            className="border-0"
            onClick={handleGoToChangePassForm}
          >
            ادامه
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="border-0"
            type="submit"
          >
            تایید
          </Button>
        )}
      </div>
      <div className="footer flex flex-col gap-base-sm">
        <div className="row pt-base">
          {resendOtpAlert === 'show' && (
            <div className="col-6">
              <span className="text-center t">
                کد برای {uniqueKey} ارسال شد
              </span>
            </div>
          )}

          {!finishedCounter && resendOtpAlert === 'hide' && (
            <div className="col-6">
              <SecondCountdown
                seconds={10}
                text="ثانیه تا پایان اعتبار کد"
                icon="clock-countdown-r"
                handleSetFinishedCounter={handleSetFinishedCounter}
              />
            </div>
          )}

          {nextStep !== 'continue' && (
            <div className="col-6">
              <Link
                onClick={(): void => handleSetCurrentForm('form-password')}
                to="#passform"
                className={cm(
                  't text-base-30 hover:text-primary-50 text-left block',
                  finishedCounter && 'text-right',
                )}
              >
                ورود با رمز ثابت
              </Link>
            </div>
          )}

          {finishedCounter && (
            <div className="col-6">
              <Link
                to={''}
                className={cm(
                  't text-base-30 hover:text-primary-50 text-left block',
                  finishedCounter && nextStep === 'continue' && 'text-right',
                )}
                onClick={handleResendOtp}
              >
                ارسال مجدد کد فعال سازی
              </Link>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
export default FormOtp;
