import {
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    FormLayoutGroup,
    FormItem,
    Input,
    Button,
    useAdaptivityConditionalRender,
    PopoutWrapper,
    IconButton,
    Group,
    Header, Div, VisuallyHidden, Textarea,
} from "@vkontakte/vkui";

import {useState} from 'react'
import {addUserFolders} from "../../entities/userFolders";
import styles from "../../entities/userFolders/ui/userFoldersModal.module.scss";
import classes from "../../entities/userFolders/ui/userFolderList.module.scss";
import {Icon16MoreVertical, Icon20FolderFill, Icon24Cancel} from "@vkontakte/icons";
import {userFolders} from "../../entities/userFolders/api/userFolders.ts";
export const App = () => {
    const [popout, setPopout] = useState(null);
    const [folders, addFolders] = useState(userFolders)
    const  UserFoldersList = ({createPopout}) => {
        return (
            <Group style={{
                gap: '8px',
                display:'flex',
                flexDirection: 'column',
            }} header={<Header mode="secondary">

                <Button
                    className={classes.button_accent_invariable}
                    stretched
                    size="l"
                    onClick={createPopout}
                >
                    Создать папку
                </Button>
            </Header>}>
                {
                    folders.map((item) => {
                        return (
                            <SplitLayout className={classes.list} key={item.name}>
                                <Div className={classes.listPart}>
                                    <Icon20FolderFill />
                                    <span>{item.name}</span>
                                </Div>
                                <Div className={classes.listPart}>
                                    <span>{item.description}</span>
                                    <IconButton>
                                        <VisuallyHidden>Меню папки</VisuallyHidden>
                                        <Icon16MoreVertical />
                                    </IconButton>
                                </Div>
                            </SplitLayout>
                        )
                    })
                }

            </Group>
        );
    };
    const UserFoldersModal = ({ onClose }) => {
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
                    <div className={styles.modal_header}>
                        <span>Новая папка</span>
                        <IconButton className={sizeX.regular.className} onClick={onClose} label="Закрыть кастомное модальное окно" >
                            <Icon24Cancel />
                        </IconButton>
                    </div>
                    <div className={styles.modal_body}>
                        <ContentModal/>
                    </div>
                </div>
            </PopoutWrapper>
        );
    };

    const ContentModal = ({ formItemStatus }) => {
        const  [value, setValue] = useState('');
        const  [valueTextarea, setValueTextarea] = useState('');
        return (
            <FormLayoutGroup>
                <FormItem htmlFor="example" top={<div  className={styles.label}><div>Название презентации</div><div>{value.length}/50 символов</div></div>} status={formItemStatus}>
                    <Input
                        id="example"
                        type="text"
                        value={value}
                        placeholder='Введите описание'
                        onChange={ e => setValue(e.target.value) }
                        defaultValue="Введите описание"
                    />
                </FormItem>
                <FormItem htmlFor="example" top={<div  className={styles.label}>Описание презентации</div>} status={formItemStatus}>
                    <Textarea
                        id="example"
                        type="text"
                        placeholder='Введите описание'
                        value={valueTextarea}
                        onChange={ e => setValueTextarea(e.target.value) }
                        defaultValue="Введите описание"
                    />
                </FormItem>
                <Button
                    className={classes.button_positive}
                    stretched
                    size="l"
                    onClick={() => {
                        addUserFolders(folders, addFolders,{ 'name': value, 'description': 0})
                        setPopout(null)
                    }  }
                >
                    Создать папку
                </Button>
            </FormLayoutGroup>
        );
    };
    const createPopout = () => setPopout(<UserFoldersModal onClose={() => setPopout(null)} />);

    return (
        <AppRoot>
            <SplitLayout  popout={popout}>
                <SplitCol>
                    <View activePanel="modals">
                        <Panel id="modals">
                            <UserFoldersList createPopout={createPopout}/>
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};
