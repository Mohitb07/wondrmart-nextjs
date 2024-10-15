"use client";

import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type AccountCTAProps = {
  Logo: React.ReactNode;
  title: string;
  subtitle: string;
  userId: string;
  navigateTo?: string;
};

const AccountCTA: React.FC<AccountCTAProps> = ({
  Logo,
  title = "",
  subtitle = "",
  userId,
  navigateTo = "",
}) => {
  const router = useRouter();

  // const navigationHandler = () => {
  //   router.push(`/user/${userId}/${navigateTo}`);
  // };

  return (
    <Card as={Link} isPressable href={`/user/${userId}/${navigateTo}`}>
      <CardBody>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div>{Logo}</div>
          <div className="leading-7 text-center lg:text-left">
            <h2 className="text-lg lg:text-xl">{title}</h2>
            <span className="text-base lg:text-lg text-slate-400">
              {subtitle}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default AccountCTA;
