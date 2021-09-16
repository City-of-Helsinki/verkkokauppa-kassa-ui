import React, {DetailedHTMLProps, FunctionComponent, InputHTMLAttributes} from 'react'

type Props = {
  image: string,
  title: string
}
export const PaymentMethod: FunctionComponent<Props &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  const { className, onClick, onChange, onFocus, checked, image, title } = props;
  return (
    <div className={className} onClick={onClick}>
      <input
        className="radio_label"
        type="radio"
        name="payment_method"
        value="small"
        onChange={onChange}
        onFocus={onFocus}
        checked={checked}
      />
      <img className="payment_method_img" src={image} alt={title} />
      <div>{title}</div>
    </div>
  );
};