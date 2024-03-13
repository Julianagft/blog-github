'use client'
import Body from "@/components/Body";

import { Input, InputGroup, InputLeftElement  } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import {TextField, FormControl, OutlinedInput, InputAdornment} from '@mui/material';




export default function userPage() {
    return (
        <Body>
            <h1>Procure Por um usuário</h1>
            <div className="w-3/5 border-l-indigo-500">
            
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField type="search" id="filled-search" variant="filled" label="fullWidth" />
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                />
            </FormControl>
            </div>
        </Body>
    )
}