import css from './Triangle.module.scss'
import classes from 'classnames'

interface TriangleProps {
  direction: 'right' | 'down'
  className?: string
}

export default function Triangle({ direction, className }: TriangleProps) {
  return <div className={classes(css.triangle, css[direction], className)}></div>
}
