import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
   DataTable,
   Layout, Modals, LabelInput } from "../../components";
import Image from "next/image";
import ToyAvatar from '../../assets/img/toy-avatar.png'
import { useMemo } from "react";
import {
   
    Button,
    IconButton,
    Checkbox,
    FormControlLabel,
   
 } from '@mui/material';
 import { tableSearch } from '../../utils/tableSearch';
 import { Menu, MenuItem } from '@mui/material';
 import Link from "next/link";
import Vector from '../../assets/img/Vector.png'
import edit from '../../assets/img/edit.png'
import disable from '../../assets/img/disable.png'
import square from '../../assets/img/square.png'
import {SearchBox, SVG} from '../../components'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { withStyles } from "@material-ui/styles";


/**
 * This is a getServerSideProps function thats help fetch users from server before the page loads
 */
export async function getServerSideProps() {
   const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;
   const deviceToken = process.env.NEXT_PUBLIC_DEVICE_TOKEN;
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

   try {
       const res = await axios.get(
           `${baseUrl}/api/v1/admin/view-roles`,
           {
               headers: {
                   Authorization: `Bearer ${bearerToken}`,
                   "device-token": deviceToken
               }
           }
       );
       return {
           props: {
               viewData: res.data?.data
           }
       }
   } catch (error) {
       console.error(error);
       return {
           props: {
               viewData: null,
               error: error.message
           }
       }
   }
   
}



const CustomCheckbox = withStyles({
  root: {
    color: '#FF4500',
    '&$checked': {
      color: '#FF4500',
    },
  },
  checked: {},
})(Checkbox);


