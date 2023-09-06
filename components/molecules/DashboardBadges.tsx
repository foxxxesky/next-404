'use client'

import { BadgeDollarSign, ShoppingBag, User } from 'lucide-react'

const DashboardBadges = () => {
  return (
    <div className="grid md:grid-cols-5 gap-8 ">
      <div className="flex w-full gap-20 items-center border border-slate-200 shadow-sm p-4 rounded-md hover:cursor-pointer hover:border-orange-200">
        <User className='h-12 w-12 text-slate-400' />
        <div className='w-full'>
          <p className='font-bold text-4xl text-slate-800'>100</p>
          <h3 className="text-sm font-semibold text-slate-400">
            Active Users
          </h3>
        </div>
      </div>
      <div className="flex w-full gap-20 items-center border border-slate-200 shadow-sm p-4 rounded-md hover:cursor-pointer hover:border-orange-200">
        <ShoppingBag className='h-12 w-12 text-slate-400' />
        <div className='w-full'>
          <p className='font-bold text-4xl text-slate-800'>1200</p>
          <h3 className="text-sm font-semibold text-slate-400">
            Products Sold
          </h3>
        </div>
      </div>
      <div className="flex w-full gap-20 items-center border border-slate-200 shadow-sm p-4 rounded-md hover:cursor-pointer hover:border-orange-200">
        <BadgeDollarSign className='h-12 w-12 text-slate-400' />
        <div className='w-full'>
          <p className='font-bold text-4xl text-slate-800'>500B</p>
          <h3 className="text-sm font-semibold text-slate-400">
            Income
          </h3>
        </div>
      </div>
    </div>
  )
}

export default DashboardBadges
