"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/container/page";
import Card from "../../components/card/page";
import Swiper from "../../components/swiper/page";
import UseProductStore from "../../store/products/page";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import useCartsStore from "@/store/card/page";
import Cookies from "js-cookie";

export default function Page() {
  const { products, getProducts } = UseProductStore();
  const { getCards, Cards, countCarts } = useCartsStore();
  const [cost, setCost] = useState(0);

  useEffect(() => {
    getProducts();
    const id = Number(Cookies.get("id"));
    getCards({ id });
    let son = 0;
    Cards.forEach((e: any) => {
      son += Number(e?.product_id?.price);
    });
    setCost(son);
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <Container>
          <p className="flex gap-[10px] mt-[20px]">
            <span className="block px-[18px] py-[6px] rounded bg-[#F5F5F5] text-[#240E0066] font-medium">
              Bosh sahifa
            </span>
            <span className="block px-[18px] py-[6px] rounded bg-[white] font-medium">
              Savat
            </span>
          </p>
        </Container>
      </div>

      <div className="mt-[51px]">
        <Container>
          <div className="flex justify-between max-xl:flex-col max-xl:justify-center max-xl:items-center">
            <div className="flex flex-col gap-4">
              {Cards.map((e, i) => {
                return <Card key={i} datas={e} />;
              })}
            </div>
            <div className="w-[440px] h-[100%] p-[40px] bg-white rounded-xl max-sm:w-[350px]">
              <h4 className="font-bold text-[24px] mb-[17px] ">
                Sizni xaridlaringiz
              </h4>
              <p className="#240E00CC text-[16px]">
                Mahsulotlar:{" "}
                <span className="text-[18px] font-bold mb-[10px] ">
                  {countCarts} ta
                </span>
              </p>
              <p className="#240E00CC text-[16px]">
                Jami summa:{" "}
                <span className="text-[28px] font-bold ">{cost} so‘m</span>
              </p>
              <Link href={"/clearance"}>
                <button
                  disabled={countCarts == 0}
                  className="w-[100%]  bg-[#D55200] text-white rounded-md font-medium h-[54px]  mt-[24px]"
                >
                  Xaridni rasmiylashtirish
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className="mt-[60px]">
        <Container>
          <h1 className="font-bold text-[32px] mb-[24px] max-sm:text-[20px]">
            Aksiyadagi mahsulotlar
          </h1>
          <Swiper data={products} />
        </Container>
      </div>
    </>
  );
}
