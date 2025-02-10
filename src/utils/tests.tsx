import { PreloadedState } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react'

import { RootState, AppStore, configuraStore } from '../store'
import { JSX, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface ExtendedRenderOpions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderizaComProvider(
  elemento: React.ReactElement,
  {
    preloadedState = {},
    store = configuraStore(preloadedState),
    ...opcoesAdicionais
  }: ExtendedRenderOpions = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(elemento, {
      wrapper: Encapsulador,
      ...opcoesAdicionais
    })
  }
}
