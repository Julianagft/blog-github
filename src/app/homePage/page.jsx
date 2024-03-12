import Body from "@/components/Body"

import { Image } from '@chakra-ui/react'


export default function HomePage() {
    return (
        <Body >
            <Image boxSize='200px' src="/images/git-logo.png" alt="logo gitHub" align="center" style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom:'30px' }} />
            <h1 className="font-bold text-2xl mb-8">Bem vindo ao GitHub Blog</h1>
            <p className="text-lg">Encontre usuários e repositórios!</p>
        </Body>
    )
}