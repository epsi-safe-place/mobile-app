import { Text } from "react-native"

interface CustomTextProps {
    children: React.ReactNode
}

const CustomText: React.FC<CustomTextProps> = ({children}) => {
    return(
        <Text style={{fontFamily: "Helevtica"}}>{children}</Text>
    )
}

export default CustomText;