'use client';

import { redirect } from 'next/navigation';

export default function Page() {
    const handleRedirect = () => {
        redirect('/todo'); // This will redirect to the '/todo' page
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <h1 className='text-center text-3xl'>Sample Page</h1>
            <button onClick={handleRedirect} className='bg-black text-white rounded-sm'>Redirect to Todo</button>
        </div>
    );
}
