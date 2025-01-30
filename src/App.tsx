import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCoinMoneroFilled } from '@tabler/icons-react';
import classes from './App.module.css';
import MyFinanceRoutes from './Routes';
import { NAVBAR_ITEMS } from './constants/navbar';

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <IconCoinMoneroFilled size={30} />
            <Group ml="xl" gap={0} visibleFrom="sm">
              {NAVBAR_ITEMS.map((item) => (
                <UnstyledButton
                  component="a"
                  className={classes.control}
                  href={item.href}
                >
                  {item.title}
                </UnstyledButton>
              ))}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {NAVBAR_ITEMS.map((item) => (
          <UnstyledButton
            component="a"
            className={classes.control}
            href={item.href}
          >
            {item.title}
          </UnstyledButton>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <MyFinanceRoutes />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
