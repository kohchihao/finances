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
  pv: string;
  pmt: string;
  interestEarned: string;
  fv: string;
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
        pv: pv.toFixed(2),
        pmt: pmt.toFixed(2),
        interestEarned: interestEarned.toFixed(2),
        fv: fv.toFixed(2),
      });
    }

    setBreakdown(breakdownData);
    return fv.toFixed(2);
  };

  const calculateSummary = () => {
    let totalInterestEarned = 0;
    let totalContributions = 0;

    // Calculate total interest earned and total contributions
    breakdown.forEach((month) => {
      totalInterestEarned += parseFloat(month.interestEarned);
      totalContributions += parseFloat(month.pmt);
    });

    // Ending value is the last month's FV
    const endingValue =
      breakdown.length > 0 ? parseFloat(breakdown[breakdown.length - 1].fv) : 0;

    return {
      endingValue: endingValue.toFixed(2),
      totalInterestEarned: totalInterestEarned.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
    };
  };

  return {
    monthlyBreakdown: breakdown,
    calculateMonthlyBreakdown,
    summary: calculateSummary(),
  };
};

export default useMonthlyBreakdown;
