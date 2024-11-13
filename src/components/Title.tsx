type TitlePropsType = {
  title: string;
};

const Title = ({ title }: TitlePropsType) => {
  return <h1 className="page-title">{title}</h1>;
};

export default Title;
