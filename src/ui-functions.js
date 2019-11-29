

export function fetchBuffer(props, bufferName) {
  if (props.options.global) {
    return props.buffers[`global.${bufferName}`]
  }
  return props.buffers[`${props.location.pathname}.${bufferName}`]
}
