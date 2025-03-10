interface ContainerProps {
  children: React.ReactNode;
  styles?: string;
}

const Container: React.FC<ContainerProps> = ({ children, styles }) => {
  return <div className={`mx-auto w-full max-w-8xl ${styles}`}>{children}</div>;
};

export default Container;
