type UseFutureValueParams = {
  principal: number;
  years: number;
  rate: number;
  additionalContribution: number;
  contributeAtStart?: boolean;
};

const useFutureValue = ({
  principal,
  years,
  rate,
  additionalContribution,
  contributeAtStart,
}: UseFutureValueParams) => {
  if (!principal || !years || !rate) {
    return 0;
  }

  const annualRate = rate / 100;
  const months = years * 12;

  // Calculate future value of the principal using FV formula
  const fvPrincipal = principal * Math.pow(1 + annualRate, years);

  // Calculate future value of monthly contributions
  let fvContributions = 0;
  if (additionalContribution > 0) {
    for (let i = 0; i < months; i++) {
      const t = contributeAtStart ? (months - i) / 12 : (months - i - 1) / 12;
      fvContributions += additionalContribution * Math.pow(1 + annualRate, t);
    }
  }

  return fvPrincipal + fvContributions;
};

export default useFutureValue;
