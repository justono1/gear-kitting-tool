import { ChangeEventHandler } from 'react'
import styles from './InputRadio.module.scss'

interface InputRadioProps {
  name: string
  value: string
  label: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  checked?: boolean
}

export default function InputRadio({ name, value, checked, onChange, label }: InputRadioProps) {
  return (
    <label className={styles.radioButtonLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioButtonInput}
      />
      <span className={styles.customRadioButton}></span>
      {label}
    </label>
  )
}
