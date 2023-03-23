'use client';

import styles from '@/app/dashboard/dashboard-item/dashboard-item.module.scss';
import { Table } from '@/app/model/table';
import { TableStatus } from '@/app/model/table-status.enum';
import { useState } from 'react';
import { statusToDescriptionMap, statusToIconMap } from '@/app/model/static.mapper';

export default function DashboardItem(props: {table: Table, onTableStatusChange: any}) {
    const table = props.table;
    const tableStatusDescription = statusToDescriptionMap.get(table.status);
    const iconName = statusToIconMap.get(table.status);

    const [isExpanded, setExpanded] = useState<boolean>(false);

    const handleExpandToggle = () => {
        setExpanded(!isExpanded);
    };

    const [meals, setMeals] = useState<string>('');

    const handleMealsChange = (event: any) => {
        setMeals(event.target.value ?? '');
    };

    const updateStatus = (status: TableStatus) => {
       props.onTableStatusChange({...table, status, currentOrder: meals});
    }



    return(
    <div className={`${styles['dashboard-item']} ${isExpanded ? styles.expanded : ''} ${table.notify ? styles.notify : ''}`}>
        <div className={`${styles['action-box']} ${styles[table.status]}`}>
            <div onClick={handleExpandToggle}>
                <span className="material-symbols-outlined">{isExpanded ? 'close_fullscreen' : 'expand_content' }</span>
            </div>
            <h2># {table.id}</h2>
            <span className="material-symbols-outlined">{iconName}</span>
        </div>
        {table && (
            <div className={styles.content}>
                <p> <strong>[{table.status}]</strong> {tableStatusDescription} </p>

                {table.status === TableStatus.ORDERING && (
                    <div><textarea value={meals} onChange={handleMealsChange} placeholder="Guest wishes ..." /></div>
                )}

                {table.status === TableStatus.FINISHED && (
                    <div>
                        <h4>Meal:</h4>
                        <pre>{table.currentOrder}</pre>
                    </div>
                )}


                {table.status === TableStatus.CLEANING && (
                    <button onClick={() => updateStatus(TableStatus.AVAILABLE)}><span className="material-symbols-outlined">event_available</span><br />Set as Available</button>
                )}

                {table.status === TableStatus.AVAILABLE && (
                    <button onClick={() => updateStatus(TableStatus.ORDERING)}><span className="material-symbols-outlined">edit_note</span><br />Set as Ordering</button>
                )}

                {table.status === TableStatus.ORDERING && (
                    <button onClick={() => updateStatus(TableStatus.ORDERED)} disabled={meals.length <= 0}><span className="material-symbols-outlined">cooking</span><br />Set as Ordered</button>
                )}

                {table.status === TableStatus.ORDERED && (
                    <button onClick={() => updateStatus(TableStatus.FINISHED)}><span className="material-symbols-outlined">done</span><br />Set as Finished</button>
                )}

                {table.status === TableStatus.FINISHED && (
                    <button onClick={() => updateStatus(TableStatus.PAID)}><span className="material-symbols-outlined">paid</span><br />Set as Paid</button>
                )}

                {table.status === TableStatus.PAID && (
                    <button onClick={() => updateStatus(TableStatus.CLEANING)}><span className="material-symbols-outlined">cleaning_services</span><br />Set as Cleaning</button>
                )}
            </div>
        )}

    </div>
    );
};