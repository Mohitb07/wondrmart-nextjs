"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Divider,
} from "@nextui-org/react";
import ProductServices from "../../Services";


type CardCTAProps = {};

const CardCTA: React.FC<CardCTAProps> = () => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex items-start gap-2 justify-center">
        <ProductServices/>
      </CardHeader>
      <Divider className="my-1"/>
      <CardBody className="overflow-visible py-2">
        <div className="gap-3 flex flex-col">
          <Button color="primary" variant="solid" fullWidth>
            Add to Cart
          </Button>
          <Button color="primary" variant="bordered" fullWidth>
            Buy Now
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default CardCTA;
