import React from 'react';

import { Input } from './styles';

interface TextInputData {
  placeholderText: string;
}

const TextInput: React.FC<TextInputData> = ({ placeholderText }) => (
  <Input placeholder={placeholderText} />
);

export default TextInput;
