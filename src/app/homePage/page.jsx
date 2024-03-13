import { Image } from '@chakra-ui/react'


export default function homePage() {
    return (
        <div className='w-full h-full flex flex-col justify-center text-white flex-wrap p-8 gap-2.5 overflow-hidden text-center'>
            <Image boxSize='200px' src="/images/git-logo.png" alt="logo gitHub" align="center" style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom:'30px' }} />
            <div className="text-white">
                <h1 className="font-bold text-2xl mb-8">Bem vindo ao GitHub Blog</h1>
                <p className="text-lg">Encontre usuários e repositórios!</p>
            </div>
        </div>
    )
}