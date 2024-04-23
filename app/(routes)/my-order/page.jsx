"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment';
import MyOrderItem from './_components/MyOrderItem';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';



function MyOrder() {


    const jwt = sessionStorage.getItem('jwt');
    const user= JSON.parse(sessionStorage.getItem('user'));
    const router= useRouter(); 
    const [orderList,setOrderList] = useState([]);
    const [alluserinfo,setalluserinfo] = useState([]);
    const [myinfo,setamyinfo] = useState();
    const [myaccount,setmyaccount] = useState();
    const [bssuidinfo, setbssuidinfo] = useState([]);
    const [finalPoint,setFinalPoint] = useState(0);
    const [bsslength,setbsslength] = useState();
    const [mybssuidinfo,setmybssuidinfo] = useState();
    const [mypakgs,setmypakgs] = useState()



    useEffect(()=>{
            if(!jwt)
            {
                router.replace('/');
            }
            getMyOrder();
            getAllUserInfo();
            getBssInfo();
            updateUserPPL();
            
        
    },[]);


    const getAllUserInfo= async()=>{
      const getAllUserInfo_= await GlobalApi.getAllUserData();
      setalluserinfo(getAllUserInfo_)

    }

    const getMyOrder= async()=>{
        const orderList_=await GlobalApi.getMyOrder(user.id,jwt);
        //console.log(orderList_);
        setOrderList(orderList_);
    }
    const getBssInfo= async()=>{
      const getBssInfo_=await GlobalApi.getBssUser();
      console.log(getBssInfo_.length);
      setbsslength(getBssInfo_.length);
  }


  // const getNextUserData=async()=>{
    
  //   const getNextUserData_= await GlobalApi.getNextUser(5);
    
  //   console.log(getNextUserData_);
    
  // }

    useEffect(()=>{
      alluserinfo.forEach(element => {
        setbssuidinfo(element.bssuid);
      })
    },[alluserinfo])

    // const getMyInfo= async()=>{
    //   const getMyInfo_= await GlobalApi.getMyData(user.id);
    //   console.log(getMyInfo_.accounttype);
      
    //   setmybssuidinfo(getMyInfo_.bssuid);
    //   setmyaccount(getMyInfo_.accounttype);
    //   console.log(getMyInfo_.mypackage)
    //   setamyinfo(getMyInfo_)

    //   try{
    //     console.log(getMyInfo_.bssuid);
    //     const getNextUserData_= await GlobalApi.getNextUser(getMyInfo_.bssuid + 1);
    //     console.log(getNextUserData_);
    //     getNextUserData_.forEach(element => {
    //       console.log(element);
    //       console.log(element.mypackage);
    //       console.log(getMyInfo_.mypackage + element.mypackage);
    //       updateNextPkg(getMyInfo_.mypackage + element.mypackage);
    //     })
        
    //   }
    //   catch(err){
    //     toast(err);
    //   }

    // }
    // This pages scripts

    useEffect(()=>{
      let totalpoints=0;
      orderList.forEach(element => {
        if((element.orderStatus).toString() == 'Complete'){
          totalpoints = totalpoints + parseInt(element.totalPoint)
          if(totalpoints >= 35)
          {
            let pkg = parseInt(totalpoints/35);
            console.log(pkg)

            const getMyInfo= async()=>{
              const getMyInfo_= await GlobalApi.getMyData(user.id);
              console.log(getMyInfo_.accounttype);
              
              if(getMyInfo_.accounttype.includes("bssaccount")){
                console.log(getMyInfo_.accounttype.includes("bssaccount"))
                try{
                  const getNextUserData_= await GlobalApi.getNextUser(getMyInfo_.bssuid + 1);
                  getNextUserData_.forEach(element => {
                    //console.log(element);
                    //console.log(element.mypackage);
                    console.log(pkg + element.mypackage);
                    //updateNextPkg(pkg + element.mypackage);
                    let otherpkg = pkg + element.mypackage;
                    levelandmoney(otherpkg)
                    //console.log(otherpkg)
                    updatePointOnly(totalpoints,otherpkg);
                    
                  })
                }
                catch(err){
                    updatePointOnly(totalpoints,pkg);
                    levelandmoney(pkg);
                    toast(err);
                }
              }
              else{
                newUserInfo(totalpoints,bsslength,pkg);
                levelandmoney(pkg);
              }
            }
            getMyInfo();
          }
        }
      });
      setFinalPoint(totalpoints)
  },[orderList])

  

  const updateLevelANDMoney=(tLevel,tMoney)=>{
    axios
    .put('https://ecomerceadmin.onrender.com/api/users/' + user.id + '/?populate', {
      
        mylevel: tLevel,
        mymoney: tMoney,
      
    })
    .then(response => {
      console.log(response);
    });
  }
  


const updatePointOnly=(totalpoints,pkgs)=>{
  axios
  .put('https://ecomerceadmin.onrender.com/api/users/' + user.id + '/?populate', {
    
      mypoint: totalpoints,
      mypackage:pkgs,
      
    
  })
  .then(response => {
    
    console.log(response);
  });
}


const newUserInfo=(totalpoints,bssuids,pkgs)=>{
  axios
  .put('https://ecomerceadmin.onrender.com/api/users/' + user.id + '/?populate', {
    
      mypoint:totalpoints,
      accounttype:'bssaccount',
      bssuid:bssuids + 1,
      mypackage:pkgs,

    
  })
  .then(response => {
    console.log(response);
  });
}


const levelandmoney=(pack)=>{
  

  if(pack == 2){
   
    let levels= 1;
    let moneys= 0;
    updateLevelANDMoney(levels,moneys);
    console.log(levels+"  "+ moneys)

  } 
  else if(pack == 4){
    
    let levels = 2;
    let moneys= 0+3;

    updateLevelANDMoney(levels,moneys);
    console.log(levels+"  "+ moneys)
  }
  else if(pack == 8){
    let levels=3;
    let moneys= 3+4;
    updateLevelANDMoney(levels,moneys);
    console.log(levels+"  "+ moneys)
  }
  else if(pack == 16){

    let levels=4;
    let moneys=3+4+8;
    updateLevelANDMoney(levels,moneys);
    console.log(levels+"  "+ moneys)
    
  }
  else if(pack == 32){
    let levels=5;
    let moneys=3+4+8+15;
    updateLevelANDMoney(levels,moneys);
   
  }
  else if(pack == 64){
    let levels=6;
    let moneys=3+4+8+15+32;
    updateLevelANDMoney(levels,moneys);
    
  }
  else if(pack == 128){
    let levels=7;
    let moneys=3+4+8+15+32+60;
    updateLevelANDMoney(levels,moneys);

  }
  else if(pack == 256){
    let levels=8;
    let moneys=3+4+8+15+32+60+100;
    updateLevelANDMoney(levels,moneys);
    
  }
  else if(pack == 512){
    let levels=9;
    let moneys=3+4+8+15+32+60+100+250;
    updateLevelANDMoney(levels,moneys);
   
  }
  else if(pack == 1024){
    let levels=10;
    let moneys=3+4+8+15+32+60+100+250+510;
    updateLevelANDMoney(levels,moneys);

  }
  else if(pack == 2048){
    let levels=11;
    let moneys=3+4+8+15+32+60+100+250+510+1025;
    updateLevelANDMoney(levels,moneys);

  }
  else if(pack == 4096){
    let levels=12;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050;
    updateLevelANDMoney(levels,moneys);

  }
  else if(pack == 8192){
    let levels=13;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050;
    updateLevelANDMoney(levels,moneys);
    
  }
  else if(pack == 16384){
    let levels=14;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200;
    updateLevelANDMoney(levels,moneys);
    
  }
  else if(pack == 32768){
    let levels=15;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000;
    updateLevelANDMoney(levels,moneys);
    
  }
  else if(pack == 65536){
    let levels=16;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000;
    updateLevelANDMoney(levels,moneys);
   
  }
  else if(pack == 131072){
    let levels=17
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000;
    updateLevelANDMoney(levels,moneys);

  }
  else if(pack == 262144){
    let levels=18;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000;
    updateLevelANDMoney(levels,moneys);

  }
  else if(pack == 524288){
    let levels=19;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000;
    updateLevelANDMoney(levels,moneys);
  }
  else if(pack == 1048576){
    let levels=20;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000;
    updateLevelANDMoney(levels,moneys);
  }
  else if(pack == 2097152){
    let levels=21;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000;
    updateLevelANDMoney(levels,moneys);
  }
  else if(pack == 4194304){
    let levels=22;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000+1500000;
    updateLevelANDMoney(levels,moneys);
  }

  else if(pack == 8388608){
    let levels=23;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000+1500000+2000000;
    updateLevelANDMoney(levels,moneys);
  }

  else if(pack == 16777216){
    let levels=24;
    let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000+1500000+2000000+5000000;
    updateLevelANDMoney(levels,moneys);
  }


}




// const updateNextPkg=(pkg)=>{
//   axios
//   .put('http://localhost:1337/api/users/' + user.id + '/?populate', {
    
//       mypackage:pkg,
    
//   })
//   .then(response => {
//     console.log(response);
//   });
// }

// const updateUserTypeNormal=(totalpoints)=>{
//   axios
//   .put('http://localhost:1337/api/users/' + user.id + '/?populate', {
    
//     mypoint: totalpoints,
//     accounttype: 'normalaccount',

    
//   })
//   .then(response => {
//     console.log(response);
//   });
// }


const updateUserPPL=()=>{

  let h = parseInt(finalPoint)
  let v = parseInt(h/35)
  console.log(v)
    
}




// const setLogicUser=(mpoint)=>{
//   const logicInfo={
//     data:{
//       mypoint:mpoint,
//     }
//   }
//   GlobalApi.logicalUser(logicInfo,jwt);
// }



// axios.get('http://localhost:1337/api/users?filters[bssuid][$null]').then(response => {
//   console.log(response.data);
// });


// axios.get('http://localhost:1337/api/users/8',{
//   headers:{
//       Authorization: 'Bearer ' + jwt
//   }
// }).then(response => {
//   console.log('Try to get user info ' + response.data);
// });

// const pointCheaking=(data)=>{
//   axios
//   .put('http://localhost:1337/api/levels/13/?populate=point', {
    
//       data:{
//         attributes:{
//           point:data
//         }
//       }
    

//   })
//   .then(response => {
    
//     console.log(response);
//   });
// }



// const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Make a request to your Strapi API endpoint
//         const response = await axios.get('http://localhost:1337/api/users/8/?populate=*'); // Adjust the endpoint URL as per your setup
//         console.log(response.data);
//         setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

  return (
    <div>
      <h2 className='p-3 bg-primary text-xl font-bold text-center'>My Orders</h2>
      <div className='py-8 mx-7 md:mx-20'>
        <h2 className='text-3xl font-bold text-primary'>Order History</h2>
        <div className='flex items-center grap-2'>
          <h2 className='font-bold text-primary'><span>Total Point: {finalPoint} </span></h2>
          {/* <h2 className=' text-primary'><span>Pkg: {finalPoint} </span></h2>
          <h2 className=' text-primary'><span>Level: {finalPoint} </span></h2> */}
        </div>
        <div className='w-full'>
          {orderList.map((item,index)=>(

              <Collapsible key={index}>
                <CollapsibleTrigger>
                  <div className=' border p-2 bg-slate-100 flex justify-between gap-10 mt-5 '>
                    <h2 className='font-bold mr-2'>Order Date:<span> {moment(item?.createdAt).format('DD/MM/YYYY')}</span> </h2>
                    <h2 className='font-bold mr-2'>Total Amount:<span> {item?.totalOrderAmount}</span></h2>
                    {/* <h2 className='font-bold mr-2'>Total Point:<span> {item?.totalPoint}</span></h2> */}
                    <h2 className='font-bold mr-2'>Status:<span> {item?.orderStatus}</span></h2>                              
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.orderItemList.map((orderItem,index_)=>(
                      <MyOrderItem orderItem={orderItem} key={index_}/>
                  ))}
                </CollapsibleContent>
              </Collapsible>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default MyOrder