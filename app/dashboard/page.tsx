'use client';

import styles from '@/app/dashboard/page.module.scss';
import { TableStatus } from '@/app/model/table-status.enum';
import { MOCK_TABLES, Table } from '@/app/model/table';
import DashboardItem from '@/app/dashboard/dashboard-item/dashboard-item';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTables, setFilterValue } from '@/app/store/dashboard/dashboardSlice';


function Dashboard() {
    const statusCountMap = new Map<string, number>();
    const dispatch = useDispatch();

    const tables = useSelector((state: any) => state.dashboard.tables);
    const filterValue = useSelector((state: any) => state.dashboard.filterValue);
    const isCompact = useSelector((state: any) => state.settings.compactMode);
    const hasBackground = useSelector((state: any) => state.settings.background);


    useEffect(() => {
        console.log('use effect called!');
        dispatch(loadTables(MOCK_TABLES));
    }, [dispatch]);

    const handleFilterValueChange = (filterValue: string): void => {
        dispatch(setFilterValue(filterValue));
    };

    const handleTableStatusChange = (tableToUpdate: Table): void => {
        if (tableToUpdate.status === TableStatus.ORDERED) {
            setTimeout(() => updateTable({...tableToUpdate, notify: true}), 5000);
        }
        updateTable({...tableToUpdate, notify: false});
    }

    function updateTable(tableToUpdate: Table): void {
        const updatedTables = [...tables].map(it => {
            return it.id === tableToUpdate.id ? tableToUpdate : it;
        });
        // dispatching update action to the store, replacing the list with new one (including the updated table)
        dispatch(loadTables(updatedTables))
    }

    return (
        <div className={`${styles.dashboard} ${hasBackground ? styles.withBackground: ''}`}>
            <div className={`${styles.items} ${isCompact ? styles.compact: ''}`}>
                {
                    tables?.filter((table: Table) => filterValue.length > 0 ? table.status === filterValue: true).map((it: Table) => (
                        <DashboardItem onTableStatusChange={handleTableStatusChange} key={it.id} table={it}></DashboardItem>
                    ))
                }
            </div>
            <div className={styles.actions}>

                <button onClick={() => handleFilterValueChange(TableStatus.AVAILABLE)}>
                    <span className={styles.badge}>{ statusCountMap?.get(TableStatus.AVAILABLE) } </span>
                    <span className="material-symbols-outlined">event_available</span>
                    <br/>
                    Available
                </button>
                <button onClick={() => handleFilterValueChange(TableStatus.ORDERING)}>
                    <span className={styles.badge}>{ statusCountMap?.get(TableStatus.ORDERING) } </span>
                    <span className="material-symbols-outlined">edit_note</span>
                    <br/>
                    Ordering
                </button>
                <button onClick={() => handleFilterValueChange(TableStatus.ORDERED)}>
                    <span className={styles.badge}>{ statusCountMap?.get(TableStatus.ORDERED) } </span>
                    <span className="material-symbols-outlined">cooking</span>
                    <br/>
                    Ordered
                </button>
                <button onClick={() => handleFilterValueChange(TableStatus.FINISHED)}>
                    <span className={styles.badge}>{ statusCountMap?.get(TableStatus.FINISHED) } </span>
                    <span className="material-symbols-outlined">done</span>
                    <br/>
                    Finished
                </button>
                <button onClick={() => handleFilterValueChange(TableStatus.PAID)}>
                    <span className={styles.badge}>{ statusCountMap?.get(TableStatus.PAID) } </span>
                    <span className="material-symbols-outlined">paid</span>
                    <br/>
                    Paid
                </button>
                <button onClick={() => handleFilterValueChange(TableStatus.CLEANING)}>
                    <span className={styles.badge}>{ statusCountMap?.get(TableStatus.CLEANING) } </span>
                    <span className="material-symbols-outlined">cleaning_services</span>
                    <br/>
                    Cleaning
                </button>


                <button onClick={() => handleFilterValueChange('')}>
                    <span className="material-symbols-outlined">filter_alt_off</span>
                    <br/>
                    No Filter
                </button>
            </div>
        </div>
    )
}

export default Dashboard;