export default function RolesAndPriviledges({viewData}) {
   console.log(viewData.administrator_roles[0].id)
   const router = useRouter();
    const [username, setUsername] = useState("iversonweb98@gmail.com")
    const [rolename, setRolename] = useState("Super Admin")
    const [password, setPassword] = useState("Be@trice1")
    const [name, setName] = useState("User Relations")
    const searchTerm = useSelector((state) => state.searchTerm);
    const [privileges, setPrivileges] = useState(1)
    const [modalsOpen, setModalsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [open, setOpen] = useState(false)
    const [id, setId] = useState();
    const [roleId, setRoleId] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);
    const [checkbox4, setCheckbox4] = useState(false);
    const [checkbox5, setCheckbox5] = useState(false);
   

   /** function to handle each user actions  */
   function BasicMenu({ viewLink = '', id= '' }) {
      console.log(id)
      const [anchorEl, setAnchorEl] = useState(null);

      const open = Boolean(anchorEl);

      const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
         setAnchorEl(null);
      };

      const handleEdit = () => {
         handleClose();
         setModalsOpen(true);

         //iterate over the data to get single random user using filter
         let user = viewData.administrator_roles.filter(
            (user) => user.id === id
         );
         console.log(user);

         setRolename(user[0].name)
         setPrivileges(user[0].privileges[0].name)
         setId(user[0].id);
             
        
      };


      const handleDeactivateAccount = async () => {
         setAnchorEl(null);
         
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
            .post(`/api/v1/admin/delete-role/${id}`, {status: 'deactivated'})
            
            .then((res) => {
               console.log(res);
               
               router.replace(router.asPath)
               toast.success('User deactivated successfully');
               

               return res.data
               
            })
            .catch((err) => {
               console.log(err);
              
            });
      };

      return (
         <div>
            <IconButton
               className='p-2'
               aria-controls={open ? 'basic-menu' : undefined}
               aria-haspopup='true'
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}
            >
               <SVG.DotsHambugger />
            </IconButton>
            <Menu
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
               MenuListProps={{
                  'aria-labelledby': 'basic-button',
               }}
               sx={{
                  '& .MuiList-root': {
                     padding: 0,
                  },
               }}
            >
               <div className='flex'>
                  <MenuItem onClick={handleClose} className='p-0'>
                     <Link href={viewLink}>
                        <a className='p-4'>
                           <SVG.View />
                        </a>
                     </Link>
                  </MenuItem>
                  <MenuItem onClick={handleDeactivateAccount}>
                     <SVG.Delete />
                  </MenuItem>
                  <MenuItem
                     onClick={handleEdit}
                  >
                    
                        
                     <SVG.Edit />
                  </MenuItem>
               </div>
            </Menu>
         </div>
      );
   }



    
    const RoleComponent = () => {
        
        return (
            <div className="p-3 col-span-1 rounded-xl h-0  border-[#E4ECF7">
                <h3 className="mb-5 mt-5 text-[#0B0B0B] text-lg md:text-xl lg:text-xl font-[500] lg:leading-[30px]">Privileges</h3>
                
                {/* <p className="text-[#676767]">3 accounts</p> */}
            </div>
        )
    }


    
    
    const columns = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ value }) => (
               <div className='flex justify-start items-center gap-2'>
                  <span className='py-2 w-[2.5rem]'>
                     <Image
                        src={ToyAvatar}
                        className='w-full'
                        alt='toy avatar'
                     />
                  </span>
                  <span>{value}</span>
               </div>
            ),
         },
         {
            Header: 'Priviledges',
            accessor: 'priviledges',
         },
        
       
        {
            Header: 'Date Joined',
            accessor: 'date',
            
        },

        {
         Header: 'Action',
            accessor: 'action',
            Cell: ({ value }) => (
               <BasicMenu id={value} viewLink={`/adminstrators/${value}`} />
            ),
         
     },
    ], [])

    
   /**
    * Datagrid row data
    */
   let rows;
   // check if agentsData is an array
 
   if (typeof viewData.administrator_roles === 'object' &&
   viewData.administrator_roles &&
   Array.isArray(viewData.administrator_roles)) {
      rows = viewData?.administrator_roles?.map((item) => {
         return {
            name: item.name,
            priviledges:item.privileges[0]?.name ,
            date: item.privileges[0]?.created_at, // '08-Oct-2022 12:46PM';
            action: item.id
         };
        
      }
      );
   } else {
      rows = [];
   }
   console.log(rows)

   const handleAddNewUser = async () => {
      setLoading(true);
        const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;
        const deviceToken = process.env.NEXT_PUBLIC_DEVICE_TOKEN;
        const instance = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
               Authorization: `Bearer ${bearerToken}`,
               "device-token": deviceToken
            }
         });
         const data = {
            name,
            privileges
            
         };

         await instance
      .post(`api/v1/admin/add-role`, data)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setModalOpen(false);
      
         toast.success("Successful");
        router.replace(router.asPath)
         return res.data
     })
     .catch((err) => {
        setLoading(false);
        setModalOpen(false);
        console.log(err);
        toast.error(err.response?.data.message);
        
     });  
     
     
    }

    
    const handleClickOpen = () => {
        setOpen(true);
     };

     const handleClickOpening = () => {
      setModalOpen(true)
      setOpen(true);
   };
  
    
    const handleEditRole = async () => {
        setLoading(true);
        
        const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;
        const deviceToken = process.env.NEXT_PUBLIC_DEVICE_TOKEN;
      
         console.log(rolename, privileges, id);
        const instance = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
               Authorization: `Bearer ${bearerToken}`,
               "device-token": deviceToken
            }
         });
        
         const data = {
            name: rolename,
            privileges,
           id
         };
         
         await instance
      .post(`api/v1/admin/edit-role/${id}`, data)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setModalsOpen(false)
        setOpen(false);
      
         toast.success("Saved Successfully");

        router.replace(router.asPath)
         return res.data
     })
     .catch((err) => {
        setLoading(false);
        setModalsOpen(false)
        setOpen(false);
        console.log(err);
        toast.error(err.response?.data.message);
        
     });  
     
     
    }

    useEffect(() => {
        if (!searchTerm) return;
  
        const result = tableSearch({
           searchTerm,
           dataList: viewData?.administrator_roles,
        });
        setSearchResult(result);
     }, [viewData?.administrator_roles, searchTerm]);

    

    return (
        <Layout title={'Roles and Priviledges'}>
            <div>
            <div className='md:flex md:justify-between md:items-center mb-3 lg:mb-5'>
            <div>
               <h3 className='text-black-80 font-bold text-lg lg:text-2xl xl:text-[32px] tracking-[-0.05em] xl:leading-[48px]'>
                  System Administrators
               </h3>
               <p className='text-[#505780] text-xs sm:text-sm lg:text-base'>
                  Find all admins and associated roles
               </p>
            </div>
            <div className='flex items-center  space-x-2.5 md:space-x-5'>
               <SearchBox />
               <Button
                  startIcon={<SVG.Add />}
                  className='bg-[#FFE6D6] text-[#FF4500] normal-case md:py-3 md:px-5 font-medium md:text-sm tracking-[-0.025em] hidden md:inline-flex rounded-lg'
                  onClick={handleClickOpening}
               >
                  Add New Admin
               </Button>
               <IconButton
                  onClick={handleClickOpen}
                  className='bg-[#FFE6D6] text-[#FF4500] normal-case py-1 px-2 text-[10px] font-medium tracking-[-0.025em] md:hidden rounded'
               >
                  <SVG.Add />
               </IconButton>
               
            </div>
         </div>
                <p className="text-[#333333] text-base tracking-[-0.025em] pt-3 ">
                Lorem ipsum dolor sit amet consectetur. Eu volutpat quis mattis iaculis risus mollis. Auctor morbi tempus ullamcorper orci in sem pellentesque vestibulum pretium. Massa integer praesent ut risus. Eu odio elit sit ac suspendisse ac amet luctus. Ornare massa purus non odio non tincidunt vel ultricies aliquet. Habitasse hendrerit elementum vestibulum facilisi euismod. Morbi convallis nulla adipiscing nisl fames ac.
                Tincidunt massa tortor sed sit cum sit. Cursus tincidunt maecenas pellentesque facilisis tempor pellentesque scelerisque. Velit aliquet sed dui.
</p>
            </div>
 
                <div style={{border: "1px solid #E4ECF7", marginTop: "40px", marginBottom: "30px"}} />
                

            <div >
                {/* <div className="w-[190px]">
                <h3 className="text-[#191716] font-medium text-lg md:text-base lg:text-xl xl:text-xl tracking-[-0.025em] xl:leading-[48px] mt-1 lg:mt-3">
                    Privileges
                     </h3>
                <div></div> */}
                {/* <div 
                onClick={() => setModalsOpen(true)}
                className=" mt-2 flex flex-row items-center justify-start gap-4">
                <span>
                    <Image
                     className="mr-30 h-full w-full"
                      src={Vector} alt="" />
                   </span>
                <p className="text-[#333333] mb-1  text-base tracking-[-0.025em] ">
                   
                    Add User
                </p>
                </div> */}
                {/* <div className=" mt-2 flex flex-row items-center justify-start gap-4">
                <span>
                    <Image
                     className="mr-30 h-full w-full"
                      src={disable} alt="" />
                   </span>
                <p className="text-[#333333] mb-1  text-base tracking-[-0.025em] ">
                   
                    Disable User
                </p>
                </div> */}
                {/* <div className=" mt-2 flex flex-row items-center justify-start gap-4">
                <span>
                    <Image
                     className="mr-30 h-full w-full"
                      src={edit} alt="" />
                   </span>
                <p className="text-[#333333] mb-1  text-base tracking-[-0.025em] ">
                   
                    Edit User
                </p>
                </div> */}
                {/* <button className="bg-[#FF4500] flex gap-2 items-center justify-center w-full h-[42px] text-white rounded-lg mt-5">
                    <span>
                        <Image src={square} className="ml-2" alt="" />
                    </span>
                    <p className="mb-1">Assign Privileges</p></button> */}
                {/* </div> */}

                                
                <div className="text-[#191716] font-medium text-lg md:text-base lg:text-xl xl:text-xl tracking-[-0.025em] xl:leading-[48px] mt-1 lg:mt-3">Admins</div>

                <div className="w-full py-5">
                    <DataTable 
                    columns={columns}
                     data={searchTerm ? searchResult : rows}
                    />
              
                </div>
                <div style={{border: "1px solid #E4ECF7", marginTop: "40px", marginBottom: "30px"}} />
            </div>

            

            <Modals
            open={modalOpen}
            setOpen={setModalOpen}
            loading={loading}
            title='Add New Admin'
            buttonLabel='Save'
            onClick={handleAddNewUser}
         >
            <>
               
                  <LabelInput
                     label='Name'
                     placeholder='Your name'
                     value={name}
                     setState={setName}
                  /> 
            <div className="flex flex-col">
             
             <LabelInput
                  label='Priviledges'
                  combo
                  menuItems={['Super Admin', 'create-admin', 'view-admin', 'edit-admin', 'delete-admin', 'restore-admin']}
                  setState={setPrivileges}
                  value={privileges}
               />
         {/* <FormControlLabel
        control={
         <CustomCheckbox
           checked={checkbox1}
           onChange={() => setCheckbox1(!checkbox1)}
           value={privileges}
           setState={setPrivileges}
         />
        }
        label="Update transaction"
      />
      <FormControlLabel
        control={
         <CustomCheckbox
           checked={checkbox2}
           onChange={() => setCheckbox2(!checkbox2)}
           value={privileges}
           setState={setPrivileges}
         />
        }
        label="Edit administration"
      />
      <FormControlLabel
        control={
         <CustomCheckbox
           checked={checkbox3}
           onChange={() => setCheckbox3(!checkbox3)}
           setState={setPrivileges}
         />
        }
        label="Add user"
      />

   <FormControlLabel
       control={
         <CustomCheckbox
           checked={checkbox4}
           onChange={() => setCheckbox4(!checkbox4)}
           setState={setPrivileges}
         />
        }
        label="Disable user"
      /> */}
     
         </div>
     
                  

            </>
         </Modals>

         <Modals
            open={modalsOpen}
            setOpen={setModalsOpen}
            loading={loading}
            title='Edit User'
            buttonLabel='Save'
            onClick={handleEditRole}
         >
            <>
                               
                  <LabelInput
                     label='Name'
                     placeholder='Your Name'
                     value={rolename}
                     setState={setRolename}
                  />
                  <LabelInput
                  label='Priviledges'
                  combo
                  menuItems={['Super Admin', 'create-admin', 'view-admin', 'edit-admin', 'delete-admin', 'restore-admin']}
                  setState={setPrivileges}
                  value={privileges}
               />
                 

                
            </>
         </Modals>
        </Layout>
    )
}