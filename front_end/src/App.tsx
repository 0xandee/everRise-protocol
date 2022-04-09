import React from 'react';
import { DAppProvider, Kovan, Rinkeby, ChainId } from '@usedapp/core';
import { Container } from '@material-ui/core'
import { Header } from './components/Header'
import { Main } from './components/Main';

function App() {
  return (
    <DAppProvider config={{
      networks: [Kovan, Rinkeby],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000,
      },
    }}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>

    </DAppProvider>
  );
}

export default App;
