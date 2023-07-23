import { useRef } from "react"
import { TextInput } from "react-native"

export const useInputController = () =>{
    const phoneInputRef  = useRef<TextInput>()
    return {
        phoneInputRef
    }
}