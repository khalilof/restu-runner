'use client';

import styles from '@/app/settings/page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadTables } from '@/app/store/dashboard/dashboardSlice';
import { MOCK_TABLES, Table } from '@/app/model/table';
import { TableStatus } from '@/app/model/table-status.enum';
import { setBackground, setCompactMode } from '@/app/store/settings/settingsSlice';



export default function Settings() {
    const dispatch = useDispatch();
    const compactModeFlag = useSelector((state: any) => state.settings.compactMode);
    const hasBackgroundFlag = useSelector((state: any) => state.settings.background);


    const onBackgroundChange = (): void => {
        dispatch(setBackground(!hasBackgroundFlag));
    }
    const onCompactChange = (): void => {
        dispatch(setCompactMode(!compactModeFlag));
    }

    return (
        <div className={styles['settings-container']}>
            <h1>Settings work!</h1>
            isCompact: {compactModeFlag ? 'true' : 'false'}
            <br/>
            hasBackground: {hasBackgroundFlag ? 'true' : 'false'}

            <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={hasBackgroundFlag} onChange={onBackgroundChange} />
                Has Background
            </label>
            <br/>
            <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={compactModeFlag} onChange={onCompactChange} />
                Compact Layout mode
            </label>
        </div>
    )
}