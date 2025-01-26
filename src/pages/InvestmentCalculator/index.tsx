import {
  Button,
  Container,
  NumberInput,
  Stack,
  Switch,
  Table,
} from '@mantine/core';

import useInvestmentCalculator from './viewModel';

export function InvestmentCalculator() {
  const {
    setPrincipal,
    setYears,
    setRate,
    setAdditionalContribution,
    setContributeAtStart,
    monthlyBreakdown,
    summary,
    calculateMonthlyBreakdown,
  } = useInvestmentCalculator();

  const rows = monthlyBreakdown.map((element) => (
    <Table.Tr key={element.month}>
      <Table.Td>{element.month}</Table.Td>
      <Table.Td>{element.pv}</Table.Td>
      <Table.Td>{element.pmt}</Table.Td>
      <Table.Td>{element.interestEarned}</Table.Td>
      <Table.Td>{element.fv}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      <Stack justify="center" gap="md">
        <NumberInput
          label="Initial Amount"
          placeholder="Initial Amount"
          decimalScale={2}
          fixedDecimalScale
          onChange={(v) => setPrincipal(Number(v))}
        />
        <NumberInput
          label="After (years)"
          placeholder="After how many years?"
          min={0}
          max={150}
          onChange={(v) => setYears(Number(v))}
        />
        <NumberInput
          label="Return Rate (%)"
          placeholder="Return Rate (%)"
          decimalScale={2}
          onChange={(v) => setRate(Number(v))}
        />
        <NumberInput
          label="Additional Contribution"
          placeholder="Additional Contribution"
          decimalScale={2}
          fixedDecimalScale
          onChange={(v) => setAdditionalContribution(Number(v))}
        />

        <Switch
          label="Contribute at the beginning of each month?"
          onChange={(event) =>
            setContributeAtStart(event.currentTarget.checked)
          }
        />

        <Button fullWidth onClick={calculateMonthlyBreakdown}>
          Calculate
        </Button>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Ending Balance</Table.Th>
              <Table.Th>Total Contributions</Table.Th>
              <Table.Th>Total Interest Earned</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>{summary.endingValue}</Table.Td>
              <Table.Td>{summary.totalContributions}</Table.Td>
              <Table.Td>{summary.totalInterestEarned}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

        <Table.ScrollContainer minWidth={500}>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Month</Table.Th>
                <Table.Th>PV</Table.Th>
                <Table.Th>PMT</Table.Th>
                <Table.Th>Interest</Table.Th>
                <Table.Th>FV</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </Container>
  );
}
