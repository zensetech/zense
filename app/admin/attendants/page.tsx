import Link from 'next/link';
import AttendantGrid from "@/components/AttendantGrid"

export default function Providers() {

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-extrabold m-4'>Attendants</h1>
        <Link href="/admin/attendants/add">
          <button className='px-10 py-3 bg-teal-700 text-white rounded-sm'>Add Attendants</button>
        </Link>
      </div>
      <br /><br />
      <AttendantGrid/>
    </div>
  );
}