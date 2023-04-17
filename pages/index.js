import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next'

function DashboardContent() {
  const { t } = useTranslation('translation')

  return (
    <>
      <Typography>Ok so uhh im supposed to be like uh down or somewhere</Typography>
      <Typography>{t('h1')}</Typography>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
