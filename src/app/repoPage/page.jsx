'use client'
import { useState } from "react";
import requests from "@/services/apiRequest";
import formatDate from "@/services/dateConverter";

import { FormControl, OutlinedInput, InputAdornment} from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Avatar, Card} from 'antd';


const { Meta } = Card;

export default function SearchReposPage() {
  const [formData, setFormData] = useState("");
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleInputChange = async (event) => {
      const { value } = event.target;
      setFormData(value);
      setQuery(value);
      if (value === '') {
          setRepositories([]);
          return;
      }

      try {
          const response = await requests.getAllRepos(value);
          setRepositories(response.data.items);
      } catch (error) {
          console.error('Erro ao buscar usuários:', error);
          setRepositories([]);
      }
  };
  
    return (
      <div className='w-full flex flex-col justify-center items-center flex-wrap p-8 gap-5 overflow-hidden text-center'>
        <div>
          <h1 className="text-4xl font-bold text-purple-800">Pesquise um Repositório</h1>
        </div>
        <div className="w-3/5 flex flex-col items-center">
          <FormControl sx={{ m: 1, width: '50vw', color: 'blue' }}>
            <OutlinedInput
              sx={{border:'1px solid #6B21A8', color:'#E914B7', backgroundColor:'#F2F2F2', borderRadius:'10px'}}
              color="secondary"
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start"><SearchSharpIcon color="secondary" /></InputAdornment>}
              label="procurar"
              value={query}
              onChange={handleInputChange}
            />
          </FormControl>
        </div>

        <div className="w-3/5 max-h-screen flex flex-col items-center overflow-auto">
        {repositories && repositories.length > 0 ? (
        repositories.map((repo, index) => (
          <Accordion
            key={index}
            sx={{
              '& .MuiAccordionSummary-root': {
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                borderBottom: '1px solid #d9d9d9'
              },
              '& .MuiAccordionDetails-root': {
                display: 'block',
                padding: '16px',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon style={{ color: '#E914B7' }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {repo.full_name}
            </AccordionSummary>
            <AccordionDetails>
              <Card
                avatar={<Avatar size={90} src={repo.owner.avatar_url} />}
                style={{ width: 600, marginTop: 16, fontSize: '16px', backgroundColor: '#e2dfdfeb' }}
              >
                <Meta
                  avatar={<Avatar size={90} src={repo.owner.avatar_url} />}
                  title={repo.full_name}
                  description={repo.description}
                />
                <p><GradeRoundedIcon style={{ color: '#E914B7', marginRight: '10px' }} /><strong>Estrelas:</strong> {repo.stargazers_count}</p>
                <p><DeviceHubRoundedIcon style={{ color: '#E914B7', marginRight: '10px' }} /><strong>Forks:</strong> {repo.forks_count}</p>
                <p><AccessTimeRoundedIcon style={{ color: '#E914B7', marginRight: '10px' }} /><strong>Criado em:</strong> {formatDate(repo.created_at)}</p>
                <p><AccessTimeFilledRoundedIcon style={{ color: '#E914B7', marginRight: '10px' }} /><strong>Última atualização:</strong> {formatDate(repo.updated_at)}</p>
                <p><CodeRoundedIcon style={{ color: '#E914B7', marginRight: '10px' }} /><strong>Linguagem mais utilizada:</strong> {repo.language}</p>
                <p><BookRoundedIcon style={{ color: '#E914B7', marginRight: '10px' }} /><a className="hover:text-purple-700 font-bold hover:underline" href={repo.html_url} alt='link repositorie' target="_blank" rel="noopener noreferrer">Visite o Repositório</a></p>
              </Card>
            </AccordionDetails>
          </Accordion>
        ))
      ) : query !== '' &&  (
        <p className="text-white text-lg">Buscando...</p>
      )}
      </div>

      </div>
    );
  }

