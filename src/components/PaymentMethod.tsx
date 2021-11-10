import React, {DetailedHTMLProps, FunctionComponent, InputHTMLAttributes} from 'react'

type Props = {
  image: string,
  title: string,
}
export const PaymentMethod: FunctionComponent<Props &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  const { className, onClick, onChange, onFocus, checked, image, title } = props;

  return (
    <li>
      <div className={className} onClick={onClick} id={title}>
        <label>
        <input
          className="radio_label"
          id={title+"_input"}
          type="radio"
          name="payment_method"
          value="small"
          onChange={onChange}
          onFocus={onFocus}
          checked={checked}
          aria-label={title}
        />
        <img className="payment_method_img" src={image} alt={title}/>
        <div>{title}</div>
        </label>
        
      </div>
    </li>
  );
};