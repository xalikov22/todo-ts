import styles from './Label.module.css'

interface LabelProps {
  text: string
  color: 'red' | 'green' | 'blue'
}

function Label({text, color}: LabelProps): JSX.Element {
  return (
    <div className={`${styles.Label} ${styles[color]}`}>
      <div className={styles.TextBox}>{text}</div>
    </div>
  )
}

export default Label
