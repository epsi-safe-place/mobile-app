import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AIStar(props: any) {
  return (
    <Svg viewBox="0 0 63 63" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M62 31.5C45.16 31.5 31.5 17.84 31.5 1c0 16.84-13.66 30.5-30.5 30.5 16.84 0 30.5 13.66 30.5 30.5 0-16.84 13.66-30.5 30.5-30.5z"
        fill="#fff"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default AIStar;