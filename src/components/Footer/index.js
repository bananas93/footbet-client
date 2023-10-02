import { memo } from 'react';
import style from './index.module.scss';

const Footer = memo(() => (
  <footer className={style.footer}>
    <div className={style.footerCopyright}>footbet.pp.ua © 2023 Created by David Amerov</div>
  </footer>
));

export default Footer;
