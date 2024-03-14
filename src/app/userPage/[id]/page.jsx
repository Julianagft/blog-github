'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import Link from "next/link";
import axios from 'axios';


import Paper from '@mui/material/Paper';
import { Image } from '@chakra-ui/react'
   


    export default function UnicUserPage({params}) {

        const router = useRouter()

        const id = router.query.id
        console.log(id)
    
        return (
            <div className='w-full h-full flex flex-col justify-center flex-wrap p-8 gap-2.5 overflow-hidden text-center'>
                <Paper elevation={3} sx={{display:'flex', flexDirection: 'column', padding:'20px'}}>
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src='https://bit.ly/dan-abramov'
                            alt='{userData.name}'
                            style={{margin:'auto', borderRadius:'100px', width:'200px', height:'200px'}}
                        />
                        <h1>Usuario</h1>
                
                    </Paper>
                
            </div>
        );
    }