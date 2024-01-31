export const isPinCodeValid = (pinCode: string): boolean => {
  const pinCodeRegex = /^[0-9]{1,6}$/;
  return pinCodeRegex.test(pinCode);
};
