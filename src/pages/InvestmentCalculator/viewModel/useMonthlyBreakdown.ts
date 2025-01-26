import { useState } from 'react';

type UseFutureValueParams = {
  principal: number;
  years: number;
  rate: number;
  additionalContribution: number;
  contributeAtStart?: boolean;
};

interface BreakdownEntry {
  month: number;
  pv: number;
  pmt: number;
  interestEarned: number;
  fv: number;
}

const useMonthlyBreakdown = ({
  principal,
  years,
  rate,
  additionalContribution,
  contributeAtStart,
}: UseFutureValueParams) => {
  const [breakdown, setBreakdown] = useState<BreakdownEntry[]>([]);

  const calculateMonthlyBreakdown = () => {
    if (!principal || !years || !rate) {
      return;
    }

    const months = years * 12;
    const annualRate = rate / 100;
    const compoundAnnually = true;
    const monthlyRate = compoundAnnually
      ? Math.pow(1 + annualRate, 1 / 12) - 1
      : annualRate / 12;
    let fv = principal;
    let breakdownData = [];

    for (let i = 1; i <= months; i++) {
      let pv = fv; // Present Value at the start of the month
      let pmt = additionalContribution; // Additional contribution

      // Add contribution at the start of the month (if applicable)
      if (contributeAtStart) {
        fv += pmt;
      }

      // Calculate interest earned
      let interestEarned = fv * monthlyRate;
      fv += interestEarned;

      // Add contribution at the end of the month (if applicable)
      if (!contributeAtStart) {
        fv += pmt;
      }

      breakdownData.push({
        month: i,
        pv: pv,
        pmt: pmt,
        interestEarned: interestEarned,
        fv: fv,
      });
    }

    setBreakdown(breakdownData);
    return fv;
  };

  const calculateSummary = () => {
    let totalInterestEarned = 0;
    let totalContributions = 0;

    // Calculate total interest earned and total contributions
    breakdown.forEach((month) => {
      totalInterestEarned += month.interestEarned;
      totalContributions += month.pmt;
    });

    // Ending value is the last month's FV
    const endingValue =
      breakdown.length > 0 ? breakdown[breakdown.length - 1].fv : 0;

    return {
      endingValue: endingValue,
      totalInterestEarned: totalInterestEarned,
      totalContributions: totalContributions,
    };
  };

  return {
    monthlyBreakdown: breakdown,
    calculateMonthlyBreakdown,
    summary: calculateSummary(),
  };
};

export default useMonthlyBreakdown;
