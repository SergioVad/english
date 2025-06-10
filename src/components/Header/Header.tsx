import { classNames } from '../../shared/helpers/classNames/classNames';
import { memo } from 'react';
import Logo from '../../shared/assets/img/logo/BRITANIKO_vertical.svg';
import { HStack } from '../../shared/ui/Stack';
import cls from './Header.module.css';

interface HeaderProps {
    className?: string;
}

export const Header = memo((props: HeaderProps) => {
    const { className } = props;
    return (
        <HStack
            justify="between"
            className={classNames(cls.Header, {}, [className])}
        >
            <img src={Logo} alt="Logo" height={80} />
            <HStack className={cls.wrapper_a} gap="32">
                <a href="#">О нас</a>
                <a href="/course">Курсы</a>
                <a href="#">Методики</a>
                <a href="#">Медиа</a>
            </HStack>
        </HStack>
    );
});

Header.displayName = 'Header';
