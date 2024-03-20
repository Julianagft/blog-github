'use client'
import { useState, useEffect } from "react";
import requests from "@/services/apiRequest";

import { Collapse} from 'antd';
import { Accordion, AccordionSummary, AccordionDetails, Fade } from '@mui/material';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const content = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, rem?'

export default function repoPage({params}) {
    
    const [userData, setUserData] = useState({});
    const [repoData, setRepoData] = useState([]);

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
    }, [params]);

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

                            <p className="font-normal"><strong>Descrição:</strong> {repo.description}</p>
                            <p><GradeRoundedIcon style={{ color: '#E914B7' }} /><strong>Estrelas:</strong> {repo.forks_count}</p>
                            <p><DeviceHubRoundedIcon style={{ color: '#E914B7' }} /><strong>Forks:</strong>{repo.forks_count}</p>
                            <p>Criado em : {repo.created_at}</p>
                            <p>Última atualização: {repo.updated_at}</p>
                            <p className="font-bold">Linguagens mais usadas:</p>
                            <a href={repo.html_url} alt='link repositorie' target="_blank">Visite o Repositório</a>

                            </AccordionDetails>
                        </Accordion>
                    </div> 
                ))}
    
            
            
        </div>
    )
}