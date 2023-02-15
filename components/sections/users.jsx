import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SVG } from '../index';
import { useRouter } from 'next/router';

export const PersonalInfo = ({ userData }) => {
   const router = useRouter();
   console.log(userData)
   const details = [
      { title: 'Phone Number', value: userData.phone_number },
      { title: 'Email', value: userData.email },
      { title: 'Date of Birth', value: userData.date_of_birth }, // '23 January, 1998'
      { title: 'Gender', value: userData.gender },
      { title: 'Address 1', value: userData.null },
      { title: 'Address 2', value: userData.null },
      { title: 'City', value: userData.null },
      { title: 'State', value: userData.null },
      { title: 'Country', value: userData.null },
   ];
  
   const handleDeactivateAccount = async () => {
      const id = userData.id
      console.log(id)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;
      const deviceToken = process.env.NEXT_PUBLIC_DEVICE_TOKEN;

      const instance = axios.create({
         baseURL: `${baseUrl}`,
         headers: {
            Authorization: `Bearer ${bearerToken} `,
            "device-token": deviceToken
         }
      });
     
      await instance
         .post(`/api/v1/admin/users/delete/${id}`, {status: 'deactivated'})
         
         .then((res) => {
            console.log(res);
            router.push('/users')
            // router.replace(router.asPath)
            toast.success('User deactivated successfully');
            

            return res.data
            
         })
         .catch((err) => {
            console.log(err);
           
         });
   };

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}

         <div className='start py-4'>
            <Button
               startIcon={<SVG.WarningIcon />}
               onClick={handleDeactivateAccount}
               className='bg-[#CF4655] normal-case hover:bg-[#ab313f] p-3 rounded-lg text-white center gap-2'
            >
               Disable Account
            </Button>
         </div>
      </div>
   );
};

export const PersonalSaving = ({ userData }) => {
   console.log(userData)
   const details = [
      { title: 'Safe method', value: userData?.name },
      { title: 'Fund source', value: userData?.null },
      { title: 'Withdrawal type', value: userData?.null },
      { title: 'Withdrawal account', value: userData?.null },
      { title: 'Current balance', value: userData?.balance },
   ];
   // console.log(userData.name)
   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const GroupSaving = ({ userData = {} }) => {
   const details = [
      { title: 'Group name', value: userData.null },
      { title: 'Payment frequency', value: userData.null },
      { title: 'Member limit', value: userData.null },
      { title: 'Target amount', value: userData.null },
      { title: 'Monthly deposit', value: userData.null },
      { title: 'Debit day', value: userData.null },
      { title: 'Start day', value: userData.null },
      { title: 'Stop date', value: userData.null },
      { title: 'Withdrawal type', value: userData.null },
      { title: 'Withdrawal account', value: userData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const FixedSaving = ({ userData = {} }) => {
   const details = [
      { title: 'Group name', value: userData.null },
      { title: 'Payment frequency', value: userData.null },
      { title: 'Member limit', value: userData.null },
      { title: 'Target amount', value: userData.null },
      { title: 'Monthly deposit', value: userData.null },
      { title: 'Debit day', value: userData.null },
      { title: 'Start day', value: userData.null },
      { title: 'Stop date', value: userData.null },
      { title: 'Withdrawal type', value: userData.null },
      { title: 'Withdrawal account', value: userData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const GoalSaving = ({ userData = {} }) => {
   const details = [
      { title: 'Group name', value: userData.null },
      { title: 'Payment frequency', value: userData.null },
      { title: 'Member limit', value: userData.null },
      { title: 'Target amount', value: userData.null },
      { title: 'Monthly deposit', value: userData.null },
      { title: 'Debit day', value: userData.null },
      { title: 'Start day', value: userData.null },
      { title: 'Stop date', value: userData.null },
      { title: 'Withdrawal type', value: userData.null },
      { title: 'Withdrawal account', value: userData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const ThriftSaving = ({ userData = {} }) => {
   const details = [
      { title: 'Group name', value: userData.null },
      { title: 'Payment frequency', value: userData.null },
      { title: 'Member limit', value: userData.null },
      { title: 'Target amount', value: userData.null },
      { title: 'Monthly deposit', value: userData.null },
      { title: 'Debit day', value: userData.null },
      { title: 'Start day', value: userData.null },
      { title: 'Stop date', value: userData.null },
      { title: 'Withdrawal type', value: userData.null },
      { title: 'Withdrawal account', value: userData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const CliqueSaving = ({ userData = {} }) => {
   const details = [
      { title: 'Group name', value: userData.null },
      { title: 'Payment frequency', value: userData.null },
      { title: 'Member limit', value: userData.null },
      { title: 'Target amount', value: userData.null },
      { title: 'Monthly deposit', value: userData.null },
      { title: 'Debit day', value: userData.null },
      { title: 'Start day', value: userData.null },
      { title: 'Stop date', value: userData.null },
      { title: 'Withdrawal type', value: userData.null },
      { title: 'Withdrawal account', value: userData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};
