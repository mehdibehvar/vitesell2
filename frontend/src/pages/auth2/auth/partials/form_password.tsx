import Input from '@components/core/fields/input/Input';
import HeadingWithCta from '@components/core/hr/HeadingWithCta';
import BackButton from '@components/core/‌Buttons/BackButton';
import Button from '@components/core/‌Buttons/Button';
import { authApi } from '@constants/ApiPath';
import RequestHandler from '@services/RequestHandler';
import { useSendOtp } from '@hooks/useSendOtp';
import { Link } from 'react-router';
import type React from 'react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
type FormPasswordProps = {
  handleSetCurrentForm: (currentForm: string) => void;
  handleSetNextStep: (nextStep: string) => void;
  authSetting: any;
  uniqueKey: string;
};
type Inputs = {
  password: string;
};

const FormPassword: React.FC<FormPasswordProps> = ({
  handleSetCurrentForm,
  handleSetNextStep,
  authSetting,
  uniqueKey,
}) => {
  const [loading, setLoading] = useState(false);
  const { sendOtp, isLoading, error } = useSendOtp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleBack = (): void => {
    handleSetCurrentForm('form-auth-step-one');
    handleSetNextStep('');
  };
  const handleGoToOtpForm = async (): Promise<void> => {
    await sendOtp(uniqueKey);
    if (!error) {
      handleSetCurrentForm('form-otp');
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const payload = {
      password: data.password,
      unique_key: uniqueKey,
      auth_type: 'password',
    };
    try {
      const response = await RequestHandler.post(authApi.AUTH, payload);
      if (response.data.status) {
        alert(response.data.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="form flex flex-col gap-base-xs lg:gap-base-sm"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
        <HeadingWithCta title="حساب کاربری" />
        <BackButton handlClick={handleBack} />
      </div>
      <span className="subtitle t text-base-50 mb-base-md">
        لطفا رمز خود برای {uniqueKey} را وارد نمایید{' '}
      </span>
      <div className="content flex flex-col gap-base-sm">
        <Input
          name="password"
          className="py-base-sm"
          type="password"
          placeholder="رمز عبور"
          register={register('password', { required: true })}
        />
        <>
          <Button
            variant="primary"
            size="lg"
            className="border-0"
            type="submit"
          >
            ارسال
          </Button>
          <div className="row pt-base">
            <div className="col-6">
              <Link
                onClick={(): void =>
                  handleSetCurrentForm('form-forgot-password')
                }
                to="#forgetpass"
                className="t text-base-30 hover:text-primary-50"
              >
                رمز عبور را فراموش کرده اید؟
              </Link>
            </div>
            <div className="col-6">
              <Link
                onClick={(): Promise<void> => handleGoToOtpForm()}
                to="#passform"
                className="t text-base-30 hover:text-primary-50 text-left block"
              >
                ورود با کد یکبار مصرف
              </Link>
            </div>
          </div>
        </>
      </div>
    </form>
  );
};

export default FormPassword;
