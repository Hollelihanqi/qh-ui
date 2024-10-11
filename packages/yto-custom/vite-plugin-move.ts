export default function movePlugin(afterBuildCall: Function) {
  return {
    name: 'move-file',
    closeBundle() {
      afterBuildCall()
    },
  }
}
