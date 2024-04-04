import classes from './userFolderList.module.scss'

import '@vkontakte/vkui/dist/vkui.css';
import {
    Div,
    SplitLayout,
    IconButton,
    VisuallyHidden,
    Header,
    Button,
    Group,
} from '@vkontakte/vkui';
import {
    Icon20FolderFill,
    Icon16MoreVertical
} from '@vkontakte/icons';
import {userFolders} from "../api/userFolders.ts";
import {addUserFolders} from "../model/addUserFolders.ts";
import {useState} from "react";


export const  UserFoldersList = () => {
    const [folders, addFolders] = useState(userFolders)

    return (
        <Group style={{
            gap: '8px',
            display:'flex',
            flexDirection: 'column',
        }} header={<Header mode="secondary">
            <Button
                className={classes.button_accent}
                stretched
                size="l"
                onClick={() => addUserFolders(folders, addFolders,{ 'name': 'new ' + Date.now(), 'description': 0}) }
            >
                Создать папку
            </Button>
            <Button
                className={classes.button_positive}
                stretched
                size="l"
                onClick={() => addUserFolders(folders, addFolders,{ 'name': 'new ' + Date.now(), 'description': 0}) }
            >
                Создать папку
            </Button>
            <Button
                className={classes.button_negative}
                stretched
                size="l"
                appearance="negative"
                onClick={() => addUserFolders(folders, addFolders,{ 'name': 'new ' + Date.now(), 'description': 0}) }
            >
                Создать папку
            </Button>
            <Button
                className={classes.button_neutral}
                stretched
                size="l"
                onClick={() => addUserFolders(folders, addFolders,{ 'name': 'new ' + Date.now(), 'description': 0}) }
            >
                Создать папку
            </Button>
            <Button
                className={classes.button_accent_invariable}
                stretched
                size="l"
                onClick={() => addUserFolders(folders, addFolders,{ 'name': 'new ' + Date.now(), 'description': 0}) }
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