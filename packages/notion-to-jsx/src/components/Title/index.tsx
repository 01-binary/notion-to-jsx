import { Heading1 } from '../Renderer/components/Typography';

interface Props {
  title: string;
}
const Title = ({ title }: Props) => {
  return <Heading1>{title}</Heading1>;
};

export default Title;
