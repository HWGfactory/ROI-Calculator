'use client';

import { useState } from 'react';
import CustomerInputScreen from './components/CustomerInput';
import ResultDashboard from './components/ResultDashboard';
import SolutionInput from './components/SolutionInput';
import { calculateROI } from '@/lib/calculator';
import { CustomerInput, ROIResult, SolutionInfo } from '@/lib/types';

type Screen = 'solution' | 'customer' | 'result';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('solution');
  const [solutionData, setSolutionData] = useState<SolutionInfo | null>(null);
  const [customerData, setCustomerData] = useState<CustomerInput | null>(null);
  const [roiResult, setRoiResult] = useState<ROIResult | null>(null);

  const handleSolutionNext = (data: SolutionInfo) => {
    setSolutionData(data);
    setScreen('customer');
  };

  const handleCustomerNext = (data: CustomerInput) => {
    if (!solutionData) return;
    setCustomerData(data);
    setRoiResult(calculateROI(solutionData, data));
    setScreen('result');
  };

  const handleBack = () => {
    setScreen('solution');
  };

  const handleReset = () => {
    setSolutionData(null);
    setCustomerData(null);
    setRoiResult(null);
    setScreen('solution');
  };

  if (screen === 'customer' && solutionData) {
    return (
      <CustomerInputScreen
        solution={solutionData}
        onNext={handleCustomerNext}
        onBack={handleBack}
      />
    );
  }

  if (screen === 'result' && solutionData && customerData && roiResult) {
    return (
      <ResultDashboard
        solution={solutionData}
        customer={customerData}
        result={roiResult}
        onReset={handleReset}
      />
    );
  }

  return <SolutionInput onNext={handleSolutionNext} />;
}
