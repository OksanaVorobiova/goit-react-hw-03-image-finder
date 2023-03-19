import { Rings } from 'react-loader-spinner';
import { RingsContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <RingsContainer>
      <Rings
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </RingsContainer>
  );
};
