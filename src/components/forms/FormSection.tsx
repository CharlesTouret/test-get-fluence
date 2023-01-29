import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import viewPassword from '../../images/login/view-password.svg';

interface FormSectionProps {
  type?: string;
  title?: string;
  id?: string;
  elemSize?: string; // can be m or s
  onChange?: any;
  onChange2?: any;
  value?: string | number;
  inputTextPlaceholder?: string;
  passwordShown?: boolean;
  setPasswordShown?: any;
  pickerOption?: any;
  buttonOption?: ButtonOption[];
  open?: boolean;
}

function FormSection({
  type, title, onChange, onChange2, value, inputTextPlaceholder, passwordShown, setPasswordShown, pickerOption, elemSize = 'm', buttonOption, open,
}: FormSectionProps) {
  if (type === 'inputText') return InputText(title, inputTextPlaceholder, onChange, value, elemSize);
  if (type === 'inputNumber') return InputNumber(title, inputTextPlaceholder, onChange, value, elemSize);
  if (type === 'inputPasswordText') return InputPasswordText(title, inputTextPlaceholder, onChange, value, passwordShown, setPasswordShown, elemSize);
  if (type === 'picker') return Picker(title, value, pickerOption, onChange, elemSize);
  if (type === 'searchablePicker') return SearchablePicker(title, value, pickerOption, onChange, onChange2, inputTextPlaceholder, open, elemSize);
  if (type === 'multiple') return MultipleOptions(title, onChange, buttonOption);
  return null;
}

function InputText(title?: string, inputTextPlaceholder?: string, onChange?: any, value?: string | number, elemSize?: string) {
  return (
    <FormSectionDiv>
      <FormSectionTitle elemSize={elemSize}>{title}</FormSectionTitle>
      <FormTextInput
        type="text"
        placeholder={inputTextPlaceholder}
        onChange={onChange}
        value={value}
        elemSize={elemSize}
      />
    </FormSectionDiv>
  );
}

function InputNumber(title?: string, inputTextPlaceholder?: string, onChange?: any, value?: string | number, elemSize?: string) {
  return (
    <FormSectionDiv>
      <FormSectionTitle elemSize={elemSize}>{title}</FormSectionTitle>
      <FormTextInput
        type="number"
        placeholder={inputTextPlaceholder}
        onChange={onChange}
        value={value}
        elemSize={elemSize}
      />
    </FormSectionDiv>
  );
}

function InputPasswordText(title?: string, inputTextPlaceholder?: string, onChange?: any, value?: string | number, passwordShown?: boolean, setPasswordShown?: any, elemSize?: string) {
  return (
    <FormSectionDiv>
      <FormSectionTitle>{title}</FormSectionTitle>
      <FormTextInputWithImage>
        <FormTextInput
          type={passwordShown ? 'text' : 'password'}
          placeholder={inputTextPlaceholder}
          onChange={onChange}
          value={value}
          elemSize={elemSize}
        />
        <InputImage src={viewPassword} onClick={() => setPasswordShown(!passwordShown)} alt="inputImage" />
      </FormTextInputWithImage>
    </FormSectionDiv>
  );
}

function Picker(title?: string, value?: string | number, pickerOption?: any, onChange?: any, elemSize?: string) {
  return (
    <FormSectionDiv>
      <FormSectionTitle elemSize={elemSize}>{title}</FormSectionTitle>
      <FormSelect defaultValue={value} type={value} onChange={onChange} elemSize={elemSize}>
        <option value="default" disabled hidden> Select a value </option>
        {pickerOption.map((option: any) => (
          <FormSelectOption key={option[0]} value={option[0]}>{option[1]}</FormSelectOption>
        ))}
      </FormSelect>
    </FormSectionDiv>
  );
}

function SearchablePicker(title?: string, value?: string | number, pickerOption?: any, onChange?: any, onChange2?: any, inputTextPlaceholder?: string, open?: boolean, elemSize?: string) {
  return (
    <FormSectionDiv>
      <FormSectionTitle elemSize={elemSize}>{title}</FormSectionTitle>
      <FormTextInput
        type="text"
        placeholder={inputTextPlaceholder}
        onChange={onChange}
        onClick={onChange}
        value={value}
        elemSize={elemSize}
      />
      <DownOutlined style={{ position: 'absolute', right: '0px', top: '50px' }} />
      { open ? (
        <SearchablePickerDiv>

          {pickerOption.map((option: any) => (
            <SearchablePickerItem elemSize={elemSize} onClick={onChange2} key={option}>{option}</SearchablePickerItem>
          ))}

        </SearchablePickerDiv>
      ) : null}
    </FormSectionDiv>
  );
}

function MultipleOptions(title?: string, onChange?: any, buttonOption: ButtonOption[] = []) {
  return (
    <FormSectionDiv>
      <FormSectionTitle>{title}</FormSectionTitle>
      <ButtonOptions>
        {buttonOption.map((option: any) => (
          <FormMultipleDiv onClick={onChange} style={option.selected ? { border: '1.5px solid #3368DD' } : {}} key={option.title}>{option.title}</FormMultipleDiv>
        ))}
      </ButtonOptions>
    </FormSectionDiv>
  );
}

export interface ButtonOption {
  title: string;
  selected: boolean;
}

export default FormSection;

const FormMultipleDiv = styled.div`
display:flex;
background-color: white;
color: #3368DD;
width: 100%;
height: 56px;
border: 0px;
border-radius: 5px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  `;

const FormSectionDiv = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  border-radius: 8px;
  width: 100%;
  height: 91px;
`;

const FormSectionTitle = styled.div<{ elemSize?: string }>`
  color: #27345E;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: ${(props) => (props.elemSize === 's' ? '15px'
    : '20px')};
`;

const FormTextInput = styled.input<{ elemSize?: string }>`
  background-color: white;
  color: #3368DD;
  width: 100%;
  border: 0px;
  font-size: 16px;
  height: 56px;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  font-size: ${(props) => (props.elemSize === 's' ? '13px'
    : '16px')};
  ::placeholder {
    color: #C4C4C4;
  }
`;

const FormTextInputWithImage = styled.div<{ elemSize?: string }>`
  background-color: white;
  display: flex;
  align-items: center;
`;

const InputImage = styled.img`
margin: 10px;
cursor: pointer;
`;

const FormSelect = styled.select<{ type: any, elemSize?: string }>`
  background-color: white;
  color: ${(props) => (props.type === 'default' ? '#3368DD'
    : '#3368DD')};
  // margin-left: -4px;
  width: 100%;
  border: 0px;
  height: 56px;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  font-size: ${(props) => (props.elemSize === 's' ? '12px'
    : '14px')};
`;

const FormSelectOption = styled.option`
  background-color: #F5F7FD;
  color: #3368DD;
  width: 10px;
`;

const ButtonOptions = styled.div`
    display: flex;
    width: 100%;
    gap: 5px;
  `;

const SearchablePickerItem = styled.div<{ elemSize?: string }>`
  width: 100%;
  background-color: white;
  color: #3368DD;
  height: 50px;
  padding: 10px;
  cursor: pointer;
  text-overflow: ellipsis;
  font-size: ${(props) => (props.elemSize === 's' ? '12px'
    : '14px')};
  &:hover {
    background-color: #F8F8F8;
  }
`;

const SearchablePickerDiv = styled.div`
  width: 100%;
  max-height: 250px;
  position: absolute;
  top: 90px;
  z-index: 2;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
`;
