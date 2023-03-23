import Link from 'next/link';
import styles from '@/app/common/nav-bar.module.scss';
export function NavBar() {
    return(
        <nav className={styles['nav-bar']}>
            <Link href="/dashboard">
                Dashboard
            </Link>
            <Link href="/settings">
                Settings
            </Link>
        </nav>
    );
}
