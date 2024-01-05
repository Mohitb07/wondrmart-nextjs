"use client";

import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { IconType } from "react-icons";


type AccountCTAProps = {
    Logo: React.ReactNode;
    title: string;
    subtitle: string;
};

const AccountCTA: React.FC<AccountCTAProps> = ({Logo, title = '', subtitle = ''}) => {
  return (
    <Card isPressable>
      <CardBody>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div>
            {Logo}
          </div>
          <div className="leading-7 text-center lg:text-left">
            <h2 className="text-lg lg:text-xl">{title}</h2>
            <span className="text-base lg:text-lg text-slate-400">{subtitle}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default AccountCTA;
