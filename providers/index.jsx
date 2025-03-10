import { FavoriteToolProvider } from './FavoriteToolProvider';
import { ThemeProvider } from './ThemeProvider';

const Provider = ({ children }) => {
  return (
    <ThemeProvider>
      <FavoriteToolProvider>
        {children}
      </FavoriteToolProvider>
    </ThemeProvider>
  );
};

export default Provider;
