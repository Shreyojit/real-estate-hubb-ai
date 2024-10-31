import Grid from '@/components/Dashboard/Grid'
import TopBar from '@/components/Dashboard/TopBar'

import React from 'react'

export default function DashBoardPage() {
  return (
    <div className="bg-white rounded-lg pb-4 mt-3 ">
     <TopBar/>
     <Grid/>
    </div>
  )
}
