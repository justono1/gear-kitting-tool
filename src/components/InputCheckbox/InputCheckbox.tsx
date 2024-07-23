import { ChangeEventHandler } from 'react'
import styles from './InputCheckbox.module.scss'

interface InputCheckboxProps {
  name: string
  value: string
  label: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  checked?: boolean
}

export default function InputCheckbox({
  name,
  value,
  checked,
  onChange,
  label,
}: InputCheckboxProps) {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.customCheckbox}></span>
      {label}
    </label>
  )
}
