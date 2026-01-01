import type { SVGProps } from 'react';

import { cn } from '@/utilities';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const Icon = ({ className, children, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('size-6', className)}
    {...props}
  >
    {children}
  </svg>
);

export const AlertCircle = (props: IconProps) => (
  <Icon {...props}>
    <circle cx='12' cy='12' r='10' />
    <line x1='12' x2='12' y1='8' y2='12' />
    <line x1='12' x2='12.01' y1='16' y2='16' />
  </Icon>
);

export const AlertTriangle = (props: IconProps) => (
  <Icon {...props}>
    <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
    <path d='M12 9v4' />
    <path d='M12 17h.01' />
  </Icon>
);

export const CheckCircle = (props: IconProps) => (
  <Icon {...props}>
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
    <path d='m9 11 3 3L22 4' />
  </Icon>
);

export const Download = (props: IconProps) => (
  <Icon {...props}>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
    <polyline points='7 10 12 15 17 10' />
    <line x1='12' x2='12' y1='15' y2='3' />
  </Icon>
);

export const Info = (props: IconProps) => (
  <Icon {...props}>
    <circle cx='12' cy='12' r='10' />
    <line x1='12' x2='12' y1='16' y2='12' />
    <line x1='12' x2='12.01' y1='8' y2='8' />
  </Icon>
);

export const Loader2 = (props: IconProps) => (
  <Icon {...props}>
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </Icon>
);

export const Moon = (props: IconProps) => (
  <Icon {...props}>
    <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
  </Icon>
);

export const RefreshCw = (props: IconProps) => (
  <Icon {...props}>
    <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
    <path d='M21 3v5h-5' />
    <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
    <path d='M8 16H3v5' />
  </Icon>
);

export const Settings2 = (props: IconProps) => (
  <Icon {...props}>
    <path d='M20 7h-9' />
    <path d='M14 17H5' />
    <circle cx='17' cy='17' r='3' />
    <circle cx='7' cy='7' r='3' />
  </Icon>
);

export const Sun = (props: IconProps) => (
  <Icon {...props}>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2' />
    <path d='M12 20v2' />
    <path d='m4.93 4.93 1.41 1.41' />
    <path d='m17.66 17.66 1.41 1.41' />
    <path d='M2 12h2' />
    <path d='M20 12h2' />
    <path d='m6.34 17.66-1.41 1.41' />
    <path d='m19.07 4.93-1.41 1.41' />
  </Icon>
);

export const Upload = (props: IconProps) => (
  <Icon {...props}>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
    <polyline points='17 8 12 3 7 8' />
    <line x1='12' x2='12' y1='3' y2='15' />
  </Icon>
);

export const X = (props: IconProps) => (
  <Icon {...props}>
    <line x1='18' y1='6' x2='6' y2='18'></line>
    <line x1='6' y1='6' x2='18' y2='18'></line>
  </Icon>
);

export const Zap = (props: IconProps) => (
  <Icon {...props}>
    <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
  </Icon>
);
