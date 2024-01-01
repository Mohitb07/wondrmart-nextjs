"use client";

import { Button } from "@nextui-org/react";
import React from "react";

type CTAProps = {};

const CTA: React.FC<CTAProps> = () => {
  return (
    <div className="gap-3 flex flex-col">
      <Button  color="primary" variant="solid" fullWidth>
        Add to Cart
      </Button>
      <Button color="primary" variant="bordered" fullWidth>
        Buy Now
      </Button>
    </div>
  );
};
export default CTA;
