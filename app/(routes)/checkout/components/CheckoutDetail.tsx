"use client";

import useRemoveCartItem from "@/hooks/useDeleteCartItem";
import useGetAddresses from "@/hooks/useGetAddresses";
import useGetCart from "@/hooks/useGetCart";
import usePayment from "@/hooks/usePayment";
import { useAuth } from "@/context/AuthContext";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import { Address, PaymentMethod } from "@/types";
import { calculateCartPrice, formatPrice } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
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
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FiMapPin,
  FiCreditCard,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiLock,
  FiPlus,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import { HiOutlineBanknotes, HiOutlineCreditCard } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa6";
import CartItem from "../../cart/components/CartItem";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Checkout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, loading: isUserLoading } = useAuth();
  const safeUser = user;
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const userCart = useMemo(() => cart?.cart_items || [], [cart?.cart_items]);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasMoreBelow =
        el.scrollHeight - el.scrollTop - el.clientHeight > 10;
      setCanScrollDown(hasMoreBelow);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [userCart, checkScroll]);

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 150,
        behavior: "smooth",
      });
    }
  };

  if (!isUserLoading && !user) {
    redirect("/login");
  }

  if (isCartLoading || isAddressesLoading || isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-sm text-neutral-400 font-medium animate-pulse">
          Loading checkout details...
        </p>
      </div>
    );
  }

  if (isCartError || isAddressesError) {
    throw error;
  }

  const totalItemsCount = userCart.reduce(
    (acc, item) => acc + Number(item.quantity || 1),
    0
  );
  const totalCartSum = calculateCartPrice(userCart);
  const formattedPrice = formatPrice(totalCartSum);

  const currentAddress =
    selectedAddress ||
    addresses?.find((address) => address.default === true) ||
    addresses?.[0];

  const addressesList =
    addresses?.filter(
      (address) => address.address_id !== currentAddress?.address_id
    ) || [];

  const handleCashTransaction = async () => {
    if (paymentMethod !== "cash") {
      console.error("Invalid payment method");
      return;
    }
    if (!currentAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }
    if (!cart?.cart_items || cart.cart_items.length === 0) {
      toast.error("Your cart is empty");
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
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      router.push(`/${res.sendTo}`);
    } catch (error) {
      console.log("Something went wrong", error);
      handlePaymentStatus("error");
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!currentAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }
    if (!cart?.cart_items || cart.cart_items.length === 0) {
      toast.error("Your cart is empty");
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
        shipping_email: safeUser?.email ?? "",
        payment_method: paymentMethod,
      };
      const res = await handlePayment(params);
      window.location.href = res.redirectUrl;
    } catch (error) {
      console.log("Something went wrong", error);
      handlePaymentStatus("error");
      toast.error("Failed to initiate payment. Please try again.");
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

  if (userCart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
          <FiShoppingBag className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Your cart is empty</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Add items to your cart before proceeding to checkout.
          </p>
        </div>
        <Button
          as={Link}
          href="/products"
          color="primary"
          className="mt-2 font-medium"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Checkout Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Review your order details and choose your preferred payment method.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/60 border border-neutral-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <FiShield className="text-primary w-3.5 h-3.5" />
          <span>256-Bit SSL Secure Checkout</span>
        </div>
      </div>

      {/* Main Content: 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Shipping Address & Payment Selection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Shipping Address Card */}
          <Card className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-2xl shadow-xl overflow-visible">
            <CardHeader className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-neutral-800/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Shipping Address</h2>
                  <p className="text-xs text-neutral-400">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>
              <Chip size="sm" variant="flat" color="default" className="text-xs">
                Step 1
              </Chip>
            </CardHeader>

            <CardBody className="p-5">
              {!currentAddress ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-dashed border-neutral-700 bg-neutral-950/40">
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <FiMapPin className="w-6 h-6 text-neutral-500 hidden sm:block shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-200">
                        No address found
                      </p>
                      <p className="text-xs text-neutral-400">
                        Please add a delivery address to complete your order.
                      </p>
                    </div>
                  </div>
                  <Button
                    as={Link}
                    href={`/user/${
                      safeUser?.customer_id ?? safeUser?.id ?? ""
                    }/addresses`}
                    color="primary"
                    variant="flat"
                    size="sm"
                    startContent={<FiPlus />}
                    className="w-full sm:w-auto"
                  >
                    Add Address
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-950/60">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-neutral-100">
                        {currentAddress.full_name}
                      </p>
                      {currentAddress.default && (
                        <Chip
                          size="sm"
                          variant="dot"
                          color="primary"
                          className="text-[10px] h-5"
                        >
                          Default
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {`${currentAddress.flat_no}, ${currentAddress.street}, ${currentAddress.state}`}
                    </p>
                    {currentAddress.phone && (
                      <p className="text-xs text-neutral-400">
                        Phone: {currentAddress.phone}
                      </p>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                    <Dropdown showArrow placement="bottom-end">
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          size="sm"
                          className="border-neutral-700 hover:border-neutral-500 text-xs font-medium"
                          endContent={<FiChevronDown className="w-3 h-3" />}
                        >
                          Change
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="faded"
                        aria-label="Change address dropdown"
                        items={addressesList}
                        emptyContent="No other saved addresses"
                      >
                        {addressesList.map((address) => (
                          <DropdownItem
                            key={address.address_id}
                            description={`${address.flat_no}, ${address.street}, ${address.state}`}
                            onClick={() => onSelectionChange(address)}
                            className="py-2"
                          >
                            <span className="font-medium text-sm">
                              {address.full_name}
                            </span>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>

                    <Link
                      href={`/user/${
                        safeUser?.customer_id ?? safeUser?.id ?? ""
                      }/addresses`}
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <FiPlus className="w-3 h-3" />
                      Add new
                    </Link>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Step 2: Payment Method Card */}
          <Card className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-2xl shadow-xl overflow-visible">
            <CardHeader className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-neutral-800/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  <FiCreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Payment Method</h2>
                  <p className="text-xs text-neutral-400">
                    Select your preferred way to pay
                  </p>
                </div>
              </div>
              <Chip size="sm" variant="flat" color="default" className="text-xs">
                Step 2
              </Chip>
            </CardHeader>

            <CardBody className="p-5">
              <RadioGroup
                value={paymentMethod}
                onValueChange={onPaymentMethodChange}
                classNames={{
                  wrapper: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                }}
              >
                <PaymentOptionRadio
                  value="cash"
                  title="Cash on Delivery"
                  description="Pay with cash at your doorstep upon arrival"
                  icon={
                    <HiOutlineBanknotes className="w-6 h-6 text-emerald-400" />
                  }
                />
                <PaymentOptionRadio
                  value="card"
                  title="Credit / Debit Card"
                  description="Fast & secure online checkout via Stripe"
                  icon={
                    <HiOutlineCreditCard className="w-6 h-6 text-sky-400" />
                  }
                />
              </RadioGroup>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Order Summary & Place Order Action */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <Card className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-2xl shadow-xl overflow-hidden">
            <CardHeader className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-neutral-800/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  <FiShoppingBag className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold">Order Summary</h2>
              </div>
              <Chip
                size="sm"
                variant="flat"
                color="primary"
                className="text-xs font-semibold"
              >
                {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
              </Chip>
            </CardHeader>

            {/* Scrollable Cart Items List with Overflow Indicator */}
            <CardBody className="p-4 relative">
              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="overflow-y-scroll scrollbar-hide max-h-[340px] pr-1 space-y-3"
              >
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

              {/* Scroll Down Indicator */}
              {canScrollDown && (
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none flex justify-center pb-2 pt-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <button
                    type="button"
                    onClick={handleScrollDown}
                    className="pointer-events-auto flex items-center justify-center w-7 h-7 rounded-full bg-neutral-900/95 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 shadow-xl transition-all animate-bounce"
                    aria-label="Scroll down to view more items"
                    title="More items below"
                  >
                    <FaChevronDown className="w-3 h-3" />
                  </button>
                </div>
              )}
            </CardBody>

            <Divider className="bg-neutral-800/80" />

            {/* Price Breakdown */}
            <CardFooter className="flex flex-col gap-4 p-5">
              <div className="w-full space-y-2.5 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span className="text-neutral-200 font-medium">
                    {formattedPrice}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Delivery</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <FiCheck className="w-3.5 h-3.5" /> FREE
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Taxes & Fees</span>
                  <span className="text-neutral-300">Included</span>
                </div>
                <Divider className="my-1 bg-neutral-800" />
                <div className="flex justify-between items-center text-base pt-1">
                  <span className="font-bold text-neutral-100">Total Payable</span>
                  <span className="text-xl font-extrabold text-primary">
                    {formattedPrice}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <Button
                color="primary"
                size="lg"
                className="w-full font-bold text-base py-6 shadow-lg shadow-primary/20 hover:opacity-95 transition-all"
                onClick={handlePlaceOrder}
                isLoading={paymentStatus === "loading"}
                startContent={
                  paymentStatus !== "loading" && <FiLock className="w-4 h-4" />
                }
              >
                {paymentMethod === "cash"
                  ? `Place Order • ${formattedPrice}`
                  : `Pay ${formattedPrice}`}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/60 w-full text-center">
                <div className="flex flex-col items-center gap-1 text-[11px] text-neutral-400">
                  <FiShield className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Secure SSL</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[11px] text-neutral-400">
                  <FiTruck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[11px] text-neutral-400">
                  <FiRotateCcw className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface PaymentOptionRadioProps {
  value: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PaymentOptionRadio: React.FC<PaymentOptionRadioProps> = ({
  value,
  title,
  description,
  icon,
}) => {
  return (
    <Radio
      value={value}
      classNames={{
        base: cn(
          "inline-flex m-0 w-full bg-neutral-950/60 hover:bg-neutral-900/80 items-start justify-between",
          "flex-row-reverse cursor-pointer rounded-xl gap-3 p-4 border border-neutral-800 transition-all",
          "data-[selected=true]:border-primary data-[selected=true]:bg-primary/5 data-[selected=true]:shadow-sm"
        ),
        label: "w-full",
      }}
    >
      <div className="flex items-start gap-3 w-full pr-2">
        <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-neutral-100">{title}</span>
          <span className="text-xs text-neutral-400 mt-0.5 leading-snug">
            {description}
          </span>
        </div>
      </div>
    </Radio>
  );
};
