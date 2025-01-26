import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFutureValue from './useFutureValue';
import useMonthlyBreakdown from './useMonthlyBreakdown';

const useInvestmentCalculator = () => {
  const [searchParams] = useSearchParams();

  const [principal, setPrincipal] = useState(
    Number(searchParams.get('principal')) || 0
  );
  const [years, setYears] = useState(Number(searchParams.get('years')) || 0);
  const [rate, setRate] = useState(Number(searchParams.get('rate')) || 0);
  const [additionalContribution, setAdditionalContribution] = useState(
    Number(searchParams.get('additionalContribution')) || 0
  );
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
    principal,
    setPrincipal,
    rate,
    setRate,
    years,
    setYears,
    additionalContribution,
    setAdditionalContribution,
    setContributeAtStart,
    ...monthlyBreakdown,
  };
};

export default useInvestmentCalculator;
