import { useState }from 'react'
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEventNote } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import VenueFilterSidebar from "./VenueFilterSidebar";


const Venue = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className='justify-center items-center p-15 '>
      <div className=''>
        <h1 className='font-poppins font-bold text-[48px] h-[88px] w-[479px] p-[8px] gap-[8px] ml-9'>Accessible Venues</h1>
        <p className='p-[8px] gap-[8px] h-[47px] w-[570px] font-poppins ml-9 '>Find venues with accessibilty features for your next event</p>
      </div>

       <div className='flex'>
       <div className=' flex relative   px-4'>
         <IoSearchSharp className="absolute left-12 top-[40px] text-blue-700 text-xl" />
          <input
           type="search"
           required
           placeholder="Search restaurants, parks,hotels, and more..."
           className="h-15 w-[1000px] pl-12 pr-28 text-sm mt-5 ml-[20px]  rounded-xl bg-white border focus:outline-none focus:ring-2 focus:ring-indigo-500"
         />
       </div>
       <button onClick={() => setIsFilterOpen(true)}
       className=' flex border-[1px] gap-1 p-5 pl-5 h-15 w-[170px] mt-5 rounded-[8px] text-sm pointer'><CiFilter  className='text-blue-700 text-2xl'/> Show filter</button>
        <VenueFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
       </div>
          <p className='font-bold mt-[70px] ml-[45px]'>Showing 4 Venues</p>
          <div className='flex flex-col gap-5 mt-[70px] my-10'> 
            <div className='flex'>
              <div className=' flex flex-col h-[610px] w-[380px] shadow-lg border border-gray-400 ml-7 rounded-[8px]'>
               <div className='relative'><div className='absolute top-[145px] left-4 flex rounded-2xl bg-[#FFFFFF] h-[30px] w-[70px] p-1 pl-[11px] gap-2  '><FaStar className='mt-[3px] text-[#E39000]'/><p className=''>4.5</p></div> <img src="https://s3-alpha-sig.figma.com/img/4fa4/9e80/c3e11aa0b6b2df90e834db9915266459?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Njf73CS1tVkFQnkkqc5Csvtjz~1aaQX3psa30C9ZfXyHfBQrdhLl4W6B3bIr7yY~4h3qwNhONqrOxryUa612fSAOR~wk3S9rCBe-lv9Sb4ihSJKAfx9UJlf6VrdBeRh7a-OCtFOrDYjYPhDxaQqYKgom-LMzcKfO6ynm2Q0GSOs5Hu9eAS~9vS2uz9E0CmWaIyG-sFHRUKlGLw3hIkIchoGF9mN~UeCXKicXjES9HWUHGPTTWSHCZ-wautC2nBEG-TSlRExPffYDZ7dD6b3r0ZqLUNP-yY1XxVK4qOL2efxu54XaNvbqWF70tHIJsj4Qa6mO-4D9qZsqoaW0qgXUxA__" alt="" className='h-[190px] w-full rounded-t-[8px]'/>
                </div>
                <div className='p-3'>
                  <h3 className=' font-poppins font-bold text-[24px]'>The savanna</h3>
                  <p className='text-[15px] mt-2'>A beautifully manicured gardend backdrop for</p>
                  <p className='text-[15px]'>weddings, business events, and private </p>
                  <p className='text-[15px]'>functions</p>
                  <div className='mt-7'>
                    <p className=' flex text-[15px] gap-2 '><CiLocationOn className='mt-1 text-blue-800'/>90 Giffard Rd, East Cantonments, Accra</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><MdOutlineEventNote className='mt-1  text-blue-800'/>Upcoming events : 3</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><IoTimeOutline className='mt-1  text-blue-800'/>Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm</p>
                  </div>
                   <div className='flex  gap-3 mt-5'>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB] w-[167px] h-[30px] p-[3px] rounded-2xl pl-[10px]'>Wheelchair accessible</p>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB]  w-[167px] h-[30px] p-[3px] rounded-2xl pl-[13px]'>Accessible restrooms</p>
                   </div>
                   <p className='text-[15px] bg-[#E0E0E4] h-[30px] w-[80px] rounded-2xl pl-[10px]  p-[3px] mt-3'>+2 more</p>
                   <button  onClick={() => navigate("/venuedetails1")} // Navigates to VenueDetails1 page
                    className='bg-black text-white h-[50px] w-[345px] mt-8 rounded-xl'>View Details</button>
                </div>
                  </div>
                  <div className=' flex flex-col h-[610px] w-[380px] shadow-lg border border-gray-400 ml-7 rounded-[8px]'>
                   <div className='relative'><div className='absolute top-[145px] left-4 flex rounded-2xl bg-[#FFFFFF] h-[30px] w-[70px] p-1 pl-[11px] gap-2  '><FaStar className='mt-[3px] text-[#E39000]'/><p className=''>4.5</p></div><img src="https://s3-alpha-sig.figma.com/img/6bb0/3540/470342164551f5f77d35c49f45342618?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rGAdb1l19Yo5mSzcY7HCdVbZEgGe307oNSq8~Bm2eT-5GmSJkM3uEg4Kr752BX4POKO3w2DInj14Px9o569TgVnQqyZ2~HYmYR7yMxM9CcDo~kpAwrK1URUcWcLAPahAexmniqPw8IFgplUs3Rwbm12tdEE75zLv1gk0whmUng-xyGt5DuUZ-a6NKz2xE5rwrZyt8RRAj4Vb3e9QriVJpMmpbCbwMrptzPx~hEeKmNIolKljta5EhtIbLZEdBzQDIXiPeC7LwuGCM6zBPLSmxTGX-GPVIWxGTqPrxXya8VzLxJ921SLm0c7Boga8ZyeihYkZPYkNKzczcre~QRBggQ__" alt="" className='h-[190px] w-full rounded-t-[8px]'/>
                   </div>
                <div className='p-3'>
                  <h3 className=' font-poppins font-bold text-[24px]'>Cleaver House</h3>
                  <p className='text-[15px] mt-2'>An elegant venue with ample outdoor space, </p>
                  <p className='text-[15px]'>perfect for weddings and other events. Located  </p>
                  <p className='text-[15px]'> at Barnes</p>
                  <div className='mt-7'>
                    <p className=' flex text-[15px] gap-2 '><CiLocationOn className='mt-1 text-blue-800'/>Road, Ridge 233, Accra, Ghana</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><MdOutlineEventNote className='mt-1  text-blue-800'/>Upcoming events : 8</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><IoTimeOutline className='mt-1  text-blue-800'/>Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm</p>
                  </div>
                   <div className='flex  gap-3 mt-5'>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB] w-[167px] h-[30px] p-[3px] rounded-2xl pl-[10px]'>Wheelchair accessible</p>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB]  w-[167px] h-[30px] p-[3px] rounded-2xl pl-[13px]'>Accessible restrooms</p>
                   </div>
                   <p className='text-[15px] bg-[#E0E0E4] h-[30px] w-[80px] rounded-2xl pl-[10px]  p-[3px] mt-3'>+6 more</p>
                   <button onClick={() => navigate("/venuedetails2")} // Navigates to VenueDetails2S page
                    className='bg-black text-white h-[50px] w-[345px] mt-8 rounded-xl'>View Details</button>
                  </div>
                  </div>
                  <div className=' flex flex-col h-[610px] w-[380px] shadow-lg border border-gray-400 ml-7 rounded-[8px]'>
                  <div  className='relative'><div className='absolute top-[145px] left-4 flex rounded-2xl bg-[#FFFFFF] h-[30px] w-[70px] p-1 pl-[11px] gap-2  '><FaStar className='mt-[3px] text-[#E39000]'/><p className=''>4.5</p></div><img src="https://s3-alpha-sig.figma.com/img/5ec8/ed06/3984e0a22171981a9e3d0a15b6de80ff?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PqqKhb9qiK-JfbzXg6L82oUmdPSpietrcJzRL68I~nfACnD8Pe--qSFIYvyq1aTUaix2kquo~Z0kYqa2Cq0y87VTok3rm95JKn2BKjIem-PNjo9no3A2Q2AEt~I95DyvsfCf1BJ1ovkBC60APfGTcJ14eX794YXazCGgPoJ5O~h1cXZgfCiAghEMyNYNhIXH2poO-S975p6hF4uIJMnDZKIdl49i6hpl~C1M-BXqj1JOweCEZJghEmQ-U63zGokMcYU1TrPVylK828apxkEy6Kqdwj~8NBaztrJbqj~XzhXS7Dho3SXx-idmxefJOmkNsPwaYNLa9pfXgV3LUNhLIA__" alt=""  className='h-[190px] w-full rounded-t-[8px]'/>
                   </div>
                  <div className='p-3'>
                  <h3 className=' font-poppins font-bold text-[24px]'> St. Giles Conference Centre</h3>
                  <p className='text-[15px] mt-2'>A beautifully manicured garden offering a </p>
                  <p className='text-[15px]'>sophisticated backdrop for weddings, business  </p>
                  <p className='text-[15px]'>events, and private functions</p>
                  <div className='mt-7'>
                    <p className=' flex text-[15px] gap-2 '><CiLocationOn className='mt-1 text-blue-800'/>90 Giffard Rd, East Cantonments, Accra</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><MdOutlineEventNote className='mt-1  text-blue-800'/>Upcoming events : 3</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><IoTimeOutline className='mt-1  text-blue-800'/>Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm</p>
                  </div>
                   <div className='flex  gap-3 mt-5'>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB] w-[167px] h-[30px] p-[3px] rounded-2xl pl-[10px]'>Wheelchair accessible</p>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB]  w-[167px] h-[30px] p-[3px] rounded-2xl pl-[13px]'>Accessible restrooms</p>
                   </div>
                   <p className='text-[15px] bg-[#E0E0E4] h-[30px] w-[80px] rounded-2xl pl-[10px]  p-[3px] mt-3'>+4 more</p>
                   <button onClick={() => navigate("/venuedetails3")} // Navigates to VenueDetails2S page
                   className='bg-black text-white h-[50px] w-[345px] mt-8 rounded-xl'>View Details</button>
                </div>
                  </div>
            </div>
            <div className=' flex flex-col h-[610px] w-[380px] shadow-lg border border-gray-400 ml-7 mt-7 rounded-[8px]'>
                <div  className='relative'><div className='absolute top-[145px] left-4 flex rounded-2xl bg-[#FFFFFF] h-[30px] w-[70px] p-1 pl-[11px] gap-2  '><FaStar className='mt-[3px] text-[#E39000]'/><p className=''>4.5</p></div><img src="https://s3-alpha-sig.figma.com/img/d8a2/a0d7/c9b27d402d48f6edba7c731a66423640?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YYja-1p9jsgxWtNm7eY9wtdKQI2PIuAKePCLkQwpyiT12MGadytQ2-NEPipHi8ehm1DeDYIl4Oq2GhCI40XZXSDFF1t8o6iZ-PnmRCYS-bCAJ~gEpolRdIwge3mD8goN5XBM9YikLtukiCaM3YvrN~O7M761m7suyPIh~hRcvftzMnTOB~86Fe4xGKHp1SDeezu8-Equ4oiIc7550YHLfI1vub1HX2a3TA4F1hkh4~Uw2alSizA9La3iGiLLp9IZ2I4uYKe0KCajs7McN1GauTtrLDE~0SsFmzs~VqUwZZbjrxmtoWErsGp~OU3~Ki-vYegTfpY4Dxg8M5hO5VglIg__" alt="" className='h-[190px] w-full rounded-t-[8px]'/>
                </div>
                <div className='p-3'>
                  <h3 className=' font-poppins font-bold text-[24px]'> Red Carpet Events Center</h3>
                  <p className='text-[15px] mt-2'>A beautifully manicured garden offering a </p>
                  <p className='text-[15px]'>sophisticated backdrop for weddings, business  </p>
                  <p className='text-[15px]'>events, and private functions</p>
                  <div className='mt-7'>
                    <p className=' flex text-[15px] gap-2 '><CiLocationOn className='mt-1 text-blue-800'/>90 Giffard Rd, East Cantonments, Accra</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><MdOutlineEventNote className='mt-1  text-blue-800'/>Upcoming events : 3</p>
                    <p className=' flex text-[15px] mt-2 gap-2'><IoTimeOutline className='mt-1  text-blue-800'/>Mon -Fri : 9am-9pm ,Sat -Sun : 10am-8pm</p>
                  </div>
                   <div className='flex  gap-3 mt-5'>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB] w-[167px] h-[30px] p-[3px] rounded-2xl pl-[10px]'>Wheelchair accessible</p>
                    <p className='text-blue-800  text-[15px] bg-[#D2DBEB]  w-[167px] h-[30px] p-[3px] rounded-2xl pl-[13px]'>Accessible restrooms</p>
                   </div>
                   <p className='text-[15px] bg-[#E0E0E4] h-[30px] w-[80px] rounded-2xl pl-[10px]  p-[3px] mt-3'>+4 more</p>
                   <button onClick={() => navigate("/venuedetails4")} // Navigates to VenueDetails2S page
                   className='bg-black text-white h-[50px] w-[345px] mt-8 rounded-xl'>View Details</button>
                </div>
                  </div>
          </div>
    </div>
  )
}

export default Venue 





