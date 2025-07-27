'use client';

import React from 'react'
import Link from 'next/link';
import ProviderGrid from "@/components/ProviderGrid";

export default function Providers() {
  return (
    <div>
        <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-extrabold m-4'>Providers</h1>
        <Link href="/admin/providers/add">
        <button className='px-10 py-3 bg-teal-700 text-white rounded-sm'>Add Providers</button>
        </Link>
        </div>
        <br /><br />
        <ProviderGrid/>
        <br /><br /><br />
    </div>
  )
}
