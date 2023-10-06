import React from 'react';
import InputMask from 'react-input-mask';

//https://reactjsexample.com/yet-another-react-component-for-input-masking/
class PhoneInput extends React.Component {
  render() {
    return <InputMask {...this.props} mask="999 999 9999" maskChar=" " />;
  }
}

export default PhoneInput;