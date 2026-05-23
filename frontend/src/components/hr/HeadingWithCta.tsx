import { cm } from '@helper/clsx';
import Icon from '@components/icon/icon';
import { Link } from 'react-router';
import type React from 'react';
type HeadingWithCtaProps = {
  title: string;
  subtitle?: string;
  className?: string;
  classNameTitle?: string;
  classNameSubtitle?: string;
  href?: string;
  variant?: 'light';
};

const HeadingWithCta: React.FC<HeadingWithCtaProps> = ({
  className,
  classNameTitle,
  classNameSubtitle,
  title,
  subtitle,
  href,
  variant,
}) => {
  const textColor = variant === 'light' ? 'text-white' : '';
  const linkColor =
    variant === 'light' ? 'text-white hover:bg-white/10' : 'hover:bg-base-5';
  const iconColor = variant === 'light' ? 'text-white' : 'text-base-90';

  return (
    <div className="flex flex-col gap-base-xs shrink-0">
      <div className={cm('flex items-center gap-base', className)}>
        <span
          className={cm(`t-lg md:t-xl 2xl:t-2xl ${textColor}`, classNameTitle)}
        >
          {title}
        </span>
        {href && (
          <Link
            className={`${linkColor} flex rounded-base-sm p-base-xs transition-all duration-500 lg:-translate-x-8 lg:opacity-0 lg:transition-all lg:group-hover/mainlink:translate-x-0 lg:group-hover/mainlink:opacity-100`}
            to={String(href)}
          >
            <Icon
              icon={'caret-left-r'}
              additionalClasses={cm('t-7', iconColor)}
            />
          </Link>
        )}
      </div>
      {subtitle && (
        <span className={cm('t text-base-50', classNameSubtitle)}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default HeadingWithCta;
