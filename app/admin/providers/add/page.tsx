'use client';

import React from 'react'
import Link from 'next/link';
import ProvForm from '@/components/ProvForm'

export default function Providers() {
  return (
    <div>
        <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-extrabold m-4'> Add Providers</h1>
        <Link href="/admin/providers">
        <button className='px-10 py-3 bg-teal-700 text-white rounded-sm'>Back</button>
        </Link>
        </div>
        <br />
        <ProvForm priv={true}/>
    </div>
  )
}
