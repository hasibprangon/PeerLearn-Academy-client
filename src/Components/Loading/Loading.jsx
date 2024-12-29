import React from 'react';
import animation from '../../assets/Animation/Loading Animation.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='w-[600px] flex justify-center items-center container mx-auto'>
            <div>
                <Lottie
                    animationData={animation}
                    loop={true}
                ></Lottie>
            </div>
        </div>
    );
};

export default Loading;