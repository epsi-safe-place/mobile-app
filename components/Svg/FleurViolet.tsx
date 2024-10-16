import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function FleurViolet(props: any) {
  return (
    <Svg viewBox="0 0 69.68 70" {...props}>
      <G fill="#9683ec">
        <Path d="M59.92 10.86C45.69-2.78 41.39 28.35 41.39 28.35l.12.13s31.32-2.49 18.53-17.49" />
        <Path d="M69.68 35.08c-.98-19.69-25.48-.01-25.48-.01v.17s24.48 19.7 25.48.01" />
        <Path d="M60.15 59.41C72.9 44.38 41.57 41.97 41.57 41.97l-.12.13s4.38 31.12 18.58 17.44M9.76 10.86C23.99-2.78 28.29 28.35 28.29 28.35l-.12.13s-31.33-2.5-18.53-17.5" />
        <Path d="M0 35.08c.98-19.69 25.48-.01 25.48-.01v.17S1 54.94 0 35.25" />
        <Path d="M9.52 59.41C-3.23 44.38 28.1 41.97 28.1 41.97l.12.13S23.84 73.22 9.64 59.54M34.75 0c-19.69.99 0 25.48 0 25.48h.17S54.61.99 34.92 0" />
        <Path d="M34.75 70c-19.69-.99 0-25.48 0-25.48h.17s19.69 24.49 0 25.48" />
        <Circle cx={34.84} cy={35} r={4.2} />
      </G>
    </Svg>
  )
}

export default FleurViolet