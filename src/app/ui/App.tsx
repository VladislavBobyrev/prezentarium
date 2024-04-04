import '@vkontakte/vkui/dist/vkui.css';
import {
    AppRoot,
    View,
    Panel,
    SplitLayout,
    SplitCol,
    PopoutWrapper,
    useScrollLock, useAdaptivityConditionalRender, ModalDismissButton, PanelHeader, Group, CellButton,
} from '@vkontakte/vkui';

import {UserFoldersList} from '../../entities/userFolders/index.ts'
import {useState} from "react";

const CustomPopout = ({ onClose }) => {
    const { sizeX } = useAdaptivityConditionalRender();
    return (
        <PopoutWrapper onClick={onClose}>
            <div
                style={{
                    backgroundColor: 'var(--vkui--color_background_content)',
                    borderRadius: 8,
                    position: 'relative',
                    padding: '12px',
                }}
            >
                <h4>Кастомное модальное окно</h4>

                {sizeX.regular && (
                    <ModalDismissButton className={sizeX.regular.className} onClick={onClose}>
                        Закрыть кастомное модальное окно
                    </ModalDismissButton>
                )}
            </div>
        </PopoutWrapper>
    );
};
export const  App = () => {
    const [popout, setPopout] = useState(null);

    const onClick = () => setPopout(<CustomPopout onClose={() => setPopout(null)} />);

    return (
        <AppRoot>
            <SplitLayout popout={popout}>
                <SplitCol>
                    <View activePanel='main'>
                        <Panel id='main'>
                            <UserFoldersList/>
                            <Group>
                                <CellButton onClick={onClick}>Открыть модальное окно</CellButton>
                            </Group>
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};
