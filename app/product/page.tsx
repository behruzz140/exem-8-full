"use client"
import React, { useEffect, useState } from "react";
import Container from "../../components/container/page";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";
import { Avatar, Button, Form, Tooltip } from "antd";
import Image from "next/image";
import Car from "@/images/car.svg";
import Shop from "@/images/shop.svg";
import Time from "@/images/time.svg";
import { UserOutlined } from "@ant-design/icons";
import Banner3 from '@/images/banner3.png'
import Swiper from '../../components/swiper/page'
import useProductStore from "@/store/products/page";
import { ProFormTextArea } from "@ant-design/pro-components";
import useCommentStore from "@/store/commets/page";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Rate } from 'antd';
import axios from "axios";
import ADSStore from "@/store/ads/page";


function Product() {
  const [images, setImages] = useState([]);
  const [comments, setcommets] = useState("Telfon xususiyatlari");
  const {products, getProductsId} = useProductStore();
  const {getCommets, commets, postCommets} = useCommentStore()
  const [detail, setDetail] = useState({})
  const [product, setProduct]:any = useState({})
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [value, setValue] = useState(3);
  const {banner, getBanner} = ADSStore()
  async function handleSubmit(value:any){
    value.product_id = Number( Cookies.get('product_id'))
    const response = await postCommets(value)
    if(response.status == 201){
      toast.success('Comment shared successfully')
    }
  }

  async function getProductsID() { 
    const product_id = Number(Cookies.get('product_id'));
    const response = await getProductsId({ id: product_id });
    setDetail(response?.data?.data?.product_detail);
    setProduct(response?.data?.data?.product);
    setValue(response?.data?.data?.product?.rate)
  
    if (response?.data?.data?.product?.images) {
      let arr = response.data?.data?.product?.images?.map((e:any) => ({
        original: e,
        thumbnail: e
      }));
      setImages(arr);
    }
  }

  useEffect(() => {
    const product_id = Number( Cookies.get('product_id'))
    getCommets({id: product_id})
    getProductsID()
    getBanner()
  },[])

  const renderCustomImage = (item:any) => {
    return (
      <div className="image-gallery-image">
        <img src={item.original} style={{ maxWidth: '400px', maxHeight: '560px', width: '100%', height: 'auto', margin: '0 auto' }} />
      </div>
    );
  };

  async function handleRate(e:any){
    setValue(e)
    const product_id = Number( Cookies.get('product_id'))
    const payload = {
      product_id: product_id,
      rate: e
    }
    const response = await axios.post('https://ecomapi.ilyosbekdev.uz/products/rate', payload, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('access_token')}`
      }
    })
    if(response?.data?.statusCode === 200){
      toast.success('Thanks for rate!')
    }
  }

  return (
    <>
    <ToastContainer/>
          <div>
            <Container>
              <p className="flex gap-[10px] mt-[20px]">
                <span className="block px-[18px] py-[6px] rounded bg-[#F5F5F5] text-[#240E0066] font-medium">
                  Bosh sahifa
                </span>
                <span className="block px-[18px] py-[6px] rounded bg-[#F5F5F5] text-[#240E0066] font-medium">
                  Smartfonlar
                </span>
                <span className="block px-[18px] py-[6px] rounded bg-[white] font-medium">
                  Apple iPhone 13 128GB Moviy
                </span>
              </p>
            </Container>
          </div>
          <div className="mt-[24px]">
            <Container>
              <div className="flex justify-between max-md:flex-col max-md:gap-[10px]">
                <div className="w-[700px] bg-white rounded-md h-[560px] max-sm:w-[345px] max-sm:mx-auto max-sm:h-[300px]">
                  <ImageGallery
                    renderItem={renderCustomImage}
                    items={images}
                    infinite={true}
                    thumbnailPosition="left"
                    showFullscreenButton={false}
                    showPlayButton={false}
                    autoPlay={true}
                    showNav={false}
                  />
                </div>
                <div className="w-[600px] bg-white h-[560px] p-[40px] rounded-md max-sm:max-w-96 max-sm:h-[700px]">
                  <h3 className="text-[24px] font-bold mb-[26px]">
                    {product?.name}
                  </h3>
                  <div className="flex items-center gap-[12px]">
                    <p className="text-[16px] text-[#240E00CC] font-medium mr-3">
                      Rang:
                    </p>
                    <div className="w-[24px] h-[24px] bg-[#9747FF] rounded-full cursor-pointer"></div>
                    <div className="w-[24px] h-[24px] bg-[#3472ED] rounded-full cursor-pointer"></div>
                    <div className="w-[24px] h-[24px] bg-[#D55200] rounded-full cursor-pointer"></div>
                    <div className="w-[24px] h-[24px] bg-[#DADADA] rounded-full cursor-pointer"></div>
                    <div className="w-[24px] h-[24px] bg-[#FEDACB] rounded-full cursor-pointer"></div>
                  </div>
                  <p className="text-[16px] text-[#240E00CC] font-medium mr-3 mt-[42px] mb-[36px]">
                    Narx:{" "}
                    <span className="text-[28px] font-bold text-[#240E00CC]">
                      {product?.price} so‘m
                    </span>
                  </p>
                  <p className="mb-[8px] py-[16px] px-[32px] text-[16px] font-medium text-[#240E00CC] bg-[#F0F0F0] rounded-md">
                    Oyiga {Math.ceil(product?.price / 12)} so‘mdan 12/oyga muddatli to ‘lov
                  </p>
                  <div className="flex justify-between mb-[20px]">
                    <Button className="single_btn">Savatga qo ‘shish</Button>
                    <Button className="single_btn2">Xarid qilish</Button>
                  </div>
                  
                  <Rate tooltips={desc} onChange={(e) => handleRate(e)} value={value} className="mb-[20px]"/>
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex items-center gap-[16px]">
                      <Image src={Car} alt="Car Logo" />
                      <p className="text-[18px] font-medium text-[#240E00CC]">
                        Yetkazib berish O’zbekiston bo’ylab
                      </p>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <Image src={Shop} alt="Car Logo" />
                      <p className="text-[18px] font-medium text-[#240E00CC]">
                        Do’kondi o’zidan olib ketishingiz mumkin
                      </p>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <Image src={Time} alt="Car Logo" />
                      <p className="text-[18px] font-medium text-[#240E00CC]">
                        Tahminiy yetkazib berish 1 kundan 3 kungacha
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className="flex gap-[30px] mt-[40px]">
                <button
                  onClick={() => setcommets("Telfon xususiyatlari")}
                  className={`${
                    comments == "Telfon xususiyatlari"
                      ? "bg-[#FF6F14] text-white duration-300"
                      : "bg-white text-[black] duration-300"
                  } py-[14px] px-[32px] rounded-[10px font-semibold rounded-[10px]`}
                >
                  Telefon xususiyatlari
                </button>
                <button
                  onClick={() => setcommets("Mijozlarni fikri")}
                  className={`${
                    comments == "Mijozlarni fikri"
                      ? "bg-[#FF6F14] text-white duration-300"
                      : "bg-white text-[black] duration-300"
                  } py-[14px] px-[32px] rounded-[10px font-semibold rounded-[10px]`}
                >
                  Mijozlarni fikri
                </button>
              </div>
            </Container>
          </div>
    
          <div>
            <Container>
              <div className="flex justify-between items-start max-lg:flex-col">
                <div className="w-[820px] max-sm:w-[375px] max-sm:mx-auto">
                  {comments == "Telfon xususiyatlari" ? (
                    <div className="py-[60px] px-[80px] max-sm:px-[10px]">
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Brend
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Vivo
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          CIM kartalar soni
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          2
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          O’lchamlari
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          75,09х155,11х8,28
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Modeli
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Redmi T12
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Akumulyator hajmi
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          4000 amp
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Yadrolar soni
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          8
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Tezkor xotira RAM
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          6 GB
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Ichki xotira ROM
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          128 GB
                        </p>
                      </div>
                      <div className="flex justify-between border-b-[3px] border-dashed pb-[11px] pt-[9px]">
                        <p className="w-[200px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          Protsessori
                        </p>
                        <p className="w-[300px] text-[18px] font-medium text-[#240E00CC] max-sm:text-[13px]">
                          MediaTek Helio P35 (MT6765)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-[40px]">
                       <Form onFinish={(value) => handleSubmit(value)}>
                            <ProFormTextArea
                              placeholder={'Comentariya qoldiring'}
                              name={'comment'}
                            />
                            <Button htmlType="submit" className="single_btn" style={{width: '120px', display: 'flex'}}>Yuborish</Button>
                       </Form>
                      </div>
                      <div className="flex flex-col gap-[20px] mt-[40px] mb-[50px]">
                        {
                          commets.slice(0,5).map((e:any,i:number) => {
                            return (
                              <div key={i} className="w-[100%] bg-white py-[30px] px-[40px] rounded-xl flex gap-[50px] items-start">
                                <div className="w-[15%]">
                                <Tooltip title={`${e?.user_id?.last_name} ${e?.user_id?.first_name}`} placement="top">
                                <Avatar
                                    className="w-[60px] h-[60px]"
                                    style={{ backgroundColor: "#87d068" }}
                                    icon={<UserOutlined />}
                                  />
                                </Tooltip>
                                </div>
                                <div className="w-[70%}">
                                  <h4 className="font-bold text-[24px] mb-[10px] max-sm:text-[18px]">{e?.user_id?.last_name} {e?.user_id?.first_name}</h4>
                                  <p className="font-medium text-[#240E00CC] text-[16px] max-sm:text-[13px]">{e?.comment}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                     
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-[520px] h-[542px] p-[50px]">
                    {
                      banner?.filter((e:any) => {
                        return e.position == '3'
                      }).splice(0,1).map((e,i) => {
                        return (
                          <img key={i} className="w-full" src={e.image} alt="Banner"/>
                        )
                      })
                    }
                </div>
              </div>
            </Container>
          </div>


      <div className="mt-[120px]">
        <Container>
          <h1 className='font-bold text-[32px] mb-[24px] max-sm:text-[20px]'>Aksiyadagi mahsulotlar</h1>
          <Swiper data={products}/>
        </Container>
      </div>
    </>
  );
}

export default Product;