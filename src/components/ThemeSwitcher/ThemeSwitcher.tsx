import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as themeSlice from '../../features/theme/themeSlice';
import './ThemeSwitcher.scss';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);
  console.log(theme)

  return (
    <div
      className={classNames("theme-switcher", {
        'theme-switcher--dark': theme === 'dark',
      })}
      onClick={() => dispatch(themeSlice.switchTheme())}
    />
  )
} 