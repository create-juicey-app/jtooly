import * as React from 'react';
import { Typography, Stack } from '@mui/material';
function DashboardContent() {
  
  return (
    <>
      <video className="background-video2" autoPlay loop>
        <source src="/rolled.mp4" type="video/mp4" />
      </video>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
