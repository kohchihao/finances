import { useState } from 'react';
import useFutureValue from './useFutureValue';
import useMonthlyBreakdown from './useMonthlyBreakdown';

const useInvestmentCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [years, setYears] = useState(0);
  const [rate, setRate] = useState(0);
  const [additionalContribution, setAdditionalContribution] = useState(0);
  const [contributeAtStart, setContributeAtStart] = useState(false);

  const futureValue = useFutureValue({
    principal,
    years,
    rate,
    additionalContribution,
    contributeAtStart,
  });

  const monthlyBreakdown = useMonthlyBreakdown({
    principal,
    years,
    rate,
    additionalContribution,
    contributeAtStart,
  });

  return {
    endingBalance: futureValue,
    setPrincipal,
    setRate,
    setYears,
    setAdditionalContribution,
    setContributeAtStart,
    ...monthlyBreakdown,
  };
};

export default useInvestmentCalculator;
