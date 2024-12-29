import Lottie from 'lottie-react';
import React from 'react';
import animation from '../../../src/assets/Animation/Not Found.json'

const Error = () => {
    return (
        <div className='w-[600px] flex justify-center items-center container mx-auto'>
            <div>
                <h2 className='text-5xl font-semibold text-neutral-500 text-center mt-10'>Opps! An error occured</h2>
                <Lottie
                    animationData={animation}
                    loop={true}
                ></Lottie>
            </div>
        </div>
    );
};

export default Error;