import css from './Progress.module.scss'
import classes from 'classnames'

export type ProgressIncrement = {
  label: string
  value: number // 0 - 100
}

interface ProgressProps {
  progress: number
  className?: string
  increments?: ProgressIncrement[]
}

export default function Progress({ progress, className, increments }: ProgressProps) {
  return (
    <div className={classes(css.progressContainer, className)}>
      {increments &&
        increments.map((item) => (
          <div
            className={css.increment}
            key={`${item.label}${item.value}`}
            style={{ left: `${item.value}%` }}
          >
            {item.label}
          </div>
        ))}

      <div className={css.progressFill} style={{ width: `${progress}%` }}></div>
    </div>
  )
}
