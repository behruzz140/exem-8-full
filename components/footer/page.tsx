"use client"
import React from 'react'
import Container from '../container/page'
import Logo from '../../images/LOGO.png'
import Image from 'next/image'
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Cookies from 'js-cookie'

function page() {
  return (
    <footer className='mt-[60px]'>
        <Container>
            <div className='flex bg-white pt-[60px] px-[80px] rounded-xl h-[400px] justify-between max-sm:flex-col'>
                <div>
                    <Image src={Logo} alt='Logo' width={240} height={68}/>
                    <h1 className='text-[18px] font-bold mt-[32px] mb-[17px]'>Bizni ijtimoiy tarmoqlar</h1>
                    <div className='flex gap-[12px]'>
                    <a href="https://instagram.com/behruzz_140" target="_blank" rel="noopener noreferrer">
      <InstagramOutlined
        style={{
          fontSize: '30px',
          width: '50px',
          height: '44px',
          backgroundColor: '#F0F0F0',
          padding: '12px 15px',
          cursor: 'pointer',
          borderRadius: '10px',
          transition: 'color 0.2s',
        }}
        className='hover:text-red-500'
      />
    </a>
                        <FacebookOutlined className='text-[30px] w-[50px] h-[44px] bg-[#F0F0F0] py-[12px] px-[15px] cursor-pointer hover:text-[blue] duration-200 rounded-lg' />
                        <TwitterOutlined className='text-[30px] w-[50px] h-[44px] bg-[#F0F0F0] py-[12px] px-[15px] cursor-pointer hover:text-[#76bdef] duration-200 rounded-lg' />
                        <a href="https://wa.me/998770640682" target="_blank" rel="noopener noreferrer">
      <WhatsAppOutlined
        className='text-[30px] w-[50px] h-[44px] bg-[#F0F0F0] py-[12px] px-[15px] cursor-pointer hover:text-[#6df56d] duration-200 rounded-lg'
      />
    </a>
                    </div>
                </div>
                 <div>
                    <h2 className='text-[18px] font-bold '>Tashkilot haqida</h2>
                    <ul className='mt-[20px]'>
                        <li onClick={() => Cookies.set('aboutus', 'Texnoark haqida')} className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'><Link href={'/about'}>Texnoark haqida</Link></li>
                        <li onClick={() => Cookies.set('aboutus', 'Muddatli to’lov')} className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'><Link href={'/about'}>Muddatli to’lov</Link></li>
                        <li onClick={() => Cookies.set('aboutus', 'Yordam')} className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'><Link href={'/about'}>Yordam</Link></li>
                        <li onClick={() => Cookies.set('aboutus', 'Tovarlarga kafolat')} className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'><Link href={'/about'}>Tovarlarga kafolat</Link></li>
                        <li onClick={() => Cookies.set('aboutus', 'To‘lov usullari')} className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'><Link href={'/about'}>To‘lov usullari</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-[18px] font-bold '>Kategoriya</h2>
                    <ul className='mt-[20px]'>
                        <li className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'>Televizorlar</li>
                        <li className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'>Noutbook va Kompyuterlar</li>
                        <li className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'>Smartfonlar</li>
                        <li className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'>Kir yuvish mashinasi</li>
                        <li className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'>Muzlatgichalar</li>
                        <li className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'>Konditsioner</li>
                        <li className='text-[14px] font-medium text-[#240E0099] mb-[16px] hover:text-[black] cursor-pointer'>Pech va Gazplita</li>
                    </ul>
                </div>
                <div className='w-[290px]'>
                    <h2 className='text-[18px] font-bold '>Biz bilan aloqa</h2>
                    <p className='text-[#240E0099] font-medium mt-[20px]'><span className='text-[black]'>Manzil:</span> 100052, Uzbekiston Respublikasi, Toshkent shahri, Bodomzor yo‘li 1-tor ko‘chasi, 72</p>
                    <p className='text-[#240E0099] font-medium mt-[16px] mb-[20px]'><span className='text-[black]'>TelefonRaqam;  :</span> +998 77 064 06 82</p>
                    <p className='text-[#240E0099] font-medium'><span className='text-[black]'>Email :</span> behruztillayev0724@gmail.com</p>
                </div>
            </div>
        </Container>
    </footer>
  )
}

export default page