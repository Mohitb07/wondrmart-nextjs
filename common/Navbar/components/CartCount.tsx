import useGetCartCount from "@/hooks/useGetCartCount";
import Link from "next/link";
import { LiaShoppingBagSolid } from "react-icons/lia";

const CartCount = () => {
  const { data: count } = useGetCartCount();

  return (
    <Link href="/cart">
      <div className="relative mr-4">
        <LiaShoppingBagSolid className="text-3xl" />
        {!!count && count > 0 && (
          <div className="text-sm text-black font-semibold absolute top-0 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center">
            <p>{count}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartCount;
