

export default function Body({children}) {
    return (
        <div className='w-full h-full flex flex-col justify-center text-white flex-wrap p-8 gap-2.5 overflow-hidden text-center'>
            {children}
        </div>
    )
}