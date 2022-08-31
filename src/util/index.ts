export const uuid = () => {
  return (Math.random() * Date.now()).toString(16).substr(0, 8) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 6) +
    (Math.random() * Date.now()).toString(16).substr(0, 6)
}
