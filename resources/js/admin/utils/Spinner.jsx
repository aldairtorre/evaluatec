import React from 'react'

export const Spinner = () => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-60'>
            <div className='px-16 py-5 bg-gray-500 opacity-90 w-1/3 rounded-lg transform'>
                <div className='flex justify-center gap-2 items-center'>
                    <p className='text-white text-lg'>Espere un momento por favor</p>
                    <div className="dots">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .dots {
                    display: flex;
                    justify-content: center;
                }
                .dot {
                    font-size: 32px;
                    color: white;
                    animation: blink 1.5s infinite step-start;
                }
                .dot:nth-child(1) {
                    animation-delay: 0s;
                }
                .dot:nth-child(2) {
                    animation-delay: 0.3s;
                }
                .dot:nth-child(3) {
                    animation-delay: 0.6s;
                }

                @keyframes blink {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    )
}
