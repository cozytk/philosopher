import type { SVGProps } from 'react'

type IconName =
  | 'home'
  | 'question'
  | 'book'
  | 'tools'
  | 'scroll'
  | 'settings'
  | 'sparkles'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'plus'
  | 'x'
  | 'check'
  | 'clock'
  | 'link'
  | 'history'
  | 'chat'
  | 'lens'
  | 'download'
  | 'upload'
  | 'trash'
  | 'external'
  | 'refresh'
  | 'search'
  | 'info'
  | 'arrow-up'
  | 'arrow-down'
  | 'focus'
  | 'copy'

const PATHS: Record<IconName, string> = {
  home: 'M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10',
  question: 'M9 9a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1.2-1.5 2.4M12 17.5h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 1 6.5 18H20v3',
  tools: 'M14.7 6.3a4 4 0 0 0 5 5L13 18a2.1 2.1 0 0 1-3-3l6.7-6.7ZM4 20l3-3',
  scroll: 'M7 3h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 0a2 2 0 0 0-2 2v10M9 8h6M9 12h6',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-1.7-1L14.8 3H9.2l-.4 2.6a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h5.6l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.6c.1-.3.1-.7.1-1Z',
  sparkles: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM5 18l.7 2 2 .7-2 .7L5 23l-.7-1.6-2-.7 2-.7L5 18Z',
  'chevron-right': 'm9 6 6 6-6 6',
  'chevron-left': 'm15 6-6 6 6 6',
  'chevron-down': 'm6 9 6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  x: 'M6 6l12 12M18 6 6 18',
  check: 'm5 12 5 5L20 7',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5',
  history: 'M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 7v5l3 2',
  chat: 'M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-4.6A8 8 0 1 1 21 12Z',
  lens: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-3a2 2 0 1 0 0-4',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3',
  upload: 'M12 15V3m0 0 4 4m-4-4-4 4M4 17v3h16v-3',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6',
  external: 'M14 4h6v6M20 4l-9 9M19 14v6H4V5h6',
  refresh: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5',
  search: 'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm10.5 3-5-5',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-9v5m0-9h.01',
  'arrow-up': 'M12 19V5m0 0-6 6m6-6 6 6',
  'arrow-down': 'M12 5v14m0 0-6-6m6 6 6-6',
  focus: 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  copy: 'M9 9h10v11H9zM5 15V4h10',
}

export function Icon({ name, size = 18, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
