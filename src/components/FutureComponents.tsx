import { API_URL } from '../lib/api_url'

export const FutureComponents = () => {
    return (
        <div className="w-[100%] bg-gradient123 bg-cover bg-black/20 rounded-[50px] my-5 h-[250px] mx-auto">
            <div className="flex justify-around items-center h-full">
                <div className="w-[230px] h-[200px] flex items-center p-2 bg-white/40 rounded-3xl">
                    {/* <Logo /> */}
                    <img src={`${API_URL}/logo.png`} alt="" />
                </div>
                <p className='w-[250px] text-3xl'>скидка 20% на первую покупку</p>

                <div className="">
                    <p className='text-center text-3xl'>популярное</p>
                    <div className="w-[400px] h-[200px] p-4 bg-white/40 rounded-3xl">
                        <div className="flex items-center justify-around">
                            <p className='w-[45%]'>baby root vegetables succulent</p>
                            <div className="relative h-32 content">
                                <img src={`${API_URL}/baby-root.webp`} className='' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
