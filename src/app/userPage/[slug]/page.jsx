'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import requests from "@/services/apiRequest";

import {Paper, TableContainer, TableHead, TableRow, Table, TableBody } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { UserOutlined} from '@ant-design/icons';
import { styled } from '@mui/material/styles';
import { Image } from '@chakra-ui/react'
   
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
    

export default function UnicUserPage({params}) {

    const [userData, setUserData] = useState({});

    // REQUISIÇÃO API

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await requests.getUser(params.slug)
                setUserData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        if (params && params.slug) {
            fetchUserData();
        }
    }, [params]);

    // CONFIGURAÇÕES DE ESTILO

    function createData(name, dados, links) {
        return {name, dados, links };
      }

    const rows = [
        createData('Repositórios',userData.public_repos, <Link className="hover:text-purple-700 hover:underline " href={`../../repoPage/${userData.login}`}>Visite os repositórios</Link>),
        createData('Seguidores', userData.followers, <Link className="hover:text-purple-700 hover:underline " target="_blank" href={`https://github.com/${userData.login}`}>Siga {userData.name}</Link>),
        createData('Seguindo', userData.following),
      ];

    return (
        <div className='w-full h-full flex flex-col flex-wrap p-8 gap-2.5 overflow-hidden text-center'>

            <Paper elevation={3} sx={{display:'flex', flexDirection: 'column', justifyContent:'flex-start', gap: '20px', padding:'20px'}}>
                    <Image
                        borderRadius='full'
                        boxSize='150px'
                        src={userData.avatar_url}
                        alt={userData.name}
                        style={{margin:'auto', borderRadius:'100px', width:'200px', height:'200px'}}
                    />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">{userData.name}</h1>
                        <p className="text-lg" >{userData.bio}</p>
                    </div>

                    <div className="flex flex-col gap-5">
                            <TableContainer >
                                <Table sx={{ width: '60vw', fontWeight:'bold', margin:'auto', color:'white' }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell><UserOutlined style={{color:'#E914B7', marginRight:'5px'}} /> INFOS USUÁRIO</StyledTableCell>
                                        <StyledTableCell align="left"><AppRegistrationOutlinedIcon style={{color:'#E914B7'}} /></StyledTableCell>
                                        <StyledTableCell align="left"><EmojiEmotionsOutlinedIcon style={{color:'#E914B7'}} /></StyledTableCell>
                                        
                                    </TableRow>
                                    </TableHead>
                                    <TableBody >
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.dados}</StyledTableCell>
                                        <StyledTableCell align="left">{row.links}</StyledTableCell>
                                        
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>
            
                </Paper>
            
        </div>
    );
}