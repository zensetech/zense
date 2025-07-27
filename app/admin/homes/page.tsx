'use client';

import React from 'react'
import Link from 'next/link';
import SearchGrid from '@/components/SearchGrid'

export default function Providers() {
  return (
    <div>
        <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-extrabold m-4'>Senior Care Homes</h1>
        <Link href="/admin/homes/add">
        <button className='px-10 py-3 bg-teal-700 text-white rounded-sm'>Add Senior Care Homes</button>
        </Link>
        </div>
        <br /><br />
        <SearchGrid s=""/>
    </div>
  )
}
