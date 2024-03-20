'use client'
import { useState, useEffect } from "react";
import requests from "@/services/apiRequest";
import formatDate from "@/services/dateConverter";

import { Accordion, AccordionSummary, AccordionDetails, Fade } from '@mui/material';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';

export default function repoPage({params}) {
    
    const [userData, setUserData] = useState({});
    const [repoData, setRepoData] = useState([]);
    const [repoLanguages, setRepoLanguages] = useState({})

    // REQUISIÇÃO API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await requests.getUser(params.slug);
                setUserData(userResponse.data);
                
                const repoResponse = await requests.getAllRepos(params.slug);
                setRepoData(repoResponse.data);

            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        if (params && params.slug) {
            fetchData();
        }
    }, []);

    
    // Configurações de Estilo

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleExpansion = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };


    return (
        <div className='w-full h-full flex flex-col flex-wrap p-8 gap-5 overflow-hidden'>
            
                {repoData.map((repo, index) => (
                    <div key={index} className="font-bold">
                        <Accordion
                            expanded={index === expandedIndex}
                            onChange={() => handleExpansion(index)}
                            sx={{
                                '& .MuiAccordion-region': { height: index === expandedIndex ? 'auto' : 0 },
                                '& .MuiAccordionDetails-root': { display: index === expandedIndex ? 'block' : 'none' },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon style={{color:'#E914B7'}} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p className="text-purple-700">{repo.name}</p>
                            </AccordionSummary>
                            <AccordionDetails>

                            <div className="font-normal">
                                <p ><strong>Descrição:</strong> {repo.description}</p>
                                <p><GradeRoundedIcon style={{ color: '#E914B7', marginRight:'10px' }} /><strong>Estrelas:</strong> {repo.forks_count}</p>
                                <p><DeviceHubRoundedIcon style={{ color: '#E914B7', marginRight:'10px' }} /><strong>Forks:</strong> {repo.forks_count}</p>
                                <p><AccessTimeRoundedIcon style={{ color: '#E914B7', marginRight:'10px' }} /><strong>Criado em:</strong> {formatDate(repo.created_at)}</p>
                                <p><AccessTimeFilledRoundedIcon style={{ color: '#E914B7', marginRight:'10px' }} /><strong>Última atualização:</strong> {formatDate(repo.updated_at)}</p>
                                <p><CodeRoundedIcon style={{ color: '#E914B7', marginRight:'10px' }} /><strong>Linguagem mais utilizada:</strong> {repo.language}</p>
                                
                                <p><BookRoundedIcon style={{ color: '#E914B7', marginRight:'10px' }} /><a className="hover:text-purple-700 font-bold hover:underline" href={repo.html_url} alt='link repositorie' target="_blank">Visite o Repositório</a></p>
                            </div>

                            </AccordionDetails>
                        </Accordion>
                    </div> 
                ))}
        </div>
    )
}