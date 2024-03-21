'use client'
import { useState } from "react";
import Link from "next/link";
import requests from "@/services/apiRequest";

import { FormControl, OutlinedInput, InputAdornment} from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Avatar, Card} from 'antd';

const { Meta } = Card;

export default function SearchUserPage() {
    const [formData, setFormData] = useState("");
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    const handleInputChange = async (event) => {
        const { value } = event.target;
        setFormData(value);
        setQuery(value);
        if (value === '') {
            setUsers([]);
            return;
        }

        try {
            const response = await requests.getAllUsers(value);
            setUsers(response.data.items);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            setUsers([]);
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center flex-wrap p-8 gap-5 overflow-hidden text-center'>
            <div>
                <h1 className="text-4xl font-bold text-purple-800">Pesquise um Usuário</h1>
            </div>
            <div className="w-3/5 flex flex-col items-center">
                <FormControl sx={{ m: 1, width:'50vw', color:'blue' }}>
                    <OutlinedInput
                        sx={{border:'1px solid #6B21A8', color:'#E914B7', backgroundColor:'#F2F2F2', borderRadius:'10px'}}
                        color="secondary"
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start"><SearchSharpIcon color="secondary" /></InputAdornment>}
                        lebel="procurar"
                        onChange={handleInputChange}
                    />
                </FormControl>
            </div>

            <div className="w-3/5 max-h-screen flex flex-col items-center overflow-auto">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <Link key={user.id} href={`/userPage/${user.login}`}>
                            <Card
                                key={index}
                                style={{ width: 400, marginTop: 16, fontSize:'16px', backgroundColor:'#F2F2F2', color:'#E914B7'}}
                                onClick={() => setFormData(user.login)}
                            >
                                <Meta
                                    style={{fontWeight:'bold'}}
                                    avatar={<Avatar size={90} src={user.avatar_url} />}
                                    title={user.login || ''} 
                                    description={user.type}
                                />
                            </Card>
                        </Link>
                    ))
                ) : query !== '' &&  (
                    <p className="text-white text-lg">Buscando...</p>
                  )}
            </div>
            
        </div>
    );
}