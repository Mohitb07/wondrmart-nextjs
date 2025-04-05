"use client";

import useRemoveCartItem from "@/hooks/useDeleteCartItem";
import useGetAddresses from "@/hooks/useGetAddresses";
import useGetCart from "@/hooks/useGetCart";
import useGetUser from "@/hooks/useGetUser";
import usePayment from "@/hooks/usePayment";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import { Address, PaymentMethod } from "@/types";
import { calculateCartPrice } from "@/utils/cartPrice";
import { formatPrice } from "@/utils/formatPrice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Radio,
  RadioGroup,
  Spinner,
  cn,
} from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import CartItem from "../../cart/components/CartItem";
import toast from "react-hot-toast";

export default function Checkout() {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const {
    data: cart,
    isInitialLoading: isCartLoading,
    isError: isCartError,
    error,
  } = useGetCart();
  const {
    paymentStatus,
    paymentMethod,
    handlePayment,
    handlePaymentStatus,
    handlePaymentMethod,
    handleCashPayment,
  } = usePayment();
  const { mutate: updateQuantityHandler } = useUpdateQuantity();
  const { mutate: removeCartItemHandler } = useRemoveCartItem();
  const {
    data: addresses,
    isLoading: isAddressesLoading,
    isError: isAddressesError,
  } = useGetAddresses();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  if (!isUserLoading && !user) {
    redirect("/login");
  }

  if (isCartLoading || isAddressesLoading || isUserLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-[500px] ">
          <Spinner color="primary" />
        </div>
      </div>
    );
  }

  if (isCartError || isAddressesError) {
    throw error;
  }

  const userCart = cart?.cart_items || [];
  let totalCartSum = calculateCartPrice(userCart);
  let formattedPrice = formatPrice(totalCartSum);

  const currentAddress =
    selectedAddress ||
    addresses.filter((address) => address.default === true)[0];

  const addressesList = addresses.filter(
    (address) => address.address_id !== currentAddress.address_id
  );

  const handleCashTransaction = async () => {
    if (paymentMethod !== "cash") {
      console.error("Invalid payment method");
      return;
    }
    if (!currentAddress) {
      console.error("No address found");
      return;
    }
    if (!cart?.cart_items) {
      console.error("No cart found");
      return;
    }

    try {
      handlePaymentStatus("loading");
      const params = {
        cart_id: cart.cart_id,
        address_id: currentAddress.address_id,
        payment_method: paymentMethod,
      };
      const res = await handleCashPayment(params);
      console.log("res getting", res);
      window.location.href = `/${res.sendTo}`;
    } catch (error) {
      console.log("Something went wrong", error);
      handlePaymentStatus("error");
    }
  };

  const handlePlaceOrder = async () => {
    if (!currentAddress) {
      console.error("No address found");
      toast.error("Please select an address");
      return;
    }
    if (!cart?.cart_items) {
      console.error("No cart found");
      return;
    }
    if (paymentMethod === "cash") {
      handleCashTransaction();
      return;
    }
    try {
      handlePaymentStatus("loading");
      const params = {
        cart_id: cart.cart_id,
        address_id: currentAddress.address_id,
        shipping_name: currentAddress.full_name,
        shipping_phone: currentAddress.phone,
        shipping_email: user.email,
        payment_method: paymentMethod,
      };
      const res = await handlePayment(params);
      window.location.href = res.redirectUrl;
    } catch (error) {
      console.log("Something went wrong", error);
      handlePaymentStatus("error");
    }
  };

  const onSelectionChange = (item: Address) => setSelectedAddress(item);

  const onPaymentMethodChange = (method: string) => {
    if (method === "cash" || method === "card") {
      handlePaymentMethod(method as PaymentMethod);
    } else {
      console.error("Invalid payment method:", method);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="py-4 h-fit bg-transparent border border-gray-800 rounded-xl">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-2xl font-bold">Order Summary</p>
        </CardHeader>
        <CardBody className="py-2 max-h-unit-7xl">
          <div className="overflow-y-scroll scrollbar-hide">
            <div className="flex flex-col gap-2">
              {userCart.map((item) => (
                <CartItem
                  onUpdateQuantity={updateQuantityHandler}
                  onRemoveCartItem={removeCartItemHandler}
                  key={item.cart_item_id}
                  image_url={item.product.image_url}
                  product_id={item.product_id}
                  quantity={item.quantity}
                  title={item.product.name}
                  unit_amount={item.product.price}
                  total_amount={item.total_amount}
                  cart_id={item.cart_id}
                  cart_item_id={item.cart_item_id}
                />
              ))}
            </div>
          </div>
        </CardBody>
        <Divider className="my-1" />
        <CardFooter>
          <div className="flex justify-between items-center px-4 w-full">
            <p className="text-lg font-bold">Subtotal</p>
            <p className="text-lg font-bold">{formattedPrice}</p>
          </div>
        </CardFooter>
      </Card>
      <div>
        <Card className="py-4 bg-gray-950 h-fit bg-transparent border border-gray-800 rounded-xl">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-2xl font-bold">Shipping Address</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2 max-h-unit-7xl">
            {!!!currentAddress ? (
              <div className="flex justify-between px-1">
                <p className="text-neutral-400">No address found</p>
                <Button
                  as={Link}
                  href={`/user/${user.customer_id}/addresses`}
                  variant="bordered"
                >
                  Add Address
                </Button>
              </div>
            ) : (
              <div className="flex justify-between px-1">
                <div>
                  <p>{currentAddress.full_name}</p>
                  <p className="text-neutral-400">
                    {`${currentAddress.flat_no}, ${currentAddress.street}, ${currentAddress.state}`}
                  </p>
                </div>
                <div>
                  <Dropdown
                    showArrow
                    onChange={(value) => console.log("selected, value", value)}
                  >
                    <DropdownTrigger>
                      <Button variant="bordered">Change</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="faded"
                      aria-label="change address dropdown"
                      items={addressesList}
                    >
                      {addressesList.map((address) => (
                        <DropdownItem
                          key={`${address.full_name}, ${address.flat_no}, ${address.street}, ${address.state}`}
                          description={`${address.flat_no}, ${address.street}, ${address.state}`}
                          onClick={() => onSelectionChange(address)}
                        >
                          {address.full_name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
        <div className="flex flex-1 my-5">
          <Button
            color="primary"
            size="md"
            className="ml-auto px-5"
            onClick={handlePlaceOrder}
            isLoading={paymentStatus === "loading"}
          >
            Place Order
          </Button>
        </div>
      </div>
      <Card className="py-4 bg-gray-950 h-fit bg-transparent border border-gray-800 rounded-xl">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-2xl font-bold">Payment</p>
        </CardHeader>

        <CardBody className="overflow-visible py-2 max-h-unit-7xl">
          <RadioGroup
            className="pt-10"
            value={paymentMethod}
            onValueChange={onPaymentMethodChange}
          >
            <div className="flex gap-5">
              <CustomRadio value="cash">
                <DollarSignIcon />
                <span>Cash</span>
              </CustomRadio>
              <CustomRadio value="card">
                <CreditCardIcon />
                <span>Card</span>
              </CustomRadio>
            </div>
          </RadioGroup>
        </CardBody>
      </Card>
    </div>
  );
}

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "w-full inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between mx-auto",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
