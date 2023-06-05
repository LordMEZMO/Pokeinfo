import React from 'react';
import styles from './styles/sortOrderCheckbox.module.css';

function SortOrderCheckbox({ value, handleSortOrder }) {
	return (
		<div style={{width: 40, height: 40}}>
			<label htmlFor='sortOrderCheckbox' className={styles['label'] + ' ' + (value ? styles['checked'] : '')}>
			</label>
			<input
				type='checkbox'
				name='sortOrderCheckbox'
				id='sortOrderCheckbox'
				onChange={handleSortOrder}
				value={value}
				className={styles['input'] + ' ' + (value ? styles['checked'] : 'checked')}
			/>
		</div>
	);
}

export default SortOrderCheckbox;
