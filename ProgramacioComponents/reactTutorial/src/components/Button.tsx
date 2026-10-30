import { Link } from 'react-router-dom';
import './Button.css';

type ButtonProps = {
  id: string;
  text: string;
};

export default function Button({ id, text }: ButtonProps) {
  return (
    <Link to={`/${id}`}>
      <button>{text}</button>
    </Link>
  );
}