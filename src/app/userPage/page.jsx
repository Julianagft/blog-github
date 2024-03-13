'use client'
import { useState } from "react";
import Link from "next/link";
import requests from "@/services/apiRequest";

import { FormControl, OutlinedInput, InputAdornment} from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';


export default function UserPage() {
    const [formData, setFormData] =useState({"login": ""})
    const [userData, setUserData] = useState(null);


    const handleInputChange = (event) => {
        const {value} = event.target;
        setFormData({"login": value })
      };

    const handleGetUser = async () =>  {
        try{
            const response = await requests.getUsers(formData.login)
            console.log(response.data)
            setUserData(response.data);
        } catch(error) {
            console.error('Erro ao buscar usuário:', error);
        }
        
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center flex-wrap p-8 gap-5 overflow-hidden text-center'>
            <div>
                <h1 className="text-2xl font-bold text-purple-800">Procure um usuário</h1>
            </div>
            <div className="w-3/5 flex flex-col items-center">
            <FormControl sx={{ m: 1, width:'50vw', color:'blue' }}>
                <OutlinedInput
                    color="secondary"
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start"><SearchSharpIcon color="secondary" /></InputAdornment>}
                    focused
                    lebel="procurar"
                    onChange={handleInputChange}
                />
            </FormControl>
            </div>

            <button onClick={handleGetUser}>Buscar Usuário</button>
            <ul>
                {userData && (
                    <li key={userData.id}>
                        <h4 className="font-bold">
                            <Link href={`/userPage/${userData.id}`}>{userData.login}</Link>
                        </h4>
                    </li>
                )}
            </ul>
        </div>
    )
}