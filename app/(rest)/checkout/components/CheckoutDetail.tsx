"use client";

import { useQuery } from "@tanstack/react-query";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import useRemoveCartItem from "@/hooks/useDeleteCartItem";
import { getCartItems } from "@/actions/getCartItems";
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
  Image,
  Radio,
  RadioGroup,
  Spinner,
  cn,
} from "@nextui-org/react";
import useGetUser from "@/hooks/useGetUser";
import { calculateCartPrice } from "@/utils/cartPrice";
import CartItem from "../../cart/components/CartItem";
import { formatPrice } from "@/utils/formatPrice";
import axios from "axios";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { Address } from "@/types";
import useGetAddresses from "@/hooks/useGetAddresses";
import { axiosInstance } from "@/api";

export default function Checkout() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
  const { mutate: updateQuantityHandler } = useUpdateQuantity();
  const { mutate: removeCartItemHandler } = useRemoveCartItem();
  const {
    data: addresses,
    isLoading: isAddressesLoading,
    isError: isAddressesError,
  } = useGetAddresses();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const onSelectionChange = async (item: Address) => {
    setSelectedAddress(item);
  };

  if (isLoading || isAddressesLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-[500px] ">
          <Spinner color="primary" />
        </div>
      </div>
    );
  }

  if (isError || isAddressesError) {
    return <div>Error: {JSON.stringify(isError || isAddressesError)}</div>;
  }

  const cartItems = data?.cart[0]?.cart_items || [];
  let totalCartSum = calculateCartPrice(cartItems);
  let formattedPrice = formatPrice(totalCartSum);

  const currentAddress =
    selectedAddress ||
    addresses.filter((address) => address.default === true)[0];

  const addressesList = addresses.filter(
    (address) => address.address_id !== currentAddress.address_id
  );

  const handlePlaceOrder = async () => {
    try {
      const res = await axiosInstance.post("/initiate_payment", {
        amount: totalCartSum,
        firstname: "Mohit",
        email: "bmohit980@gmail.com",
        phone: "123123",
        productinfo: "Info",
      });
      window.location.href = res.data;
    } catch (error) {
      console.log("error", error);
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
              {cartItems.map((item) => (
                <CartItem
                  onUpdateQuantity={updateQuantityHandler}
                  onRemoveCartItem={removeCartItemHandler}
                  key={item.cart_item_id}
                  image_url={item.products.image_url}
                  product_id={item.product_id}
                  quantity={item.quantity}
                  title={item.products.name}
                  unit_amount={item.products.price}
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
          </CardBody>
        </Card>
        <div className="flex flex-1 my-5">
          <Button
            color="primary"
            size="md"
            className="ml-auto px-5"
            onClick={handlePlaceOrder}
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
          {/* <div className="flex items-center gap-4 pt-10">
            <Card shadow="sm" isPressable className="w-full">
              <CardBody className="overflow-visible p-0">
                <div className="px-20 py-4 flex justify-center items-center flex-col border border-gray-800 rounded-lg w-full gap-3">
                  <CreditCardIcon />
                  <span>Card</span>
                </div>
              </CardBody>
            </Card>
            <Card shadow="sm" isPressable className="w-full">
              <CardBody className="overflow-visible p-0">
                <div className="px-20 py-4 flex justify-center items-center flex-col border border-gray-800 rounded-lg w-full gap-3">
                  <DollarSignIcon />
                  <span>Cash on delivery</span>
                </div>
              </CardBody>
            </Card>
          </div> */}

          <RadioGroup className="pt-10">
            <div className="flex gap-5">
              <CustomRadio value="card">
                <CreditCardIcon />
                <span>Card</span>
              </CustomRadio>
              <CustomRadio
                //   description="Unlimited items. $10 per month."
                value="cash"
              >
                <DollarSignIcon />
                <span>Cash</span>
              </CustomRadio>
            </div>
          </RadioGroup>
        </CardBody>
      </Card>
    </div>
  );
}

export const CustomRadio = (props) => {
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

function CreditCardIcon(props) {
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

function DollarSignIcon(props) {
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
