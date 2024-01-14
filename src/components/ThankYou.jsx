import React from 'react'
import Thankyou from "./Thank-you.json"
import Lottie from "lottie-react";
export const ThankYou = () => {
    return (
        <div className='lottie_box'>
            <Lottie animationData={Thankyou} />
        </div>
    )
}
