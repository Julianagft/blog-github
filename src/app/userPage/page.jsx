'use client'
import { useState } from "react";
import Link from "next/link";
import requests from "@/services/apiRequest";

import { FormControl, OutlinedInput, InputAdornment} from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Avatar, Card, Button } from 'antd';

const { Meta } = Card;

export default function UserPage() {
    const [formData, setFormData] =useState({"login": ""})
    const [userData, setUserData] = useState(null);


    const handleInputChange = (event) => {
        const {value} = event.target;
        setFormData({"login": value })
      };

    const handleGetUser = async () =>  {
        try{
            const response = await requests.getUser(formData.login)
            console.log(response.data)
            setUserData(response.data);
        } catch(error) {
            console.error('Erro ao buscar usuário:', error);
        }
        
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center flex-wrap p-8 gap-5 overflow-hidden text-center'>
            <div>
                <h1 className="text-4xl font-bold text-purple-800">Pesquise um Usuário</h1>
            </div>
            <div className="w-3/5 flex flex-col items-center">
            <FormControl sx={{ m: 1, width:'50vw', color:'blue' }}>
                <OutlinedInput
                    color="secondary"
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start"><SearchSharpIcon color="secondary" /></InputAdornment>}
                    
                    lebel="procurar"
                    onChange={handleInputChange}
                />
            </FormControl>
            </div>
            <Button type="primary" value="large" style={{backgroundColor: '#E914B7', fontWeight:'bold'}} onClick={handleGetUser}>Buscar Usuário</Button>
            {
                userData && (
                    <Link key={userData.id} href={`/userPage/${userData.login}`}>
                    <Card style={{ width: 400, marginTop: 16, fontSize:'16px', backgroundColor:'#e2dfdfeb'}} >
                        <Meta
                        avatar={<Avatar size={90} src={userData.avatar_url} />}
                        title={userData.name}
                        description={userData.login}
                        />
                    </Card>
                    </Link>
            )}
        </div>
    )
}