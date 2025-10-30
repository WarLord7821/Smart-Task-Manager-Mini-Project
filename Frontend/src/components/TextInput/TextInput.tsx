import { IInputProps } from "./ITextInput";
import "./TextInput.css"

const TextInput: React.FC<IInputProps> = ({
    label,
    placeholder,
    value,
    onChange,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="inputContainer">
            <label className="labelStyle">{label}</label>
            <input
                className="input"
                type="text"
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
            />
        </div>
    );
};

export default TextInput;
