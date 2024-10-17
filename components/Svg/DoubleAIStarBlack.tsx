import * as React from "react"
import Svg, { Path, G } from "react-native-svg"

function DoubleAIStarBlack(props: any) {
  return (
    <Svg viewBox="0 0 78 83" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G
        fill="#171717"
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M62 51.5c-16.84 0-30.5-13.66-30.5-30.5 0 16.84-13.66 30.5-30.5 30.5 16.84 0 30.5 13.66 30.5 30.5 0-16.84 13.66-30.5 30.5-30.5zM77 16.5c-8.56 0-15.5-6.94-15.5-15.5 0 8.56-6.94 15.5-15.5 15.5 8.56 0 15.5 6.94 15.5 15.5 0-8.56 6.94-15.5 15.5-15.5z" />
      </G>
    </Svg>
  )
}

export default DoubleAIStarBlack;