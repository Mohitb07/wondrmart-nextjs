export const isPinCodeValid = (pinCode: string): boolean => {
  const pinCodeRegex = /^[0-9]{1,6}$/;
  return pinCodeRegex.test(pinCode);
};

export const isMobileNumberValid = (mobileNumber: string): boolean => {
  const mobileNumberRegex = /^[0-9]{1,10}$/;
  return mobileNumberRegex.test(mobileNumber);
};
