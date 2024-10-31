import React from 'react'

import StatCards from './StatCards'
import EventCalender from './EventCalender'
import Announcements from './Announcements'
import CountChart from '../Charts/CountChart'
import MonthlyRevenue from '../Charts/MonthlyRevenue'

export default function Grid() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
         <div className="w-full lg:w-2/3 flex flex-col gap-8">
         <div className="flex gap-4 justify-between flex-wrap">
              
         <StatCards
        title="Gross Revenue"
        value="$120,054.24"
        pillText="2.75%"
        trend="up"
        period="From Jan 1st - Jul 31st"
      />
      <StatCards
        title="Avg Order"
        value="$127.97"
        pillText="1.01%"
        trend="down"
        period="From Jan 1st - Jul 31st"
      />
      <StatCards
        title="Trailing Year"
        value="$278,054.24"
        pillText="60.75%"
        trend="up"
        period="Previous 365 days"
      />
     </div>

     <div className="flex gap-4 flex-col lg:flex-row">
  {/* First CountChart */}
  <div className="w-full lg:w-1/3 h-[450px]">
    <CountChart />
  </div>

  {/* Monthly Revenue 1 */}
  <div className="w-full lg:w-2/3 h-[450px]">
    <MonthlyRevenue />
  </div>

  {/* Second CountChart */}
  <div className="w-full lg:w-1/3 h-[450px]">
    <CountChart />
  </div>

  {/* Monthly Revenue 2 */}
  <div className="w-full lg:w-2/3 h-[450px]">
    <MonthlyRevenue />
  </div>
</div>


<div className="flex gap-4 flex-col lg:flex-row">
  {/* First CountChart */}
  <div className="w-full lg:w-1/3 h-[450px]">
    <CountChart />
  </div>

  {/* Monthly Revenue 1 */}
  <div className="w-full lg:w-2/3 h-[450px]">
    <MonthlyRevenue />
  </div>

  {/* Second CountChart */}
  <div className="w-full lg:w-1/3 h-[450px]">
    <CountChart />
  </div>

  {/* Monthly Revenue 2 */}
  <div className="w-full lg:w-2/3 h-[450px]">
    <MonthlyRevenue />
  </div>
</div>

         
     </div>

     <div className="w-full lg:w-2/3 h-[450px]">
        <EventCalender/>
        <Announcements/>
     </div>

    </div>
  )
}
