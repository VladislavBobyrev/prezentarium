import { createRoot } from 'react-dom/client';
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/components.css';
import '@vkontakte/vkui-tokens/themes/paradigmBase/cssVars/declarations/onlyVariables.css';
import '@vkontakte/vkui-tokens/themes/paradigmBaseDark/cssVars/declarations/onlyVariablesLocal.css';

import { App } from './app'
import {
    AdaptivityProvider,
    ConfigProvider,
} from '@vkontakte/vkui';



const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <ConfigProvider
        appearance="light"
        tokensClassNames={{
        light: 'vkui--paradigmBase--light',
        dark: 'vkui--paradigmBase--dark',
    }}>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
);